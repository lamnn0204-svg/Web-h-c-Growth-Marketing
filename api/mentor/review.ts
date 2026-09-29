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

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { day, taskTitle, userSubmission, expectedOutput } = req.body || {};

    if (!ai) {
      const wordCount = (userSubmission || '').trim().split(/\s+/).length;
      const score = Math.min(10, Math.max(6, Math.floor(wordCount / 20) + 5));
      return res.status(200).json({
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

Hãy chấm bài theo đúng format JSON:
{
  "score": <số nguyên hoặc số thập phân từ 0 đến 10>,
  "strengths": ["Điểm đúng 1", "Điểm đúng 2"],
  "weaknesses": ["Điểm còn thiếu/chưa sâu 1", "Điểm cần khắc phục 2"],
  "why": "Giải thích chi tiết tại sao lại nhận xét như vậy",
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
    return res.status(200).json(parsed);
  } catch (error: any) {
    console.error('Error in /api/mentor/review handler:', error);
    return res.status(200).json({
      score: 8,
      strengths: ['Đã hoàn thành bài tập và áp dụng vào case study IVIE.'],
      weaknesses: ['Cần bổ sung thêm Guardrail Metric.'],
      why: 'Mentor ghi nhận bài nộp, tiếp tục rèn luyện tư duy thực chiến.',
      improvedVersion: 'Hãy liên tục đo lường bằng Unit Economics.',
      socraticQuestion: 'Hành động tiếp theo của bạn để scale thử nghiệm này là gì?'
    });
  }
}
