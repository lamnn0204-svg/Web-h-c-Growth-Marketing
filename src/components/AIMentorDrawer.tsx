import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, AlertCircle, HelpCircle, Loader2 } from 'lucide-react';

interface AIMentorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentDay: number;
  currentTopic: string;
}

interface ChatMessage {
  id: string;
  sender: 'mentor' | 'user';
  text: string;
  timestamp: string;
}

export const AIMentorDrawer: React.FC<AIMentorDrawerProps> = ({
  isOpen,
  onClose,
  currentDay,
  currentTopic
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'mentor',
      text: `Chào Lâm! Tôi là Growth Mentor của bạn. Hôm nay là Ngày ${currentDay}: ${currentTopic}. 
Hãy nhớ nguyên tắc làm việc của chúng ta: Tôi sẽ không mớm cơm đáp án mà sẽ dùng phương pháp Socratic để thách thức và rèn luyện tư duy thực chiến của bạn đối với sản phẩm IVIE – Bác sĩ ơi.

Bạn đang có trăn trở gì ở bài học hoặc bài tập hôm nay?`,
      timestamp: 'Vừa xong'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const quickPrompts = [
    'Activation của IVIE nên là gì?',
    'Làm sao tăng Retention cho nhóm bệnh nhân mạn tính?',
    'Phân tích Trade-off giữa CAC và LTV cho IVIE?',
    'Cách viết một Giả thuyết tăng trưởng chuẩn?'
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/mentor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: { day: currentDay, topic: currentTopic, module: `Day ${currentDay}` },
          history: messages.slice(-4).map((m) => ({ role: m.sender === 'user' ? 'user' : 'model', text: m.text }))
        })
      });

      const data = await res.json();
      const mentorReply = data.reply || data.fallback || 'Mentor đã ghi nhận câu hỏi của bạn.';

      const botMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        sender: 'mentor',
        text: mentorReply,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Mentor chat error', error);
      // Offline fallback
      let fallbackText = `Chào Lâm! Nhìn vào câu hỏi của bạn về: "${textToSend}".
Đối với IVIE – Bác sĩ ơi: Trước khi đưa ra quyết định, hãy tự hỏi:
1. Hành vi này tác động vào nấc nào của phễu AARRR?
2. Đâu là Primary Metric bạn muốn dịch chuyển, và Guardrail Metric để đảm bảo không làm gãy trải nghiệm y tế là gì?
3. Bạn đang dựa trên [REAL DATA] hay [ASSUMPTION]?

Hãy nêu thử giả thuyết sơ bộ của bạn, tôi sẽ chấm điểm và phản biện tiếp!`;

      if (textToSend.toLowerCase().includes('activation')) {
        fallbackText = `Trước khi xác định Activation Event của IVIE, hãy trả lời tôi:
"Hành động cụ thể nào chứng minh người bệnh đã thực sự nhận được giá trị đầu tiên giải quyết nỗi lo của họ?"
Là xem lịch bác sĩ? Đăng ký số điện thoại? Hay hoàn tất cuộc đặt lịch khám / gọi video với bác sĩ? Tại sao?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          sender: 'mentor',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              Lâm's Growth Mentor
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            </h3>
            <p className="text-[11px] text-slate-400">Socratic Coach • IVIE - Bác sĩ ơi Focus</p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Đóng bảng cố vấn"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Context Banner */}
      <div className="px-4 py-2 bg-emerald-950/20 border-b border-emerald-900/30 text-[11px] text-emerald-300 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
        <span className="truncate">Đang hỗ trợ: Ngày {currentDay} - {currentTopic}</span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                  : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none shadow-sm'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-emerald-400 p-3 bg-slate-800/50 rounded-xl w-fit">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Mentor đang suy nghĩ và chuẩn bị phản biện...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="p-2.5 border-t border-slate-800/60 bg-slate-950/40">
        <p className="text-[10px] font-semibold text-slate-400 mb-1.5 px-1 uppercase tracking-wider">
          Gợi ý câu hỏi nhanh:
        </p>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/70 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hỏi mentor về giả thuyết, chỉ số hoặc bài tập..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          aria-label="Gửi câu hỏi"
          className="p-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 rounded-xl font-bold transition-colors cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
