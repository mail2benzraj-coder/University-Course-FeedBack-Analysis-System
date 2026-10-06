import { FeedbackRecord, UserProfile } from '../types';

export const DEFAULT_STUDENT_USER: UserProfile = {
  name: 'V.Benjamin raj',
  email: 'mail2benzraj@gmail.com',
  rollNo: '2024CS8812',
  role: 'Student',
  avatar: '👨‍🎓',
  department: 'B.Tech Computer Science & Engineering',
  semester: 'Semester 6',
};

export const DEFAULT_FACULTY_USER: UserProfile = {
  name: 'Viswanath sir',
  email: 'viswanath.sir@university.edu',
  role: 'Faculty',
  avatar: '👨‍🏫',
  department: 'Computer Science & Engineering',
};

export const DEFAULT_ADMIN_USER: UserProfile = {
  name: 'Bhaskar rao sir',
  email: 'bhaskar.rao@university.edu',
  role: 'Dean/Admin',
  avatar: '🏛️',
  department: 'Academic Accreditation Board',
};

export const PRESET_USERS: UserProfile[] = [
  DEFAULT_STUDENT_USER,
  DEFAULT_FACULTY_USER,
  DEFAULT_ADMIN_USER,
];

export const ENGINEERING_BRANCHES = [
  'All Courses & Branches',
  'B.Tech Computer Science & Engineering',
  'B.Tech Data Science & Artificial Intelligence',
  'B.Tech Electronics & Communication',
  'B.Tech Information Technology',
  'B.Tech Mechanical Engineering',
  'M.Tech Data Analytics'
];

export const SEMESTERS = [
  'All Semesters (1 to 8)',
  'Semester 1',
  'Semester 2',
  'Semester 3',
  'Semester 4',
  'Semester 5',
  'Semester 6',
  'Semester 7',
  'Semester 8'
];

export const FACULTY_MEMBERS = [
  { name: 'All Faculty Members', subject: 'All Subjects' },
  { name: 'Viswanath sir', subject: 'Advanced Data Structures & Algorithms' },
  { name: 'Prof. S. Sharma', subject: 'Deep Learning & Neural Networks' },
  { name: 'Dr. Ananya Iyer', subject: 'Discrete Mathematics & Graph Theory' },
  { name: 'Prof. M. Vignesh', subject: 'Cloud Computing & DevOps Architecture' },
  { name: 'Dr. R. Senthil', subject: 'Database Engineering & Query Optimization' },
];

export const STUDENT_NAMES_FILTER = [
  'All Students',
  'Abhinav',
  'Akhil',
  'Rajesh',
  'Mahesh',
  'Suresh',
  'Somesh',
  'Madhu'
];

export const STUDENT_LIST = [
  'Abhinav',
  'Akhil',
  'Rajesh',
  'Mahesh',
  'Suresh',
  'Somesh',
  'Madhu'
];

export const INITIAL_FEEDBACK_RECORDS: FeedbackRecord[] = [
  {
    id: 'FB-2026-001',
    studentName: 'Abhinav',
    studentRoll: '2024CS8811',
    facultyName: 'Viswanath sir',
    subject: 'Advanced Data Structures & Algorithms',
    semester: 'Semester 6',
    branch: 'B.Tech Computer Science & Engineering',
    overallRating: 5,
    criteria: { clarity: 5, knowledge: 5, pace: 5, doubts: 5, syllabus: 5 },
    comment: 'Exceptional clarity in graph algorithms and dynamic programming state transitions. Lecture pace was ideal.',
    date: '2026-09-28',
    time: '10:30 AM',
    verificationHash: 'SHA-8b4f2c99a',
    status: 'Verified'
  },
  {
    id: 'FB-2026-002',
    studentName: 'Akhil',
    studentRoll: '2024CS8812',
    facultyName: 'Viswanath sir',
    subject: 'Advanced Data Structures & Algorithms',
    semester: 'Semester 6',
    branch: 'B.Tech Computer Science & Engineering',
    overallRating: 5,
    criteria: { clarity: 5, knowledge: 5, pace: 4, doubts: 5, syllabus: 5 },
    comment: 'Hands-on coding demonstrations during the lecture were very helpful for competitive programming concepts.',
    date: '2026-09-28',
    time: '11:15 AM',
    verificationHash: 'SHA-3d7a81c02',
    status: 'Verified'
  },
  {
    id: 'FB-2026-003',
    studentName: 'Rajesh',
    studentRoll: '2024CS8813',
    facultyName: 'Prof. S. Sharma',
    subject: 'Deep Learning & Neural Networks',
    semester: 'Semester 6',
    branch: 'B.Tech Data Science & Artificial Intelligence',
    overallRating: 5,
    criteria: { clarity: 5, knowledge: 5, pace: 5, doubts: 5, syllabus: 5 },
    comment: 'Mathematical formulations of backpropagation and loss gradients were thoroughly explained.',
    date: '2026-09-27',
    time: '02:00 PM',
    verificationHash: 'SHA-6e119bf44',
    status: 'Verified'
  },
  {
    id: 'FB-2026-004',
    studentName: 'Mahesh',
    studentRoll: '2024CS8814',
    facultyName: 'Prof. S. Sharma',
    subject: 'Deep Learning & Neural Networks',
    semester: 'Semester 6',
    branch: 'B.Tech Data Science & Artificial Intelligence',
    overallRating: 5,
    criteria: { clarity: 5, knowledge: 5, pace: 4, doubts: 5, syllabus: 5 },
    comment: 'Great real-world examples with PyTorch and computer vision architectures.',
    date: '2026-09-27',
    time: '03:45 PM',
    verificationHash: 'SHA-41c88e99b',
    status: 'Verified'
  },
  {
    id: 'FB-2026-005',
    studentName: 'Suresh',
    studentRoll: '2024CS8815',
    facultyName: 'Dr. Ananya Iyer',
    subject: 'Discrete Mathematics & Graph Theory',
    semester: 'Semester 4',
    branch: 'B.Tech Computer Science & Engineering',
    overallRating: 5,
    criteria: { clarity: 5, knowledge: 5, pace: 5, doubts: 5, syllabus: 5 },
    comment: 'Combinatorics and recurrence relations were broken down systematically with step-by-step proofs.',
    date: '2026-09-26',
    time: '09:30 AM',
    verificationHash: 'SHA-9f33b1e7c',
    status: 'Verified'
  },
  {
    id: 'FB-2026-006',
    studentName: 'Somesh',
    studentRoll: '2024CS8816',
    facultyName: 'Dr. Ananya Iyer',
    subject: 'Discrete Mathematics & Graph Theory',
    semester: 'Semester 4',
    branch: 'B.Tech Computer Science & Engineering',
    overallRating: 5,
    criteria: { clarity: 5, knowledge: 5, pace: 5, doubts: 5, syllabus: 5 },
    comment: 'Very engaging doubt clearing session and practice problem sheets provided on portal.',
    date: '2026-09-26',
    time: '11:00 AM',
    verificationHash: 'SHA-77a82c551',
    status: 'Verified'
  },
  {
    id: 'FB-2026-007',
    studentName: 'Madhu',
    studentRoll: '2024CS8817',
    facultyName: 'Prof. M. Vignesh',
    subject: 'Cloud Computing & DevOps Architecture',
    semester: 'Semester 6',
    branch: 'B.Tech Information Technology',
    overallRating: 5,
    criteria: { clarity: 5, knowledge: 5, pace: 5, doubts: 5, syllabus: 5 },
    comment: 'Excellent live deployment walkthrough using Kubernetes pods and CI/CD pipelines.',
    date: '2026-09-25',
    time: '01:30 PM',
    verificationHash: 'SHA-02b4d89a1',
    status: 'Verified'
  },
  {
    id: 'FB-2026-008',
    studentName: 'Abhinav',
    studentRoll: '2024CS8811',
    facultyName: 'Prof. M. Vignesh',
    subject: 'Cloud Computing & DevOps Architecture',
    semester: 'Semester 6',
    branch: 'B.Tech Information Technology',
    overallRating: 5,
    criteria: { clarity: 5, knowledge: 5, pace: 5, doubts: 4, syllabus: 5 },
    comment: 'In-depth coverage of microservices container orchestration and cloud security postures.',
    date: '2026-09-25',
    time: '02:45 PM',
    verificationHash: 'SHA-551ad33ef',
    status: 'Verified'
  },
  {
    id: 'FB-2026-009',
    studentName: 'Akhil',
    studentRoll: '2024CS8812',
    facultyName: 'Dr. R. Senthil',
    subject: 'Database Engineering & Query Optimization',
    semester: 'Semester 5',
    branch: 'B.Tech Computer Science & Engineering',
    overallRating: 5,
    criteria: { clarity: 5, knowledge: 5, pace: 5, doubts: 5, syllabus: 5 },
    comment: 'Deep dive into B+ Trees, WAL logging, and query execution plans was brilliantly delivered.',
    date: '2026-09-24',
    time: '10:00 AM',
    verificationHash: 'SHA-c09e887fa',
    status: 'Verified'
  },
  {
    id: 'FB-2026-010',
    studentName: 'Rajesh',
    studentRoll: '2024CS8813',
    facultyName: 'Dr. R. Senthil',
    subject: 'Database Engineering & Query Optimization',
    semester: 'Semester 5',
    branch: 'B.Tech Computer Science & Engineering',
    overallRating: 4,
    criteria: { clarity: 4, knowledge: 5, pace: 4, doubts: 4, syllabus: 5 },
    comment: 'Very thorough explanations of transaction isolation levels. Pace was slightly fast on index locks.',
    date: '2026-09-24',
    time: '11:30 AM',
    verificationHash: 'SHA-aa173d42c',
    status: 'Verified'
  }
];

export const CORE_MODULES_DATA = [
  {
    id: 1,
    number: 'MODULE 1',
    title: 'Authentication & Access Control',
    description: 'Role-based access system with dedicated permissions for student, faculty, and administrative audit inspection.',
    footer: 'Student / Faculty / Admin',
    borderColor: 'border-blue-200',
    hoverBorder: 'hover:border-blue-400',
    bgColor: 'bg-blue-50/20',
    labelColor: 'text-blue-600',
    footerColor: 'text-blue-600',
    iconName: 'ShieldCheck',
    vivaNotes: 'Implements zero-trust RBAC tokens, session hashing, biometric verification readiness, and immutable student ledger access.',
    features: [
      'Role-based Access Control (Student, Faculty, Admin)',
      'SHA-256 Feedback Tamper-proof Verification Hashes',
      'Encrypted Session Cookie & Token Validation',
      'Audit Trail Logs for Inspection Authorities'
    ]
  },
  {
    id: 2,
    number: 'MODULE 2',
    title: 'Feedback Ingestion Service',
    description: 'Real-time lecture rating module evaluating clarity, knowledge, course pace, doubt clearance, and syllabus depth.',
    footer: '5-Star Lecture Rating',
    borderColor: 'border-emerald-200',
    hoverBorder: 'hover:border-emerald-400',
    bgColor: 'bg-emerald-50/20',
    labelColor: 'text-emerald-600',
    footerColor: 'text-emerald-600',
    iconName: 'MessageSquare',
    vivaNotes: 'Processes real-time multi-criteria Likert evaluation, handles duplicate submission prevention, and sanitizes student commentary.',
    features: [
      'Multi-metric 5-Star Likert Scale Ingestion',
      'Pedagogical Clarity & Pacing Metrics',
      'Anonymous & Verified Double-Layer Feedback',
      'Real-time Variance Calculation Dispatcher'
    ]
  },
  {
    id: 3,
    number: 'MODULE 3',
    title: 'Rating History & Access Logs',
    description: 'Comprehensive historical repository of all student evaluations, lecture time-stamps, and cryptographic audit records.',
    footer: 'Rating & Login Audits',
    borderColor: 'border-teal-200',
    hoverBorder: 'hover:border-teal-400',
    bgColor: 'bg-teal-50/20',
    labelColor: 'text-teal-600',
    footerColor: 'text-teal-600',
    iconName: 'Activity',
    vivaNotes: 'Maintains temporal history tables, lecture attendance cross-verification, and cryptographically verified feedback records.',
    features: [
      'Temporal Historical Ledger of Student Ratings',
      'Chronological Attendance & Evaluation Verification',
      'IP Audit and Device Signature Registry',
      'Exportable Historical Data Traceability'
    ]
  },
  {
    id: 4,
    number: 'MODULE 4',
    title: 'Thematic & Benchmark Analysis',
    description: 'Cross-course comparative bar charts, difficulty ratings, standard deviation indices, and confidence interval estimators.',
    footer: 'Statistical Engine',
    borderColor: 'border-indigo-200',
    hoverBorder: 'hover:border-indigo-400',
    bgColor: 'bg-indigo-50/20',
    labelColor: 'text-indigo-600',
    footerColor: 'text-indigo-600',
    iconName: 'BarChart3',
    vivaNotes: 'Uses student t-distribution estimators for 95% confidence intervals, variance testing, and normalized faculty benchmarking.',
    features: [
      'Standard Deviation (σ) & Variance (σ²) Inference',
      '95% Confidence Interval Student t-distribution',
      'Course Difficulty & Pedagogical Correlation Matrix',
      'Faculty Peer Group Percentile Benchmarking'
    ]
  },
  {
    id: 5,
    number: 'MODULE 5',
    title: 'Report Generation Engine',
    description: 'Automated executive and academic accreditation reports formatted for NAAC, NBA, and ABET engineering evaluations.',
    footer: 'PDF / Excel / Word',
    borderColor: 'border-amber-200',
    hoverBorder: 'hover:border-amber-400',
    bgColor: 'bg-amber-50/20',
    labelColor: 'text-amber-600',
    footerColor: 'text-amber-600',
    iconName: 'FileText',
    vivaNotes: 'Generates automated accreditation dossiers, institutional audit tables, CSV/Excel spreadsheets, and printable PDF transcripts.',
    features: [
      'Automated NBA / NAAC Academic Compliance Sheets',
      'One-click .XLSX / CSV Dynamic Data Export',
      'Print-ready Executive Dean Transcripts (PDF)',
      'Automated Longitudinal Feedback Trend Extraction'
    ]
  }
];

export const STUDENT_SESSION_RECORDS = [
  {
    id: 'SESS-8921',
    subject: 'Advanced Data Structures & Algorithms',
    faculty: 'Viswanath sir',
    date: '2026-09-28',
    room: 'Hall 402',
    status: 'Evaluated',
    rating: 5,
    duration: '50 mins'
  },
  {
    id: 'SESS-8919',
    subject: 'Deep Learning & Neural Networks',
    faculty: 'Prof. S. Sharma',
    date: '2026-09-27',
    room: 'Lab 3B',
    status: 'Evaluated',
    rating: 5,
    duration: '100 mins'
  },
  {
    id: 'SESS-8915',
    subject: 'Discrete Mathematics & Graph Theory',
    faculty: 'Dr. Ananya Iyer',
    date: '2026-09-26',
    room: 'Hall 201',
    status: 'Evaluated',
    rating: 5,
    duration: '50 mins'
  },
  {
    id: 'SESS-8910',
    subject: 'Cloud Computing & DevOps Architecture',
    faculty: 'Prof. M. Vignesh',
    date: '2026-09-25',
    room: 'Cloud Lab 1',
    status: 'Evaluated',
    rating: 5,
    duration: '50 mins'
  },
  {
    id: 'SESS-8904',
    subject: 'Database Engineering & Query Optimization',
    faculty: 'Dr. R. Senthil',
    date: '2026-09-24',
    room: 'DB Systems Lab',
    status: 'Evaluated',
    rating: 5,
    duration: '50 mins'
  }
];
