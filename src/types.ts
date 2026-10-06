export interface FeedbackRecord {
  id: string;
  studentName: string;
  studentRoll: string;
  facultyName: string;
  subject: string;
  semester: string;
  branch: string;
  overallRating: number;
  criteria: {
    clarity: number;
    knowledge: number;
    pace: number;
    doubts: number;
    syllabus: number;
  };
  comment: string;
  date: string;
  time: string;
  verificationHash: string;
  status: 'Verified' | 'Audited';
}

export interface UserProfile {
  name: string;
  email: string;
  rollNo?: string;
  role: 'Student' | 'Faculty' | 'Dean/Admin';
  avatar: string;
  department: string;
  semester?: string;
}

export interface AnalyticalFiltersState {
  semester: string;
  branch: string;
  faculty: string;
  student: string;
}

export interface SystemStats {
  meanRating: number;
  totalResponses: number;
  stdDev: number;
  variance: number;
  fiveStarRatio: number;
  confIntervalLow: number;
  confIntervalHigh: number;
  turnoutPct: number;
}

export type SidebarTab =
  | 'dashboard'
  | 'submit-feedback'
  | 'feedback-history'
  | 'rating-history'
  | 'session-history'
  | 'theme-analysis'
  | 'course-comparison'
  | 'report-generation'
  | 'settings'
  | 'help-guide';
