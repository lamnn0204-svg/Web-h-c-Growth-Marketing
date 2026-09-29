import React from 'react';
import { CalendarDays, CheckCircle2, Circle, Flame, ArrowRight } from 'lucide-react';
import { PHASES, getDayData } from '../data/curriculumData';

interface RoadmapViewProps {
  currentDay: number;
  completedDays: number[];
  onSelectDay: (day: number) => void;
  onNavigateTab: (tab: any) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  currentDay,
  completedDays,
  onSelectDay,
  onNavigateTab
}) => {
  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Lộ Trình Tăng Trưởng 30 Ngày (30-Day Growth Roadmap)
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Theo dõi hành trình chinh phục từng cột mốc kiến thức và sản phẩm thực chiến cho IVIE – Bác sĩ ơi.
        </p>
      </div>

      {/* 30 Days Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((dayNum) => {
          const data = getDayData(dayNum);
          const isCompleted = completedDays.includes(dayNum);
          const isCurrent = currentDay === dayNum;

          return (
            <button
              key={dayNum}
              onClick={() => {
                onSelectDay(dayNum);
                onNavigateTab('today');
              }}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between h-36 cursor-pointer group ${
                isCurrent
                  ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500'
                  : isCompleted
                  ? 'bg-slate-900/90 border-emerald-900/40 hover:border-emerald-700'
                  : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isCurrent ? 'text-emerald-300' : isCompleted ? 'text-emerald-400' : 'text-slate-400'
                    }`}
                  >
                    D{dayNum < 10 ? `0${dayNum}` : dayNum}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-200 line-clamp-2 group-hover:text-white transition-colors">
                  {data.title}
                </h4>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[10px] text-cyan-400 truncate block font-medium">
                  {data.phaseTitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 10 Phases Milestones Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-white">
          Cột Mốc Portfolio Đạt Được Qua Từng Phase:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {PHASES.map((p) => (
            <div key={p.phase} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
              <div className="flex items-center justify-between font-mono font-bold text-[11px]">
                <span className="text-emerald-400">PHASE {p.phase}: Ngày {p.days}</span>
                <span className="text-slate-400">{p.title}</span>
              </div>
              <p className="text-slate-300">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
