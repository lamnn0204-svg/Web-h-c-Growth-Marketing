import React from 'react';
import { Trophy, CheckCircle2, ShieldCheck, ArrowRight, Lightbulb, Compass, Database } from 'lucide-react';
import { SKILL_GAP_ANALYSIS, LEARNING_PHILOSOPHY } from '../data/skillTreeData';
import { IVIE_PRODUCT_OVERVIEW } from '../data/ivieData';

export const SkillTreeView: React.FC = () => {
  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Skill Tree & Triết Lý Chuyển Dịch Nghề Nghiệp (Career Transition)
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Bản đồ khoảng cách năng lực giữa Brand & Communication sang Growth Marketing cho Ngô Ngọc Lâm.
        </p>
      </div>

      {/* Philosophy Principles */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-amber-800/30 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">{LEARNING_PHILOSOPHY.headline}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {LEARNING_PHILOSOPHY.principles.map((pr, idx) => (
            <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-amber-300">{pr.title}</h4>
              <p className="text-slate-300 leading-relaxed">{pr.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Gap Comparison Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>📊</span> Bảng So Sánh Chi Tiết & Chiến Lược Cầu Nối (Bridging Strategy)
        </h3>

        <div className="space-y-4">
          {SKILL_GAP_ANALYSIS.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <span className="font-bold text-white text-sm">{item.dimension}</span>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded font-mono font-bold ${
                    item.gapLevel === 'High'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : item.gapLevel === 'Medium'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  Khoảng Cách: {item.gapLevel}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block font-semibold mb-1">Nền Tảng Brand & Comms Hiện Tại:</span>
                  <p className="text-slate-300">{item.brandComms}</p>
                </div>
                <div className="p-3 bg-emerald-950/20 rounded-lg border border-emerald-900/30">
                  <span className="text-emerald-400 block font-semibold mb-1">Năng Lực Growth Cần Đạt Được:</span>
                  <p className="text-emerald-200">{item.growthMarketing}</p>
                </div>
              </div>

              <div className="p-2.5 bg-cyan-950/30 rounded-lg border border-cyan-900/40 text-cyan-200">
                <strong>Chiến lược chuyển dịch:</strong> {item.bridgingStrategy}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Tagging Standard Box */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-3">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm sm:text-base font-bold text-white">
            Quy Chuẩn Nhãn Dữ Liệu (Data Tagging Standards) cho IVIE – Bác sĩ ơi
          </h3>
        </div>
        <p className="text-slate-300">
          Tuyệt đối không bịa đặt dữ liệu thực tế của IVIE. Mọi số liệu trong bài tập và case study đều tuân theo 4 nhãn:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
              REAL DATA
            </span>
            <p className="text-slate-400 text-[11px] mt-1.5">Dữ liệu công khai hoặc do chính bạn/công ty cung cấp xác thực.</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold">
              ASSUMPTION
            </span>
            <p className="text-slate-400 text-[11px] mt-1.5">Giả định học tập hợp lý về hành vi và bối cảnh người bệnh/bác sĩ.</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold">
              HYPOTHESIS
            </span>
            <p className="text-slate-400 text-[11px] mt-1.5">Giả thuyết tăng trưởng cần được kiểm chứng qua A/B test thực tế.</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono text-[10px] font-bold">
              SIMULATED DATA
            </span>
            <p className="text-slate-400 text-[11px] mt-1.5">Dữ liệu mô phỏng quy mô và tỷ lệ chuyển đổi dùng cho bài tập tính toán.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
