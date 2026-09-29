import React, { useState } from 'react';
import {
  FlaskConical,
  Plus,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowUpDown,
  Search,
  Sparkles,
  ChevronDown,
  X
} from 'lucide-react';
import { GrowthExperiment, ExperimentStatus } from '../data/experimentsData';

interface ExperimentLabViewProps {
  experiments: GrowthExperiment[];
  onAddExperiment: (exp: GrowthExperiment) => void;
  onUpdateExperiment: (id: string, updates: Partial<GrowthExperiment>) => void;
}

export const ExperimentLabView: React.FC<ExperimentLabViewProps> = ({
  experiments,
  onAddExperiment,
  onUpdateExperiment
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New experiment form state
  const [formData, setFormData] = useState({
    name: '',
    problem: '',
    insight: '',
    hypothesis: '',
    segment: '',
    proposedChange: '',
    primaryMetric: '',
    secondaryMetric: '',
    guardrailMetric: '',
    expectedResult: '',
    impact: 7,
    confidence: 7,
    effort: 4,
    reachEstimate: 10000,
    durationDays: 14,
    decisionRule: '',
    status: 'Prioritized' as ExperimentStatus
  });

  const statuses: (ExperimentStatus | 'All')[] = [
    'All',
    'Backlog',
    'Prioritized',
    'Running',
    'Validated',
    'Completed',
    'Invalidated',
    'Iterate'
  ];

  const filteredExperiments = experiments.filter((exp) => {
    const matchesStatus = selectedStatus === 'All' || exp.status === selectedStatus;
    const matchesSearch =
      exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.hypothesis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.primaryMetric.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const calculateScores = (impact: number, confidence: number, effort: number, reach: number) => {
    const ease = Math.max(1, 11 - effort);
    const ice = Number(((impact + confidence + ease) / 3).toFixed(1));
    const rice = effort > 0 ? Math.round((reach * impact * confidence) / (effort * 1000)) : 0;
    return { ice, rice };
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const { ice, rice } = calculateScores(
      formData.impact,
      formData.confidence,
      formData.effort,
      formData.reachEstimate
    );

    const newExp: GrowthExperiment = {
      id: `exp-${Date.now()}`,
      name: formData.name,
      problem: formData.problem,
      insight: formData.insight,
      hypothesis: formData.hypothesis,
      segment: formData.segment,
      proposedChange: formData.proposedChange,
      primaryMetric: formData.primaryMetric,
      secondaryMetric: formData.secondaryMetric,
      guardrailMetric: formData.guardrailMetric,
      expectedResult: formData.expectedResult,
      effort: formData.effort,
      impact: formData.impact,
      confidence: formData.confidence,
      iceScore: ice,
      riceScore: rice,
      reachEstimate: formData.reachEstimate,
      durationDays: formData.durationDays,
      decisionRule: formData.decisionRule,
      status: formData.status,
      tag: 'HYPOTHESIS'
    };

    onAddExperiment(newExp);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      problem: '',
      insight: '',
      hypothesis: '',
      segment: '',
      proposedChange: '',
      primaryMetric: '',
      secondaryMetric: '',
      guardrailMetric: '',
      expectedResult: '',
      impact: 7,
      confidence: 7,
      effort: 4,
      reachEstimate: 10000,
      durationDays: 14,
      decisionRule: '',
      status: 'Prioritized'
    });
  };

  const currentScores = calculateScores(
    formData.impact,
    formData.confidence,
    formData.effort,
    formData.reachEstimate
  );

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Growth Experiment Lab (Phòng Thử Nghiệm Tăng Trưởng)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Quản lý Backlog thử nghiệm, chấm điểm ICE/RICE, thiết lập chỉ số bảo hiểm (Guardrail) cho IVIE – Bác sĩ ơi.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-md shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo Thử Nghiệm Mới</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedStatus === st
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên hoặc metric..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Experiments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredExperiments.map((exp) => (
          <div
            key={exp.id}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-sm"
          >
            {/* Top row */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                  {exp.id} • {exp.segment}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-cyan-800/40 font-mono">
                    {exp.tag}
                  </span>
                  <select
                    value={exp.status}
                    onChange={(e) => onUpdateExperiment(exp.id, { status: e.target.value as ExperimentStatus })}
                    className={`text-[11px] font-bold px-2 py-1 rounded border-0 cursor-pointer ${
                      exp.status === 'Validated'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : exp.status === 'Running'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {statuses.filter((s) => s !== 'All').map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <h3 className="text-sm font-bold text-white mb-2 leading-snug">{exp.name}</h3>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs space-y-2 mb-3">
                <p className="text-slate-300">
                  <strong className="text-emerald-400 font-semibold">Giả thuyết:</strong> "{exp.hypothesis}"
                </p>
                <p className="text-slate-400 text-[11px]">
                  <strong className="text-slate-300">Hành động:</strong> {exp.proposedChange}
                </p>
              </div>
            </div>

            {/* Metrics & Scores */}
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400 block text-[10px]">Primary Metric</span>
                  <span className="font-bold text-cyan-300 truncate block">{exp.primaryMetric}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400 block text-[10px]">Guardrail Metric</span>
                  <span className="font-bold text-amber-300 truncate block">{exp.guardrailMetric}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400 block text-[10px]">Thời lượng</span>
                  <span className="font-bold text-slate-200 block">{exp.durationDays} ngày</span>
                </div>
              </div>

              {/* Scoring pill */}
              <div className="flex items-center justify-between p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span>Impact: <strong className="text-white">{exp.impact}/10</strong></span>
                  <span>Confidence: <strong className="text-white">{exp.confidence}/10</strong></span>
                  <span>Effort: <strong className="text-white">{exp.effort}/10</strong></span>
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <span className="text-emerald-400">ICE: {exp.iceScore}</span>
                  <span className="text-cyan-400">RICE: {exp.riceScore}</span>
                </div>
              </div>

              {/* Learning / Result if any */}
              {exp.result && (
                <div className="p-2.5 bg-emerald-950/20 rounded-lg border border-emerald-900/30 text-[11px] text-emerald-200">
                  <strong>Kết quả:</strong> {exp.result}
                  {exp.learning && <p className="text-slate-400 mt-1">💡 <em>Bài học: {exp.learning}</em></p>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Experiment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Thiết Kế Thử Nghiệm Mới Cho IVIE</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Tên Thử Nghiệm:</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="VD: Smart Search: Gợi ý chuyên khoa theo triệu chứng dân gian..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Vấn Đề / Điểm Nghẽn (Problem):</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    placeholder="Mô tả số liệu drop-off hoặc rào cản..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Insight Hành Vi (Insight):</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.insight}
                    onChange={(e) => setFormData({ ...formData, insight: e.target.value })}
                    placeholder="Tại sao người bệnh lại hành xử như vậy..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Giả Thuyết Tăng Trưởng (Hypothesis):</label>
                <input
                  type="text"
                  required
                  value={formData.hypothesis}
                  onChange={(e) => setFormData({ ...formData, hypothesis: e.target.value })}
                  placeholder="Nếu [Làm X] cho [Tập Y], thì [Metric Z] sẽ tăng [%] bởi vì [Lý do]..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Primary Metric:</label>
                  <input
                    type="text"
                    required
                    value={formData.primaryMetric}
                    onChange={(e) => setFormData({ ...formData, primaryMetric: e.target.value })}
                    placeholder="VD: Search-to-Book CVR"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Guardrail Metric:</label>
                  <input
                    type="text"
                    required
                    value={formData.guardrailMetric}
                    onChange={(e) => setFormData({ ...formData, guardrailMetric: e.target.value })}
                    placeholder="VD: Cancellation Rate < 3%"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Phân Khúc (Segment):</label>
                  <input
                    type="text"
                    required
                    value={formData.segment}
                    onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                    placeholder="VD: New Users tại Hà Nội"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Scoring Sliders */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="font-bold text-white block">Chấm Điểm ICE & RICE Tự Động:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Impact (Tác động):</span>
                      <strong className="text-emerald-400">{formData.impact}/10</strong>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={formData.impact}
                      onChange={(e) => setFormData({ ...formData, impact: Number(e.target.value) })}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Confidence (Độ tin cậy):</span>
                      <strong className="text-cyan-400">{formData.confidence}/10</strong>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={formData.confidence}
                      onChange={(e) => setFormData({ ...formData, confidence: Number(e.target.value) })}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Effort (Công sức):</span>
                      <strong className="text-amber-400">{formData.effort}/10</strong>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={formData.effort}
                      onChange={(e) => setFormData({ ...formData, effort: Number(e.target.value) })}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 font-mono">
                  <span>Điểm dự tính:</span>
                  <div className="flex gap-4">
                    <span className="text-emerald-400 font-bold">ICE Score: {currentScores.ice}</span>
                    <span className="text-cyan-400 font-bold">RICE Score: {currentScores.rice}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold cursor-pointer"
                >
                  Lưu Vào Experiment Lab
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
