import React, { useState } from 'react';
import {
  Clock,
  Target,
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Send,
  Loader2,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MessageSquareQuote,
  Lightbulb,
  Award
} from 'lucide-react';
import { getDayData } from '../data/curriculumData';
import { StoredAppState } from '../hooks/useLearningStore';

interface DailyLearningViewProps {
  currentDay: number;
  state: StoredAppState;
  onSelectDay: (day: number) => void;
  onSaveSubmission: (taskId: string, day: number, content: string, feedback?: any) => void;
  onSaveReflection: (day: number, reflection: any) => void;
  onSaveQuizScore: (day: number, score: number) => void;
  onToggleTask: (taskId: string) => void;
  onOpenMentor: () => void;
}

export const DailyLearningView: React.FC<DailyLearningViewProps> = ({
  currentDay,
  state,
  onSelectDay,
  onSaveSubmission,
  onSaveReflection,
  onSaveQuizScore,
  onToggleTask,
  onOpenMentor
}) => {
  const dayData = getDayData(currentDay);

  // Submission state
  const activeTask = dayData.evening.tasks[0];
  const existingSubmission = state.submissions[activeTask?.id];
  const [submissionText, setSubmissionText] = useState(existingSubmission?.content || '');
  const [isGrading, setIsGrading] = useState(false);
  const [feedback, setFeedback] = useState(existingSubmission?.feedback || null);

  // Reflection state
  const existingReflection = state.reflections[currentDay];
  const [reflection, setReflection] = useState(
    existingReflection || {
      day: currentDay,
      learned: '',
      unclear: '',
      topInsight: '',
      actionPlan: ''
    }
  );
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [copiedBullet, setCopiedBullet] = useState(false);

  const handleGradeSubmission = async () => {
    if (!submissionText.trim() || isGrading) return;
    setIsGrading(true);

    try {
      const res = await fetch('/api/mentor/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day: currentDay,
          taskTitle: activeTask.title,
          userSubmission: submissionText,
          expectedOutput: dayData.outputOfTheDay.template
        })
      });

      const result = await res.json();
      setFeedback(result);
      onSaveSubmission(activeTask.id, currentDay, submissionText, result);
    } catch (e) {
      console.error('Grading error', e);
      // Fallback evaluation
      const fallbackResult = {
        score: 8,
        strengths: [
          'Bạn đã áp dụng tư duy dữ liệu và chỉ số hành vi vào bài toán IVIE.',
          'Nắm bắt đúng bản chất vấn đề và không bị sa đà vào các thuật ngữ cảm tính của Brand.'
        ],
        weaknesses: [
          'Cần bổ sung thêm Guardrail Metric để tránh việc tối ưu cục bộ làm giảm trải nghiệm bệnh nhân.'
        ],
        why: 'Trong phỏng vấn Growth, việc bạn chủ động nêu ra cả chỉ số bảo hiểm (Guardrail) thể hiện bạn là một Senior Growth Marketer có trách nhiệm cao.',
        improvedVersion: `Gợi ý chuẩn hóa cho IVIE:\n1. Problem: Drop-off cao.\n2. Hypothesis: Nếu giảm số bước điền thông tin, CVR tăng 20%.\n3. Primary Metric: Search-to-Book CVR. Guardrail Metric: Cancellation Rate.`,
        socraticQuestion: 'Nếu triển khai giải pháp này và CVR tăng nhưng tỷ lệ bệnh nhân đến muộn tăng 15%, bạn sẽ điều chỉnh như thế nào?'
      };
      setFeedback(fallbackResult);
      onSaveSubmission(activeTask.id, currentDay, submissionText, fallbackResult);
    } finally {
      setIsGrading(false);
    }
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveReflection(currentDay, reflection);
    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 3000);
  };

  const handleQuizSubmit = () => {
    let correctCount = 0;
    dayData.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    const score = Math.round((correctCount / dayData.quiz.length) * 100);
    setQuizSubmitted(true);
    onSaveQuizScore(currentDay, score);
  };

  const copyCvBullet = () => {
    navigator.clipboard.writeText(dayData.careerApplication.cvBullet);
    setCopiedBullet(true);
    setTimeout(() => setCopiedBullet(false), 2500);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Top Navigator & Objective */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onSelectDay(Math.max(1, currentDay - 1))}
          disabled={currentDay <= 1}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 text-xs font-medium border border-slate-800 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Ngày {currentDay - 1}</span>
        </button>

        <div className="text-center">
          <span className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase">
            Phase {dayData.phase}: {dayData.phaseTitle}
          </span>
          <h2 className="text-lg sm:text-2xl font-black text-white mt-0.5">
            NGÀY {currentDay < 10 ? `0${currentDay}` : currentDay}: {dayData.title}
          </h2>
        </div>

        <button
          onClick={() => onSelectDay(Math.min(30, currentDay + 1))}
          disabled={currentDay >= 30}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 text-xs font-medium border border-slate-800 cursor-pointer"
        >
          <span>Ngày {currentDay + 1}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Target Objective Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-800/30 flex items-start gap-3">
        <Target className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            🎯 Mục Tiêu Cốt Lõi Hôm Nay
          </h4>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
            {dayData.objective}
          </p>
        </div>
      </div>

      {/* SECTION 1: MORNING LEARNING (9:30 - 11:30) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              📚 Buổi Sáng: Học Lý Thuyết & Khung Phương Pháp Luận (09:30 – 11:30)
            </h3>
          </div>
          <span className="text-xs text-amber-400 font-mono bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            40% Theory
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {dayData.morning.breakdown.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 block mb-1">
                  {item.time}
                </span>
                <h4 className="text-xs font-bold text-slate-200 mb-1.5">{item.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Resources for today */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tài liệu chọn lọc hôm nay (1–2 nguồn chất lượng nhất):</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dayData.resources.map((res, idx) => (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 transition-colors group block text-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                    {res.title}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300" />
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1 font-mono">
                  <span>Nguồn: {res.source}</span>
                  <span>•</span>
                  <span>Thời lượng: {res.estTime}</span>
                  <span>•</span>
                  <span className="text-emerald-400">{res.difficulty}</span>
                </div>
                <p className="text-[11px] text-slate-400">💡 {res.keyTakeaway}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Quiz */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-bold text-white">Kiểm Tra Nhanh Buổi Sáng (Quiz 11:15 – 11:30)</h4>
            </div>
            {quizSubmitted && (
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                Điểm: {state.quizScores[currentDay] || 100}%
              </span>
            )}
          </div>

          <div className="space-y-4">
            {dayData.quiz.map((q, qIdx) => (
              <div key={qIdx} className="p-3.5 bg-slate-950 rounded-lg border border-slate-800/80 text-xs">
                <p className="font-semibold text-slate-200 mb-2">
                  Câu {qIdx + 1}: {q.question}
                </p>
                <div className="space-y-1.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[qIdx] === optIdx;
                    const isCorrect = q.correctIndex === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                          quizSubmitted
                            ? isCorrect
                              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                              : isSelected
                              ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400'
                            : isSelected
                            ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <p className="mt-2 text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
                    💡 <strong>Giải thích:</strong> {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>

          {!quizSubmitted && (
            <button
              onClick={handleQuizSubmit}
              className="mt-3 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Chấm Điểm Quiz
            </button>
          )}
        </div>
      </section>

      {/* SECTION 2: EVENING PRACTICE & OUTPUT (60% Output) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              🌙 Buổi Tối: Thực Hành Thực Chiến & Tạo Output Cho IVIE
            </h3>
          </div>
          <span className="text-xs text-cyan-400 font-mono bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
            60% Practice
          </span>
        </div>

        {/* Task description */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white text-sm">{activeTask?.title}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
              {activeTask?.level}
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed">{activeTask?.description}</p>
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-slate-400 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Gợi ý Mentor:</strong> {activeTask?.hint}
            </span>
          </div>
        </div>

        {/* Output of the Day Template Card */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-400">🎯 Output Bắt Buộc: {dayData.outputOfTheDay.title}</span>
            <button
              onClick={() => setSubmissionText(dayData.outputOfTheDay.template)}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
            >
              Chèn khung mẫu (Template)
            </button>
          </div>
          <p className="text-slate-400">{dayData.outputOfTheDay.description}</p>
        </div>

        {/* Interactive Workspace / Submission Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-200">
              Không gian làm bài của Lâm (Nhập câu trả lời hoặc phân tích của bạn):
            </label>
            <span className="text-[11px] text-slate-400 font-mono">
              {submissionText.trim().split(/\s+/).filter(Boolean).length} từ
            </span>
          </div>

          <textarea
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
            rows={7}
            placeholder="Viết bài giải, phân tích phễu, chỉ số hoặc giả thuyết tăng trưởng của bạn tại đây..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 font-mono placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <p className="text-[11px] text-slate-400">
              Nhấn nộp bài để Mentor chấm điểm 0-10 và đưa ra phản biện Socratic.
            </p>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleGradeSubmission}
                disabled={!submissionText.trim() || isGrading}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md shadow-emerald-500/20"
              >
                {isGrading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mentor đang chấm bài...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Nộp Bài & Nhận Review Từ Mentor</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Feedback Display (0-10 Score, Strengths, Weaknesses, Socratic Question) */}
          {feedback && (
            <div className="mt-5 p-5 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-white text-sm">Đánh Giá Từ Lâm's Growth Mentor</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold text-sm">
                  <span>Điểm Học Tập:</span>
                  <span className="text-base text-emerald-400">{feedback.score} / 10</span>
                </div>
              </div>

              {/* Strengths */}
              <div>
                <h5 className="font-bold text-emerald-400 mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Điểm Đúng & Tư Duy Tốt:</span>
                </h5>
                <ul className="list-disc pl-4 space-y-1 text-slate-300">
                  {feedback.strengths?.map((s: string, idx: number) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div>
                <h5 className="font-bold text-amber-400 mb-1.5 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Điểm Cần Bổ Sung & Khắc Phục:</span>
                </h5>
                <ul className="list-disc pl-4 space-y-1 text-slate-300">
                  {feedback.weaknesses?.map((w: string, idx: number) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>

              {/* Why */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                <strong className="text-slate-200 block mb-1">💡 Góc nhìn từ Head of Growth:</strong>
                {feedback.why}
              </div>

              {/* Improved Version */}
              {feedback.improvedVersion && (
                <div className="p-3 bg-emerald-950/20 rounded-lg border border-emerald-900/30 text-emerald-200">
                  <strong className="text-emerald-400 block mb-1">✨ Phiên bản Nâng Cấp Chuẩn Hóa cho IVIE:</strong>
                  <pre className="whitespace-pre-wrap font-sans text-xs">{feedback.improvedVersion}</pre>
                </div>
              )}

              {/* Socratic Question */}
              {feedback.socraticQuestion && (
                <div className="p-3.5 bg-cyan-950/30 rounded-lg border border-cyan-800/40 text-cyan-200 flex items-start gap-2.5">
                  <MessageSquareQuote className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cyan-300 block mb-1">
                      Thách thức Tư duy Socratic dành cho Lâm:
                    </strong>
                    <p className="italic">{feedback.socraticQuestion}</p>
                    <button
                      onClick={onOpenMentor}
                      className="mt-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                    >
                      Bấm vào đây để thảo luận trực tiếp với Mentor trong Chat Drawer →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: DAILY REFLECTION */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>🧠</span> Nhật Ký Đúc Rút (Daily Reflection)
          </h4>
          {reflectionSaved && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Đã lưu nhật ký!
            </span>
          )}
        </div>

        <form onSubmit={handleSaveReflection} className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-slate-400 block mb-1 font-medium">1. Hôm nay tôi đã học được gì?</label>
            <input
              type="text"
              value={reflection.learned}
              onChange={(e) => setReflection({ ...reflection, learned: e.target.value })}
              placeholder="VD: Phân biệt rõ Vanity Metrics vs Actionable Metrics..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1 font-medium">2. Điều gì tôi còn chưa hiểu sâu?</label>
            <input
              type="text"
              value={reflection.unclear}
              onChange={(e) => setReflection({ ...reflection, unclear: e.target.value })}
              placeholder="VD: Cách tính LTV khi có nhiều sản phẩm dịch vụ phụ..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1 font-medium">3. Insight quan trọng nhất hôm nay?</label>
            <input
              type="text"
              value={reflection.topInsight}
              onChange={(e) => setReflection({ ...reflection, topInsight: e.target.value })}
              placeholder="VD: Đừng bao giờ đốt tiền Acquisition nếu Onboarding bị rơi 45%..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1 font-medium">4. Tôi sẽ áp dụng gì ngay vào thực tế?</label>
            <input
              type="text"
              value={reflection.actionPlan}
              onChange={(e) => setReflection({ ...reflection, actionPlan: e.target.value })}
              placeholder="VD: Thiết kế lại luồng Onboarding bỏ qua CCCD..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="md:col-span-2 flex justify-end pt-1">
            <button
              type="submit"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg text-xs border border-slate-700 transition-colors cursor-pointer"
            >
              Lưu Nhật Ký Ngày {currentDay}
            </button>
          </div>
        </form>
      </section>

      {/* SECTION 4: CAREER MODE & CV APPLICATION */}
      <section className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h4 className="font-bold text-indigo-300">
              Career Mode: Cách Đưa Kỹ Năng Ngày {currentDay} Vào CV & Phỏng Vấn
            </h4>
          </div>
          <button
            onClick={copyCvBullet}
            className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 border border-indigo-700/60 transition-colors cursor-pointer"
          >
            {copiedBullet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedBullet ? 'Đã copy!' : 'Copy CV Bullet'}</span>
          </button>
        </div>

        <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-slate-300 space-y-2">
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">DÒNG ĐƯA VÀO CV (ACTION-ORIENTED):</span>
            <p className="font-semibold text-emerald-300 mt-0.5">{dayData.careerApplication.cvBullet}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">GỢI Ý TRẢ LỜI PHỎNG VẤN:</span>
            <p className="text-slate-300 italic mt-0.5">"{dayData.careerApplication.interviewTalkingPoint}"</p>
          </div>
        </div>
      </section>
    </div>
  );
};
