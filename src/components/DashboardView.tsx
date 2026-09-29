import React from 'react';
import {
  Sparkles,
  Flame,
  Clock,
  CheckCircle2,
  Trophy,
  ArrowRight,
  TrendingUp,
  Target,
  FileCheck,
  FlaskConical,
  BarChart,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { PHASES, getDayData } from '../data/curriculumData';
import { IVIE_PRODUCT_OVERVIEW, IVIE_SIMULATED_FUNNEL } from '../data/ivieData';
import { SKILL_GAP_ANALYSIS } from '../data/skillTreeData';
import { StoredAppState } from '../hooks/useLearningStore';

interface DashboardViewProps {
  state: StoredAppState;
  onNavigateTab: (tab: any) => void;
  onSelectDay: (day: number) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  state,
  onNavigateTab,
  onSelectDay
}) => {
  const currentDayData = getDayData(state.currentDay);
  const totalDays = 30;
  const progressPercent = Math.round((state.completedDays.length / totalDays) * 100);
  const currentPhase = PHASES.find((p) => p.phase === currentDayData.phase) || PHASES[0];

  const activeExperiments = state.experiments.filter((e) => e.status === 'Running' || e.status === 'Validated');

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/50 border border-slate-800 p-6 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lam's Growth Academy • Dashboard Học Growth Marketing 30 Ngày</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Chào Ngô Ngọc Lâm, chào mừng bạn đến với Lam's Growth Academy!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Bạn đang ở <strong className="text-emerald-400">Ngày {state.currentDay} / 30</strong> thuộc{' '}
              <strong className="text-cyan-300">Phase {currentPhase.phase}: {currentPhase.title}</strong>. Hôm nay chúng ta sẽ tiếp tục mổ xẻ bài toán tăng trưởng cho <strong className="text-white">IVIE – Bác sĩ ơi</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigateTab('today')}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <span>Vào Bài Học Ngày {state.currentDay}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('portfolio')}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
            >
              <span>Xem Portfolio IVIE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1: Current Day */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Ngày Hiện Tại</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white">D{state.currentDay < 10 ? `0${state.currentDay}` : state.currentDay}</span>
            <span className="text-xs text-slate-400 ml-1">/ 30</span>
          </div>
          <p className="text-[10px] text-emerald-400 font-medium mt-1 truncate">{currentPhase.title}</p>
        </div>

        {/* Card 2: Progress */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Tiến Độ Tổng</span>
            <TrendingUp className="w-4 h-4 text-teal-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-teal-400 h-full rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Card 3: Streak */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Daily Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-amber-400">{state.streak}</span>
            <span className="text-xs text-slate-400 ml-1">ngày liên tục</span>
          </div>
          <p className="text-[10px] text-amber-400/80 font-medium mt-1">Giữ phong độ rất tốt!</p>
        </div>

        {/* Card 4: Study Hours */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Giờ Thực Chiến</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white">{state.studyHours}h</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Mục tiêu: ~60 giờ</p>
        </div>

        {/* Card 5: Completed Tasks */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Bài Tập Đã Nộp</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white">{state.completedTasks.length}</span>
            <span className="text-xs text-slate-400 ml-1">tasks</span>
          </div>
          <p className="text-[10px] text-emerald-400/90 mt-1 font-medium">Đã có đánh giá Mentor</p>
        </div>

        {/* Card 6: Portfolio Output */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Chương Portfolio</span>
            <FileCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white">21</span>
            <span className="text-xs text-slate-400 ml-1">chương IVIE</span>
          </div>
          <p className="text-[10px] text-indigo-400 mt-1 font-medium">Sẵn sàng xuất PDF/MD</p>
        </div>
      </div>

      {/* Main Grid: Today's Mission & IVIE Simulated Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Today's Learning Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Mục Tiêu Hôm Nay • Ngày {currentDayData.day}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {currentDayData.title}
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('today')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Chi tiết đầy đủ</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Morning Plan */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Sáng: 09:30 – 11:30 (40% Lý thuyết)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                    2 Giờ
                  </span>
                </div>
                <div className="space-y-2">
                  {currentDayData.morning.breakdown.map((item, idx) => (
                    <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-slate-400 font-mono shrink-0 text-[11px]">{item.time}</span>
                      <span className="font-medium text-slate-200">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evening Practice */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    Tối: Thực hành IVIE (60% Output)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                    Output
                  </span>
                </div>
                <div className="space-y-2.5">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                    <p className="text-slate-400 text-[11px] mb-1 font-semibold">Tài sản tạo ra hôm nay:</p>
                    <p className="font-bold text-emerald-300">{currentDayData.outputOfTheDay.title}</p>
                  </div>
                  <p className="text-xs text-slate-400">
                    Nộp bài tập để Lâm's Growth Mentor chấm điểm từ 0-10 và đưa ra câu hỏi phản biện Socratic.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Kỹ năng đưa vào CV: <strong className="text-slate-200">{currentDayData.careerApplication.skillGained}</strong>
              </span>
              <button
                onClick={() => onNavigateTab('today')}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs font-semibold transition-colors cursor-pointer"
              >
                Làm bài ngay
              </button>
            </div>
          </div>

          {/* Skill Gap Bridge Summary */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Bản Đồ Nâng Cấp Năng Lực (Brand & Comms → Growth Marketing)
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('skill_tree')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
              >
                Xem chi tiết
              </button>
            </div>

            <div className="space-y-3">
              {SKILL_GAP_ANALYSIS.slice(0, 3).map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs">
                  <div className="flex items-center justify-between font-semibold mb-1">
                    <span className="text-white">{item.dimension}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                      Gap: {item.gapLevel}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-400 mt-2">
                    <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                      <span className="text-slate-400 block font-semibold mb-0.5">Brand & Comms:</span>
                      {item.brandComms}
                    </div>
                    <div className="bg-emerald-950/20 p-2 rounded border border-emerald-900/30 text-emerald-200">
                      <span className="text-emerald-400 block font-semibold mb-0.5">Growth Marketing:</span>
                      {item.growthMarketing}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: IVIE Baseline Funnel & Active Experiments */}
        <div className="space-y-6">
          {/* IVIE Baseline Funnel Widget */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BarChart className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Phễu Chuẩn IVIE</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                SIMULATED DATA
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              Dữ liệu mô phỏng phục vụ rèn luyện kỹ năng phân tích điểm nghẽn rò rỉ (Leaky Funnel):
            </p>

            <div className="space-y-2">
              {IVIE_SIMULATED_FUNNEL.map((step, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-300 font-medium truncate max-w-[170px]">{step.step}</span>
                    <span className="text-emerald-400 font-bold font-mono">{step.count.toLocaleString('vi-VN')}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>CVR từ bước trước:</span>
                    <span className={`font-mono font-semibold ${step.cvrFromPrev < 50 ? 'text-rose-400' : 'text-slate-300'}`}>
                      {step.cvrFromPrev}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 p-2 bg-slate-950/80 rounded-lg border border-slate-800/80 text-[10px] text-slate-400 flex items-start gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Điểm rơi lớn nhất: Từ <strong>Đăng ký</strong> sang <strong>Tìm kiếm Bác sĩ</strong> (rơi mất 45%).
              </span>
            </div>
          </div>

          {/* Active Growth Experiments Widget */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Thử Nghiệm Đang Chạy</h3>
              </div>
              <button
                onClick={() => onNavigateTab('experiment_lab')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
              >
                Lab ({state.experiments.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {activeExperiments.slice(0, 3).map((exp) => (
                <div key={exp.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                      exp.status === 'Validated'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}>
                      {exp.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">ICE: {exp.iceScore}</span>
                  </div>
                  <p className="font-semibold text-slate-200 line-clamp-2 mb-1">{exp.name}</p>
                  <p className="text-[10px] text-slate-400">Metric: <span className="text-cyan-300">{exp.primaryMetric}</span></p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateTab('experiment_lab')}
              className="w-full mt-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors text-center cursor-pointer"
            >
              Mở Experiment Lab & ICE Calculator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
