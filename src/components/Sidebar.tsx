import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Target,
  FileEdit,
  BarChart3,
  FlaskConical,
  Briefcase,
  BrainCircuit,
  Library,
  Trophy,
  Activity
} from 'lucide-react';

export type NavTab =
  | 'dashboard'
  | 'curriculum'
  | 'roadmap'
  | 'today'
  | 'exercises'
  | 'analytics'
  | 'experiment_lab'
  | 'portfolio'
  | 'interview_prep'
  | 'resources'
  | 'skill_tree';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentDay: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab, currentDay }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'today', label: `Bài Học Hôm Nay (D${currentDay < 10 ? `0${currentDay}` : currentDay})`, icon: Target, highlight: true },
    { id: 'curriculum', label: 'Curriculum (30 Ngày)', icon: BookOpen },
    { id: 'roadmap', label: '30-Day Roadmap', icon: CalendarDays },
    { id: 'exercises', label: 'Bài Tập & Review', icon: FileEdit },
    { id: 'experiment_lab', label: 'Growth Experiment Lab', icon: FlaskConical },
    { id: 'portfolio', label: 'IVIE Capstone Portfolio', icon: Briefcase },
    { id: 'analytics', label: 'Metrics & Calculators', icon: BarChart3 },
    { id: 'interview_prep', label: 'Interview Prep (50Q)', icon: BrainCircuit },
    { id: 'skill_tree', label: 'Skill Gap & Triết Lý', icon: Trophy },
    { id: 'resources', label: 'Thư Viện Tài Nguyên', icon: Library }
  ];

  return (
    <aside className="w-full lg:w-64 border-r border-slate-800 bg-slate-950/60 p-3 sm:p-4 flex flex-col shrink-0">
      {/* Product Case Badge */}
      <div className="mb-4 p-3 rounded-xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-800/30">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Activity className="w-3.5 h-3.5" />
          <span>Case Study Xuyên Suốt</span>
        </div>
        <p className="text-sm font-bold text-white">IVIE – Bác sĩ ơi</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Đặt khám • Telemedicine • Hồ sơ số</p>
      </div>

      {/* Nav List */}
      <nav className="space-y-1 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id as NavTab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : item.highlight
                  ? 'text-cyan-300 hover:bg-slate-900 hover:text-white border border-cyan-500/20 bg-cyan-950/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : item.highlight ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Student Badge Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Học viên: <strong className="text-slate-200">Ngô Ngọc Lâm</strong></span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">30D Bootcamp</span>
      </div>
    </aside>
  );
};
