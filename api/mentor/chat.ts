import type { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

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

const SYSTEM_PROMPT_MENTOR = `Bạn là "Lâm's Growth Mentor" - một Growth Marketing Mentor dày dặn kinh nghiệm thực chiến (Product Growth, Performance Marketing, CRM, Analytics, Experimentation), đồng hành cùng Ngô Ngọc Lâm (Marketer có nền tảng Brand & Communication vững, đang chuyển hướng sang Growth Marketing).

Case study xuyên suốt 30 ngày là: "IVIE - Bác sĩ ơi" (Nền tảng đặt lịch khám, tư vấn bác sĩ trực tuyến, hồ sơ sức khỏe điện tử tại Việt Nam).

Nguyên tắc phản hồi:
1. LUÔN THÚC ĐẨY TƯ DUY SOCRATIC: Không bao giờ đưa thẳng đáp án nếu học viên chưa tự suy nghĩ. Hãy đặt câu hỏi gợi mở, bẻ gãy giả định hời hợt.
2. PHÂN BIỆT RÕ RÀNG NHÃN DỮ LIỆU: [REAL DATA], [ASSUMPTION], [HYPOTHESIS], [SIMULATED DATA].
3. PHONG CÁCH: Thẳng thắn, chuyên nghiệp, thực chiến, chuẩn Product/Growth Mindset.`;

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history, context } = req.body || {};

    if (!ai) {
      return res.status(200).json({
        reply: `[Cố Vấn Lâm's Growth Academy] Chào Lâm! Mentor đang đồng hành cùng bạn trên sản phẩm IVIE – Bác sĩ ơi.
Đối với câu hỏi: "${message || ''}"
Hãy luôn phân tích theo 3 câu hỏi cốt lõi:
1. Hành vi này tác động vào tầng nào của phễu AARRR (Acquisition, Activation, Retention, Referral, Revenue)?
2. Đâu là Primary Metric để đo lường thành công, và Guardrail Metric để bảo vệ trải nghiệm của người bệnh?
3. Bạn đang dựa trên [REAL DATA] hay [ASSUMPTION]?

Hãy nêu thử giả thuyết (Hypothesis) của bạn, tôi sẽ phản biện và chấm điểm cho bạn!`
      });
    }

    const conversationContext = context ? `\n[Ngữ cảnh học tập: Ngày ${context.day} - ${context.topic}]` : '';

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${SYSTEM_PROMPT_MENTOR}${conversationContext}\n\nLịch sử hội thoại:\n${JSON.stringify(history || [])}\n\nCâu hỏi của Lâm:\n${message}`,
            },
          ],
        },
      ],
      config: {
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Mentor đã ghi nhận câu hỏi của bạn. Hãy cùng phân tích sâu hơn nhé!';
    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Error in /api/mentor/chat handler:', error);
    return res.status(200).json({
      reply: 'Mentor đã ghi nhận câu hỏi của bạn. Hãy tiếp tục đào sâu vào số liệu thực tế của IVIE nhé!'
    });
  }
}
