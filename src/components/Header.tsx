import React from 'react';
import { Sparkles, Flame, CheckCircle, Clock, BookOpen, Bot } from 'lucide-react';

interface HeaderProps {
  currentDay: number;
  streak: number;
  studyHours: number;
  completedTasksCount: number;
  totalDaysCompleted: number;
  onOpenMentor: () => void;
  onSelectDay: (day: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentDay,
  streak,
  studyHours,
  completedTasksCount,
  totalDaysCompleted,
  onOpenMentor,
  onSelectDay
}) => {
  const progressPercent = Math.round((totalDaysCompleted / 30) * 100);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 py-3.5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Brand & Title */}
        <div className="flex items-center space-x-3.5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Lam's Growth Academy
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
                  Ngô Ngọc Lâm
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Dashboard học Growth Marketing 30 ngày • Case Study: <span className="text-cyan-300 font-semibold">IVIE – Bác sĩ ơi</span>
            </p>
          </div>
        </div>

        {/* Quick Stats & Actions */}
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-4">
          {/* Day Selector Pill */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <span className="text-slate-400 px-2 font-medium">Ngày:</span>
            <select
              value={currentDay}
              onChange={(e) => onSelectDay(Number(e.target.value))}
              aria-label="Chọn ngày học"
              className="bg-slate-800 text-emerald-300 font-bold px-2 py-1 rounded border-0 focus:ring-1 focus:ring-emerald-500 cursor-pointer text-xs"
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  Ngày {d < 10 ? `0${d}` : d} / 30
                </option>
              ))}
            </select>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1.5 rounded-lg text-amber-400 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>{streak} Ngày Streak</span>
          </div>

          {/* Study Hours */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-lg text-slate-300 text-xs font-medium">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>{studyHours}h Học</span>
          </div>

          {/* Overall Progress */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-lg text-xs font-medium">
            <span className="text-slate-400">Tiến độ:</span>
            <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-emerald-400 font-bold">{progressPercent}%</span>
          </div>

          {/* AI Mentor Button */}
          <button
            onClick={onOpenMentor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5 text-slate-950" />
            <span>Hỏi Lâm's Mentor</span>
          </button>
        </div>
      </div>
    </header>
  );
};
