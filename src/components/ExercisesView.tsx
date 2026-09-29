import React, { useState } from 'react';
import { FileEdit, CheckCircle2, Clock, Award, ArrowRight, Search, ChevronRight } from 'lucide-react';
import { DAYS_DATA, getDayData } from '../data/curriculumData';
import { StoredAppState } from '../hooks/useLearningStore';

interface ExercisesViewProps {
  state: StoredAppState;
  onSelectDay: (day: number) => void;
  onNavigateTab: (tab: any) => void;
}

export const ExercisesView: React.FC<ExercisesViewProps> = ({ state, onSelectDay, onNavigateTab }) => {
  const [filter, setFilter] = useState<'All' | 'Submitted' | 'Pending'>('All');
  const [search, setSearch] = useState('');

  const allTasks = DAYS_DATA.map((d) => ({
    day: d.day,
    phaseTitle: d.phaseTitle,
    task: d.evening.tasks[0],
    outputTitle: d.outputOfTheDay.title,
    submission: state.submissions[d.evening.tasks[0]?.id]
  }));

  const filteredTasks = allTasks.filter((t) => {
    const isSubmitted = !!t.submission;
    const matchesFilter =
      filter === 'All' || (filter === 'Submitted' && isSubmitted) || (filter === 'Pending' && !isSubmitted);
    const matchesSearch =
      t.task?.title.toLowerCase().includes(search.toLowerCase()) ||
      t.outputTitle.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <FileEdit className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Trung Tâm Bài Tập & Đánh Giá Mentor (Exercises & Reviews)
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Toàn bộ bài tập thực hành 30 ngày, sản phẩm tạo ra cho IVIE và điểm số đánh giá từ Lâm's Growth Mentor.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div className="flex gap-2">
          {['All', 'Submitted', 'Pending'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                filter === f ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {f === 'All' ? 'Tất cả' : f === 'Submitted' ? 'Đã nộp bài' : 'Chưa làm'}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm bài tập hoặc output..."
          className="w-full sm:w-64 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        />
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((item) => {
          const isSubmitted = !!item.submission;
          const score = item.submission?.feedback?.score;

          return (
            <div
              key={item.day}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-cyan-400 font-bold">
                    NGÀY {item.day < 10 ? `0${item.day}` : item.day}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="font-semibold text-white">{item.task?.title}</span>
                  {isSubmitted && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                      Đã Nộp
                    </span>
                  )}
                </div>
                <p className="text-slate-400 line-clamp-1">{item.task?.description}</p>
                <p className="text-[11px] text-emerald-300">
                  Output: <strong>{item.outputTitle}</strong>
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {score !== undefined && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono font-bold">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Điểm: {score}/10</span>
                  </div>
                )}
                <button
                  onClick={() => {
                    onSelectDay(item.day);
                    onNavigateTab('today');
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-colors cursor-pointer"
                >
                  {isSubmitted ? 'Xem Lại & Sửa Bài' : 'Làm Bài Ngay'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
