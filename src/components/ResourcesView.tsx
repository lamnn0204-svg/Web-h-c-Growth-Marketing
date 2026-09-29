import React, { useState } from 'react';
import { Library, ExternalLink, BookOpen, Search, Sparkles } from 'lucide-react';

interface ResourceItem {
  title: string;
  source: string;
  category: string;
  url: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estTime: string;
  keyTakeaway: string;
}

export const CURATED_RESOURCES: ResourceItem[] = [
  {
    title: 'The Growth Loops Framework',
    source: 'Reforge',
    category: 'Foundations',
    url: 'https://www.reforge.com/blog/growth-loops',
    difficulty: 'Intermediate',
    estTime: '30 phút',
    keyTakeaway: 'Cách thay thế phễu tuyến tính (Linear Funnel) bằng vòng lặp tăng trưởng tự sinh.'
  },
  {
    title: 'Product-Led Growth Playbook',
    source: 'Amplitude Guide',
    category: 'Product Growth',
    url: 'https://amplitude.com/product-led-growth-guide',
    difficulty: 'Intermediate',
    estTime: '45 phút',
    keyTakeaway: 'Xác định Aha Moment, Time-to-Value và tối ưu Onboarding dựa trên hành vi.'
  },
  {
    title: 'Choosing Your North Star Metric',
    source: "Lenny's Newsletter",
    category: 'Strategy & Metrics',
    url: 'https://www.lennysnewsletter.com',
    difficulty: 'Intermediate',
    estTime: '35 phút',
    keyTakeaway: '6 loại North Star Metric phổ biến và cách tránh bẫy Vanity Metrics.'
  },
  {
    title: 'The Ultimate Retention Guide',
    source: 'Amplitude Playbook',
    category: 'Retention',
    url: 'https://amplitude.com/retention-playbook',
    difficulty: 'Advanced',
    estTime: '60 phút',
    keyTakeaway: 'Cách đọc biểu đồ Cohort Retention, tìm Habit Moment và cải thiện D30 Retention.'
  },
  {
    title: 'HealthTech Growth Case Studies',
    source: 'Y Combinator Library',
    category: 'Healthcare & Case Studies',
    url: 'https://www.ycombinator.com/library',
    difficulty: 'Advanced',
    estTime: '40 phút',
    keyTakeaway: 'Đặc thù tăng trưởng của ứng dụng y tế, bác sĩ từ xa và lòng tin bệnh nhân.'
  },
  {
    title: 'Conversion-Centered Design Guide',
    source: 'CXL & Unbounce',
    category: 'Acquisition & CRO',
    url: 'https://cxl.com/blog',
    difficulty: 'Beginner',
    estTime: '25 phút',
    keyTakeaway: 'Nguyên tắc Message Match từ quảng cáo đến Landing Page chuyển đổi cao.'
  },
  {
    title: 'Interactive Case Studies in UX & Growth',
    source: 'Growth.design',
    category: 'UX & Psychology',
    url: 'https://growth.design/case-studies',
    difficulty: 'Beginner',
    estTime: '20 phút',
    keyTakeaway: 'Học tâm lý học hành vi qua truyện tranh tương tác cực kỳ trực quan.'
  }
];

export const ResourcesView: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Foundations', 'Product Growth', 'Retention', 'Strategy & Metrics', 'Healthcare & Case Studies', 'Acquisition & CRO', 'UX & Psychology'];

  const filtered = CURATED_RESOURCES.filter((r) => {
    const matchesCat = selectedCat === 'All' || r.category === selectedCat;
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.keyTakeaway.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Library className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Thư Viện Tài Nguyên Chọn Lọc (Growth Resource Library)
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Chỉ tuyển chọn 1–2 nguồn học tinh túy nhất từ Reforge, Amplitude, Lenny's Newsletter, YC và CXL. Không nhồi nhét.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCat === c ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm tài liệu..."
          className="w-full md:w-64 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((r, idx) => (
          <a
            key={idx}
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all block group text-xs space-y-3 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-semibold">
                {r.source}
              </span>
              <span className="text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                {r.difficulty} • {r.estTime}
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>

            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
              {r.title}
            </h3>

            <p className="text-slate-300 text-xs leading-relaxed">
              💡 <strong>Giá trị cốt lõi:</strong> {r.keyTakeaway}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};
