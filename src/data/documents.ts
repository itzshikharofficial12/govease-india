export type DocumentCategory = 'Identity' | 'Transport' | 'Welfare' | 'Finance';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'file' | 'textarea';
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface ServiceOption {
  id: string;
  label: string;
  labelHi: string;
  iconName: string;
  description: string;
  formFields?: FormField[];
  requiredDocs?: string[];
}

export interface DocumentInfo {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  category: DocumentCategory;
  iconName: string;
  services: ServiceOption[];
  eligibility: string[];
  requiredDocs: string[];
  fees: string;
  processingTime: string;
  steps: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  formFields: FormField[];
}

const commonPersonalFields: FormField[] = [
  { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'As per official records', required: true },
  { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
  { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'] },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', required: true },
  { name: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true },
  { name: 'address', label: 'Full Address', type: 'textarea', placeholder: 'House No., Street, City, State, PIN', required: true },
];

export const documentsData: DocumentInfo[] = [
  {
    id: 'aadhaar',
    title: 'Aadhaar Card',
    titleHi: 'आधार कार्ड',
    description: 'Unique 12-digit identity number issued to Indian residents by UIDAI.',
    category: 'Identity',
    iconName: 'Fingerprint',
    services: [
      { id: 'new-enrolment', label: 'New Enrolment', labelHi: 'नया नामांकन', iconName: 'UserPlus', description: 'Apply for a fresh Aadhaar card at an enrolment centre',
        formFields: [
          { name: 'fullName', label: 'Full Name (as per ID proof)', type: 'text', placeholder: 'e.g. Rajesh Kumar Sharma', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Transgender'] },
          { name: 'fatherName', label: "Father's / Guardian's Name", type: 'text', placeholder: 'As per records', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true },
          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', required: false },
          { name: 'address', label: 'Full Residential Address', type: 'textarea', placeholder: 'House No., Street, Locality, City, District, State, PIN', required: true },
          { name: 'idProofType', label: 'Proof of Identity (POI) Type', type: 'select', required: true, options: ['Passport', 'PAN Card', 'Voter ID (EPIC)', 'Driving Licence', 'NREGA Job Card', 'Govt Photo ID'] },
          { name: 'idProof', label: 'Upload Proof of Identity', type: 'file', required: true },
          { name: 'addressProofType', label: 'Proof of Address (POA) Type', type: 'select', required: true, options: ['Passport', 'Bank Passbook', 'Voter ID', 'Driving Licence', 'Utility Bill (≤3 months)', 'Ration Card', 'Property Tax Receipt'] },
          { name: 'addressProof', label: 'Upload Proof of Address', type: 'file', required: true },
          { name: 'dobProof', label: 'Upload Proof of Date of Birth', type: 'file', required: false }
        ],
        requiredDocs: ['Proof of Identity (Passport / PAN / Voter ID / Driving Licence)', 'Proof of Address (Utility bill / Bank passbook / Ration card)', 'Proof of Date of Birth (Birth certificate / Marksheet)', 'Proof of Relationship — for children (Birth cert + Parent Aadhaar)']
      },
      { id: 'update-correction', label: 'Update / Correction', labelHi: 'अपडेट / सुधार', iconName: 'Edit', description: 'Update name, address, DOB, mobile, or email in Aadhaar',
        formFields: [
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar number', required: true },
          { name: 'fullName', label: 'Full Name (current)', type: 'text', required: true },
          { name: 'updateField', label: 'Field to Update', type: 'select', required: true, options: ['Name', 'Address', 'Date of Birth', 'Gender', 'Mobile Number', 'Email'] },
          { name: 'newValue', label: 'New Value / Updated Detail', type: 'text', placeholder: 'Enter the corrected/new value', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', placeholder: 'For OTP verification', required: true },
          { name: 'supportDoc', label: 'Upload Supporting Document', type: 'file', required: true }
        ],
        requiredDocs: ['Aadhaar card (original)', 'Supporting document for the update (Name: Passport/PAN; Address: Utility bill/Rent agreement; DOB: Birth certificate/Marksheet)']
      },
      { id: 'reprint', label: 'Order Reprint', labelHi: 'पुनर्मुद्रण', iconName: 'Printer', description: 'Order a PVC Aadhaar card reprint via UIDAI',
        formFields: [
          { name: 'aadhaarNumber', label: 'Aadhaar Number / VID', type: 'text', placeholder: '12-digit Aadhaar or 16-digit VID', required: true },
          { name: 'fullName', label: 'Full Name (as in Aadhaar)', type: 'text', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', placeholder: 'For OTP verification', required: true },
          { name: 'deliveryAddress', label: 'Delivery Address (if different)', type: 'textarea', placeholder: 'Leave blank to use Aadhaar address', required: false }
        ],
        requiredDocs: ['Aadhaar number or Enrolment ID', 'Registered mobile number for OTP']
      },
      { id: 'download', label: 'Download e-Aadhaar', labelHi: 'ई-आधार डाउनलोड', iconName: 'Download', description: 'Download a digital copy of your Aadhaar (e-Aadhaar PDF)',
        formFields: [
          { name: 'idType', label: 'Search By', type: 'select', required: true, options: ['Aadhaar Number', 'Enrolment ID (EID)', 'Virtual ID (VID)'] },
          { name: 'idValue', label: 'Enter Number', type: 'text', placeholder: 'Enter your Aadhaar / EID / VID', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', placeholder: 'OTP will be sent here', required: true }
        ],
        requiredDocs: ['Aadhaar Number or Enrolment ID or VID', 'Registered mobile number for OTP']
      },
      { id: 'check-status', label: 'Check Enrolment Status', labelHi: 'स्थिति जाँचें', iconName: 'Search', description: 'Track the status of your Aadhaar enrolment or update',
        formFields: [
          { name: 'eid', label: 'Enrolment ID (EID)', type: 'text', placeholder: '14-digit EID from acknowledgement slip', required: true },
          { name: 'enrollmentDate', label: 'Date of Enrolment', type: 'date', required: true }
        ],
        requiredDocs: ['Acknowledgement slip with 14-digit EID']
      },
      { id: 'lock-biometrics', label: 'Lock / Unlock Biometrics', labelHi: 'बायोमेट्रिक लॉक', iconName: 'Lock', description: 'Lock or unlock your biometric authentication for security',
        formFields: [
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar number', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', placeholder: 'OTP will be sent here', required: true },
          { name: 'action', label: 'Action', type: 'select', required: true, options: ['Lock Biometrics', 'Unlock Biometrics'] }
        ],
        requiredDocs: ['Aadhaar number', 'Registered mobile number']
      },
      { id: 'generate-vid', label: 'Generate / Retrieve VID', labelHi: 'VID जनरेट करें', iconName: 'KeyRound', description: 'Generate a 16-digit Virtual ID for privacy-safe authentication',
        formFields: [
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar number', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', placeholder: 'OTP will be sent here', required: true },
          { name: 'vidAction', label: 'Action', type: 'select', required: true, options: ['Generate New VID', 'Retrieve Existing VID'] }
        ],
        requiredDocs: ['Aadhaar number', 'Registered mobile number for OTP']
      },
      { id: 'verify-aadhaar', label: 'Verify Aadhaar', labelHi: 'आधार सत्यापन', iconName: 'ShieldCheck', description: 'Verify your Aadhaar number validity online via UIDAI',
        formFields: [
          { name: 'aadhaarNumber', label: 'Aadhaar Number to Verify', type: 'text', placeholder: '12-digit Aadhaar number', required: true }
        ],
        requiredDocs: ['Aadhaar number']
      },
      { id: 'bank-linking', label: 'Aadhaar-Bank Linking', labelHi: 'बैंक लिंकिंग स्थिति', iconName: 'Landmark', description: 'Check if your Aadhaar is linked with your bank account',
        formFields: [
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar number', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', placeholder: 'OTP will be sent here', required: true }
        ],
        requiredDocs: ['Aadhaar number', 'Registered mobile number']
      },
      { id: 'maadhaar', label: 'mAadhaar Profile', labelHi: 'mAadhaar प्रोफ़ाइल', iconName: 'Smartphone', description: 'Access your Aadhaar profile via the official mAadhaar app',
        formFields: [
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar number', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', placeholder: 'Must match mAadhaar registered number', required: true }
        ],
        requiredDocs: ['Aadhaar number', 'Mobile number registered with UIDAI', 'mAadhaar app installed on device']
      }
    ],
    eligibility: ['Any resident of India', 'No age restriction', 'No citizenship requirement — residency is sufficient'],
    requiredDocs: ['Proof of Identity (Passport, PAN, Voter ID)', 'Proof of Address (Utility bill, Bank statement)', 'Proof of Date of Birth (Birth certificate, Marksheet)'],
    fees: '₹0 (Free for new enrolment); ₹50 for updates',
    processingTime: '15 – 90 days',
    steps: [
      { title: 'Locate Enrolment Centre', desc: 'Find the nearest Aadhaar Enrolment Centre using the locator.' },
      { title: 'Fill Application Form', desc: 'Fill the Aadhaar enrolment/update form with your personal details.' },
      { title: 'Submit Biometrics', desc: 'Your fingerprints, iris scan, and photograph will be captured.' },
      { title: 'Get Acknowledgement Slip', desc: 'You will receive a 14-digit Enrolment ID (EID) on the slip.' },
      { title: 'Download e-Aadhaar', desc: 'Once processed, download your e-Aadhaar from the UIDAI portal.' }
    ],
    faqs: [
      { question: 'Is Aadhaar mandatory?', answer: 'Aadhaar is not mandatory by law but is required for availing most government subsidies and services.' },
      { question: 'Can NRIs get Aadhaar?', answer: 'NRIs with an Indian passport can apply for Aadhaar upon arrival in India.' },
      { question: 'How to update address in Aadhaar?', answer: 'You can update your address online through the UIDAI Self Service portal or by visiting an enrolment centre.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'fatherName', label: "Father's / Guardian's Name", type: 'text', placeholder: 'As per records', required: true },
      { name: 'idProof', label: 'Upload ID Proof', type: 'file', required: true },
      { name: 'addressProof', label: 'Upload Address Proof', type: 'file', required: true }
    ]
  },
  {
    id: 'pan',
    title: 'PAN Card',
    titleHi: 'पैन कार्ड',
    description: 'Permanent Account Number for tax identification and financial transactions.',
    category: 'Finance',
    iconName: 'CreditCard',
    services: [
      { id: 'new-pan', label: 'Apply for New PAN', labelHi: 'नया पैन आवेदन', iconName: 'FilePlus', description: 'Apply for a new PAN card using Form 49A (Indian) or 49AA (Foreign)',
        formFields: [
          { name: 'applicantType', label: 'Application Type', type: 'select', required: true, options: ['Form 49A (Indian Citizen)', 'Form 49AA (Foreign Citizen)'] },
          { name: 'title', label: 'Title', type: 'select', required: true, options: ['Shri', 'Smt', 'Kumari', 'M/s'] },
          { name: 'lastName', label: 'Last Name / Surname', type: 'text', placeholder: 'As per ID proof', required: true },
          { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'As per ID proof', required: true },
          { name: 'middleName', label: 'Middle Name', type: 'text', placeholder: 'Optional', required: false },
          { name: 'fatherName', label: "Father's Full Name", type: 'text', placeholder: 'Mandatory for individuals', required: true },
          { name: 'dob', label: 'Date of Birth / Incorporation', type: 'date', required: true },
          { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Transgender'] },
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar (mandatory)', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: true },
          { name: 'address', label: 'Residential Address', type: 'textarea', placeholder: 'Flat/Door No, Street, Area, City, State, PIN', required: true },
          { name: 'sourceOfIncome', label: 'Source of Income', type: 'select', required: true, options: ['Salary', 'Business / Profession', 'Capital Gains', 'No Income'] },
          { name: 'idProof', label: 'Upload Proof of Identity', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Proof of Address', type: 'file', required: true },
          { name: 'dobProof', label: 'Upload Proof of Date of Birth', type: 'file', required: true },
          { name: 'photo', label: 'Upload Recent Photograph', type: 'file', required: true }
        ],
        requiredDocs: ['Proof of Identity (Aadhaar / Passport / Voter ID / DL)', 'Proof of Address (Aadhaar / Utility bill / Bank statement)', 'Proof of Date of Birth (Birth certificate / Marksheet)', '2 recent passport-size colour photographs', 'Aadhaar card (mandatory for Indian citizens)']
      },
      { id: 'correction-reprint', label: 'Correction / Reprint', labelHi: 'सुधार / पुनर्मुद्रण', iconName: 'Edit', description: 'Correct details or request a reprint of your existing PAN card',
        formFields: [
          { name: 'existingPan', label: 'Existing PAN Number', type: 'text', placeholder: '10-character PAN (e.g. ABCDE1234F)', required: true },
          { name: 'correctionType', label: 'Request Type', type: 'select', required: true, options: ['Correction in PAN Data', 'Reprint (No Data Change)'] },
          { name: 'fullName', label: 'Full Name (corrected / as-is)', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth (corrected / as-is)', type: 'date', required: true },
          { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'supportDoc', label: 'Upload Supporting Document', type: 'file', required: true },
          { name: 'photo', label: 'Upload Recent Photograph', type: 'file', required: true }
        ],
        requiredDocs: ['Existing PAN Card copy', 'Aadhaar Card', 'Supporting document for correction (if name/DOB change)', 'Recent passport-size photograph']
      },
      { id: 'link-aadhaar', label: 'Link PAN with Aadhaar', labelHi: 'आधार से लिंक', iconName: 'Link', description: 'Link your PAN with Aadhaar as mandated by the Income Tax Department',
        formFields: [
          { name: 'panNumber', label: 'PAN Number', type: 'text', placeholder: '10-character PAN', required: true },
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'nameAsPerAadhaar', label: 'Name (as per Aadhaar)', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'phone', label: 'Mobile Number (linked to Aadhaar)', type: 'tel', required: true }
        ],
        requiredDocs: ['PAN Card', 'Aadhaar Card', 'Mobile number registered with Aadhaar']
      },
      { id: 'instant-epan', label: 'Instant e-PAN', labelHi: 'तत्काल ई-पैन', iconName: 'Zap', description: 'Get an instant e-PAN using your Aadhaar number and OTP',
        formFields: [
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar (with active mobile)', required: true },
          { name: 'phone', label: 'Mobile Number (linked to Aadhaar)', type: 'tel', required: true }
        ],
        requiredDocs: ['Aadhaar Card with active registered mobile number', 'No PAN should have been allotted previously']
      },
      { id: 'check-status', label: 'Check Application Status', labelHi: 'आवेदन स्थिति', iconName: 'Search', description: 'Track the status of your PAN application using acknowledgment number',
        formFields: [
          { name: 'ackNumber', label: 'Acknowledgment Number', type: 'text', placeholder: '15-digit acknowledgment number', required: true }
        ],
        requiredDocs: ['Acknowledgment number from PAN application receipt']
      },
      { id: 'verify-pan', label: 'Verify PAN Details', labelHi: 'पैन सत्यापन', iconName: 'ShieldCheck', description: 'Verify PAN details and active status on Income Tax portal',
        formFields: [
          { name: 'panNumber', label: 'PAN Number', type: 'text', placeholder: '10-character PAN', required: true },
          { name: 'fullName', label: 'Full Name (as per PAN)', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', placeholder: 'For OTP verification', required: true }
        ],
        requiredDocs: ['PAN Number', 'Name and DOB as per PAN records']
      },
      { id: 'know-pan', label: 'Know Your PAN', labelHi: 'अपना पैन जानें', iconName: 'Eye', description: 'Retrieve your PAN number using name, DOB, and mobile OTP',
        formFields: [
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true }
        ],
        requiredDocs: ['Name and Date of Birth as per PAN records', 'Registered mobile number']
      },
      { id: 'surrender-pan', label: 'Surrender Duplicate PAN', labelHi: 'डुप्लीकेट पैन सरेंडर', iconName: 'FileX', description: 'Surrender extra PAN cards — holding more than one PAN is illegal',
        formFields: [
          { name: 'panToRetain', label: 'PAN to Retain', type: 'text', placeholder: 'PAN number you want to keep active', required: true },
          { name: 'panToSurrender', label: 'PAN to Surrender', type: 'text', placeholder: 'Duplicate PAN number to cancel', required: true },
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'reason', label: 'Reason for Duplicate', type: 'select', required: true, options: ['Applied multiple times', 'Allotted inadvertently', 'Other'] },
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', required: true },
          { name: 'duplicatePanCopy', label: 'Upload Copy of Duplicate PAN', type: 'file', required: true }
        ],
        requiredDocs: ['Copy of both PAN cards', 'Aadhaar Card', 'Letter to Assessing Officer requesting cancellation']
      }
    ],
    eligibility: ['Any Indian citizen', 'Individuals, companies, firms, and trusts', 'Foreign nationals with taxable income in India'],
    requiredDocs: ['Proof of Identity (Aadhaar, Passport, Voter ID)', 'Proof of Address (Utility bill, Bank statement)', 'Proof of Date of Birth (Birth certificate)', '2 recent passport-size photographs'],
    fees: '₹107 (Indian address); ₹1,017 (foreign address)',
    processingTime: '15 – 20 working days',
    steps: [
      { title: 'Choose Application Type', desc: 'Select Form 49A (Indian citizens) or Form 49AA (foreign citizens).' },
      { title: 'Fill the Online Form', desc: 'Enter your personal, contact, and source-of-income details.' },
      { title: 'Upload Documents', desc: 'Upload scanned copies of your ID, address, and DOB proof.' },
      { title: 'Pay Fee & Submit', desc: 'Pay the application fee online via net banking, card, or UPI.' },
      { title: 'Receive PAN', desc: 'PAN card will be dispatched to your address after processing.' }
    ],
    faqs: [
      { question: 'Can I apply for PAN without Aadhaar?', answer: 'No. As per recent rules, Aadhaar is mandatory for PAN application and must be linked.' },
      { question: 'How to link PAN with Aadhaar?', answer: 'You can link them via the Income Tax e-filing portal or by sending an SMS.' },
      { question: 'What if I have duplicate PAN?', answer: 'Having more than one PAN is illegal. Surrender the extra PAN by filing a PAN change request.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar number', required: true },
      { name: 'incomeSource', label: 'Source of Income', type: 'select', required: true, options: ['Salary', 'Business', 'Capital Gains', 'Other'] },
      { name: 'idProof', label: 'Upload ID Proof', type: 'file', required: true },
      { name: 'photo', label: 'Upload Photograph', type: 'file', required: true }
    ]
  },
  {
    id: 'dl',
    title: 'Driving License',
    titleHi: 'ड्राइविंग लाइसेंस',
    description: 'Official document permitting individuals to operate motorized vehicles on public roads.',
    category: 'Transport',
    iconName: 'Car',
    services: [
      { id: 'learner-license', label: 'Apply Learner License', labelHi: 'लर्नर लाइसेंस', iconName: 'GraduationCap', description: 'Apply for a new Learner License (LL) at your RTO',
        formFields: [
          { name: 'fullName', label: 'Full Name (as per Age Proof)', type: 'text', placeholder: 'e.g. Priya Sharma', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Transgender'] },
          { name: 'fatherName', label: "Father's / Guardian's Name", type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: false },
          { name: 'address', label: 'Present Address', type: 'textarea', placeholder: 'House No., Street, City, District, State, PIN', required: true },
          { name: 'state', label: 'State', type: 'select', required: true, options: ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'] },
          { name: 'rto', label: 'RTO Office', type: 'text', placeholder: 'Nearest RTO code / name', required: true },
          { name: 'vehicleClass', label: 'Vehicle Class', type: 'select', required: true, options: ['Motor Cycle without Gear (MCWOG)', 'Motor Cycle with Gear (MCWG)', 'Light Motor Vehicle (LMV)', 'LMV – Non Transport'] },
          { name: 'bloodGroup', label: 'Blood Group', type: 'select', required: true, options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
          { name: 'qualification', label: 'Educational Qualification', type: 'select', required: true, options: ['Illiterate', 'Below 8th', '8th Pass', '10th Pass', '12th Pass', 'Graduate', 'Post Graduate'] },
          { name: 'ageProof', label: 'Upload Proof of Age (Form 2)', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Proof of Address', type: 'file', required: true },
          { name: 'photo', label: 'Upload Passport-size Photograph', type: 'file', required: true },
          { name: 'signature', label: 'Upload Signature', type: 'file', required: true },
          { name: 'medicalSelfDecl', label: 'Upload Medical Self-Declaration (Form 1)', type: 'file', required: true }
        ],
        requiredDocs: ['Proof of Age — Birth certificate / SSC marksheet / PAN / Passport', 'Proof of Address — Aadhaar / Voter ID / Utility bill / Passport', 'Passport-size photographs (6 copies)', 'Medical Self-Declaration (Form 1)', 'Medical Certificate Form 1A (if age 40+ or Transport vehicle)']
      },
      { id: 'new-dl', label: 'New Driving License', labelHi: 'नया DL', iconName: 'FilePlus', description: 'Apply for a permanent Driving License after passing the test',
        formFields: [
          { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'As per Learner License', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Transgender'] },
          { name: 'llNumber', label: 'Learner License Number', type: 'text', placeholder: 'Valid LL number (held for 30+ days)', required: true },
          { name: 'llIssueDate', label: 'LL Issue Date', type: 'date', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: false },
          { name: 'address', label: 'Present Address', type: 'textarea', placeholder: 'House No., Street, City, District, State, PIN', required: true },
          { name: 'vehicleClass', label: 'Vehicle Class (Form 4)', type: 'select', required: true, options: ['MCWOG', 'MCWG', 'LMV', 'LMV – Non Transport', 'HMV', 'Transport'] },
          { name: 'rtoCode', label: 'RTO Code', type: 'text', placeholder: 'e.g. DL-1, MH-02', required: true },
          { name: 'bloodGroup', label: 'Blood Group', type: 'select', required: true, options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
          { name: 'llCopy', label: 'Upload Learner License Copy', type: 'file', required: true },
          { name: 'ageProof', label: 'Upload Proof of Age', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Proof of Address', type: 'file', required: true },
          { name: 'medicalCert', label: 'Upload Medical Certificate (Form 1A)', type: 'file', required: true },
          { name: 'photo', label: 'Upload Passport-size Photograph', type: 'file', required: true }
        ],
        requiredDocs: ['Valid Learner License (held for minimum 30 days, max 6 months)', 'Application Form 4 (for DL)', 'Proof of Age — Birth certificate / SSC marksheet / Passport', 'Proof of Address — Aadhaar / Voter ID / Utility bill', 'Medical Certificate (Form 1A) — mandatory for age 40+ or transport', '6 passport-size photographs', 'Driving school certificate (if applicable)']
      },
      { id: 'renewal', label: 'Renewal', labelHi: 'नवीनीकरण', iconName: 'RefreshCw', description: 'Renew your expired or expiring Driving License',
        formFields: [
          { name: 'fullName', label: 'Full Name (as per DL)', type: 'text', required: true },
          { name: 'dlNumber', label: 'Existing DL Number', type: 'text', placeholder: 'e.g. DL-0120180012345', required: true },
          { name: 'dlExpiryDate', label: 'DL Expiry Date', type: 'date', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: false },
          { name: 'address', label: 'Current Address', type: 'textarea', placeholder: 'House No., Street, City, State, PIN', required: true },
          { name: 'vehicleClass', label: 'Vehicle Class on DL', type: 'select', required: true, options: ['MCWOG', 'MCWG', 'LMV', 'HMV', 'Transport', 'Multiple'] },
          { name: 'originalDL', label: 'Upload Original DL Copy (Form 9)', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Proof of Address', type: 'file', required: true },
          { name: 'medicalCert', label: 'Upload Medical Certificate (Form 1A)', type: 'file', required: true },
          { name: 'photo', label: 'Upload Recent Photograph', type: 'file', required: true }
        ],
        requiredDocs: ['Application Form 9 (Renewal of Driving Licence)', 'Original Driving License', 'Proof of Address — Aadhaar / Voter ID / Utility bill', 'Medical Certificate (Form 1A)', 'Passport-size photographs', 'Note: Apply up to 1 year before or after expiry']
      },
      { id: 'duplicate', label: 'Duplicate License', labelHi: 'डुप्लीकेट DL', iconName: 'Copy', description: 'Apply for a duplicate DL if original is lost or damaged',
        formFields: [
          { name: 'fullName', label: 'Full Name (as per DL)', type: 'text', required: true },
          { name: 'dlNumber', label: 'Lost / Damaged DL Number', type: 'text', placeholder: 'Enter your DL number', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'reason', label: 'Reason for Duplicate', type: 'select', required: true, options: ['Lost', 'Stolen', 'Damaged / Mutilated'] },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'address', label: 'Current Address', type: 'textarea', required: true },
          { name: 'firCopy', label: 'Upload FIR Copy (if lost/stolen)', type: 'file', required: false },
          { name: 'affidavit', label: 'Upload Affidavit (Form LLD)', type: 'file', required: true },
          { name: 'idProof', label: 'Upload Proof of Identity', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Proof of Address', type: 'file', required: true },
          { name: 'photo', label: 'Upload Passport-size Photograph', type: 'file', required: true }
        ],
        requiredDocs: ['Application Form LLD (Duplicate Licence)', 'FIR copy from police station (if lost / stolen)', 'Notarized affidavit stating reason for duplicate', 'Proof of Identity — Aadhaar / Voter ID / Passport', 'Proof of Address — Aadhaar / Utility bill', 'Passport-size photographs', 'Copy of original DL (if available)']
      },
      { id: 'international', label: 'International Driving Permit', labelHi: 'अंतरराष्ट्रीय परमिट', iconName: 'Globe', description: 'Apply for an IDP for driving abroad',
        formFields: [
          { name: 'fullName', label: 'Full Name (as per Passport)', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'dlNumber', label: 'Valid Indian DL Number', type: 'text', required: true },
          { name: 'dlExpiryDate', label: 'DL Expiry Date', type: 'date', required: true },
          { name: 'passportNumber', label: 'Passport Number', type: 'text', placeholder: 'e.g. A1234567', required: true },
          { name: 'passportExpiry', label: 'Passport Expiry Date', type: 'date', required: true },
          { name: 'visaType', label: 'Visa Type', type: 'text', placeholder: 'e.g. Tourist, Work, Student', required: true },
          { name: 'destinationCountry', label: 'Destination Country', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'address', label: 'Permanent Address', type: 'textarea', required: true },
          { name: 'dlCopy', label: 'Upload Valid DL Copy', type: 'file', required: true },
          { name: 'passportCopy', label: 'Upload Passport Copy (first & last page)', type: 'file', required: true },
          { name: 'visaCopy', label: 'Upload Visa Copy', type: 'file', required: true },
          { name: 'airTicket', label: 'Upload Confirmed Air Ticket', type: 'file', required: false },
          { name: 'photo', label: 'Upload Passport-size Photographs', type: 'file', required: true },
          { name: 'medicalCert', label: 'Upload Medical Certificate (Form 1A)', type: 'file', required: true }
        ],
        requiredDocs: ['Application Form 4A (International Driving Permit)', 'Valid Indian Driving License', 'Valid Indian Passport (with min. 6 months validity)', 'Valid Visa for destination country', 'Confirmed air ticket (some RTOs require)', 'Medical Certificate (Form 1A)', 'Passport-size photographs (4 copies)', 'Note: IDP is valid for 1 year only']
      },
      { id: 'address-change', label: 'Change of Address', labelHi: 'पता परिवर्तन', iconName: 'MapPin', description: 'Update your address on the Driving License',
        formFields: [
          { name: 'fullName', label: 'Full Name (as per DL)', type: 'text', required: true },
          { name: 'dlNumber', label: 'DL Number', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'oldAddress', label: 'Old Address (as on DL)', type: 'textarea', required: true },
          { name: 'newAddress', label: 'New Address', type: 'textarea', placeholder: 'House No., Street, City, State, PIN', required: true },
          { name: 'addressProof', label: 'Upload New Address Proof', type: 'file', required: true },
          { name: 'dlCopy', label: 'Upload Current DL Copy', type: 'file', required: true }
        ],
        requiredDocs: ['Existing Driving License', 'Proof of New Address — Aadhaar / Utility bill / Rent agreement / Bank passbook', 'Passport-size photograph']
      },
      { id: 'add-endorsement', label: 'Add Vehicle Class (AEDL)', labelHi: 'वाहन श्रेणी जोड़ें', iconName: 'ListPlus', description: 'Add a new vehicle class endorsement to your existing DL',
        formFields: [
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'dlNumber', label: 'Existing DL Number', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'existingClass', label: 'Current Vehicle Class', type: 'select', required: true, options: ['MCWOG', 'MCWG', 'LMV', 'LMV-NT'] },
          { name: 'newClass', label: 'Additional Vehicle Class to Add', type: 'select', required: true, options: ['MCWG', 'LMV', 'LMV – Non Transport', 'HMV', 'HGMV', 'Transport'] },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'dlCopy', label: 'Upload Current DL Copy', type: 'file', required: true },
          { name: 'medicalCert', label: 'Upload Medical Certificate (Form 1A)', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Proof of Address', type: 'file', required: true },
          { name: 'photo', label: 'Upload Photograph', type: 'file', required: true }
        ],
        requiredDocs: ['Existing Driving License', 'Application for Additional Endorsement (AEDL)', 'Medical Certificate (Form 1A) — for HMV / Transport', 'Proof of Address', 'Passport-size photographs', 'Must pass driving test for new vehicle class at RTO']
      },
      { id: 'dl-extract', label: 'Extract of DL', labelHi: 'DL उद्धरण', iconName: 'FileOutput', description: 'Obtain a certified extract/printout of your Driving License',
        formFields: [
          { name: 'dlNumber', label: 'DL Number', type: 'text', placeholder: 'Enter your DL number', required: true },
          { name: 'fullName', label: 'Full Name (as per DL)', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'purpose', label: 'Purpose of Extract', type: 'select', required: true, options: ['Employment', 'Insurance', 'Legal Proceedings', 'Personal Records', 'Other'] }
        ],
        requiredDocs: ['DL Number', 'Proof of Identity — Aadhaar / Voter ID', 'Application for DL Extract']
      },
      { id: 'surrender-dl', label: 'Surrender DL', labelHi: 'DL सरेंडर', iconName: 'FileX', description: 'Surrender your Driving License upon cancellation or disqualification',
        formFields: [
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'dlNumber', label: 'DL Number to Surrender', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'reason', label: 'Reason for Surrender', type: 'select', required: true, options: ['Cancellation by Authority', 'Court Order / Disqualification', 'Voluntary Surrender', 'Obtained DL from Another Country'] },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'dlOriginal', label: 'Upload Original DL Copy', type: 'file', required: true },
          { name: 'courtOrder', label: 'Upload Court Order / Authority Letter (if applicable)', type: 'file', required: false },
          { name: 'idProof', label: 'Upload Proof of Identity', type: 'file', required: true }
        ],
        requiredDocs: ['Original Driving License', 'Court Order or Authority cancellation letter (if applicable)', 'Proof of Identity — Aadhaar / Voter ID / Passport', 'Application for Surrender of DL']
      }
    ],
    eligibility: ['Minimum age: 16 (geared motorcycle), 18 (car/commercial)', 'Must hold a valid Learner License', 'Must pass the driving test at RTO'],
    requiredDocs: ['Learner License', 'Proof of Age (Birth certificate, SSC marksheet)', 'Proof of Address (Aadhaar, Passport)', '6 passport-size photographs', 'Medical certificate (Form 1A)'],
    fees: '₹200 – ₹1,000 (varies by state and vehicle class)',
    processingTime: '7 – 30 days after test',
    steps: [
      { title: 'Get Learner License', desc: 'Apply for and obtain a Learner License (LL) first.' },
      { title: 'Practice Driving', desc: 'Wait minimum 30 days after LL issuance and practice driving.' },
      { title: 'Book DL Test Slot', desc: 'Book a test slot at your nearest RTO through the Parivahan portal.' },
      { title: 'Pass Driving Test', desc: 'Appear for the driving test at the RTO on the scheduled date.' },
      { title: 'Receive Smart Card DL', desc: 'Upon passing, your DL smart card will be dispatched to your address.' }
    ],
    faqs: [
      { question: 'Can I apply for DL online?', answer: 'Yes, you can fill the application form online on Parivahan (parivahan.gov.in), but the driving test must be taken in person at the RTO.' },
      { question: 'What is the validity of a DL?', answer: 'A Driving License is valid for 20 years from the date of issue or until the holder turns 50, whichever is earlier.' },
      { question: 'How to renew an expired DL?', answer: 'You can apply for renewal up to 1 year before or after expiry through the Parivahan portal or by visiting the RTO.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'llNumber', label: 'Learner License Number', type: 'text', placeholder: 'Your LL number', required: true },
      { name: 'vehicleClass', label: 'Vehicle Class', type: 'select', required: true, options: ['Two-Wheeler', 'Light Motor Vehicle (LMV)', 'Heavy Motor Vehicle (HMV)', 'Transport'] },
      { name: 'medicalCert', label: 'Upload Medical Certificate', type: 'file', required: true },
      { name: 'addressProof', label: 'Upload Address Proof', type: 'file', required: true }
    ]
  },
  {
    id: 'voter',
    title: 'Voter ID',
    titleHi: 'मतदाता पहचान पत्र',
    description: 'Identity document (EPIC) issued by the Election Commission of India for voting.',
    category: 'Identity',
    iconName: 'BadgeCheck',
    services: [
      { id: 'new-registration', label: 'New Registration (Form 6)', labelHi: 'नया पंजीकरण', iconName: 'UserPlus', description: 'Register as a new voter in the electoral roll',
        formFields: [
          { name: 'fullName', label: 'Full Name (as per ID proof)', type: 'text', placeholder: 'e.g. Anjali Verma', required: true },
          { name: 'relationType', label: 'Relation Type', type: 'select', required: true, options: ['Father', 'Mother', 'Husband'] },
          { name: 'relativeName', label: "Father's / Mother's / Husband's Name", type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Third Gender'] },
          { name: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: false },
          { name: 'address', label: 'Present Address', type: 'textarea', placeholder: 'House No., Street, Locality, City, District, State, PIN', required: true },
          { name: 'state', label: 'State / UT', type: 'select', required: true, options: ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'] },
          { name: 'constituency', label: 'Assembly Constituency', type: 'text', placeholder: 'Your area constituency', required: true },
          { name: 'pollingBooth', label: 'Polling Booth (if known)', type: 'text', placeholder: 'Optional', required: false },
          { name: 'aadhaarNumber', label: 'Aadhaar Number (optional)', type: 'text', placeholder: '12-digit Aadhaar (voluntary)', required: false },
          { name: 'photo', label: 'Upload Recent Passport-size Photograph', type: 'file', required: true },
          { name: 'ageProof', label: 'Upload Proof of Age', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Proof of Address', type: 'file', required: true }
        ],
        requiredDocs: ['Form 6 (New Voter Registration)', 'Proof of Age — Birth certificate / 10th marksheet / PAN / Passport / Aadhaar', 'Proof of Address — Aadhaar / Utility bill / Bank passbook / Rent agreement', 'Recent passport-size colour photograph (white background)', 'Aadhaar number (voluntary, for authentication)']
      },
      { id: 'correction', label: 'Correction (Form 8)', labelHi: 'सुधार', iconName: 'Edit', description: 'Correct your name, DOB, photo, or address on Voter ID',
        formFields: [
          { name: 'epicNumber', label: 'EPIC Number (Voter ID Number)', type: 'text', placeholder: 'e.g. ABC1234567', required: true },
          { name: 'fullName', label: 'Full Name (current on card)', type: 'text', required: true },
          { name: 'correctionField', label: 'Field to Correct', type: 'select', required: true, options: ['Name', 'Date of Birth', 'Gender', 'Address', 'Photo', 'Relative Name', 'EPIC Number Correction'] },
          { name: 'correctedValue', label: 'Corrected / New Value', type: 'text', placeholder: 'Enter the correct value', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'constituency', label: 'Assembly Constituency', type: 'text', required: true },
          { name: 'supportDoc', label: 'Upload Supporting Document for Correction', type: 'file', required: true },
          { name: 'photo', label: 'Upload Recent Photograph (if changing photo)', type: 'file', required: false }
        ],
        requiredDocs: ['Form 8 (Correction of Particulars)', 'Existing Voter ID (EPIC) card', 'Supporting document for correction — Name: Aadhaar/Passport; DOB: Birth cert/Marksheet; Address: Utility bill', 'Recent passport-size photograph (if photo correction)']
      },
      { id: 'transfer', label: 'Transfer / Shift (Form 8)', labelHi: 'स्थानांतरण', iconName: 'ArrowRightLeft', description: 'Transfer your voter registration when moving address',
        formFields: [
          { name: 'epicNumber', label: 'EPIC Number', type: 'text', required: true },
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'shiftType', label: 'Type of Shift', type: 'select', required: true, options: ['Within Same Constituency', 'To Different Constituency (Same State)', 'To Different State'] },
          { name: 'oldAddress', label: 'Old Address (as on Voter ID)', type: 'textarea', required: true },
          { name: 'newAddress', label: 'New Address', type: 'textarea', placeholder: 'House No., Street, Locality, City, State, PIN', required: true },
          { name: 'newConstituency', label: 'New Assembly Constituency', type: 'text', required: true },
          { name: 'newState', label: 'New State / UT', type: 'select', required: true, options: ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'] },
          { name: 'addressProof', label: 'Upload New Address Proof', type: 'file', required: true },
          { name: 'epicCopy', label: 'Upload Existing EPIC Copy', type: 'file', required: true }
        ],
        requiredDocs: ['Form 8 (Transposition / Shifting)', 'Existing Voter ID (EPIC) card', 'Proof of New Address — Aadhaar / Utility bill / Rent agreement / Bank passbook', 'Passport-size photograph']
      },
      { id: 'download-epic', label: 'Download e-EPIC', labelHi: 'ई-EPIC डाउनलोड', iconName: 'Download', description: 'Download a digital copy of your Voter ID card',
        formFields: [
          { name: 'searchBy', label: 'Search By', type: 'select', required: true, options: ['EPIC Number', 'Form Reference Number'] },
          { name: 'epicNumber', label: 'EPIC Number / Reference Number', type: 'text', placeholder: 'Enter your EPIC or reference number', required: true },
          { name: 'state', label: 'State / UT', type: 'select', required: true, options: ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'] },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', placeholder: 'OTP will be sent here', required: true }
        ],
        requiredDocs: ['EPIC Number or Form Reference Number', 'Registered mobile number for OTP verification', 'Note: e-EPIC is a digitally signed PDF available on voters.eci.gov.in']
      },
      { id: 'deletion', label: 'Deletion (Form 7)', labelHi: 'विलोपन', iconName: 'Trash2', description: 'Request deletion of a name from the electoral roll',
        formFields: [
          { name: 'applicantName', label: 'Applicant Name (person requesting deletion)', type: 'text', required: true },
          { name: 'applicantEpic', label: "Applicant's EPIC Number", type: 'text', required: true },
          { name: 'deletionName', label: 'Name to be Deleted', type: 'text', required: true },
          { name: 'deletionEpic', label: 'EPIC Number of Person to Delete', type: 'text', placeholder: 'If known', required: false },
          { name: 'reason', label: 'Reason for Deletion', type: 'select', required: true, options: ['Deceased', 'Shifted Permanently', 'Not Ordinarily Resident', 'Duplicate Entry', 'Other'] },
          { name: 'constituency', label: 'Assembly Constituency', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'supportDoc', label: 'Upload Supporting Document', type: 'file', required: true }
        ],
        requiredDocs: ['Form 7 (Objection for Inclusion / Deletion)', 'Death certificate (if deceased)', 'Proof that person has shifted (if applicable)', 'EPIC number of the person to be deleted (if available)']
      },
      { id: 'electoral-search', label: 'Electoral Roll Search', labelHi: 'मतदाता सूची खोजें', iconName: 'Search', description: 'Search your name in the electoral roll online via voters.eci.gov.in',
        formFields: [
          { name: 'searchType', label: 'Search By', type: 'select', required: true, options: ['Name Details', 'EPIC Number'] },
          { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter your name', required: true },
          { name: 'fatherName', label: "Father's / Husband's Name", type: 'text', required: false },
          { name: 'dob', label: 'Date of Birth / Age', type: 'date', required: false },
          { name: 'state', label: 'State / UT', type: 'select', required: true, options: ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'] },
          { name: 'constituency', label: 'Assembly Constituency', type: 'text', required: false }
        ],
        requiredDocs: ['Name and basic details OR EPIC number', 'State and constituency information', 'Note: Search at voters.eci.gov.in or Voter Helpline App']
      },
      { id: 'blo-details', label: 'BLO / ERO Details', labelHi: 'BLO / ERO विवरण', iconName: 'MapPin', description: 'Find your Booth Level Officer and Electoral Registration Officer',
        formFields: [
          { name: 'state', label: 'State / UT', type: 'select', required: true, options: ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'] },
          { name: 'constituency', label: 'Assembly Constituency', type: 'text', required: true },
          { name: 'epicNumber', label: 'EPIC Number (optional)', type: 'text', placeholder: 'Helps identify your polling booth', required: false }
        ],
        requiredDocs: ['State and Assembly Constituency information', 'EPIC number (optional, for booth-level identification)']
      },
      { id: 'overseas-voter', label: 'Overseas Registration (6A)', labelHi: 'विदेशी मतदाता पंजीकरण', iconName: 'Globe', description: 'Register as an overseas Indian voter using Form 6A',
        formFields: [
          { name: 'fullName', label: 'Full Name (as per Passport)', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Third Gender'] },
          { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
          { name: 'passportNumber', label: 'Indian Passport Number', type: 'text', required: true },
          { name: 'passportExpiry', label: 'Passport Expiry Date', type: 'date', required: true },
          { name: 'countryOfResidence', label: 'Country of Current Residence', type: 'text', required: true },
          { name: 'foreignAddress', label: 'Address Abroad', type: 'textarea', required: true },
          { name: 'indiaAddress', label: 'Last Address in India', type: 'textarea', placeholder: 'Your constituency address in India', required: true },
          { name: 'constituency', label: 'Assembly Constituency (India)', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: true },
          { name: 'passportCopy', label: 'Upload Indian Passport Copy', type: 'file', required: true },
          { name: 'photo', label: 'Upload Recent Photograph', type: 'file', required: true }
        ],
        requiredDocs: ['Form 6A (Overseas Voter Registration)', 'Valid Indian Passport', 'Proof of Indian address (last residential address)', 'Recent passport-size photograph', 'Note: Only Indian citizens residing abroad are eligible']
      }
    ],
    eligibility: ['Indian citizen', 'Minimum age: 18 years on qualifying date (Jan 1)', 'Resident of the constituency'],
    requiredDocs: ['Proof of Age (Birth certificate, Marksheet)', 'Proof of Address (Aadhaar, Utility bill)', 'Recent passport-size photograph'],
    fees: 'Free',
    processingTime: '15 – 30 days',
    steps: [
      { title: 'Fill Form 6 Online', desc: 'Fill the voter registration Form 6 on the NVSP portal.' },
      { title: 'Upload Documents', desc: 'Upload your photo, age proof, and address proof.' },
      { title: 'Submit Application', desc: 'Review and submit your application online.' },
      { title: 'BLO Verification', desc: 'A Booth Level Officer will visit your address for verification.' },
      { title: 'Receive Voter ID', desc: 'After verification, your EPIC card will be issued.' }
    ],
    faqs: [
      { question: 'Can I vote without a Voter ID?', answer: 'Yes, you can use other approved IDs like Aadhaar, Passport, or DL at the polling booth, but Voter ID is the primary document.' },
      { question: 'How to update details on Voter ID?', answer: 'Use Form 8 on the NVSP portal for corrections in name, address, photo, or other details.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'constituency', label: 'Constituency / Assembly', type: 'text', placeholder: 'Your area constituency', required: true },
      { name: 'photo', label: 'Upload Photograph', type: 'file', required: true },
      { name: 'ageProof', label: 'Upload Age Proof', type: 'file', required: true }
    ]
  },
  {
    id: 'passport',
    title: 'Passport',
    titleHi: 'पासपोर्ट',
    description: 'Travel document for international travel issued by the Government of India.',
    category: 'Identity',
    iconName: 'Plane',
    services: [
      { id: 'fresh-passport', label: 'Fresh Passport', labelHi: 'नया पासपोर्ट', iconName: 'FilePlus', description: 'Apply for a brand new Indian passport',
        formFields: [
          { name: 'applicationType', label: 'Application Type', type: 'select', required: true, options: ['Normal', 'Tatkal'] },
          { name: 'bookletType', label: 'Booklet Type', type: 'select', required: true, options: ['36 Pages', '60 Pages'] },
          { name: 'fullName', label: 'Full Name (Given Name)', type: 'text', placeholder: 'As per birth certificate / school records', required: true },
          { name: 'surname', label: 'Surname', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'placeOfBirth', label: 'Place of Birth', type: 'text', placeholder: 'City, District, State', required: true },
          { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Transgender'] },
          { name: 'maritalStatus', label: 'Marital Status', type: 'select', required: true, options: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'] },
          { name: 'fatherName', label: "Father's Full Name", type: 'text', required: true },
          { name: 'motherName', label: "Mother's Full Name", type: 'text', required: true },
          { name: 'spouseName', label: "Spouse's Name (if married)", type: 'text', required: false },
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar (mandatory)', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: true },
          { name: 'address', label: 'Present Residential Address', type: 'textarea', placeholder: 'House No., Street, City, District, State, PIN', required: true },
          { name: 'emergencyContact', label: 'Emergency Contact Name & Number', type: 'text', placeholder: 'Name — Mobile number', required: true },
          { name: 'ecrStatus', label: 'ECR / ECNR', type: 'select', required: true, options: ['ECR (Emigration Check Required)', 'ECNR (Not Required — 10th pass & above)'] },
          { name: 'dobProof', label: 'Upload Proof of Date of Birth', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Proof of Address', type: 'file', required: true },
          { name: 'idProof', label: 'Upload Proof of Identity', type: 'file', required: true },
          { name: 'photo', label: 'Upload Recent Photograph (white background)', type: 'file', required: true }
        ],
        requiredDocs: ['Proof of Date of Birth — Birth certificate (mandatory if born after 26/01/1989) / Marksheet / PAN', 'Proof of Address — Aadhaar / Voter ID / Utility bill / Bank statement / Rent agreement', 'Proof of Identity — Aadhaar / PAN / Voter ID', 'Aadhaar Card (mandatory for all applicants)', 'Recent passport-size photograph (white background, 3.5×3.5 cm)', 'Self-declaration in Annexure D/E (for government employees)']
      },
      { id: 'renewal', label: 'Passport Renewal', labelHi: 'पासपोर्ट नवीनीकरण', iconName: 'RefreshCw', description: 'Renew your expired or expiring passport',
        formFields: [
          { name: 'oldPassportNumber', label: 'Old Passport Number', type: 'text', placeholder: 'e.g. A1234567', required: true },
          { name: 'oldPassportIssueDate', label: 'Old Passport Issue Date', type: 'date', required: true },
          { name: 'oldPassportExpiryDate', label: 'Old Passport Expiry Date', type: 'date', required: true },
          { name: 'oldPassportIssuePlace', label: 'Place of Issue', type: 'text', required: true },
          { name: 'fullName', label: 'Full Name (as per old passport)', type: 'text', required: true },
          { name: 'surname', label: 'Surname', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: true },
          { name: 'address', label: 'Current Address', type: 'textarea', required: true },
          { name: 'bookletType', label: 'Booklet Type', type: 'select', required: true, options: ['36 Pages', '60 Pages'] },
          { name: 'oldPassportCopy', label: 'Upload Old Passport Copy (first & last 2 pages)', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Proof of Address', type: 'file', required: true },
          { name: 'photo', label: 'Upload Recent Photograph', type: 'file', required: true }
        ],
        requiredDocs: ['Original old passport', 'Self-attested photocopies of first 2 and last 2 pages of old passport (incl. ECR/ECNR & observation pages)', 'Proof of Address — Aadhaar / Utility bill / Voter ID', 'Aadhaar Card (mandatory)', 'Recent passport-size photograph']
      },
      { id: 'reissue', label: 'Re-issue Passport', labelHi: 'पासपोर्ट पुनः जारी', iconName: 'RotateCw', description: 'Re-issue for exhausted pages, lost/damaged, or name/address change',
        formFields: [
          { name: 'reissueReason', label: 'Reason for Re-issue', type: 'select', required: true, options: ['Exhausted Pages', 'Lost Passport', 'Damaged Passport', 'Change in Name', 'Change in Address', 'Change in Appearance', 'Change due to Marriage'] },
          { name: 'oldPassportNumber', label: 'Old Passport Number (if available)', type: 'text', placeholder: 'Enter if passport not lost', required: false },
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'newName', label: 'New Name (if name change)', type: 'text', required: false },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'firCopy', label: 'Upload FIR Copy (if lost/stolen)', type: 'file', required: false },
          { name: 'oldPassportCopy', label: 'Upload Old Passport Copy (if available)', type: 'file', required: false },
          { name: 'nameChangeProof', label: 'Upload Name Change Proof (if applicable)', type: 'file', required: false },
          { name: 'marriageCert', label: 'Upload Marriage Certificate (if applicable)', type: 'file', required: false },
          { name: 'addressProof', label: 'Upload Proof of Address', type: 'file', required: true },
          { name: 'photo', label: 'Upload Recent Photograph', type: 'file', required: true }
        ],
        requiredDocs: ['Original old passport (if not lost)', 'FIR copy (mandatory if lost/stolen)', 'Proof of Address — Aadhaar / Utility bill', 'Aadhaar Card', 'Name change proof — Gazette notification / Court order / Marriage certificate (if name change)', 'Recent passport-size photograph', 'Annexure F — Affidavit for lost passport (if applicable)']
      },
      { id: 'tatkal', label: 'Tatkal Passport', labelHi: 'तत्काल पासपोर्ट', iconName: 'Zap', description: 'Expedited passport processing (1-3 working days)',
        formFields: [
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'surname', label: 'Surname', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Transgender'] },
          { name: 'fatherName', label: "Father's Full Name", type: 'text', required: true },
          { name: 'motherName', label: "Mother's Full Name", type: 'text', required: true },
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: true },
          { name: 'address', label: 'Present Address', type: 'textarea', required: true },
          { name: 'urgencyReason', label: 'Reason for Urgency', type: 'textarea', placeholder: 'Explain why Tatkal is needed', required: true },
          { name: 'bookletType', label: 'Booklet Type', type: 'select', required: true, options: ['36 Pages', '60 Pages'] },
          { name: 'verificationDoc1', label: 'Upload Verification Document 1', type: 'file', required: true },
          { name: 'verificationDoc2', label: 'Upload Verification Document 2', type: 'file', required: true },
          { name: 'verificationDoc3', label: 'Upload Verification Document 3', type: 'file', required: true },
          { name: 'photo', label: 'Upload Recent Photograph', type: 'file', required: true }
        ],
        requiredDocs: ['Any 3 documents from: Aadhaar / PAN / Voter ID / DL / Birth Certificate / 10th Marksheet / Electricity bill / Water bill / ITR / Bank passbook', 'Aadhaar Card (mandatory)', 'Undertaking for Tatkal Scheme (signed at PSK)', 'Additional fee: ₹2,000 over normal fee', 'Note: Processing time 1–3 working days']
      },
      { id: 'pcc', label: 'Police Clearance (PCC)', labelHi: 'पुलिस क्लियरेंस', iconName: 'ShieldCheck', description: 'Obtain a Police Clearance Certificate for emigration',
        formFields: [
          { name: 'passportNumber', label: 'Passport Number', type: 'text', required: true },
          { name: 'passportIssueDate', label: 'Passport Issue Date', type: 'date', required: true },
          { name: 'fullName', label: 'Full Name (as per Passport)', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: true },
          { name: 'address', label: 'Current Address', type: 'textarea', required: true },
          { name: 'purpose', label: 'Purpose of PCC', type: 'select', required: true, options: ['Employment Abroad', 'Immigration / PR', 'Student Visa', 'Business', 'Other'] },
          { name: 'destinationCountry', label: 'Destination Country', type: 'text', required: true },
          { name: 'passportCopy', label: 'Upload Passport Copy (first & last 2 pages)', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Proof of Current Address', type: 'file', required: true },
          { name: 'purposeDoc', label: 'Upload Supporting Document (offer letter / visa / admission)', type: 'file', required: true }
        ],
        requiredDocs: ['Original Passport with self-attested copies (first & last 2 pages)', 'Proof of Current Address — Aadhaar / Utility bill', 'Supporting document for PCC purpose — Employment offer / Visa copy / Admission letter', 'Note: PCC is issued within 2–5 working days']
      },
      { id: 'surrender', label: 'Surrender Certificate', labelHi: 'समर्पण प्रमाणपत्र', iconName: 'FileX', description: 'Surrender your Indian passport upon acquiring foreign citizenship',
        formFields: [
          { name: 'indianPassportNumber', label: 'Indian Passport Number', type: 'text', required: true },
          { name: 'indianPassportIssueDate', label: 'Indian Passport Issue Date', type: 'date', required: true },
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'foreignCitizenship', label: 'Country of New Citizenship', type: 'text', required: true },
          { name: 'foreignPassportNumber', label: 'Foreign Passport Number', type: 'text', required: true },
          { name: 'dateOfNaturalization', label: 'Date of Naturalization / Citizenship Acquisition', type: 'date', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: true },
          { name: 'address', label: 'Current Address', type: 'textarea', required: true },
          { name: 'indianPassportCopy', label: 'Upload Original Indian Passport Copy', type: 'file', required: true },
          { name: 'foreignPassportCopy', label: 'Upload Foreign Passport Copy', type: 'file', required: true },
          { name: 'citizenshipCert', label: 'Upload Naturalization / Citizenship Certificate', type: 'file', required: true }
        ],
        requiredDocs: ['Original Indian Passport', 'Copy of Foreign Passport', 'Naturalization / Citizenship Certificate of the foreign country', 'Proof of Current Address', 'Note: Indian Passport must be surrendered within 3 years of acquiring foreign citizenship']
      },
      { id: 'track-status', label: 'Track Application', labelHi: 'आवेदन ट्रैक', iconName: 'Search', description: 'Track passport application status using ARN',
        formFields: [
          { name: 'searchBy', label: 'Track By', type: 'select', required: true, options: ['Application Reference Number (ARN)', 'File Number'] },
          { name: 'arnNumber', label: 'ARN / File Number', type: 'text', placeholder: 'Enter your application reference number', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true }
        ],
        requiredDocs: ['Application Reference Number (ARN) from passport application receipt', 'Date of Birth as provided in the application']
      },
      { id: 'slot-availability', label: 'Check Slot Availability', labelHi: 'स्लॉट उपलब्धता', iconName: 'CalendarDays', description: 'Check PSK/POPSK appointment slot availability online',
        formFields: [
          { name: 'state', label: 'State', type: 'select', required: true, options: ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'] },
          { name: 'pskType', label: 'Centre Type', type: 'select', required: true, options: ['Passport Seva Kendra (PSK)', 'Post Office Passport Seva Kendra (POPSK)', 'Passport Office (PO)'] },
          { name: 'appointmentDate', label: 'Preferred Appointment Date', type: 'date', required: true },
          { name: 'applicationType', label: 'Application Type', type: 'select', required: true, options: ['Normal – Fresh', 'Normal – Re-issue', 'Tatkal – Fresh', 'Tatkal – Re-issue', 'PCC'] }
        ],
        requiredDocs: ['Passport Seva account credentials', 'Note: Check slot availability on passportindia.gov.in after logging in']
      }
    ],
    eligibility: ['Indian citizen by birth / descent / registration / naturalization', 'No pending criminal proceedings (for normal passport)', 'Minors need parental consent'],
    requiredDocs: ['Proof of Address (Aadhaar, Utility bill)', 'Proof of Date of Birth (Birth certificate, Marksheet)', 'Aadhaar Card (mandatory)', 'Old Passport (for renewal)'],
    fees: '₹1,500 (36 pages); ₹2,000 (60 pages); Tatkal: +₹2,000 extra',
    processingTime: 'Normal: 30 – 45 days; Tatkal: 1 – 3 days',
    steps: [
      { title: 'Register on Passport Seva', desc: 'Create an account on the Passport Seva portal.' },
      { title: 'Fill Application Form', desc: 'Fill the online application form with personal and family details.' },
      { title: 'Pay Fees Online', desc: 'Pay the applicable fee through online payment modes.' },
      { title: 'Book Appointment', desc: 'Schedule an appointment at the nearest Passport Seva Kendra (PSK).' },
      { title: 'Visit PSK & Police Verification', desc: 'Visit the PSK for document verification and biometrics. Police verification follows.' }
    ],
    faqs: [
      { question: 'What is a Tatkal passport?', answer: 'Tatkal is an expedited service for urgent passport needs. It costs an additional ₹2,000 and is usually processed within 1-3 working days.' },
      { question: 'Can I track my passport application?', answer: 'Yes, use your Application Reference Number (ARN) on the Passport Seva portal to track status.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar number', required: true },
      { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
      { name: 'motherName', label: "Mother's Name", type: 'text', required: true },
      { name: 'passportType', label: 'Passport Type', type: 'select', required: true, options: ['Normal', 'Tatkal'] },
      { name: 'bookletPages', label: 'Booklet Pages', type: 'select', required: true, options: ['36 Pages', '60 Pages'] },
      { name: 'dobProof', label: 'Upload DOB Proof', type: 'file', required: true }
    ]
  },
  {
    id: 'ration',
    title: 'Ration Card',
    titleHi: 'राशन कार्ड',
    description: 'Document for subsidized food grains and fuel under PDS.',
    category: 'Welfare',
    iconName: 'ShoppingCart',
    services: [
      { id: 'new-card', label: 'New Ration Card', labelHi: 'नया राशन कार्ड', iconName: 'FilePlus', description: 'Apply for a new ration card for your household',
        formFields: [
          { name: 'hofName', label: 'Head of Family Name', type: 'text', placeholder: 'As per Aadhaar', required: true },
          { name: 'hofAadhaar', label: "Head of Family's Aadhaar Number", type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'dob', label: 'Date of Birth (Head of Family)', type: 'date', required: true },
          { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Transgender'] },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: false },
          { name: 'address', label: 'Full Residential Address', type: 'textarea', placeholder: 'House No., Street, Village/Town, District, State, PIN', required: true },
          { name: 'state', label: 'State / UT', type: 'select', required: true, options: ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'] },
          { name: 'familyMembers', label: 'Number of Family Members', type: 'select', required: true, options: ['1', '2', '3', '4', '5', '6', '7', '8+'] },
          { name: 'cardCategory', label: 'Category Applied For', type: 'select', required: true, options: ['APL (Above Poverty Line)', 'BPL (Below Poverty Line)', 'AAY (Antyodaya Anna Yojana)', 'PHH (Priority Household)'] },
          { name: 'annualIncome', label: 'Annual Family Income (₹)', type: 'text', placeholder: 'e.g. 80000', required: true },
          { name: 'hofAadhaarDoc', label: "Upload Head of Family's Aadhaar", type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Proof of Address', type: 'file', required: true },
          { name: 'incomeCert', label: 'Upload Income Certificate', type: 'file', required: true },
          { name: 'hofPhoto', label: 'Upload Photograph of Head of Family', type: 'file', required: true }
        ],
        requiredDocs: ['Aadhaar Card of Head of Family (mandatory)', 'Aadhaar cards of all family members', 'Proof of Address — Utility bill / Voter ID / Rent agreement', 'Income Certificate from Tehsildar/SDM', 'Passport-size photographs of all family members', 'Self-declaration that family does not hold another ration card']
      },
      { id: 'add-remove-member', label: 'Add / Remove Member', labelHi: 'सदस्य जोड़ें/हटाएँ', iconName: 'Users', description: 'Add or remove family members from existing ration card',
        formFields: [
          { name: 'rationCardNumber', label: 'Ration Card Number', type: 'text', required: true },
          { name: 'hofName', label: 'Head of Family Name', type: 'text', required: true },
          { name: 'actionType', label: 'Action', type: 'select', required: true, options: ['Add Member', 'Remove Member'] },
          { name: 'memberName', label: 'Member Name (to Add/Remove)', type: 'text', required: true },
          { name: 'memberAadhaar', label: "Member's Aadhaar Number", type: 'text', required: true },
          { name: 'memberDob', label: "Member's Date of Birth", type: 'date', required: true },
          { name: 'relation', label: 'Relation to Head of Family', type: 'select', required: true, options: ['Spouse', 'Son', 'Daughter', 'Father', 'Mother', 'Brother', 'Sister', 'Other'] },
          { name: 'reason', label: 'Reason', type: 'select', required: true, options: ['Birth', 'Marriage', 'Death', 'Migration', 'Divorce', 'Other'] },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'supportDoc', label: 'Upload Supporting Document', type: 'file', required: true },
          { name: 'memberAadhaarDoc', label: "Upload Member's Aadhaar Card", type: 'file', required: true }
        ],
        requiredDocs: ['Existing Ration Card', "Member's Aadhaar Card", 'Birth Certificate (if adding newborn)', 'Marriage Certificate (if adding spouse)', 'Death Certificate (if removing deceased member)', 'Migration Certificate (if applicable)']
      },
      { id: 'correction', label: 'Correction / Update', labelHi: 'सुधार / अपडेट', iconName: 'Edit', description: 'Correct name, address, or other details on ration card',
        formFields: [
          { name: 'rationCardNumber', label: 'Ration Card Number', type: 'text', required: true },
          { name: 'hofName', label: 'Head of Family Name', type: 'text', required: true },
          { name: 'correctionField', label: 'Field to Correct', type: 'select', required: true, options: ['Name of Member', 'Address', 'Date of Birth', 'Gender', 'Aadhaar Number', 'Mobile Number'] },
          { name: 'currentValue', label: 'Current Value (incorrect)', type: 'text', required: true },
          { name: 'correctedValue', label: 'Corrected Value', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'supportDoc', label: 'Upload Supporting Document', type: 'file', required: true }
        ],
        requiredDocs: ['Existing Ration Card', 'Supporting document for correction — Aadhaar / Birth certificate / Utility bill', 'Application for correction addressed to Food Inspector']
      },
      { id: 'duplicate', label: 'Duplicate Card', labelHi: 'डुप्लीकेट कार्ड', iconName: 'Copy', description: 'Apply for a duplicate if your card is lost or damaged',
        formFields: [
          { name: 'rationCardNumber', label: 'Ration Card Number', type: 'text', required: true },
          { name: 'hofName', label: 'Head of Family Name', type: 'text', required: true },
          { name: 'reason', label: 'Reason for Duplicate', type: 'select', required: true, options: ['Lost', 'Damaged / Torn', 'Stolen'] },
          { name: 'hofAadhaar', label: "Head of Family's Aadhaar Number", type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'firCopy', label: 'Upload FIR Copy (if lost/stolen)', type: 'file', required: false },
          { name: 'affidavit', label: 'Upload Affidavit / Self-Declaration', type: 'file', required: true },
          { name: 'hofAadhaarDoc', label: "Upload Head of Family's Aadhaar", type: 'file', required: true }
        ],
        requiredDocs: ['Ration Card Number', "Head of Family's Aadhaar Card", 'FIR copy (if lost/stolen)', 'Affidavit / Self-declaration on stamp paper', 'Passport-size photograph of Head of Family']
      },
      { id: 'surrender', label: 'Surrender Card', labelHi: 'कार्ड सरेंडर', iconName: 'FileX', description: 'Surrender your ration card if no longer eligible',
        formFields: [
          { name: 'rationCardNumber', label: 'Ration Card Number', type: 'text', required: true },
          { name: 'hofName', label: 'Head of Family Name', type: 'text', required: true },
          { name: 'reason', label: 'Reason for Surrender', type: 'select', required: true, options: ['No Longer Eligible', 'Migration to Another State', 'Income Exceeds Limit', 'Duplicate Card', 'Voluntary Surrender'] },
          { name: 'hofAadhaar', label: "Head of Family's Aadhaar Number", type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'rationCardDoc', label: 'Upload Ration Card Copy', type: 'file', required: true }
        ],
        requiredDocs: ['Original Ration Card', "Head of Family's Aadhaar Card", 'Application for surrender addressed to Food Inspector / Supply Officer']
      },
      { id: 'onorc', label: 'ONORC Portability', labelHi: 'ONORC पोर्टेबिलिटी', iconName: 'Globe', description: 'Use One Nation One Ration Card for inter-state portability',
        formFields: [
          { name: 'rationCardNumber', label: 'Ration Card Number', type: 'text', required: true },
          { name: 'hofName', label: 'Head of Family Name', type: 'text', required: true },
          { name: 'hofAadhaar', label: "Head of Family's Aadhaar Number", type: 'text', placeholder: 'Must be seeded to ration card', required: true },
          { name: 'homeState', label: 'Home State (where card was issued)', type: 'select', required: true, options: ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'] },
          { name: 'currentState', label: 'Current State of Residence', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true }
        ],
        requiredDocs: ['Ration Card with Aadhaar seeding (all members linked)', "Aadhaar card of the member drawing rations", 'Note: ONORC uses Aadhaar-based biometric authentication at e-PoS machines', 'No additional documents needed — portability is automatic if Aadhaar is seeded']
      },
      { id: 'category-change', label: 'Category Change', labelHi: 'श्रेणी परिवर्तन', iconName: 'ArrowUpDown', description: 'Apply to change ration card category (APL/BPL/AAY)',
        formFields: [
          { name: 'rationCardNumber', label: 'Ration Card Number', type: 'text', required: true },
          { name: 'hofName', label: 'Head of Family Name', type: 'text', required: true },
          { name: 'currentCategory', label: 'Current Category', type: 'select', required: true, options: ['APL', 'BPL', 'AAY', 'PHH'] },
          { name: 'requestedCategory', label: 'Requested New Category', type: 'select', required: true, options: ['APL', 'BPL', 'AAY', 'PHH'] },
          { name: 'annualIncome', label: 'Annual Family Income (₹)', type: 'text', required: true },
          { name: 'reason', label: 'Reason for Category Change', type: 'textarea', placeholder: 'Explain why category change is needed', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'incomeCert', label: 'Upload Income Certificate', type: 'file', required: true },
          { name: 'rationCardCopy', label: 'Upload Ration Card Copy', type: 'file', required: true }
        ],
        requiredDocs: ['Existing Ration Card', 'Updated Income Certificate from Tehsildar/SDM', 'Caste Certificate (if applicable for AAY/PHH)', 'Application for category change']
      },
      { id: 'download-ecard', label: 'Download e-Ration Card', labelHi: 'ई-राशन कार्ड डाउनलोड', iconName: 'Download', description: 'Download the digital copy of your ration card online',
        formFields: [
          { name: 'rationCardNumber', label: 'Ration Card Number', type: 'text', required: true },
          { name: 'hofAadhaar', label: "Head of Family's Aadhaar Number", type: 'text', required: true },
          { name: 'state', label: 'State / UT', type: 'select', required: true, options: ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'] },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', placeholder: 'OTP will be sent here', required: true }
        ],
        requiredDocs: ['Ration Card Number', "Head of Family's Aadhaar Number", 'Registered mobile number for OTP', 'Note: Download from your state PDS portal or Mera Ration app']
      }
    ],
    eligibility: ['Any Indian household', 'Family must not already hold a ration card', 'Applicable for APL, BPL, and AAY categories'],
    requiredDocs: ['Proof of Identity of head of family (Aadhaar, Voter ID)', 'Proof of Address (Utility bill)', 'Income Certificate', 'Family member Aadhaar cards', 'Passport-size photos of all members'],
    fees: '₹5 – ₹45 (varies by state)',
    processingTime: '15 – 30 days',
    steps: [
      { title: 'Apply Online/Offline', desc: 'Apply via your state Food & Civil Supplies portal or at the Tehsil office.' },
      { title: 'Submit Family Details', desc: 'Provide details of all family members with their Aadhaar numbers.' },
      { title: 'Upload Documents', desc: 'Upload income certificate, address proof, and member photos.' },
      { title: 'Field Verification', desc: 'An official may visit your address for verification.' },
      { title: 'Receive Ration Card', desc: 'After approval, the ration card is issued (physical or e-Ration Card).' }
    ],
    faqs: [
      { question: 'What is the difference between APL and BPL?', answer: 'APL (Above Poverty Line) and BPL (Below Poverty Line) categories determine the subsidy level. BPL families get more subsidized grains.' },
      { question: 'Can I use my ration card in another state?', answer: 'Yes, under the One Nation One Ration Card (ONORC) scheme, you can use your ration card across India.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'familyMembers', label: 'Number of Family Members', type: 'select', required: true, options: ['1', '2', '3', '4', '5', '6', '7', '8+'] },
      { name: 'income', label: 'Annual Family Income (₹)', type: 'text', placeholder: 'e.g., 120000', required: true },
      { name: 'incomeCert', label: 'Upload Income Certificate', type: 'file', required: true }
    ]
  },
  {
    id: 'birth',
    title: 'Birth Certificate',
    titleHi: 'जन्म प्रमाण पत्र',
    description: 'Official record of birth issued by local municipal authorities.',
    category: 'Identity',
    iconName: 'Baby',
    services: [
      { id: 'new-registration', label: 'New Registration', labelHi: 'नया पंजीकरण', iconName: 'FilePlus', description: 'Register a birth within 21 days (free of charge)',
        formFields: [
          { name: 'childName', label: "Child's Name (if decided)", type: 'text', placeholder: 'Leave blank if not yet decided', required: false },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'] },
          { name: 'placeOfBirth', label: 'Place of Birth', type: 'select', required: true, options: ['Hospital / Institution', 'Home', 'Other'] },
          { name: 'hospitalName', label: 'Hospital / Institution Name', type: 'text', placeholder: 'Name of hospital or birth place', required: true },
          { name: 'fatherName', label: "Father's Full Name", type: 'text', required: true },
          { name: 'fatherAadhaar', label: "Father's Aadhaar Number", type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'motherName', label: "Mother's Full Name", type: 'text', required: true },
          { name: 'motherAadhaar', label: "Mother's Aadhaar Number", type: 'text', required: true },
          { name: 'address', label: 'Permanent Address of Parents', type: 'textarea', placeholder: 'House No., Street, City, District, State, PIN', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: false },
          { name: 'religion', label: 'Religion of Father', type: 'text', required: false },
          { name: 'informantName', label: 'Informant Name (person reporting birth)', type: 'text', required: true },
          { name: 'hospitalSlip', label: 'Upload Hospital Discharge Slip / Birth Report', type: 'file', required: true },
          { name: 'parentId', label: "Upload Parents' Aadhaar Cards", type: 'file', required: true },
          { name: 'marriageCert', label: 'Upload Marriage Certificate of Parents', type: 'file', required: false }
        ],
        requiredDocs: ['Hospital discharge slip / Birth report from institution', "Parents' Aadhaar cards", 'Marriage certificate of parents', 'Proof of Address of parents', 'Note: Registration within 21 days is FREE']
      },
      { id: 'delayed-registration', label: 'Delayed Registration', labelHi: 'विलंबित पंजीकरण', iconName: 'Clock', description: 'Register a birth after 21 days with affidavit and magistrate order',
        formFields: [
          { name: 'childName', label: "Child's Full Name", type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'] },
          { name: 'placeOfBirth', label: 'Place of Birth', type: 'text', required: true },
          { name: 'fatherName', label: "Father's Full Name", type: 'text', required: true },
          { name: 'motherName', label: "Mother's Full Name", type: 'text', required: true },
          { name: 'address', label: 'Permanent Address', type: 'textarea', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'delayPeriod', label: 'Delay Period', type: 'select', required: true, options: ['21 days – 30 days', '30 days – 1 year', 'More than 1 year'] },
          { name: 'reasonForDelay', label: 'Reason for Delay', type: 'textarea', placeholder: 'Explain why birth was not registered in time', required: true },
          { name: 'hospitalSlip', label: 'Upload Birth Proof (Hospital slip / Vaccination card)', type: 'file', required: true },
          { name: 'affidavit', label: 'Upload Notarized Affidavit', type: 'file', required: true },
          { name: 'magistrateOrder', label: 'Upload Magistrate Order (if >1 year delay)', type: 'file', required: false },
          { name: 'parentId', label: "Upload Parents' ID Proof", type: 'file', required: true }
        ],
        requiredDocs: ['Birth proof — Hospital discharge slip / Vaccination card / School record', 'Notarized affidavit declaring birth details and reason for delay', 'Magistrate / SDM order (mandatory if delay > 1 year)', "Parents' Aadhaar cards", 'Late registration fee receipt', 'Proof of Address']
      },
      { id: 'correction', label: 'Correction', labelHi: 'सुधार', iconName: 'Edit', description: 'Correct errors in name, DOB, or parent details',
        formFields: [
          { name: 'registrationNumber', label: 'Birth Registration Number', type: 'text', required: true },
          { name: 'registrationDate', label: 'Date of Registration', type: 'date', required: true },
          { name: 'childName', label: "Child's Name (current on certificate)", type: 'text', required: true },
          { name: 'correctionField', label: 'Field to Correct', type: 'select', required: true, options: ["Child's Name", 'Date of Birth', "Father's Name", "Mother's Name", 'Place of Birth', 'Gender', 'Address'] },
          { name: 'currentValue', label: 'Current (incorrect) Value', type: 'text', required: true },
          { name: 'correctedValue', label: 'Correct Value', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'supportDoc', label: 'Upload Supporting Document', type: 'file', required: true },
          { name: 'originalCert', label: 'Upload Original Birth Certificate', type: 'file', required: true }
        ],
        requiredDocs: ['Original Birth Certificate', 'Supporting document — School marksheet / Aadhaar / Passport / Affidavit', 'Application addressed to Registrar for correction', 'Newspaper advertisement (for major name changes, some states)']
      },
      { id: 'duplicate', label: 'Duplicate Certificate', labelHi: 'डुप्लीकेट प्रमाणपत्र', iconName: 'Copy', description: 'Obtain a duplicate if the original is lost or damaged',
        formFields: [
          { name: 'childName', label: "Child's Full Name", type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'registrationNumber', label: 'Registration Number (if known)', type: 'text', required: false },
          { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
          { name: 'motherName', label: "Mother's Name", type: 'text', required: true },
          { name: 'placeOfBirth', label: 'Place of Birth', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'reason', label: 'Reason for Duplicate', type: 'select', required: true, options: ['Lost', 'Damaged', 'Stolen'] },
          { name: 'affidavit', label: 'Upload Affidavit / Self-Declaration', type: 'file', required: true },
          { name: 'idProof', label: 'Upload Applicant ID Proof', type: 'file', required: true }
        ],
        requiredDocs: ['Affidavit declaring loss/damage of original', 'Registration number (if available)', "Applicant's ID proof — Aadhaar / Voter ID", 'Duplicate certificate fee receipt']
      },
      { id: 'name-inclusion', label: 'Name Inclusion', labelHi: 'नाम शामिल करें', iconName: 'UserPlus', description: "Add the child's name if it was not included at the time of registration",
        formFields: [
          { name: 'registrationNumber', label: 'Birth Registration Number', type: 'text', required: true },
          { name: 'childName', label: "Child's Name to be Included", type: 'text', placeholder: 'Full name of child', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
          { name: 'motherName', label: "Mother's Name", type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'originalCert', label: 'Upload Original Birth Certificate', type: 'file', required: true },
          { name: 'schoolRecord', label: 'Upload School Admission Record (if applicable)', type: 'file', required: false },
          { name: 'affidavit', label: 'Upload Affidavit for Name Inclusion', type: 'file', required: true }
        ],
        requiredDocs: ['Original Birth Certificate (without name)', 'Affidavit declaring the name to be included', 'School admission record / Naming ceremony document (if applicable)', "Parents' ID proof", 'Note: Free within 12 months of registration; fee applicable after']
      },
      { id: 'non-availability', label: 'Non-Availability Certificate', labelHi: 'अनुपलब्धता प्रमाणपत्र', iconName: 'FileQuestion', description: 'Get a certificate stating birth was not registered in records',
        formFields: [
          { name: 'applicantName', label: "Applicant's Full Name", type: 'text', required: true },
          { name: 'personName', label: 'Name of Person (whose birth record is sought)', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth (approximate)', type: 'date', required: true },
          { name: 'placeOfBirth', label: 'Place of Birth', type: 'text', required: true },
          { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
          { name: 'motherName', label: "Mother's Name", type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'purpose', label: 'Purpose of Certificate', type: 'select', required: true, options: ['Passport Application', 'Visa / Immigration', 'School Admission', 'Legal Proceedings', 'Other'] },
          { name: 'affidavit', label: 'Upload Affidavit declaring non-availability', type: 'file', required: true },
          { name: 'idProof', label: "Upload Applicant's ID Proof", type: 'file', required: true }
        ],
        requiredDocs: ['Affidavit declaring that birth record is not available in official records', "Applicant's ID Proof — Aadhaar / Voter ID / Passport", 'Application addressed to local Registrar', 'Fee receipt for NABC']
      },
      { id: 'search-record', label: 'Search Birth Record', labelHi: 'जन्म रिकॉर्ड खोजें', iconName: 'Search', description: 'Search for a birth record in the CRS database online',
        formFields: [
          { name: 'searchType', label: 'Search By', type: 'select', required: true, options: ['Registration Number', 'Name and Date of Birth'] },
          { name: 'registrationNumber', label: 'Registration Number (if known)', type: 'text', required: false },
          { name: 'childName', label: "Child's Name", type: 'text', required: false },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'state', label: 'State / UT', type: 'select', required: true, options: ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'] },
          { name: 'district', label: 'District', type: 'text', required: true }
        ],
        requiredDocs: ['Registration Number or Name + Date of Birth', 'State and District information', 'Note: Search at crsorgi.gov.in or your state CRS portal']
      }
    ],
    eligibility: ['Any child born in India', 'Registration within 21 days is free', 'Late registration requires additional affidavit'],
    requiredDocs: ['Hospital discharge slip / Birth report', 'Parents Aadhaar cards', 'Marriage certificate of parents', 'Proof of Address'],
    fees: '₹0 (within 21 days); ₹10 – ₹100 (late registration, varies by state)',
    processingTime: '7 – 15 days',
    steps: [
      { title: 'Report Birth', desc: 'Report the birth at the hospital or municipal corporation within 21 days.' },
      { title: 'Fill Registration Form', desc: 'Fill the birth registration form online or at the registrar office.' },
      { title: 'Submit Documents', desc: 'Submit the hospital discharge slip and parent identity documents.' },
      { title: 'Collect Certificate', desc: 'Collect the birth certificate from the registrar after processing.' }
    ],
    faqs: [
      { question: 'What if birth was not registered?', answer: 'Late registration (after 21 days) requires an affidavit, a magistrate order (after 1 year), and additional documents.' },
      { question: 'Can I get a birth certificate online?', answer: 'Many states now offer online birth certificate registration and download through their e-district portals.' }
    ],
    formFields: [
      { name: 'childName', label: "Child's Name", type: 'text', placeholder: 'Full name of child', required: true },
      { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
      { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'] },
      { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
      { name: 'motherName', label: "Mother's Name", type: 'text', required: true },
      { name: 'hospitalName', label: 'Hospital / Place of Birth', type: 'text', placeholder: 'Hospital name or home address', required: true },
      { name: 'address', label: 'Permanent Address', type: 'textarea', placeholder: 'Full address', required: true },
      { name: 'hospitalSlip', label: 'Upload Hospital Discharge Slip', type: 'file', required: true }
    ]
  },
  {
    id: 'income',
    title: 'Income Certificate',
    titleHi: 'आय प्रमाण पत्र',
    description: 'Certificate of annual income issued by the revenue department.',
    category: 'Finance',
    iconName: 'IndianRupee',
    services: [
      { id: 'new-application', label: 'New Application', labelHi: 'नया आवेदन', iconName: 'FilePlus', description: 'Apply for a new income certificate from the revenue department',
        formFields: [
          { name: 'fullName', label: 'Full Name (as per Aadhaar)', type: 'text', required: true },
          { name: 'fatherName', label: "Father's / Husband's Name", type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Transgender'] },
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: false },
          { name: 'address', label: 'Full Residential Address', type: 'textarea', placeholder: 'House No., Street, Village/Town, District, State, PIN', required: true },
          { name: 'state', label: 'State / UT', type: 'select', required: true, options: ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'] },
          { name: 'occupation', label: 'Occupation', type: 'select', required: true, options: ['Salaried (Government)', 'Salaried (Private)', 'Self-Employed', 'Business', 'Agriculture', 'Daily Wage', 'Student', 'Unemployed', 'Pensioner'] },
          { name: 'annualIncome', label: 'Annual Income from All Sources (₹)', type: 'text', placeholder: 'e.g. 250000', required: true },
          { name: 'incomeBreakdown', label: 'Income Breakdown (if multiple sources)', type: 'textarea', placeholder: 'Salary: ₹__; Agriculture: ₹__; Business: ₹__', required: false },
          { name: 'purpose', label: 'Purpose of Certificate', type: 'select', required: true, options: ['Scholarship', 'Fee Waiver / Concession', 'Government Scheme / Subsidy', 'Ration Card', 'EWS Certificate', 'Legal Proceedings', 'Other'] },
          { name: 'idProof', label: 'Upload Proof of Identity (Aadhaar)', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Proof of Address', type: 'file', required: true },
          { name: 'incomeProof', label: 'Upload Income Proof (Salary slip / ITR / Self-declaration)', type: 'file', required: true },
          { name: 'photo', label: 'Upload Recent Photograph', type: 'file', required: true }
        ],
        requiredDocs: ['Proof of Identity — Aadhaar Card (mandatory in most states)', 'Proof of Address — Aadhaar / Utility bill / Voter ID', 'Income Proof — Salary slip / Form 16 / ITR / Self-declaration affidavit', 'Ration Card (if available)', 'Recent passport-size photograph', 'Note: Self-employed applicants need a notarized self-declaration affidavit']
      },
      { id: 'renewal', label: 'Renewal', labelHi: 'नवीनीकरण', iconName: 'RefreshCw', description: 'Renew your expired income certificate (typically valid for 1 year)',
        formFields: [
          { name: 'previousCertNumber', label: 'Previous Certificate Number', type: 'text', required: true },
          { name: 'previousIssueDate', label: 'Previous Issue Date', type: 'date', required: true },
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'address', label: 'Current Address', type: 'textarea', required: true },
          { name: 'annualIncome', label: 'Current Annual Income (₹)', type: 'text', required: true },
          { name: 'occupation', label: 'Occupation', type: 'select', required: true, options: ['Salaried', 'Self-Employed', 'Business', 'Agriculture', 'Student', 'Unemployed'] },
          { name: 'previousCert', label: 'Upload Previous Income Certificate', type: 'file', required: true },
          { name: 'incomeProof', label: 'Upload Updated Income Proof', type: 'file', required: true },
          { name: 'idProof', label: 'Upload ID Proof (Aadhaar)', type: 'file', required: true }
        ],
        requiredDocs: ['Previous Income Certificate copy', 'Updated income proof — Salary slip / ITR / Self-declaration', 'Aadhaar Card', 'Note: Income certificates are typically valid for 6 months to 1 year']
      },
      { id: 'correction', label: 'Correction', labelHi: 'सुधार', iconName: 'Edit', description: 'Correct errors in your existing income certificate',
        formFields: [
          { name: 'certNumber', label: 'Certificate Number', type: 'text', required: true },
          { name: 'issueDate', label: 'Issue Date', type: 'date', required: true },
          { name: 'fullName', label: 'Full Name (as on certificate)', type: 'text', required: true },
          { name: 'correctionField', label: 'Field to Correct', type: 'select', required: true, options: ['Name', 'Father Name', 'Address', 'Income Amount', 'Date of Birth', 'Occupation'] },
          { name: 'currentValue', label: 'Current (incorrect) Value', type: 'text', required: true },
          { name: 'correctedValue', label: 'Correct Value', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'originalCert', label: 'Upload Original Certificate', type: 'file', required: true },
          { name: 'supportDoc', label: 'Upload Supporting Document', type: 'file', required: true }
        ],
        requiredDocs: ['Original Income Certificate', 'Supporting document for correction — Aadhaar / Salary slip / Birth certificate', 'Application for correction addressed to Tehsildar/SDM']
      },
      { id: 'verify', label: 'Verify Certificate', labelHi: 'प्रमाणपत्र सत्यापन', iconName: 'ShieldCheck', description: 'Verify the authenticity of an income certificate online',
        formFields: [
          { name: 'certNumber', label: 'Certificate Number', type: 'text', required: true },
          { name: 'issueDate', label: 'Issue Date', type: 'date', required: true },
          { name: 'applicantName', label: 'Applicant Name (as on certificate)', type: 'text', required: false },
          { name: 'state', label: 'Issuing State', type: 'select', required: true, options: ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'] }
        ],
        requiredDocs: ['Certificate Number', 'Issue Date', 'Note: Verify on your state e-District portal or UMANG app']
      },
      { id: 'download-cert', label: 'Download Certificate', labelHi: 'प्रमाणपत्र डाउनलोड', iconName: 'Download', description: 'Download digitally signed income certificate from e-district portal',
        formFields: [
          { name: 'applicationNumber', label: 'Application / Certificate Number', type: 'text', required: true },
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', placeholder: 'OTP will be sent', required: true },
          { name: 'state', label: 'State / UT', type: 'select', required: true, options: ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'] }
        ],
        requiredDocs: ['Application / Certificate Number', 'Aadhaar Number', 'Registered mobile number for OTP', 'Note: Download from state e-District portal']
      }
    ],
    eligibility: ['Any Indian resident', 'Required for scholarships, fee waivers, subsidies', 'Issued by Tehsildar / SDM office'],
    requiredDocs: ['Proof of Identity (Aadhaar)', 'Salary slip or employer certificate', 'Self-declaration of income', 'Ration Card (if available)', 'Proof of Address'],
    fees: '₹10 – ₹50 (varies by state)',
    processingTime: '7 – 15 days',
    steps: [
      { title: 'Apply Online', desc: 'Apply through your state e-district portal with login credentials.' },
      { title: 'Fill Income Details', desc: 'Declare your income from all sources with supporting documents.' },
      { title: 'Upload Documents', desc: 'Upload salary slips, bank statements, or self-declaration affidavit.' },
      { title: 'Pay Fees', desc: 'Pay the nominal processing fee online.' },
      { title: 'Download Certificate', desc: 'Once verified, download the digitally signed certificate.' }
    ],
    faqs: [
      { question: 'How long is an income certificate valid?', answer: 'Typically valid for 1 year (varies by state). You need to reapply annually.' },
      { question: 'Can self-employed people get it?', answer: 'Yes, self-employed individuals can get it via self-declaration affidavit.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'occupation', label: 'Occupation', type: 'select', required: true, options: ['Salaried', 'Self-Employed', 'Business', 'Agriculture', 'Student', 'Unemployed'] },
      { name: 'annualIncome', label: 'Annual Income (₹)', type: 'text', placeholder: 'e.g., 250000', required: true },
      { name: 'salarySlip', label: 'Upload Salary Slip / Declaration', type: 'file', required: true }
    ]
  },
  {
    id: 'caste',
    title: 'Caste Certificate',
    titleHi: 'जाति प्रमाण पत्र',
    description: 'Certificate verifying caste for reservation and welfare benefits.',
    category: 'Welfare',
    iconName: 'ScrollText',
    services: [
      { id: 'new-application', label: 'New Application', labelHi: 'नया आवेदन', iconName: 'FilePlus', description: 'Apply for a new caste certificate from SDM/Tehsildar office',
        formFields: [
          { name: 'fullName', label: 'Full Name (as per Aadhaar)', type: 'text', required: true },
          { name: 'fatherName', label: "Father's Full Name", type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Transgender'] },
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: false },
          { name: 'address', label: 'Full Residential Address', type: 'textarea', placeholder: 'House No., Street, Village/Town, District, State, PIN', required: true },
          { name: 'state', label: 'State / UT', type: 'select', required: true, options: ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'] },
          { name: 'caste', label: 'Caste', type: 'text', placeholder: 'Your caste name', required: true },
          { name: 'subCaste', label: 'Sub-Caste (if applicable)', type: 'text', required: false },
          { name: 'category', label: 'Category', type: 'select', required: true, options: ['SC (Scheduled Caste)', 'ST (Scheduled Tribe)', 'OBC (Other Backward Class)', 'EWS (Economically Weaker Section)'] },
          { name: 'purpose', label: 'Purpose of Certificate', type: 'select', required: true, options: ['Education / Scholarship', 'Government Job / Recruitment', 'Reservation Benefit', 'Ration Card / Welfare Scheme', 'Other'] },
          { name: 'idProof', label: 'Upload Proof of Identity (Aadhaar)', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Proof of Address', type: 'file', required: true },
          { name: 'familyCasteCert', label: "Upload Father's / Blood Relative's Caste Certificate", type: 'file', required: true },
          { name: 'schoolCert', label: 'Upload School Leaving Certificate / 10th Marksheet', type: 'file', required: true },
          { name: 'affidavit', label: 'Upload Self-Declaration Affidavit', type: 'file', required: true },
          { name: 'photo', label: 'Upload Passport-size Photograph', type: 'file', required: true }
        ],
        requiredDocs: ['Proof of Identity — Aadhaar / Voter ID / PAN', 'Proof of Address — Aadhaar / Utility bill / Voter ID', "Father's or blood relative's caste certificate (strongly recommended)", 'School Leaving Certificate / 10th Marksheet (showing caste column)', 'Notarized self-declaration affidavit', 'Passport-size photograph', 'Income Certificate (required for OBC Non-Creamy Layer)']
      },
      { id: 'renewal', label: 'Renewal', labelHi: 'नवीनीकरण', iconName: 'RefreshCw', description: 'Renew or reissue your caste certificate if required',
        formFields: [
          { name: 'previousCertNumber', label: 'Previous Certificate Number', type: 'text', required: true },
          { name: 'previousIssueDate', label: 'Previous Issue Date', type: 'date', required: true },
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'caste', label: 'Caste', type: 'text', required: true },
          { name: 'category', label: 'Category', type: 'select', required: true, options: ['SC', 'ST', 'OBC', 'EWS'] },
          { name: 'address', label: 'Current Address', type: 'textarea', required: true },
          { name: 'previousCert', label: 'Upload Previous Caste Certificate', type: 'file', required: true },
          { name: 'idProof', label: 'Upload ID Proof (Aadhaar)', type: 'file', required: true },
          { name: 'incomeCert', label: 'Upload Income Certificate (for OBC Non-Creamy Layer)', type: 'file', required: false }
        ],
        requiredDocs: ['Previous Caste Certificate', 'Aadhaar Card', 'Income Certificate (mandatory for OBC Non-Creamy Layer renewal)', 'Note: SC/ST certificates are generally valid permanently; OBC-NCL may require periodic renewal']
      },
      { id: 'correction', label: 'Correction', labelHi: 'सुधार', iconName: 'Edit', description: 'Correct errors in your existing caste certificate',
        formFields: [
          { name: 'certNumber', label: 'Certificate Number', type: 'text', required: true },
          { name: 'issueDate', label: 'Issue Date', type: 'date', required: true },
          { name: 'fullName', label: 'Full Name (as on certificate)', type: 'text', required: true },
          { name: 'correctionField', label: 'Field to Correct', type: 'select', required: true, options: ['Name', 'Father Name', 'Caste Name', 'Sub-Caste', 'Category', 'Address', 'Date of Birth'] },
          { name: 'currentValue', label: 'Current (incorrect) Value', type: 'text', required: true },
          { name: 'correctedValue', label: 'Correct Value', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'originalCert', label: 'Upload Original Caste Certificate', type: 'file', required: true },
          { name: 'supportDoc', label: 'Upload Supporting Document', type: 'file', required: true }
        ],
        requiredDocs: ['Original Caste Certificate', 'Supporting document — 10th marksheet / Aadhaar / Birth certificate / Gazette notification', 'Application for correction addressed to SDM/Tehsildar']
      },
      { id: 'verify', label: 'Verify Certificate', labelHi: 'प्रमाणपत्र सत्यापन', iconName: 'ShieldCheck', description: 'Verify the authenticity of a caste certificate online',
        formFields: [
          { name: 'certNumber', label: 'Certificate Number', type: 'text', required: true },
          { name: 'issueDate', label: 'Issue Date', type: 'date', required: true },
          { name: 'applicantName', label: 'Applicant Name (as on certificate)', type: 'text', required: false },
          { name: 'state', label: 'Issuing State', type: 'select', required: true, options: ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'] }
        ],
        requiredDocs: ['Certificate Number', 'Issue Date', 'Note: Verify on your state e-District portal or UMANG app']
      },
      { id: 'validity-extension', label: 'Validity Extension', labelHi: 'वैधता विस्तार', iconName: 'CalendarClock', description: 'Extend validity of an expired caste certificate via e-district',
        formFields: [
          { name: 'certNumber', label: 'Certificate Number', type: 'text', required: true },
          { name: 'issueDate', label: 'Original Issue Date', type: 'date', required: true },
          { name: 'expiryDate', label: 'Expiry Date', type: 'date', required: true },
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'caste', label: 'Caste', type: 'text', required: true },
          { name: 'category', label: 'Category', type: 'select', required: true, options: ['SC', 'ST', 'OBC', 'EWS'] },
          { name: 'purpose', label: 'Purpose of Extension', type: 'textarea', placeholder: 'Why extension is needed', required: true },
          { name: 'originalCert', label: 'Upload Original Caste Certificate', type: 'file', required: true },
          { name: 'idProof', label: 'Upload ID Proof', type: 'file', required: true },
          { name: 'incomeCert', label: 'Upload Income Certificate (for OBC-NCL)', type: 'file', required: false }
        ],
        requiredDocs: ['Original Caste Certificate (expired)', 'Aadhaar Card', 'Income Certificate (for OBC Non-Creamy Layer)', 'Application for validity extension']
      }
    ],
    eligibility: ['Members of SC, ST, or OBC communities', 'Required for educational and employment reservations', 'Issued by SDM / Tehsildar office'],
    requiredDocs: ['Proof of Identity (Aadhaar, Voter ID)', 'Proof of Address', "Father's / Family member's caste certificate", 'School leaving certificate', 'Self-declaration affidavit'],
    fees: '₹10 – ₹50 (varies by state)',
    processingTime: '15 – 30 days',
    steps: [
      { title: 'Apply Online', desc: 'Apply through your state e-district portal.' },
      { title: 'Fill Caste Details', desc: 'Provide your caste details with family references.' },
      { title: 'Upload Documents', desc: "Upload family member's caste certificate and identity proof." },
      { title: 'Field Verification', desc: 'A revenue official may conduct field verification.' },
      { title: 'Download Certificate', desc: 'After approval, download the digitally signed certificate.' }
    ],
    faqs: [
      { question: 'Is a caste certificate valid across states?', answer: 'Generally, a caste certificate is valid in the state where it was issued. For central government services, the home-state certificate is accepted.' },
      { question: 'How long is it valid?', answer: 'Caste certificates are generally valid permanently, but some institutions may ask for recent ones.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'caste', label: 'Caste', type: 'text', placeholder: 'Your caste', required: true },
      { name: 'subCaste', label: 'Sub-Caste', type: 'text', placeholder: 'If applicable', required: false },
      { name: 'category', label: 'Category', type: 'select', required: true, options: ['SC', 'ST', 'OBC', 'EWS'] },
      { name: 'familyCert', label: "Upload Family Member's Caste Certificate", type: 'file', required: true }
    ]
  },
  {
    id: 'rc',
    title: 'Vehicle Registration (RC)',
    titleHi: 'वाहन पंजीकरण (RC)',
    description: 'Official document proving vehicle registration with the RTO.',
    category: 'Transport',
    iconName: 'FileText',
    services: [
      { id: 'new-registration', label: 'New Registration', labelHi: 'नया पंजीकरण', iconName: 'FilePlus', description: 'Register a newly purchased vehicle at the RTO',
        formFields: [
          { name: 'ownerName', label: 'Owner Full Name', type: 'text', required: true },
          { name: 'fatherName', label: "Father's / Husband's Name", type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', required: true },
          { name: 'panNumber', label: 'PAN Number', type: 'text', placeholder: '10-character PAN', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: false },
          { name: 'address', label: 'Residential Address', type: 'textarea', required: true },
          { name: 'vehicleType', label: 'Vehicle Type', type: 'select', required: true, options: ['Two-Wheeler', 'Three-Wheeler', 'Car / LMV', 'Commercial / HMV'] },
          { name: 'vehicleMake', label: 'Vehicle Make & Model', type: 'text', placeholder: 'e.g. Maruti Swift VXi', required: true },
          { name: 'vehicleColor', label: 'Vehicle Colour', type: 'text', required: true },
          { name: 'engineNo', label: 'Engine Number', type: 'text', placeholder: 'From vehicle invoice', required: true },
          { name: 'chassisNo', label: 'Chassis Number', type: 'text', placeholder: 'From vehicle invoice', required: true },
          { name: 'fuelType', label: 'Fuel Type', type: 'select', required: true, options: ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid', 'LPG'] },
          { name: 'invoice', label: 'Upload Sale Invoice (Form 21)', type: 'file', required: true },
          { name: 'insurance', label: 'Upload Insurance Certificate', type: 'file', required: true },
          { name: 'puc', label: 'Upload PUC Certificate', type: 'file', required: true },
          { name: 'idProof', label: 'Upload ID Proof (Aadhaar / PAN)', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Address Proof', type: 'file', required: true },
          { name: 'form20', label: 'Upload Form 20 (signed by dealer)', type: 'file', required: true }
        ],
        requiredDocs: ['Sale Invoice / Form 21 (from dealer)', 'Form 20 (Application for Registration — signed by dealer)', 'Valid Insurance Certificate', 'PUC Certificate', 'ID Proof — Aadhaar / PAN', 'Address Proof — Aadhaar / Utility bill / Voter ID', 'Form 22 (Road-worthiness certificate from manufacturer)', 'Temporary Registration Certificate']
      },
      { id: 'transfer-ownership', label: 'Transfer Ownership', labelHi: 'स्वामित्व हस्तांतरण', iconName: 'ArrowRightLeft', description: 'Transfer vehicle ownership to a new buyer (Form 29/30)',
        formFields: [
          { name: 'vehicleRegNo', label: 'Vehicle Registration Number', type: 'text', placeholder: 'e.g. DL 01 AB 1234', required: true },
          { name: 'sellerName', label: 'Seller (Current Owner) Name', type: 'text', required: true },
          { name: 'sellerAadhaar', label: "Seller's Aadhaar Number", type: 'text', required: true },
          { name: 'buyerName', label: 'Buyer (New Owner) Name', type: 'text', required: true },
          { name: 'buyerAadhaar', label: "Buyer's Aadhaar Number", type: 'text', required: true },
          { name: 'buyerAddress', label: "Buyer's Address", type: 'textarea', required: true },
          { name: 'buyerPhone', label: "Buyer's Mobile Number", type: 'tel', required: true },
          { name: 'saleDate', label: 'Date of Sale', type: 'date', required: true },
          { name: 'saleAmount', label: 'Sale Amount (₹)', type: 'text', required: true },
          { name: 'form29', label: 'Upload Form 29 (Notice of Transfer)', type: 'file', required: true },
          { name: 'form30', label: 'Upload Form 30 (Report of Transfer)', type: 'file', required: true },
          { name: 'rcCopy', label: 'Upload RC Copy', type: 'file', required: true },
          { name: 'insurance', label: 'Upload Valid Insurance', type: 'file', required: true },
          { name: 'puc', label: 'Upload PUC Certificate', type: 'file', required: true },
          { name: 'buyerIdProof', label: "Upload Buyer's ID Proof", type: 'file', required: true }
        ],
        requiredDocs: ['Form 29 (Notice of Transfer) — signed by both buyer and seller', 'Form 30 (Report of Transfer) — signed by both buyer and seller', 'Original Registration Certificate (RC)', 'Valid Insurance Certificate (transferred to buyer)', 'PUC Certificate', "Buyer's ID & Address Proof — Aadhaar / Voter ID", "Seller's ID Proof", 'Chassis & Engine pencil print (some RTOs)']
      },
      { id: 'address-change', label: 'Change of Address', labelHi: 'पता परिवर्तन', iconName: 'MapPin', description: 'Update your address on the RC book',
        formFields: [
          { name: 'vehicleRegNo', label: 'Vehicle Registration Number', type: 'text', required: true },
          { name: 'ownerName', label: 'Owner Name', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'oldAddress', label: 'Old Address (as on RC)', type: 'textarea', required: true },
          { name: 'newAddress', label: 'New Address', type: 'textarea', required: true },
          { name: 'rcCopy', label: 'Upload RC Copy', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload New Address Proof', type: 'file', required: true },
          { name: 'insurance', label: 'Upload Insurance Certificate', type: 'file', required: true }
        ],
        requiredDocs: ['Registration Certificate (RC)', 'Proof of New Address — Aadhaar / Utility bill / Rent agreement', 'Valid Insurance Certificate', 'PUC Certificate']
      },
      { id: 'hypothecation', label: 'Hypothecation', labelHi: 'हाइपोथिकेशन', iconName: 'Building', description: 'Add, continue, or terminate hypothecation (loan) on RC',
        formFields: [
          { name: 'vehicleRegNo', label: 'Vehicle Registration Number', type: 'text', required: true },
          { name: 'ownerName', label: 'Owner Name', type: 'text', required: true },
          { name: 'action', label: 'Hypothecation Action', type: 'select', required: true, options: ['Add Hypothecation (New Loan)', 'Terminate Hypothecation (Loan Closed)', 'Continue with New Financier'] },
          { name: 'financierName', label: 'Financier / Bank Name', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'form35', label: 'Upload Form 35 (signed by financier)', type: 'file', required: true },
          { name: 'nocFromBank', label: 'Upload NOC from Bank / Financier', type: 'file', required: true },
          { name: 'rcCopy', label: 'Upload RC Copy', type: 'file', required: true },
          { name: 'insurance', label: 'Upload Insurance Certificate', type: 'file', required: true }
        ],
        requiredDocs: ['Form 35 (duly signed by financier/bank)', 'NOC (No Objection Certificate) from bank/financier', 'Original Registration Certificate (RC)', 'Valid Insurance & PUC Certificate', 'Owner ID & Address Proof']
      },
      { id: 'duplicate-rc', label: 'Duplicate RC', labelHi: 'डुप्लीकेट RC', iconName: 'Copy', description: 'Apply for a duplicate RC if lost or damaged',
        formFields: [
          { name: 'vehicleRegNo', label: 'Vehicle Registration Number', type: 'text', required: true },
          { name: 'ownerName', label: 'Owner Name', type: 'text', required: true },
          { name: 'reason', label: 'Reason for Duplicate', type: 'select', required: true, options: ['Lost', 'Stolen', 'Damaged / Mutilated'] },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'firCopy', label: 'Upload FIR Copy (if lost/stolen)', type: 'file', required: true },
          { name: 'affidavit', label: 'Upload Affidavit (Form 26)', type: 'file', required: true },
          { name: 'insurance', label: 'Upload Insurance Certificate', type: 'file', required: true },
          { name: 'puc', label: 'Upload PUC Certificate', type: 'file', required: true },
          { name: 'idProof', label: 'Upload ID Proof', type: 'file', required: true }
        ],
        requiredDocs: ['Form 26 (Application for Duplicate RC)', 'FIR copy from police station (mandatory if lost/stolen)', 'Affidavit on stamp paper stating reason', 'Valid Insurance & PUC Certificate', 'ID & Address Proof', 'Chassis number pencil print (some RTOs)']
      },
      { id: 'noc', label: 'Issue NOC', labelHi: 'NOC जारी', iconName: 'FileCheck', description: 'Get a No Objection Certificate for inter-state transfer',
        formFields: [
          { name: 'vehicleRegNo', label: 'Vehicle Registration Number', type: 'text', required: true },
          { name: 'ownerName', label: 'Owner Name', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'currentState', label: 'Current Registration State', type: 'text', required: true },
          { name: 'transferToState', label: 'Transfer To State', type: 'text', required: true },
          { name: 'reason', label: 'Reason for NOC', type: 'select', required: true, options: ['Permanent Relocation', 'Sale to Buyer in Another State', 'Other'] },
          { name: 'rcCopy', label: 'Upload RC Copy', type: 'file', required: true },
          { name: 'insurance', label: 'Upload Insurance Certificate', type: 'file', required: true },
          { name: 'puc', label: 'Upload PUC Certificate', type: 'file', required: true },
          { name: 'addressProof', label: 'Upload Address Proof (new state)', type: 'file', required: true },
          { name: 'taxReceipt', label: 'Upload Road Tax Clearance Receipt', type: 'file', required: true }
        ],
        requiredDocs: ['Application for NOC', 'Original RC', 'Valid Insurance & PUC', 'Road Tax clearance from current state', 'Address Proof of new state', 'No pending challans / violations clearance']
      },
      { id: 'renewal', label: 'RC Renewal', labelHi: 'RC नवीनीकरण', iconName: 'RefreshCw', description: 'Renew vehicle registration after 15-year validity',
        formFields: [
          { name: 'vehicleRegNo', label: 'Vehicle Registration Number', type: 'text', required: true },
          { name: 'ownerName', label: 'Owner Name', type: 'text', required: true },
          { name: 'rcExpiryDate', label: 'RC Expiry Date', type: 'date', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'rcCopy', label: 'Upload RC Copy (Form 25)', type: 'file', required: true },
          { name: 'insurance', label: 'Upload Insurance Certificate', type: 'file', required: true },
          { name: 'puc', label: 'Upload PUC Certificate', type: 'file', required: true },
          { name: 'fitnessCert', label: 'Upload Fitness Certificate (if applicable)', type: 'file', required: false }
        ],
        requiredDocs: ['Form 25 (Application for Renewal)', 'Original RC', 'Valid Insurance & PUC', 'Fitness Certificate (for commercial vehicles)', 'Road Tax payment receipt', 'Note: RC can be renewed for 5 years after 15-year expiry']
      },
      { id: 'fitness-cert', label: 'Fitness Certificate', labelHi: 'फिटनेस प्रमाणपत्र', iconName: 'HeartPulse', description: 'Apply for fitness certificate for commercial or 15yr+ vehicles',
        formFields: [
          { name: 'vehicleRegNo', label: 'Vehicle Registration Number', type: 'text', required: true },
          { name: 'ownerName', label: 'Owner Name', type: 'text', required: true },
          { name: 'vehicleType', label: 'Vehicle Type', type: 'select', required: true, options: ['Transport (Commercial)', 'Private (15+ years old)'] },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'rcCopy', label: 'Upload RC Copy (Form 25/38)', type: 'file', required: true },
          { name: 'insurance', label: 'Upload Insurance Certificate', type: 'file', required: true },
          { name: 'puc', label: 'Upload PUC Certificate', type: 'file', required: true },
          { name: 'taxReceipt', label: 'Upload Road Tax Receipt', type: 'file', required: true }
        ],
        requiredDocs: ['Form 25 (private) / Form 38 (transport) for fitness', 'RC Copy', 'Valid Insurance & PUC', 'Road Tax payment receipt', 'Chassis number pencil print', 'Note: Vehicle must be physically inspected at RTO / Automated Testing Station']
      },
      { id: 'rc-extract', label: 'RC Extract', labelHi: 'RC उद्धरण', iconName: 'FileOutput', description: 'Get a certified extract of your RC details from Vahan portal',
        formFields: [
          { name: 'vehicleRegNo', label: 'Vehicle Registration Number', type: 'text', required: true },
          { name: 'ownerName', label: 'Owner Name', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'purpose', label: 'Purpose of Extract', type: 'select', required: true, options: ['Insurance Claim', 'Legal Proceedings', 'Loan Application', 'Ownership Verification', 'Other'] }
        ],
        requiredDocs: ['Vehicle Registration Number', 'Owner ID Proof', 'Note: RC extract available on vahan.parivahan.gov.in']
      },
      { id: 'fancy-number', label: 'Fancy Number Booking', labelHi: 'फैंसी नंबर बुकिंग', iconName: 'Hash', description: 'Book a choice/fancy registration number for your vehicle',
        formFields: [
          { name: 'ownerName', label: 'Owner Name', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
          { name: 'vehicleMake', label: 'Vehicle Make & Model', type: 'text', required: true },
          { name: 'chassisNo', label: 'Chassis Number', type: 'text', required: true },
          { name: 'preferredNumber', label: 'Preferred Registration Number', type: 'text', placeholder: 'e.g. 0001, 7777, 9999', required: true },
          { name: 'state', label: 'State / RTO', type: 'text', required: true },
          { name: 'invoice', label: 'Upload Vehicle Invoice', type: 'file', required: true },
          { name: 'idProof', label: 'Upload ID Proof', type: 'file', required: true }
        ],
        requiredDocs: ['Vehicle Invoice / Booking receipt', 'ID Proof — Aadhaar / PAN', 'Fancy number fee (varies by state — can be ₹5,000 to ₹5,00,000+)', 'Note: Booking done via Vahan portal or RTO auction']
      }
    ],
    eligibility: ['Owner of a motor vehicle', 'Vehicle must be registered within 7 days of purchase', 'Valid for 15 years (can be renewed)'],
    requiredDocs: ['Sale invoice of the vehicle', 'Insurance certificate', 'PUC certificate', 'Proof of Address', 'ID Proof (Aadhaar, PAN)', 'Form 20 (signed by dealer)'],
    fees: '₹200 – ₹5,000+ (varies by vehicle type and state)',
    processingTime: '7 – 15 days',
    steps: [
      { title: 'Get Insurance & PUC', desc: 'Obtain vehicle insurance and Pollution Under Control certificate.' },
      { title: 'Apply at RTO', desc: 'Submit Form 20 at the RTO with all required documents.' },
      { title: 'Pay Road Tax & Fees', desc: 'Pay the applicable road tax and registration fees.' },
      { title: 'Vehicle Inspection', desc: 'The RTO may inspect the vehicle physically.' },
      { title: 'Receive RC', desc: 'The RC smart card will be dispatched to your address.' }
    ],
    faqs: [
      { question: 'What is the validity of RC?', answer: 'RC is valid for 15 years from the date of registration for non-transport vehicles. It can be renewed for another 5 years.' },
      { question: 'How to transfer RC to a new owner?', answer: 'Both buyer and seller must apply for transfer at the RTO with Form 29 and Form 30, along with NOC if from another state.' }
    ],
    formFields: [
      ...commonPersonalFields,
      { name: 'vehicleType', label: 'Vehicle Type', type: 'select', required: true, options: ['Two-Wheeler', 'Car', 'Commercial Vehicle', 'Three-Wheeler'] },
      { name: 'vehicleMake', label: 'Vehicle Make & Model', type: 'text', placeholder: 'e.g., Maruti Swift', required: true },
      { name: 'chassisNo', label: 'Chassis Number', type: 'text', placeholder: 'From vehicle invoice', required: true },
      { name: 'invoice', label: 'Upload Sale Invoice', type: 'file', required: true },
      { name: 'insurance', label: 'Upload Insurance Certificate', type: 'file', required: true }
    ]
  },
  {
    id: 'upi',
    title: 'UPI / Digital Payments',
    titleHi: 'UPI / डिजिटल भुगतान',
    description: 'Unified Payments Interface for instant, government-linked digital transactions.',
    category: 'Finance',
    iconName: 'Smartphone',
    services: [
      { id: 'register-link', label: 'Register & Link Bank', labelHi: 'पंजीकरण और बैंक लिंक', iconName: 'Link', description: 'Register on a UPI app and link your bank account',
        formFields: [
          { name: 'fullName', label: 'Full Name (as per Bank Account)', type: 'text', required: true },
          { name: 'phone', label: 'Mobile Number (linked to bank)', type: 'tel', placeholder: '10-digit mobile', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: false },
          { name: 'bankName', label: 'Bank Name', type: 'select', required: true, options: ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Punjab National Bank', 'Bank of Baroda', 'Axis Bank', 'Kotak Mahindra Bank', 'Canara Bank', 'Union Bank of India', 'Indian Bank', 'Bank of India', 'Central Bank of India', 'Other'] },
          { name: 'accountType', label: 'Account Type', type: 'select', required: true, options: ['Savings', 'Current'] },
          { name: 'upiApp', label: 'Preferred UPI App', type: 'select', required: true, options: ['BHIM', 'Google Pay', 'PhonePe', 'Paytm', 'Amazon Pay', 'Bank\'s Own App', 'Other'] },
          { name: 'debitCardLast6', label: 'Debit Card Last 6 Digits (for UPI PIN)', type: 'text', placeholder: 'Last 6 digits of debit card', required: true },
          { name: 'debitCardExpiry', label: 'Debit Card Expiry Date', type: 'text', placeholder: 'MM/YY', required: true }
        ],
        requiredDocs: ['Bank account with mobile number registered', 'Active debit card (Visa/MasterCard/RuPay) issued by the bank', 'Smartphone with internet connection', 'Note: UPI PIN will be set using debit card details + OTP']
      },
      { id: 'create-vpa', label: 'Create / Change VPA', labelHi: 'VPA बनाएँ / बदलें', iconName: 'AtSign', description: 'Create or customize your UPI ID (Virtual Payment Address)',
        formFields: [
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', required: true },
          { name: 'currentVpa', label: 'Current UPI ID (if changing)', type: 'text', placeholder: 'e.g. yourname@upi', required: false },
          { name: 'preferredVpa', label: 'Preferred New UPI ID', type: 'text', placeholder: 'e.g. yourname@okicici', required: true },
          { name: 'bankName', label: 'Linked Bank', type: 'select', required: true, options: ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Punjab National Bank', 'Bank of Baroda', 'Axis Bank', 'Kotak Mahindra Bank', 'Other'] },
          { name: 'upiApp', label: 'UPI App', type: 'select', required: true, options: ['BHIM', 'Google Pay', 'PhonePe', 'Paytm', 'Bank App', 'Other'] }
        ],
        requiredDocs: ['Active UPI registration on the app', 'Linked bank account', 'Note: VPA format is username@bankhandle (e.g. user@ybl, user@okhdfcbank)']
      },
      { id: 'check-limit', label: 'Check Transaction Limit', labelHi: 'लेन-देन सीमा', iconName: 'BarChart3', description: 'Check your per-transaction and daily UPI limits',
        formFields: [
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', required: true },
          { name: 'bankName', label: 'Bank Name', type: 'select', required: true, options: ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Punjab National Bank', 'Bank of Baroda', 'Axis Bank', 'Kotak Mahindra Bank', 'Other'] },
          { name: 'upiApp', label: 'UPI App Used', type: 'select', required: true, options: ['BHIM', 'Google Pay', 'PhonePe', 'Paytm', 'Bank App', 'Other'] }
        ],
        requiredDocs: ['Active UPI account', 'Note: Standard limits — ₹1,00,000/transaction (P2P), ₹2,00,000 for specific categories (IPO, Tax, Insurance)', 'Note: UPI Lite limit — ₹500/transaction, ₹2,000 wallet balance']
      },
      { id: 'raise-complaint', label: 'Raise Complaint', labelHi: 'शिकायत दर्ज', iconName: 'AlertCircle', description: 'Raise a dispute for failed or incorrect UPI transactions',
        formFields: [
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', required: true },
          { name: 'upiTransactionId', label: 'UPI Transaction ID / Reference Number', type: 'text', placeholder: '12-digit UPI reference number', required: true },
          { name: 'transactionDate', label: 'Transaction Date', type: 'date', required: true },
          { name: 'amount', label: 'Transaction Amount (₹)', type: 'text', required: true },
          { name: 'complaintType', label: 'Complaint Type', type: 'select', required: true, options: ['Money Debited but Not Credited to Beneficiary', 'Wrong Person Credited', 'Transaction Failed but Amount Debited', 'Duplicate Transaction', 'Unauthorized / Fraudulent Transaction', 'Other'] },
          { name: 'beneficiaryVpa', label: 'Beneficiary UPI ID / Account', type: 'text', placeholder: 'UPI ID or account of intended recipient', required: true },
          { name: 'bankName', label: 'Your Bank Name', type: 'select', required: true, options: ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Punjab National Bank', 'Bank of Baroda', 'Axis Bank', 'Kotak Mahindra Bank', 'Other'] },
          { name: 'description', label: 'Describe the Issue', type: 'textarea', placeholder: 'Provide details of the failed/incorrect transaction', required: true },
          { name: 'screenshot', label: 'Upload Transaction Screenshot', type: 'file', required: false }
        ],
        requiredDocs: ['UPI Transaction ID / Reference Number', 'Transaction date and amount', 'Screenshot of transaction (if available)', 'Note: Raise complaint within 30 days of transaction', 'Note: Banks must resolve within 5–10 working days (RBI mandate)']
      },
      { id: 'autopay', label: 'Auto-Pay / Mandate Setup', labelHi: 'ऑटो-पे सेटअप', iconName: 'CalendarClock', description: 'Set up recurring UPI payments for bills and subscriptions',
        formFields: [
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', required: true },
          { name: 'vpa', label: 'Your UPI ID', type: 'text', placeholder: 'e.g. yourname@upi', required: true },
          { name: 'mandateType', label: 'Mandate Type', type: 'select', required: true, options: ['Recurring (Fixed Amount)', 'Recurring (Variable Amount)', 'One-time Future Payment'] },
          { name: 'merchantName', label: 'Merchant / Biller Name', type: 'text', placeholder: 'e.g. Netflix, Electricity Board', required: true },
          { name: 'amount', label: 'Amount (₹)', type: 'text', placeholder: 'Per-payment amount', required: true },
          { name: 'frequency', label: 'Payment Frequency', type: 'select', required: true, options: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly', 'One-time'] },
          { name: 'startDate', label: 'Start Date', type: 'date', required: true },
          { name: 'endDate', label: 'End Date (optional)', type: 'date', required: false },
          { name: 'bankName', label: 'Bank Name', type: 'select', required: true, options: ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Punjab National Bank', 'Bank of Baroda', 'Axis Bank', 'Kotak Mahindra Bank', 'Other'] }
        ],
        requiredDocs: ['Active UPI account with linked bank', 'Merchant/Biller details', 'UPI PIN for mandate authorization', 'Note: UPI AutoPay limit — ₹1,00,000 (as per NPCI guidelines)', 'Note: You will receive notification before each debit']
      },
      { id: 'upi-lite', label: 'Enable UPI Lite', labelHi: 'UPI Lite सक्रिय करें', iconName: 'Wallet', description: 'Enable PIN-less small payments up to ₹1,000 via UPI Lite',
        formFields: [
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', required: true },
          { name: 'vpa', label: 'Your UPI ID', type: 'text', required: true },
          { name: 'bankName', label: 'Bank Name', type: 'select', required: true, options: ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Punjab National Bank', 'Bank of Baroda', 'Axis Bank', 'Kotak Mahindra Bank', 'Canara Bank', 'Union Bank', 'Other'] },
          { name: 'loadAmount', label: 'Initial Load Amount (₹)', type: 'text', placeholder: 'Max ₹2,000 wallet balance', required: true },
          { name: 'upiApp', label: 'UPI App', type: 'select', required: true, options: ['BHIM', 'Google Pay', 'PhonePe', 'Paytm', 'Bank App', 'Other'] }
        ],
        requiredDocs: ['Active UPI account', 'UPI PIN for initial wallet load', 'Note: UPI Lite — PIN-less transactions up to ₹500/payment', 'Note: Maximum wallet balance — ₹2,000', 'Note: Works offline on NFC-enabled devices (UPI Lite X)']
      },
      { id: 'check-balance', label: 'Check Balance', labelHi: 'बैलेंस जाँचें', iconName: 'Eye', description: 'Check your bank account balance via UPI without visiting bank',
        formFields: [
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', required: true },
          { name: 'bankName', label: 'Bank Name', type: 'select', required: true, options: ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Punjab National Bank', 'Bank of Baroda', 'Axis Bank', 'Kotak Mahindra Bank', 'Other'] },
          { name: 'accountType', label: 'Account Type', type: 'select', required: true, options: ['Savings', 'Current'] },
          { name: 'upiApp', label: 'UPI App', type: 'select', required: true, options: ['BHIM', 'Google Pay', 'PhonePe', 'Paytm', 'Bank App', 'Other'] }
        ],
        requiredDocs: ['Active UPI account linked to bank', 'UPI PIN (required for balance check)', 'Note: Balance enquiry is free and instant']
      },
      { id: 'deregister', label: 'Deregister UPI', labelHi: 'UPI डीरजिस्टर', iconName: 'UserX', description: 'Deregister your UPI ID from a specific app or device',
        formFields: [
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'phone', label: 'Registered Mobile Number', type: 'tel', required: true },
          { name: 'vpa', label: 'UPI ID to Deregister', type: 'text', placeholder: 'e.g. yourname@upi', required: true },
          { name: 'bankName', label: 'Linked Bank', type: 'select', required: true, options: ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Punjab National Bank', 'Bank of Baroda', 'Axis Bank', 'Kotak Mahindra Bank', 'Other'] },
          { name: 'reason', label: 'Reason for Deregistration', type: 'select', required: true, options: ['Switching to Different App', 'Closing Bank Account', 'Device Lost / Stolen', 'Security Concern', 'No Longer Using UPI', 'Other'] },
          { name: 'upiApp', label: 'UPI App to Deregister From', type: 'select', required: true, options: ['BHIM', 'Google Pay', 'PhonePe', 'Paytm', 'Bank App', 'Other'] }
        ],
        requiredDocs: ['UPI ID and linked bank details', 'Access to registered mobile number', 'Note: Deregistration removes UPI ID from the app only; bank account remains active', 'Note: If device is lost, contact bank immediately to block UPI access']
      }
    ],
    eligibility: ['Any Indian bank account holder', 'Must have a mobile number linked to bank', 'Supported on Android and iOS devices'],
    requiredDocs: ['Bank account linked to mobile number', 'Debit card (for initial setup)', 'Aadhaar (for Aadhaar-based authentication)'],
    fees: 'Free (no transaction charges for users)',
    processingTime: 'Instant setup',
    steps: [
      { title: 'Download UPI App', desc: 'Download BHIM, Google Pay, PhonePe, or your bank UPI app.' },
      { title: 'Register with Mobile', desc: 'Register using the mobile number linked to your bank account.' },
      { title: 'Link Bank Account', desc: 'Select your bank and link your account to the UPI app.' },
      { title: 'Set UPI PIN', desc: 'Use your debit card details to set a 4 or 6-digit UPI PIN.' },
      { title: 'Start Transacting', desc: 'Send/receive money, pay bills, and make government fee payments.' }
    ],
    faqs: [
      { question: 'Is UPI safe?', answer: 'Yes, UPI is highly secure with two-factor authentication (device binding + UPI PIN). Never share your UPI PIN with anyone.' },
      { question: 'What is the UPI transaction limit?', answer: 'The standard limit is ₹1,00,000 per transaction. Some banks may have lower limits.' }
    ],
    formFields: [
      { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'As per bank account', required: true },
      { name: 'phone', label: 'Mobile Number (linked to bank)', type: 'tel', placeholder: '10-digit mobile number', required: true },
      { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', required: true },
      { name: 'bankName', label: 'Bank Name', type: 'select', required: true, options: ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Punjab National Bank', 'Bank of Baroda', 'Axis Bank', 'Kotak Mahindra Bank', 'Other'] },
      { name: 'accountType', label: 'Account Type', type: 'select', required: true, options: ['Savings', 'Current'] }
    ]
  }
];
