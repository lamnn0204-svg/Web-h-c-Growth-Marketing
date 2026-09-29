import React, { useState } from 'react';
import {
  BarChart3,
  Calculator,
  Search,
  Filter,
  AlertCircle,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { GROWTH_METRICS, GrowthMetric } from '../data/metricsData';

export const MetricsCheatSheetView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCalculatorMetricId, setActiveCalculatorMetricId] = useState<string>('cac');
  const [calcInputs, setCalcInputs] = useState<Record<string, number>>({
    totalCost: 50000000,
    newUsers: 500,
    signups: 1000,
    activatedUsers: 320,
    cohortSize: 5000,
    activeAtD30: 850,
    cac: 180000,
    avgRevenuePerVisit: 120000,
    visitsPerYear: 3,
    lifespanYears: 2
  });

  const categories = ['All', 'Acquisition', 'Activation', 'Retention', 'Engagement', 'Monetization', 'Experimentation'];

  const filteredMetrics = GROWTH_METRICS.filter((m) => {
    const matchesCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.ivieExample.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeCalcMetric = GROWTH_METRICS.find((m) => m.id === activeCalculatorMetricId && m.calculator);

  const calcResult = activeCalcMetric?.calculator?.calculate(calcInputs);

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Growth Metrics Dictionary & Interactive Calculators
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Bảng tra cứu toàn diện công thức, ứng dụng, ví dụ IVIE và máy tính chỉ số trực quan cho Growth Marketer.
        </p>
      </div>

      {/* Interactive Calculator Box */}
      {activeCalcMetric && activeCalcMetric.calculator && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-800/40 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm sm:text-base font-bold text-white">
                Máy Tính Chỉ Số Trực Quan: {activeCalcMetric.name}
              </h3>
            </div>
            <div className="flex gap-2">
              {['cac', 'activation_rate', 'retention_cohort', 'ltv_cac'].map((id) => (
                <button
                  key={id}
                  onClick={() => setActiveCalculatorMetricId(id)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    activeCalculatorMetricId === id
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Inputs */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {activeCalcMetric.calculator.inputs.map((inp) => (
                <div key={inp.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <label className="text-slate-300 block mb-1 font-semibold">{inp.label}:</label>
                  <input
                    type="number"
                    value={calcInputs[inp.id] ?? inp.defaultValue}
                    onChange={(e) => setCalcInputs({ ...calcInputs, [inp.id]: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              ))}
            </div>

            {/* Result Display */}
            {calcResult && (
              <div className="p-4 bg-slate-950 rounded-xl border border-cyan-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">KẾT QUẢ TÍNH TOÁN:</span>
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono mt-1">
                    {calcResult.value.toLocaleString('vi-VN')} {calcResult.unit}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                    💡 <strong>Đánh giá:</strong> {calcResult.interpretation}
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 font-mono pt-3 border-t border-slate-800/80 mt-3">
                  Công thức: {activeCalcMetric.formula}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === c
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm metric, công thức..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Metrics List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMetrics.map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3 shadow-sm text-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-base font-bold text-white">{m.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono font-semibold">
                  {m.category}
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed mb-3">{m.definition}</p>

              {/* Formula */}
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 mb-3">
                <span className="text-slate-400 text-[10px] block font-sans">CÔNG THỨC:</span>
                {m.formula}
              </div>

              {/* IVIE Example */}
              <div className="p-3 bg-emerald-950/20 rounded-xl border border-emerald-900/30 text-emerald-200 mb-3">
                <strong className="text-emerald-400 block mb-1">🏥 Ví dụ thực tế tại IVIE – Bác sĩ ơi:</strong>
                {m.ivieExample}
              </div>
            </div>

            {/* Common mistake */}
            <div className="p-2.5 bg-rose-950/20 rounded-lg border border-rose-900/30 text-rose-200 flex items-start gap-2 text-[11px]">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>
                <strong>Lỗi hay gặp:</strong> {m.commonMistakes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
