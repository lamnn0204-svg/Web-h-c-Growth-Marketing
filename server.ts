import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_PROMPT_MENTOR = `Bạn là "Lâm's Growth Mentor" - một Growth Marketing Mentor dày dặn kinh nghiệm thực chiến (Product Growth, Performance Marketing, CRM, Analytics, Experimentation), đóng vai trò đồng hành cùng Ngô Ngọc Lâm (Marketer có nền tảng Brand & Communication vững, đang chuyển hướng sang Growth Marketing).

Case study xuyên suốt 30 ngày là: "IVIE - Bác sĩ ơi" (Nền tảng đặt lịch khám, tư vấn bác sĩ trực tuyến, hồ sơ sức khỏe điện tử tại Việt Nam).

Nguyên tắc phản hồi:
1. LUÔN THÚC ĐẨY TƯ DUY SOCRATIC: Không bao giờ đưa thẳng đáp án nếu học viên chưa tự suy nghĩ. Hãy đặt câu hỏi gợi mở, bẻ gãy giả định hời hợt, yêu cầu quy đổi về số liệu/hành vi người dùng thực tế.
2. PHÂN BIỆT RÕ RÀNG NHÃN DỮ LIỆU: [REAL DATA], [ASSUMPTION], [HYPOTHESIS], [SIMULATED DATA]. Nhắc Lâm không bao giờ bịa dữ liệu thực tế của IVIE.
3. PHONG CÁCH: Thẳng thắn, chuyên nghiệp, thực chiến, truyền cảm hứng, chuẩn Product/Growth Mindset (AARRR, Growth Loops, Ice/Rice, Time-to-Value, Retention Cohorts).
4. GIÚP LÂM TẨY TƯ DUY "VANITY METRICS" (chỉ nhìn reach, impressions, likes) sang "ACTIONABLE METRICS" (Activation Rate, Cohort Retention D1/D7/D30, LTV:CAC, Net Revenue Retention).
5. Trả lời bằng tiếng Việt gãy gọn, có cấu trúc markdown rõ ràng.`;

// API route: Chat with Growth Mentor
app.post('/api/mentor/chat', async (req, res) => {
  try {
    const { message, history, context } = req.body;

    if (!ai) {
      return res.json({
        reply: `[Chế độ Cố vấn Nội bộ] Chào Lâm! Tôi đang hoạt động ở chế độ Growth Coach ngoại tuyến (chưa gắn Gemini API key hoặc chạy cục bộ). 
Dựa trên câu hỏi của bạn: "${message}":
Hãy nhớ nguyên tắc số 1 của Growth Marketer: Đừng bao giờ tối ưu cho Vanity Metrics. Đối với IVIE - Bác sĩ ơi, hãy luôn hỏi:
- Hành vi này phản ánh Activation, Retention hay Monetization?
- Metric chính (Primary Metric) đo lường là gì?
- Drop-off lớn nhất ở bước nào trong Funnel?

Hãy nêu thử giả thuyết (Hypothesis) của bạn trước, tôi sẽ phản biện và chấm điểm cho bạn!`
      });
    }

    const conversationContext = context ? `\n[Ngữ cảnh học tập hiện tại: Ngày ${context.day} - ${context.topic} | Module: ${context.module}]` : '';

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${SYSTEM_PROMPT_MENTOR}${conversationContext}\n\nLịch sử hội thoại tóm tắt:\n${JSON.stringify(history || [])}\n\nCâu hỏi/Thắc mắc mới của Lâm:\n${message}`,
            },
          ],
        },
      ],
      config: {
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Mentor chưa phản hồi được lúc này. Hãy thử đặt lại câu hỏi cụ thể hơn nhé!';
    res.json({ reply });
  } catch (error: any) {
    console.error('Error in /api/mentor/chat:', error);
    res.status(500).json({
      error: 'Mentor service temporarily unavailable',
      fallback: 'Mentor gặp chút trục trặc kết nối. Hãy kiểm tra kết nối mạng và thử lại sau giây lát.'
    });
  }
});

// API route: Review Exercise with 0-10 Score and Detailed Feedback
app.post('/api/mentor/review', async (req, res) => {
  try {
    const { day, taskTitle, userSubmission, expectedOutput } = req.body;

    if (!ai) {
      // Heuristic intelligent review if API key isn't provided
      const wordCount = (userSubmission || '').trim().split(/\s+/).length;
      const score = Math.min(10, Math.max(5, Math.floor(wordCount / 25) + 5));
      return res.json({
        score,
        strengths: [
          'Bạn đã liên hệ trực tiếp với mô hình đặt khám / tư vấn của IVIE - Bác sĩ ơi.',
          'Đã bước đầu chuyển dịch từ ngôn ngữ Brand sang ngôn ngữ hành vi và metric (Funnel, Action).'
        ],
        weaknesses: [
          'Cần làm rõ ràng hơn Input Metric vs Output Metric thay vì chỉ nêu mục tiêu chung chung.',
          'Cần gắn nhãn dữ liệu [ASSUMPTION] / [HYPOTHESIS] cho các tỷ lệ chuyển đổi ước lượng.'
        ],
        why: 'Trong thực tế phỏng vấn Growth, nhà tuyển dụng sẽ xoáy sâu vào: "Làm sao bạn biết số này giảm do Product hay do Channel Quality?".',
        improvedVersion: `Ví dụ chuẩn hóa cho IVIE:\n- Problem: Tỷ lệ drop-off từ 'Tìm kiếm Bác sĩ' đến 'Xác nhận Đặt khám' cao.\n- Hypothesis: Nếu thêm bộ lọc 'Bác sĩ trực gần nhất có lịch trong 2 giờ tới', CVR sẽ tăng 15%.\n- Primary Metric: Search-to-Book CVR. Guardrail Metric: Tỷ lệ hủy lịch (Cancellation Rate).`,
        socraticQuestion: 'Nếu tính năng này tăng lượt đặt khám nhưng lại làm tăng tỷ lệ bác sĩ quá tải từ chối khám, bạn sẽ giải quyết trade-off này như thế nào?'
      });
    }

    const reviewPrompt = `Bạn là Growth Mentor của Lâm. Hãy chấm bài tập thực hành sau đây của Lâm cho Ngày ${day}:
Tiêu đề bài tập: ${taskTitle}
Kỳ vọng Output: ${expectedOutput}
Nội dung Lâm nộp:
"""
${userSubmission}
"""

Hãy chấm bài theo đúng format JSON sau:
{
  "score": <số nguyên hoặc số thập phân từ 0 đến 10, chỉ dùng để đánh giá mức độ hoàn thiện bài tập học tập>,
  "strengths": ["Điểm đúng 1", "Điểm đúng 2"],
  "weaknesses": ["Điểm còn thiếu/chưa sâu 1", "Điểm cần khắc phục 2"],
  "why": "Giải thích chi tiết tại sao lại nhận xét như vậy dưới góc nhìn của một Head of Growth / Senior Growth Manager",
  "improvedVersion": "Một phiên bản câu trả lời mẫu nâng cấp sắc bén hơn áp dụng trực tiếp cho IVIE - Bác sĩ ơi",
  "socraticQuestion": "Một câu hỏi phản biện sâu sắc để buộc Lâm phải suy nghĩ thêm và trả lời tiếp"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: reviewPrompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/mentor/review:', error);
    res.status(500).json({
      error: 'Review could not be completed at this time.',
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
