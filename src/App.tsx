/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { DailyLearningView } from './components/DailyLearningView';
import { CurriculumView } from './components/CurriculumView';
import { RoadmapView } from './components/RoadmapView';
import { ExperimentLabView } from './components/ExperimentLabView';
import { MetricsCheatSheetView } from './components/MetricsCheatSheetView';
import { PortfolioView } from './components/PortfolioView';
import { InterviewPrepView } from './components/InterviewPrepView';
import { SkillTreeView } from './components/SkillTreeView';
import { ExercisesView } from './components/ExercisesView';
import { ResourcesView } from './components/ResourcesView';
import { AIMentorDrawer } from './components/AIMentorDrawer';
import { useLearningStore } from './hooks/useLearningStore';
import { getDayData } from './data/curriculumData';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isMentorOpen, setIsMentorOpen] = useState(false);

  const {
    state,
    setCurrentDay,
    saveSubmission,
    saveReflection,
    saveQuizScore,
    toggleTaskCompletion,
    markDayCompleted,
    addExperiment,
    updateExperiment,
    updatePortfolioChapter
  } = useLearningStore();

  const currentDayData = getDayData(state.currentDay);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      {/* Top Global Header */}
      <Header
        currentDay={state.currentDay}
        streak={state.streak}
        studyHours={state.studyHours}
        completedTasksCount={state.completedTasks.length}
        totalDaysCompleted={state.completedDays.length}
        onOpenMentor={() => setIsMentorOpen(true)}
        onSelectDay={(day) => setCurrentDay(day)}
      />

      {/* Main Layout: Sidebar + Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          currentDay={state.currentDay}
        />

        {/* Content Viewer */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950/90">
          {activeTab === 'dashboard' && (
            <DashboardView
              state={state}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectDay={(day) => setCurrentDay(day)}
            />
          )}

          {activeTab === 'today' && (
            <DailyLearningView
              currentDay={state.currentDay}
              state={state}
              onSelectDay={(day) => setCurrentDay(day)}
              onSaveSubmission={saveSubmission}
              onSaveReflection={saveReflection}
              onSaveQuizScore={saveQuizScore}
              onToggleTask={toggleTaskCompletion}
              onOpenMentor={() => setIsMentorOpen(true)}
            />
          )}

          {activeTab === 'curriculum' && (
            <CurriculumView
              currentDay={state.currentDay}
              completedDays={state.completedDays}
              onSelectDay={(day) => setCurrentDay(day)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'roadmap' && (
            <RoadmapView
              currentDay={state.currentDay}
              completedDays={state.completedDays}
              onSelectDay={(day) => setCurrentDay(day)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'exercises' && (
            <ExercisesView
              state={state}
              onSelectDay={(day) => setCurrentDay(day)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'experiment_lab' && (
            <ExperimentLabView
              experiments={state.experiments}
              onAddExperiment={addExperiment}
              onUpdateExperiment={updateExperiment}
            />
          )}

          {activeTab === 'analytics' && <MetricsCheatSheetView />}

          {activeTab === 'portfolio' && (
            <PortfolioView
              chapters={state.portfolioChapters}
              onUpdateChapter={updatePortfolioChapter}
            />
          )}

          {activeTab === 'interview_prep' && <InterviewPrepView />}

          {activeTab === 'skill_tree' && <SkillTreeView />}

          {activeTab === 'resources' && <ResourcesView />}
        </main>
      </div>

      {/* Floating AI Mentor Drawer */}
      <AIMentorDrawer
        isOpen={isMentorOpen}
        onClose={() => setIsMentorOpen(false)}
        currentDay={state.currentDay}
        currentTopic={currentDayData.title}
      />
    </div>
  );
}
