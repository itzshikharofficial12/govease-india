import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Clock, CreditCard, FileText, CheckCircle, ChevronDown, ChevronUp,
  UserCheck, Files, Sparkles, ClipboardList, HelpCircle, Send,
  IndianRupee, ShieldCheck, Download, MapPin, Loader, ArrowRight
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { documentsData } from '../data/documents';
import { useLanguage } from '../context/LanguageContext';
import './ApplyPage.css';

type TabKey = 'overview' | 'steps' | 'apply' | 'faqs';
type ApplyStep = 'form' | 'payment' | 'verification' | 'download';

export const ApplyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const doc = documentsData.find(d => d.id === id);
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [selectedService, setSelectedService] = useState<string>('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [appNumber, setAppNumber] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Multi-step apply flow
  const [applyStep, setApplyStep] = useState<ApplyStep>('form');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [verificationDone, setVerificationDone] = useState(false);
  const [verificationProcessing, setVerificationProcessing] = useState(false);

  if (!doc) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Document not found</h2>
        <Link to="/documents" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Documents</Link>
      </div>
    );
  }

  const IconComponent = (LucideIcons as any)[doc.iconName] || LucideIcons.FileText;

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <ClipboardList size={16} /> },
    { key: 'steps', label: 'Step-by-Step', icon: <Sparkles size={16} /> },
    { key: 'apply', label: 'Apply Now', icon: <Send size={16} /> },
    { key: 'faqs', label: 'FAQs', icon: <HelpCircle size={16} /> },
  ];

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const svcTag = selectedService ? selectedService.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6) : 'GEN';
    const num = 'GE-' + doc.id.toUpperCase() + '-' + svcTag + '-' + Date.now().toString(36).toUpperCase();
    setAppNumber(num);
    setApplyStep('payment');
  };

  const handlePayment = () => {
    if (!paymentMethod) return;
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentDone(true);
      setTimeout(() => setApplyStep('verification'), 1200);
    }, 2000);
  };

  const handleVerification = () => {
    setVerificationProcessing(true);
    setTimeout(() => {
      setVerificationProcessing(false);
      setVerificationDone(true);
      setTimeout(() => setApplyStep('download'), 1500);
    }, 2500);
  };

  const handleDownload = () => {
    const selectedSvc = doc.services.find(s => s.id === selectedService);
    const content = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       GoEase India — ${doc.title}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Application Reference: ${appNumber}
Document: ${doc.title} (${doc.titleHi})
Service: ${selectedSvc ? selectedSvc.label : 'General'}
Status: VERIFIED & APPROVED

Applicant Details:
  Name: ${formData.fullName || formData.childName || 'N/A'}
  Date: ${new Date().toLocaleDateString('en-IN')}

This is a digitally signed document issued
via GoEase India portal.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.id}_${appNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Step progress indicator for Apply tab
  const applySteps: { key: ApplyStep; label: string; icon: React.ReactNode }[] = [
    { key: 'form', label: 'Application', icon: <FileText size={16} /> },
    { key: 'payment', label: 'Payment', icon: <IndianRupee size={16} /> },
    { key: 'verification', label: 'Verification', icon: <ShieldCheck size={16} /> },
    { key: 'download', label: 'Download', icon: <Download size={16} /> },
  ];

  const stepOrder: ApplyStep[] = ['form', 'payment', 'verification', 'download'];
  const currentStepIdx = stepOrder.indexOf(applyStep);

  const selectedSvcInfo = doc.services.find(s => s.id === selectedService);

  return (
    <div className="apply-page">
      <div className="container" style={{ maxWidth: '860px' }}>
        <Link to="/documents" className="apply-back-link">
          <ArrowLeft size={18} /> Back to Directory
        </Link>

        {/* Header */}
        <div className="apply-header">
          <div className="apply-header-top">
            <div className="apply-icon-box">
              <IconComponent size={24} />
            </div>
            <h1>
              {language === 'HI' ? doc.titleHi : doc.title}
              <small>{language === 'HI' ? doc.title : doc.titleHi} — {doc.description}</small>
            </h1>
          </div>
          <div className="apply-meta-grid">
            <div className="apply-meta-item">
              <Clock size={18} color="var(--color-primary)" />
              <div>
                <div className="meta-label">Processing</div>
                <div className="meta-value">{doc.processingTime}</div>
              </div>
            </div>
            <div className="apply-meta-item">
              <CreditCard size={18} color="var(--color-success)" />
              <div>
                <div className="meta-label">Fees</div>
                <div className="meta-value">{doc.fees}</div>
              </div>
            </div>
            <div className="apply-meta-item">
              <FileText size={18} color="var(--color-warning)" />
              <div>
                <div className="meta-label">Format</div>
                <div className="meta-value">Physical + Digital</div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Selector */}
        <div className="service-selector-card">
          <h3 className="service-selector-title">
            <Sparkles size={18} />
            {language === 'HI' ? 'सेवा चुनें' : 'Select a Service'}
          </h3>
          <div className="service-selector-grid">
            {doc.services.map(svc => {
              const SvcIcon = (LucideIcons as any)[svc.iconName] || LucideIcons.FileText;
              const isSelected = selectedService === svc.id;
              return (
                <button
                  key={svc.id}
                  className={`service-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedService(svc.id)}
                >
                  <div className="service-option-icon">
                    <SvcIcon size={20} />
                  </div>
                  <div className="service-option-text">
                    <span className="service-option-label">
                      {language === 'HI' ? svc.labelHi : svc.label}
                    </span>
                    <span className="service-option-desc">{svc.description}</span>
                  </div>
                  {isSelected && (
                    <div className="service-option-check">
                      <CheckCircle size={18} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="apply-tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`apply-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon}
              <span className="tab-label-text">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="apply-content" key={activeTab === 'apply' ? `apply-${applyStep}` : activeTab}>

          {/* Overview */}
          {activeTab === 'overview' && (
            <>
              <div className="overview-section">
                <h2><UserCheck size={20} /> Eligibility</h2>
                <ul className="overview-list">
                  {doc.eligibility.map((item, i) => (
                    <li key={i}><CheckCircle size={16} color="var(--color-success)" /> {item}</li>
                  ))}
                </ul>
              </div>
              <div className="overview-section">
                <h2><Files size={20} /> Required Documents {selectedSvcInfo ? `— ${language === 'HI' ? selectedSvcInfo.labelHi : selectedSvcInfo.label}` : '(General)'}</h2>
                <ul className="overview-list">
                  {(selectedSvcInfo?.requiredDocs || doc.requiredDocs).map((item, i) => (
                    <li key={i}><FileText size={16} color="var(--color-primary)" /> {item}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Steps */}
          {activeTab === 'steps' && (
            <div className="steps-timeline">
              {doc.steps.map((step, idx) => (
                <div className="step-item" key={idx}>
                  <div className="step-number">{idx + 1}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Apply — Multi-step flow */}
          {activeTab === 'apply' && (
            <>
              {/* Progress Bar */}
              <div className="flow-progress">
                {applySteps.map((s, i) => (
                  <React.Fragment key={s.key}>
                    <div className={`flow-step ${i < currentStepIdx ? 'done' : ''} ${i === currentStepIdx ? 'active' : ''}`}>
                      <div className="flow-step-circle">
                        {i < currentStepIdx ? <CheckCircle size={16} /> : s.icon}
                      </div>
                      <span className="flow-step-label">{s.label}</span>
                    </div>
                    {i < applySteps.length - 1 && (
                      <div className={`flow-connector ${i < currentStepIdx ? 'done' : ''}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Step 1: Form */}
              {applyStep === 'form' && (
                <form className="apply-form" onSubmit={handleFormSubmit}>
                  {selectedSvcInfo && (
                    <div className="selected-service-badge">
                      <Sparkles size={16} />
                      <span>Service: <strong>{language === 'HI' ? selectedSvcInfo.labelHi : selectedSvcInfo.label}</strong></span>
                    </div>
                  )}
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    Fill in the details below to submit your application for <strong>{language === 'HI' ? doc.titleHi : doc.title}</strong>.
                  </p>

                  {/* Service-specific required docs */}
                  {selectedSvcInfo?.requiredDocs && selectedSvcInfo.requiredDocs.length > 0 && (
                    <div style={{
                      background: 'var(--color-info-bg, rgba(59,130,246,0.08))',
                      border: '1px solid var(--color-info-border, rgba(59,130,246,0.2))',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1rem 1.25rem',
                      marginBottom: '1.5rem'
                    }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>
                        <Files size={16} /> Documents Needed for this Service
                      </h4>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        {selectedSvcInfo.requiredDocs.map((d, i) => (
                          <li key={i} style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <CheckCircle size={14} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} /> {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Render service-specific fields if available, otherwise fallback to doc fields */}
                  {(selectedSvcInfo?.formFields || doc.formFields).map(field => (
                    <div className="form-group" key={field.name}>
                      <label>
                        {field.label}
                        {field.required && <span className="required-star">*</span>}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          value={formData[field.name] || ''}
                          onChange={e => handleChange(field.name, e.target.value)}
                          required={field.required}
                        >
                          <option value="" disabled>Select {field.label}</option>
                          {field.options?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          placeholder={field.placeholder}
                          value={formData[field.name] || ''}
                          onChange={e => handleChange(field.name, e.target.value)}
                          required={field.required}
                        />
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={field.type === 'file' ? undefined : (formData[field.name] || '')}
                          onChange={e => handleChange(field.name, field.type === 'file' ? e.target.files?.[0]?.name || '' : e.target.value)}
                          required={field.required}
                        />
                      )}
                    </div>
                  ))}
                  <button type="submit" className="form-submit-btn">
                    Submit & Proceed to Payment <ArrowRight size={18} />
                  </button>
                </form>
              )}

              {/* Step 2: Payment */}
              {applyStep === 'payment' && (
                <div className="payment-section">
                  <div className="payment-success-badge">
                    <CheckCircle size={20} color="var(--color-success)" />
                    <span>Application submitted! Reference: <strong>{appNumber}</strong></span>
                  </div>

                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <IndianRupee size={22} /> Pay Processing Fee
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Fee: <strong>{doc.fees}</strong> — Select a payment method below.
                  </p>

                  <div className="payment-methods">
                    {['UPI / Google Pay', 'Debit / Credit Card', 'Net Banking', 'Wallet'].map(method => (
                      <label key={method} className={`payment-option ${paymentMethod === method ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={e => setPaymentMethod(e.target.value)}
                        />
                        <span className="payment-option-label">{method}</span>
                      </label>
                    ))}
                  </div>

                  {paymentDone ? (
                    <div className="payment-success-card">
                      <CheckCircle size={28} color="var(--color-success)" />
                      <div>
                        <h3>Payment Successful!</h3>
                        <p>Transaction ID: TXN-{Date.now().toString(36).toUpperCase()}</p>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="form-submit-btn"
                      onClick={handlePayment}
                      disabled={!paymentMethod || paymentProcessing}
                      style={{ marginTop: '1rem' }}
                    >
                      {paymentProcessing ? (
                        <><Loader size={18} className="animate-spin" /> Processing Payment...</>
                      ) : (
                        <><IndianRupee size={18} /> Pay Now & Continue</>
                      )}
                    </button>
                  )}
                </div>
              )}

              {/* Step 3: Verification */}
              {applyStep === 'verification' && (
                <div className="verification-section">
                  <div className="payment-success-badge">
                    <CheckCircle size={20} color="var(--color-success)" />
                    <span>Payment complete! Now visit a verification centre.</span>
                  </div>

                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={22} /> Biometric & Document Verification
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Visit any nearby verification centre with your original documents for biometric capture and identity verification.
                  </p>

                  <div className="verification-centres">
                    {[
                      { name: 'CSC Centre — Connaught Place', addr: 'Block A, CP, New Delhi — 110001', time: '9 AM – 5 PM' },
                      { name: 'Govt. e-Seva Kendra — Laxmi Nagar', addr: '23-B Main Rd, Laxmi Nagar, Delhi — 110092', time: '10 AM – 6 PM' },
                      { name: 'Aadhaar Seva Kendra — Noida Sec 62', addr: 'A-Block, Sector 62, Noida — 201309', time: '9:30 AM – 4:30 PM' },
                    ].map((centre, i) => (
                      <div className="centre-card" key={i}>
                        <div className="centre-icon"><MapPin size={20} /></div>
                        <div>
                          <h4>{centre.name}</h4>
                          <p>{centre.addr}</p>
                          <span className="centre-time">🕐 {centre.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--color-background)', borderRadius: 'var(--radius-lg)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    <strong>What to bring:</strong> Original ID proof, address proof, application receipt ({appNumber}), and passport-size photos.
                  </div>

                  {verificationDone ? (
                    <div className="payment-success-card" style={{ marginTop: '1.25rem' }}>
                      <CheckCircle size={28} color="var(--color-success)" />
                      <div>
                        <h3>Verification Complete!</h3>
                        <p>Your biometrics and documents have been verified. Proceeding to download...</p>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="form-submit-btn"
                      onClick={handleVerification}
                      disabled={verificationProcessing}
                      style={{ marginTop: '1.25rem' }}
                    >
                      {verificationProcessing ? (
                        <><Loader size={18} className="animate-spin" /> Verifying...</>
                      ) : (
                        <><ShieldCheck size={18} /> I've Completed Verification</>
                      )}
                    </button>
                  )}
                </div>
              )}

              {/* Step 4: Download */}
              {applyStep === 'download' && (
                <div className="download-section">
                  <div className="download-hero">
                    <div className="download-check-icon">
                      <CheckCircle size={40} />
                    </div>
                    <h2>Your {language === 'HI' ? doc.titleHi : doc.title} is Ready!</h2>
                    <p>Application <strong>{appNumber}</strong> has been processed, verified, and approved.</p>
                  </div>

                  <div className="download-card">
                    <div className="download-card-icon">
                      <IconComponent size={32} />
                    </div>
                    <div className="download-card-info">
                      <h3>{doc.title}</h3>
                      <p>{doc.titleHi}</p>
                      <span className="download-badge">✅ Verified & Approved</span>
                    </div>
                    <button className="download-btn" onClick={handleDownload}>
                      <Download size={18} /> Download
                    </button>
                  </div>

                  <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <Link to="/documents" className="btn btn-outline" style={{ gap: '0.5rem' }}>
                      Apply for Another Document <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}

          {/* FAQs */}
          {activeTab === 'faqs' && (
            <div className="faq-list">
              {doc.faqs.map((faq, idx) => (
                <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                    <span>{faq.question}</span>
                    {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {openFaq === idx && <div className="faq-answer">{faq.answer}</div>}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
