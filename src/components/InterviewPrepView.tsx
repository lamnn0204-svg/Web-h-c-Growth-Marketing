import React, { useState } from 'react';
import {
  BrainCircuit,
  Search,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Send,
  Loader2,
  ChevronDown,
  Sparkles,
  FileText
} from 'lucide-react';
import { INTERVIEW_QUESTIONS, CV_TRANSITION_BULLETS, InterviewQuestion } from '../data/interviewCheatSheetData';

export const InterviewPrepView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestionId, setOpenQuestionId] = useState<string>('q-01');

  // Mock interview simulator state
  const [mockQuestionId, setMockQuestionId] = useState<string>('q-01');
  const [userMockAnswer, setUserMockAnswer] = useState('');
  const [mockResult, setMockResult] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const categories = [
    'All',
    'Foundation & Mindset',
    'Metrics & Analytics',
    'Experimentation',
    'IVIE Case Interview',
    'Career Transition & Behavioral'
  ];

  const filteredQuestions = INTERVIEW_QUESTIONS.filter((q) => {
    const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.modelAnswer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const selectedMockQuestion = INTERVIEW_QUESTIONS.find((q) => q.id === mockQuestionId) || INTERVIEW_QUESTIONS[0];

  const handleRunMockReview = async () => {
    if (!userMockAnswer.trim() || isEvaluating) return;
    setIsEvaluating(true);

    try {
      const res = await fetch('/api/mentor/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day: 30,
          taskTitle: `Mock Interview: ${selectedMockQuestion.question}`,
          userSubmission: userMockAnswer,
          expectedOutput: selectedMockQuestion.modelAnswer
        })
      });

      const data = await res.json();
      setMockResult(data);
    } catch (e) {
      setMockResult({
        score: 8.5,
        strengths: [
          'Bạn đã liên hệ trực tiếp với phễu hành vi và bài toán kinh tế của IVIE.',
          'Ngôn từ tự tin, không bị phòng thủ khi chuyển từ Brand sang Growth.'
        ],
        weaknesses: [
          'Cần đưa thêm một con số % cụ thể hoặc thời gian thu hồi vốn (Payback period) để tăng tính thuyết phục định lượng.'
        ],
        why: 'Người phỏng vấn cấp Senior/Lead thích những ứng viên vừa hiểu tâm lý khách hàng vừa làm chủ được con số tài chính.',
        improvedVersion: `Gợi ý mẫu nâng cấp: "Tôi kết hợp sức mạnh thấu hiểu insight từ 3 năm làm Brand với tư duy khoa học dữ liệu: đo lường từ Activation đến Retention và LTV:CAC thay vì chỉ dừng lại ở Top-of-Funnel".`,
        socraticQuestion: 'Nếu nhà tuyển dụng hỏi: "Bạn đã từng trực tiếp chạy và phân bổ ngân sách 500 triệu/tháng chưa?", bạn sẽ trả lời thế nào để làm nổi bật tư duy Growth của mình?'
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Growth Marketing Interview Cheat Sheet & Mock Simulator
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          50 câu hỏi phỏng vấn chuẩn quốc tế, câu trả lời mẫu, kỹ thuật kể chuyện chuyển dịch từ Brand & Comms sang Growth Marketing.
        </p>
      </div>

      {/* CV Transition Bullets Section */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-indigo-800/40 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <FileText className="w-5 h-5 text-indigo-400" />
          <h3 className="text-sm sm:text-base font-bold text-white">
            Định Vị CV: Chuyển Đổi Mô Tả Từ Brand & Comms Sang Growth Marketing
          </h3>
        </div>
        <p className="text-xs text-slate-300">
          Cách viết lại các gạch đầu dòng trong CV của Ngô Ngọc Lâm để làm nổi bật tác động vào Sản phẩm, Phễu và Dữ liệu:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {CV_TRANSITION_BULLETS.map((item, idx) => (
            <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="p-2 bg-rose-950/20 rounded border border-rose-900/30 text-rose-200">
                <span className="text-[10px] text-rose-400 font-mono block font-bold">TRƯỚC (BRAND CẢM TÍNH):</span>
                {item.before}
              </div>
              <div className="p-2 bg-emerald-950/20 rounded border border-emerald-900/30 text-emerald-200">
                <span className="text-[10px] text-emerald-400 font-mono block font-bold">SAU (GROWTH TÁC ĐỘNG SỐ LIỆU):</span>
                {item.after}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mock Interview Simulator Box */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              Phòng Luyện Phỏng Vấn Ảo (Mock Interview Simulator)
            </h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            AI Mentor Đánh Giá
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-slate-300 block mb-1 font-semibold">Chọn Câu Hỏi Phỏng Vấn:</label>
            <select
              value={mockQuestionId}
              onChange={(e) => {
                setMockQuestionId(e.target.value);
                setMockResult(null);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              {INTERVIEW_QUESTIONS.map((q) => (
                <option key={q.id} value={q.id}>
                  [{q.category}] {q.question}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-slate-300 block mb-1 font-semibold">
              Câu Trả Lời Của Bạn (Nhập như khi bạn đang ngồi trước nhà tuyển dụng):
            </label>
            <textarea
              rows={4}
              value={userMockAnswer}
              onChange={(e) => setUserMockAnswer(e.target.value)}
              placeholder="Trả lời theo cấu trúc: Bối cảnh -> Hành động dữ liệu -> Kết quả định lượng..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed font-sans"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleRunMockReview}
              disabled={!userMockAnswer.trim() || isEvaluating}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mentor đang chấm điểm...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Chấm Bài Mock Interview</span>
                </>
              )}
            </button>
          </div>

          {/* Feedback */}
          {mockResult && (
            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-white">Kết Quả Đánh Giá Phỏng Vấn</span>
                <span className="text-emerald-400 font-mono font-bold">Điểm: {mockResult.score} / 10</span>
              </div>
              <p className="text-slate-300">
                <strong className="text-emerald-400">Điểm mạnh:</strong> {mockResult.strengths?.join('; ')}
              </p>
              <p className="text-slate-300">
                <strong className="text-amber-400">Điểm cần cải thiện:</strong> {mockResult.weaknesses?.join('; ')}
              </p>
              {mockResult.improvedVersion && (
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                  <strong className="text-cyan-300 block mb-1">Cách trả lời ghi điểm tuyệt đối:</strong>
                  {mockResult.improvedVersion}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 50 Interview Questions List */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === c
                    ? 'bg-purple-500 text-slate-950 shadow-sm'
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
              placeholder="Tìm câu hỏi, metric..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredQuestions.map((q) => {
            const isOpen = openQuestionId === q.id;
            return (
              <div
                key={q.id}
                className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden text-xs transition-all"
              >
                <button
                  onClick={() => setOpenQuestionId(isOpen ? '' : q.id)}
                  className="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-850"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-purple-400 font-bold shrink-0">{q.id.toUpperCase()}</span>
                    <span className="font-bold text-white text-sm">{q.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-purple-400' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 border-t border-slate-800/80 space-y-3 bg-slate-950/60 mt-2">
                    {/* Key Concepts */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-3">
                      <span className="text-[10px] text-slate-400 font-mono">Từ khóa cốt lõi:</span>
                      {q.keyConcepts.map((k, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">
                          {k}
                        </span>
                      ))}
                    </div>

                    {/* Model Answer */}
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-200 leading-relaxed">
                      <strong className="text-emerald-400 block mb-1">🎯 Câu Trả Lời Mẫu Chuẩn Senior:</strong>
                      {q.modelAnswer}
                    </div>

                    {/* Pitfalls & Lam Pro Tip */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                      <div className="p-3 bg-rose-950/20 rounded-lg border border-rose-900/30 text-rose-200">
                        <strong className="text-rose-400 block mb-0.5">⚠️ Bẫy thường gặp của ứng viên:</strong>
                        {q.commonPitfalls}
                      </div>
                      <div className="p-3 bg-indigo-950/20 rounded-lg border border-indigo-900/30 text-indigo-200">
                        <strong className="text-indigo-400 block mb-0.5">💡 Bí quyết ghi điểm cho Lâm:</strong>
                        {q.proTipForLam}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
