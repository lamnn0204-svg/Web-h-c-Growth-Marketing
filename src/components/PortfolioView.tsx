import React, { useState } from 'react';
import {
  Briefcase,
  FileCheck,
  Download,
  Share2,
  Check,
  Edit3,
  Eye,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { PortfolioChapter } from '../data/portfolioData';

interface PortfolioViewProps {
  chapters: PortfolioChapter[];
  onUpdateChapter: (chapterId: string, content: string) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ chapters, onUpdateChapter }) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(chapters[0]?.id || 'ch-01');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [copiedAll, setCopiedAll] = useState(false);

  const selectedChapter = chapters.find((c) => c.id === selectedChapterId) || chapters[0];

  const handleStartEdit = () => {
    setEditContent(selectedChapter.content);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onUpdateChapter(selectedChapter.id, editContent);
    setIsEditing(false);
  };

  const handleExportFullMarkdown = () => {
    const fullDoc = `# IVIE – BÁC SĨ ƠI: 30-DAY GROWTH MARKETING CAPSTONE CASE STUDY
Tác giả: Ngô Ngọc Lâm
Định vị: From Brand & Communication to Growth Marketing
Sản phẩm: IVIE – Bác sĩ ơi (Nền tảng Y tế Số Toàn diện)
Ngày xuất bản: ${new Date().toLocaleDateString('vi-VN')}

Lưu ý: Tất cả số liệu định lượng trong hồ sơ này là [SIMULATED DATA] hoặc [ASSUMPTION] phục vụ mục đích đào tạo và minh chứng phương pháp luận.

---

${chapters.map((c) => `## ${c.code}. ${c.title} [Tag: ${c.tag}]\n\n${c.content}\n\n---\n`).join('\n')}`;

    const blob = new Blob([fullDoc], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'IVIE_Growth_Marketing_Case_Study_Ngo_Ngoc_Lam.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyFullText = () => {
    const fullDoc = chapters.map((c) => `## ${c.code}. ${c.title}\n\n${c.content}`).join('\n\n');
    navigator.clipboard.writeText(fullDoc);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white">
              IVIE Growth Marketing Capstone Portfolio
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Case study 21 chương hoàn chỉnh cho IVIE – Bác sĩ ơi sẵn sàng đưa vào CV & Portfolio ứng tuyển.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={copyFullText}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            {copiedAll ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedAll ? 'Đã copy!' : 'Copy Toàn Bộ'}</span>
          </button>
          <button
            onClick={handleExportFullMarkdown}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-md shadow-emerald-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Tải File .MD Hoàn Chỉnh</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chapter Navigator (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1.5 max-h-[750px] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              21 Chương Case Study
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-semibold">
              21 / 21 Ready
            </span>
          </div>

          {chapters.map((ch) => {
            const isSelected = ch.id === selectedChapterId;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedChapterId(ch.id);
                  setIsEditing(false);
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-white shadow-sm'
                    : 'text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                }`}
              >
                <span
                  className={`font-mono font-bold text-[10px] px-1.5 py-0.5 rounded shrink-0 ${
                    isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {ch.code}
                </span>
                <div className="truncate flex-1">
                  <span className="font-semibold block truncate text-slate-200">{ch.title}</span>
                  <span className="text-[10px] text-slate-400 block truncate">{ch.summary}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Content Viewer / Editor (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl min-h-[600px]">
          <div>
            {/* Top Bar of Chapter */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    CHƯƠNG {selectedChapter.code}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono font-semibold border border-cyan-800/40">
                    {selectedChapter.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">{selectedChapter.title}</h3>
              </div>

              <div>
                {isEditing ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs cursor-pointer"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
                    >
                      Lưu Thay Đổi
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleStartEdit}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Chỉnh Sửa</span>
                  </button>
                )}
              </div>
            </div>

            {/* Chapter Body */}
            {isEditing ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={16}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 leading-relaxed focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            ) : (
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans space-y-3">
                {selectedChapter.content}
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-800/80 mt-6 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Nội dung đã được chuẩn hóa theo chuẩn Growth Case Study quốc tế.</span>
            </span>
            <span>Tác giả: Ngô Ngọc Lâm</span>
          </div>
        </div>
      </div>
    </div>
  );
};
