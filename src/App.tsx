/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ArchitectureModules } from './components/ArchitectureModules';
import { AnalyticalFilters } from './components/AnalyticalFilters';
import { DashboardExtendedSections } from './components/DashboardExtendedSections';

// Modals
import { FeedbackModal } from './components/modals/FeedbackModal';
import { ReportsModal } from './components/modals/ReportsModal';
import { ModuleDetailModal } from './components/modals/ModuleDetailModal';
import { RatingHistoryModal } from './components/modals/RatingHistoryModal';
import { SessionHistoryModal } from './components/modals/SessionHistoryModal';
import { ThemeAnalysisModal } from './components/modals/ThemeAnalysisModal';
import { CourseComparisonModal } from './components/modals/CourseComparisonModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { HelpGuideModal } from './components/modals/HelpGuideModal';
import { OfflineModal } from './components/modals/OfflineModal';
import { InstallAppModal } from './components/modals/InstallAppModal';
import { UserProfileModal } from './components/modals/UserProfileModal';
import { LogoutModal } from './components/modals/LogoutModal';
import { LoginModal } from './components/modals/LoginModal';
import { DataScienceModal } from './components/modals/DataScienceModal';

import { FeedbackRecord, AnalyticalFiltersState, SidebarTab, UserProfile } from './types';
import { INITIAL_FEEDBACK_RECORDS, DEFAULT_STUDENT_USER } from './data/mockData';
import { calculateStats } from './utils/stats';

const STORAGE_KEY = 'university_feedback_records_v1';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<SidebarTab>('dashboard');
  
  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('university_feedback_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name === 'Dr. K. Ramesh') {
          parsed.name = 'Viswanath sir';
          parsed.email = 'viswanath.sir@university.edu';
        } else if (parsed.name === 'Dean of Academics') {
          parsed.name = 'Bhaskar rao sir';
          parsed.email = 'bhaskar.rao@university.edu';
        }
        return parsed;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_STUDENT_USER;
  });

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('university_feedback_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
    showToast(`Signed in successfully as ${user.name} (${user.role})`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('university_feedback_user');
    } catch (e) {
      console.error(e);
    }
    showToast('You have been logged out. Click Login anytime to sign back in.');
  };

  const handleSwitchUser = (user: UserProfile) => {
    handleLogin(user);
  };

  // Dark mode initialized from localStorage or default to false (matching original screenshot)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('university_feedback_darkmode') === 'true';
    } catch {
      return false;
    }
  });

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('university_feedback_darkmode', String(next));
      } catch (e) {
        console.error(e);
      }
      showToast(next ? 'Dark mode activated' : 'Light mode activated');
      return next;
    });
  };

  const handleResetDarkMode = () => {
    setDarkMode(false);
    try {
      localStorage.setItem('university_feedback_darkmode', 'false');
    } catch (e) {
      console.error(e);
    }
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
    showToast('Theme reset to original Light mode (Screenshot state)');
  };

  // Core Data State
  const [records, setRecords] = useState<FeedbackRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: FeedbackRecord[] = JSON.parse(saved);
        return parsed.map((r) =>
          r.facultyName === 'Dr. K. Ramesh' ? { ...r, facultyName: 'Viswanath sir' } : r
        );
      }
    } catch {
      // Fallback
    }
    return INITIAL_FEEDBACK_RECORDS;
  });

  // Filter State
  const [filters, setFilters] = useState<AnalyticalFiltersState>({
    semester: 'All Semesters (1 to 8)',
    branch: 'All Courses & Branches',
    faculty: 'All Faculty Members',
    student: 'All Students',
  });

  // Modal Visibility States
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);
  const [isInstallAppModalOpen, setIsInstallAppModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDataScienceModalOpen, setIsDataScienceModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.error('Storage sync error', e);
    }
  }, [records]);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchSem =
        filters.semester === 'All Semesters (1 to 8)' || r.semester === filters.semester;
      const matchBranch =
        filters.branch === 'All Courses & Branches' || r.branch === filters.branch;
      const matchFaculty =
        filters.faculty === 'All Faculty Members' || r.facultyName === filters.faculty;
      const matchStudent =
        !filters.student ||
        filters.student === 'All Students' ||
        r.studentName.toLowerCase() === filters.student.toLowerCase();

      return matchSem && matchBranch && matchFaculty && matchStudent;
    });
  }, [records, filters]);

  // Computed statistical metrics
  const stats = useMemo(() => {
    return calculateStats(filteredRecords);
  }, [filteredRecords]);

  // Filter handlers
  const handleFilterChange = (key: keyof AnalyticalFiltersState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      semester: 'All Semesters (1 to 8)',
      branch: 'All Courses & Branches',
      faculty: 'All Faculty Members',
      student: 'All Students',
    });
    showToast('Filters reset to default view');
  };

  // New feedback rating submission
  const handleAddFeedback = (newRecord: FeedbackRecord) => {
    setRecords((prev) => [newRecord, ...prev]);
    showToast(`Lecture feedback recorded: ${newRecord.overallRating}★ for ${newRecord.facultyName}`);
  };

  // Reset database handler
  const handleClearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecords(INITIAL_FEEDBACK_RECORDS);
    setFilters({
      semester: 'All Semesters (1 to 8)',
      branch: 'All Courses & Branches',
      faculty: 'All Faculty Members',
      student: 'All Students',
    });
    showToast('Database reset to initial 10 records');
  };

  // Module actions
  const handleSelectModule = (id: number) => {
    setSelectedModuleId(id);
    setIsModuleModalOpen(true);
  };

  const handleTriggerModuleAction = (id: number) => {
    setIsModuleModalOpen(false);
    switch (id) {
      case 1:
        setIsProfileModalOpen(true);
        break;
      case 2:
        setIsRateModalOpen(true);
        break;
      case 3:
        setIsHistoryModalOpen(true);
        break;
      case 4:
        setIsThemeModalOpen(true);
        break;
      case 5:
        setIsReportsModalOpen(true);
        break;
      default:
        break;
    }
  };

  // Clear Feedback History
  const handleClearHistory = () => {
    setRecords([]);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch (e) {
      console.error(e);
    }
    showToast('Feedback history has been cleared successfully.');
  };

  // Restore Default Sample Records
  const handleResetDefaultHistory = () => {
    setRecords(INITIAL_FEEDBACK_RECORDS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FEEDBACK_RECORDS));
    } catch (e) {
      console.error(e);
    }
    showToast('Restored initial default feedback evaluation records.');
  };

  // Sidebar navigation handler
  const handleSelectTab = (tab: SidebarTab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'dashboard':
        // Stay on dashboard
        break;
      case 'submit-feedback':
        setIsRateModalOpen(true);
        break;
      case 'feedback-history':
      case 'rating-history':
        setIsHistoryModalOpen(true);
        break;
      case 'session-history':
        setIsSessionModalOpen(true);
        break;
      case 'theme-analysis':
        setIsThemeModalOpen(true);
        break;
      case 'course-comparison':
        setIsComparisonModalOpen(true);
        break;
      case 'report-generation':
        setIsReportsModalOpen(true);
        break;
      case 'settings':
        setIsSettingsModalOpen(true);
        break;
      case 'help-guide':
        setIsHelpModalOpen(true);
        break;
    }
  };

  // Open Rate lecture with authentication guard
  const handleOpenRateLecture = () => {
    if (!currentUser) {
      showToast('Please sign in to submit a faculty lecture evaluation.');
      setIsLoginModalOpen(true);
      return;
    }
    setIsRateModalOpen(true);
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* 1. Left Sidebar */}
      <Sidebar
        currentUser={currentUser}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenModulesModal={() => {
          setSelectedModuleId(1);
          setIsModuleModalOpen(true);
        }}
        onOpenOfflineModal={() => setIsOfflineModalOpen(true)}
        onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenProfileModal={() => {
          if (currentUser) {
            setIsProfileModalOpen(true);
          } else {
            setIsLoginModalOpen(true);
          }
        }}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          currentUser={currentUser}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onOpenRateLecture={handleOpenRateLecture}
          onOpenModulesModal={() => {
            setSelectedModuleId(1);
            setIsModuleModalOpen(true);
          }}
          onOpenOfflineModal={() => setIsOfflineModalOpen(true)}
          onOpenInstallAppModal={() => setIsInstallAppModalOpen(true)}
          onOpenProfileModal={() => {
            if (currentUser) {
              setIsProfileModalOpen(true);
            } else {
              setIsLoginModalOpen(true);
            }
          }}
          onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
          onOpenDataScienceModal={() => setIsDataScienceModalOpen(true)}
        />

        {/* Dashboard Main View (Clean solid background without grid lines) */}
        <main className="flex-1 p-6 space-y-6 bg-slate-50 dark:bg-slate-950 overflow-y-auto pb-24">
          {/* Top Hero Banner */}
          <HeroBanner
            currentUser={currentUser}
            stats={stats}
            allRecords={records}
            onOpenRateLecture={handleOpenRateLecture}
            onOpenReportModal={() => setIsReportsModalOpen(true)}
            onOpenModelDetailModal={() => setIsDataScienceModalOpen(true)}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
            onSelectStudentFilter={(student) => handleFilterChange('student', student)}
            onSelectFacultyFilter={(faculty) => handleFilterChange('faculty', faculty)}
          />

          {/* Analytical Filters Bar (Adjusted directly beneath Hero Banner for immediate control) */}
          <AnalyticalFilters
            filters={filters}
            onChangeFilter={handleFilterChange}
            onResetFilters={handleResetFilters}
          />

          {/* Middle Architecture Modules Section */}
          <ArchitectureModules
            onSelectModule={handleSelectModule}
            onOpenVivaModal={() => {
              setSelectedModuleId(1);
              setIsModuleModalOpen(true);
            }}
          />

          {/* Extended Dashboard Analytics, Live Ledger & Benchmarks */}
          <DashboardExtendedSections
            records={filteredRecords}
            allRecords={records}
            stats={stats}
            filters={filters}
            currentUser={currentUser}
            onOpenRateLecture={handleOpenRateLecture}
            onOpenReportModal={() => setIsReportsModalOpen(true)}
            onOpenModuleModal={handleSelectModule}
            onSelectStudentFilter={(student) => handleFilterChange('student', student)}
            onSelectFacultyFilter={(faculty) => handleFilterChange('faculty', faculty)}
          />
        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* Modals & Dialogs */}
      <FeedbackModal
        isOpen={isRateModalOpen}
        onClose={() => {
          setIsRateModalOpen(false);
          if (activeTab === 'submit-feedback') setActiveTab('dashboard');
        }}
        onSubmit={handleAddFeedback}
        currentUser={currentUser}
        onOpenHistory={() => {
          setIsRateModalOpen(false);
          setIsHistoryModalOpen(true);
        }}
        onClearHistory={handleClearHistory}
      />

      <ReportsModal
        isOpen={isReportsModalOpen}
        onClose={() => {
          setIsReportsModalOpen(false);
          if (activeTab === 'report-generation') setActiveTab('dashboard');
        }}
        records={filteredRecords}
        stats={stats}
      />

      <ModuleDetailModal
        moduleId={selectedModuleId}
        isOpen={isModuleModalOpen}
        onClose={() => setIsModuleModalOpen(false)}
        onSelectModule={(id) => setSelectedModuleId(id)}
        onTriggerModuleAction={handleTriggerModuleAction}
      />

      <RatingHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => {
          setIsHistoryModalOpen(false);
          if (activeTab === 'feedback-history' || activeTab === 'rating-history') setActiveTab('dashboard');
        }}
        records={records}
        onClearHistory={handleClearHistory}
        onResetDefaultHistory={handleResetDefaultHistory}
        onOpenFeedbackModal={handleOpenRateLecture}
      />

      <SessionHistoryModal
        isOpen={isSessionModalOpen}
        onClose={() => {
          setIsSessionModalOpen(false);
          if (activeTab === 'session-history') setActiveTab('dashboard');
        }}
        onOpenFeedback={handleOpenRateLecture}
      />

      <ThemeAnalysisModal
        isOpen={isThemeModalOpen}
        onClose={() => {
          setIsThemeModalOpen(false);
          if (activeTab === 'theme-analysis') setActiveTab('dashboard');
        }}
        records={records}
      />

      <CourseComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => {
          setIsComparisonModalOpen(false);
          if (activeTab === 'course-comparison') setActiveTab('dashboard');
        }}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => {
          setIsSettingsModalOpen(false);
          if (activeTab === 'settings') setActiveTab('dashboard');
        }}
        onClearStorage={handleClearStorage}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onResetDarkMode={handleResetDarkMode}
      />

      <HelpGuideModal
        isOpen={isHelpModalOpen}
        onClose={() => {
          setIsHelpModalOpen(false);
          if (activeTab === 'help-guide') setActiveTab('dashboard');
        }}
      />

      <OfflineModal
        isOpen={isOfflineModalOpen}
        onClose={() => setIsOfflineModalOpen(false)}
        recordsCount={records.length}
      />

      <InstallAppModal
        isOpen={isInstallAppModalOpen}
        onClose={() => setIsInstallAppModalOpen(false)}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onOpenLogout={() => setIsLogoutModalOpen(true)}
        onSwitchUser={handleSwitchUser}
      />

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        currentUser={currentUser}
        onConfirmLogout={handleLogout}
        onSwitchUser={handleSwitchUser}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      <DataScienceModal
        isOpen={isDataScienceModalOpen}
        onClose={() => setIsDataScienceModalOpen(false)}
      />
    </div>
  );
}
