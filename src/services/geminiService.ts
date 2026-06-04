import { documentsData, type DocumentInfo } from '../data/documents';

/* ──────────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────────── */
export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface GeminiResponse {
  text: string;
  error?: boolean;
}

/* ──────────────────────────────────────────────────────────────
   System Prompt Builder
   ────────────────────────────────────────────────────────────── */
function buildDocumentsSummary(docs: DocumentInfo[]): string {
  return docs
    .map(
      (doc) =>
        `### ${doc.title} (${doc.titleHi})
- ID: ${doc.id}
- Category: ${doc.category}
- Description: ${doc.description}
- Fees: ${doc.fees}
- Processing Time: ${doc.processingTime}
- Eligibility: ${doc.eligibility.join('; ')}
- Required Documents: ${doc.requiredDocs.join('; ')}
- Services: ${doc.services.map((s) => `${s.label} (${s.labelHi})`).join(', ')}
- Steps: ${doc.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.desc}`).join(' ')}
- FAQs: ${doc.faqs.map((f) => `Q: ${f.question} A: ${f.answer}`).join(' | ')}`
    )
    .join('\n\n');
}

export function buildSystemPrompt(lang: 'EN' | 'HI'): string {
  const docsSummary = buildDocumentsSummary(documentsData);
  const isHI = lang === 'HI';

  return `You are **Glifty**, a friendly, smart, and helpful AI assistant integrated into **GoEase** — a platform that helps Indian citizens navigate government services.

## Your Personality
- You are warm, helpful, witty, and concise
- Use emojis naturally but don't overdo it (1-2 per response is great)
- Be conversational — like talking to a knowledgeable friend
- Keep responses concise (2-5 sentences for simple questions, more for detailed ones)
- Use bullet points for lists
- ${isHI ? 'Respond primarily in Hindi (Devanagari script). You may mix some common English words naturally.' : 'Respond in English. If the user writes in Hindi, respond in Hindi.'}

## Your Capabilities
You can help with ANYTHING — you're a general-purpose AI assistant. This includes:
1. **Government Services** (your specialty): Aadhaar, PAN, Driving License, Passport, Voter ID, Ration Card, Birth/Death Certificates, Income Certificate, Caste Certificate, Domicile Certificate, Property Registration
2. **General Knowledge**: Science, history, geography, current affairs, etc.
3. **Personal Questions**: Jokes, riddles, recommendations, advice, math, coding, writing, etc.
4. **Conversation**: Casual chat, greetings, opinions, etc.

## Government Services Knowledge Base
Here is your detailed knowledge about Indian government services. Use this data when answering government-related questions:

${docsSummary}

## Important Guidelines
- When discussing a specific government document/service, mention its key details (fees, processing time, required docs) naturally
- When you mention a specific government service, include its ID in a special tag like this: [DOC_REF:aadhaar] or [DOC_REF:pan] — this helps the UI generate action buttons. Only use IDs from the list above.
- You can mention multiple document references in one response
- For comparison questions, present information in a clear, structured format
- If someone asks something you genuinely don't know, say so honestly rather than making up information
- Never refuse to answer general/personal questions — you're a full AI assistant, not just a government services bot
- Be helpful and proactive — suggest relevant government services when the context naturally fits
- Do NOT include markdown formatting like **bold** or *italic* — the chat UI doesn't render markdown. Use plain text, emojis, and line breaks instead.
- Do NOT use headers (# or ##) in responses.
- Keep lists simple with bullet points (•) or numbered lists.`;
}

/* ──────────────────────────────────────────────────────────────
   Gemini API Caller
   ────────────────────────────────────────────────────────────── */
const GEMINI_MODEL = 'gemini-2.0-flash';

export async function sendMessageToGemini(
  conversationHistory: GeminiMessage[],
  lang: 'EN' | 'HI',
): Promise<GeminiResponse> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return {
      text:
        lang === 'HI'
          ? '⚠️ Gemini API key सेट नहीं है। कृपया .env फ़ाइल में VITE_GEMINI_API_KEY सेट करें।\n\nAPI key पाने के लिए: https://aistudio.google.com/apikey'
          : '⚠️ Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.\n\nGet a free key at: https://aistudio.google.com/apikey',
      error: true,
    };
  }

  const systemPrompt = buildSystemPrompt(lang);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const body = {
    system_instruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: conversationHistory,
    generationConfig: {
      temperature: 0.8,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 1024,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
    ],
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error:', response.status, errorData);

      if (response.status === 429) {
        return {
          text:
            lang === 'HI'
              ? '⏳ बहुत ज़्यादा अनुरोध। कृपया कुछ सेकंड बाद फिर पूछें।'
              : '⏳ Too many requests. Please wait a few seconds and try again.',
          error: true,
        };
      }

      if (response.status === 400) {
        return {
          text:
            lang === 'HI'
              ? '⚠️ API key अमान्य है। कृपया .env में अपनी VITE_GEMINI_API_KEY जाँचें।'
              : '⚠️ Invalid API key. Please check your VITE_GEMINI_API_KEY in the .env file.',
          error: true,
        };
      }

      return {
        text:
          lang === 'HI'
            ? '😔 कुछ गड़बड़ हुई। कृपया फिर से कोशिश करें।'
            : '😔 Something went wrong. Please try again.',
        error: true,
      };
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      (lang === 'HI'
        ? '🤔 मुझे कोई उत्तर नहीं मिला। कृपया दोबारा पूछें।'
        : "🤔 I couldn't generate a response. Please try asking again.");

    return { text };
  } catch (err) {
    console.error('Gemini fetch error:', err);
    return {
      text:
        lang === 'HI'
          ? '🌐 नेटवर्क त्रुटि। कृपया अपना इंटरनेट कनेक्शन जाँचें और फिर से कोशिश करें।'
          : '🌐 Network error. Please check your internet connection and try again.',
      error: true,
    };
  }
}

/* ──────────────────────────────────────────────────────────────
   Extract document references from AI response
   ────────────────────────────────────────────────────────────── */
export interface ActionLink {
  label: string;
  path: string;
}

export function extractDocumentMentions(
  responseText: string,
  lang: 'EN' | 'HI',
): { cleanedText: string; links: ActionLink[] } {
  const isHI = lang === 'HI';
  const docRefPattern = /\[DOC_REF:(\w+)\]/g;
  const links: ActionLink[] = [];
  const seenIds = new Set<string>();

  let match;
  while ((match = docRefPattern.exec(responseText)) !== null) {
    const docId = match[1];
    if (seenIds.has(docId)) continue;
    seenIds.add(docId);

    const doc = documentsData.find((d) => d.id === docId);
    if (doc) {
      links.push({
        label: isHI
          ? `📋 ${doc.titleHi} — पूरी गाइड`
          : `📋 ${doc.title} — Full Guide`,
        path: `/guides/${doc.id}`,
      });
      links.push({
        label: isHI
          ? `📊 ${doc.titleHi} की स्थिति ट्रैक करें`
          : `📊 Track ${doc.title} Status`,
        path: `/status?doc=${doc.id}`,
      });
    }
  }

  // Remove the [DOC_REF:...] tags from the displayed text
  const cleanedText = responseText.replace(/\s*\[DOC_REF:\w+\]/g, '').trim();

  return { cleanedText, links };
}
