import React, { useState } from 'react';
import { BookOpen, CheckCircle, ChevronRight, Target, Clock, CalendarDays } from 'lucide-react';
import { PHASES, getDayData } from '../data/curriculumData';

interface CurriculumViewProps {
  currentDay: number;
  completedDays: number[];
  onSelectDay: (day: number) => void;
  onNavigateTab: (tab: any) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  currentDay,
  completedDays,
  onSelectDay,
  onNavigateTab
}) => {
  const [selectedPhase, setSelectedPhase] = useState<number>(1);

  const activePhaseInfo = PHASES.find((p) => p.phase === selectedPhase) || PHASES[0];
  const [startDay, endDay] = activePhaseInfo.days.split('-').map((s) => parseInt(s.trim()));
  const daysInPhase = Array.from({ length: endDay - startDay + 1 }, (_, i) => startDay + i);

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Chương Trình Huấn Luyện 30 Ngày (Curriculum)
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          10 Phase tăng trưởng thực chiến, 40% lý thuyết hệ thống buổi sáng, 60% thực hành output buổi tối cho IVIE – Bác sĩ ơi.
        </p>
      </div>

      {/* Phase Selector Horizontal Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {PHASES.map((p) => {
          const isSelected = p.phase === selectedPhase;
          return (
            <button
              key={p.phase}
              onClick={() => setSelectedPhase(p.phase)}
              className={`p-3 rounded-xl border text-left shrink-0 w-52 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-white shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                <span className={isSelected ? 'text-emerald-400' : 'text-slate-400'}>PHASE {p.phase}</span>
                <span>Ngày {p.days}</span>
              </div>
              <h4 className="text-xs font-bold truncate text-slate-200">{p.title}</h4>
              <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{p.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Active Phase Details */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400">
              PHASE {activePhaseInfo.phase}: {activePhaseInfo.days}
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">{activePhaseInfo.title}</h3>
            <p className="text-xs text-slate-300 mt-1">{activePhaseInfo.desc}</p>
          </div>
        </div>

        {/* Days in Phase */}
        <div className="space-y-3">
          {daysInPhase.map((dayNum) => {
            const data = getDayData(dayNum);
            const isCompleted = completedDays.includes(dayNum);
            const isCurrent = currentDay === dayNum;

            return (
              <div
                key={dayNum}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCurrent
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : isCompleted
                    ? 'bg-slate-950/70 border-slate-800/80 text-slate-300'
                    : 'bg-slate-950/40 border-slate-800/50 text-slate-400'
                }`}
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isCurrent
                          ? 'bg-emerald-500 text-slate-950'
                          : isCompleted
                          ? 'bg-slate-800 text-emerald-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Ngày {dayNum < 10 ? `0${dayNum}` : dayNum}
                    </span>
                    <h4 className="text-sm font-bold text-white">{data.title}</h4>
                    {isCompleted && (
                      <CheckCircle className="w-4 h-4 text-emerald-400 inline shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300">{data.objective}</p>
                  <p className="text-[11px] text-cyan-300">
                    Output: <strong>{data.outputOfTheDay.title}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectDay(dayNum);
                      onNavigateTab('today');
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                        : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {isCurrent ? 'Tiếp Tục Học' : 'Mở Bài Học'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
