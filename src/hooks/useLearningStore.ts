import { useState, useEffect } from 'react';
import { GrowthExperiment, INITIAL_IVIE_EXPERIMENTS } from '../data/experimentsData';
import { CAPSTONE_CHAPTERS, PortfolioChapter } from '../data/portfolioData';

export interface UserSubmission {
  day: number;
  taskId: string;
  content: string;
  submittedAt: string;
  feedback?: {
    score: number;
    strengths: string[];
    weaknesses: string[];
    why: string;
    improvedVersion: string;
    socraticQuestion: string;
  };
}

export interface DayReflection {
  day: number;
  learned: string;
  unclear: string;
  topInsight: string;
  actionPlan: string;
}

export interface StoredAppState {
  currentDay: number;
  completedDays: number[];
  completedTasks: string[];
  streak: number;
  studyHours: number;
  submissions: Record<string, UserSubmission>;
  reflections: Record<number, DayReflection>;
  experiments: GrowthExperiment[];
  portfolioChapters: PortfolioChapter[];
  notes: string[];
  quizScores: Record<number, number>;
}

const STORAGE_KEY = 'growthtrack_lam_30d_v1';

const DEFAULT_STATE: StoredAppState = {
  currentDay: 1,
  completedDays: [1],
  completedTasks: ['d1-t1'],
  streak: 3,
  studyHours: 6.5,
  submissions: {
    'd1-t1': {
      day: 1,
      taskId: 'd1-t1',
      content: `1. Lượt xem Fanpage -> Cost Per Visitor truy cập danh sách Bác sĩ Nhi.
2. Lượt tải ứng dụng -> Activation Rate: Tỷ lệ đặt lịch khám đầu tiên thành công trong 24h.
3. Số tài khoản đăng ký -> Cohort Retention D7 & D30 (Tỷ lệ người dùng còn active).
4. Bình luận hỏi giá khám -> Search-to-Booking CVR (%).
5. Giải thưởng uy tín -> Net Promoter Score (NPS) & K-factor giới thiệu người thân.`,
      submittedAt: new Date().toISOString(),
      feedback: {
        score: 9,
        strengths: [
          'Bạn đã chuyển đổi chính xác từ các chỉ số bề nổi (Vanity) sang các chỉ số hành vi gắn với giá trị thực tế của IVIE.',
          'Rất nhạy bén khi nhận ra "Lượt tải app" chỉ là con số ảo nếu không có người thực sự đi khám (Activation).'
        ],
        weaknesses: [
          'Với mục 4, ngoài CVR nên bổ sung thêm Search Drop-off Rate để biết người dùng có tìm thấy bác sĩ phù hợp không.'
        ],
        why: 'Trong thực tế, một Marketer chuyển từ Brand sang Growth thường bị quán tính bám vào số reach. Bài làm của bạn chứng tỏ bạn đã thực sự thay đổi kính nhìn.',
        improvedVersion: 'Ví dụ chuẩn hóa: 4. Bình luận hỏi giá khám -> Tỷ lệ tìm kiếm có kết quả (Search Success Rate) và Tỷ lệ chuyển tiếp sang Đặt lịch (Search-to-Book CVR).',
        socraticQuestion: 'Nếu một tuần lượt tải app IVIE tăng 300% nhưng tỷ lệ hoàn thành ca khám giảm 40%, bạn sẽ giải thích hiện tượng này với sếp như thế nào?'
      }
    }
  },
  reflections: {
    1: {
      day: 1,
      learned: 'Hiểu sự khác biệt sống còn giữa Vanity Metrics và Actionable Metrics. Growth Marketing là làm việc trên toàn phễu chứ không chỉ dừng ở bước nhận diện.',
      unclear: 'Cách tính toán chính xác điểm hòa vốn của một kênh khi người dùng khám nhiều lần trong năm.',
      topInsight: 'Không bao giờ được ăn mừng vì lượt tải app tăng nếu đường cong Retention dốc về 0.',
      actionPlan: 'Ngày mai sẽ vẽ chi tiết hành trình bệnh nhân của IVIE qua 5 nấc AARRR.'
    }
  },
  experiments: INITIAL_IVIE_EXPERIMENTS,
  portfolioChapters: CAPSTONE_CHAPTERS,
  notes: [
    'Nhớ nguyên tắc: Luôn gắn nhãn dữ liệu [ASSUMPTION], [HYPOTHESIS], [SIMULATED DATA] cho IVIE.',
    'LTV:CAC tối thiểu phải đạt 3:1 mới an toàn để mở rộng ngân sách quảng cáo.'
  ],
  quizScores: {
    1: 100
  }
};

export function useLearningStore() {
  const [state, setState] = useState<StoredAppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_STATE, ...parsed };
      }
    } catch (e) {
      console.error('Error loading stored state', e);
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving state', e);
    }
  }, [state]);

  const setCurrentDay = (day: number) => {
    setState((prev) => ({ ...prev, currentDay: day }));
  };

  const toggleTaskCompletion = (taskId: string) => {
    setState((prev) => {
      const exists = prev.completedTasks.includes(taskId);
      const updated = exists
        ? prev.completedTasks.filter((t) => t !== taskId)
        : [...prev.completedTasks, taskId];
      return { ...prev, completedTasks: updated };
    });
  };

  const markDayCompleted = (day: number) => {
    setState((prev) => {
      if (!prev.completedDays.includes(day)) {
        return {
          ...prev,
          completedDays: [...prev.completedDays, day],
          studyHours: Number((prev.studyHours + 2).toFixed(1))
        };
      }
      return prev;
    });
  };

  const saveSubmission = (taskId: string, day: number, content: string, feedback?: any) => {
    setState((prev) => ({
      ...prev,
      submissions: {
        ...prev.submissions,
        [taskId]: {
          day,
          taskId,
          content,
          submittedAt: new Date().toISOString(),
          feedback
        }
      },
      completedTasks: prev.completedTasks.includes(taskId) ? prev.completedTasks : [...prev.completedTasks, taskId]
    }));
  };

  const saveReflection = (day: number, reflection: DayReflection) => {
    setState((prev) => ({
      ...prev,
      reflections: {
        ...prev.reflections,
        [day]: reflection
      }
    }));
  };

  const saveQuizScore = (day: number, score: number) => {
    setState((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [day]: score
      }
    }));
  };

  const addExperiment = (exp: GrowthExperiment) => {
    setState((prev) => ({
      ...prev,
      experiments: [exp, ...prev.experiments]
    }));
  };

  const updateExperiment = (id: string, updates: Partial<GrowthExperiment>) => {
    setState((prev) => ({
      ...prev,
      experiments: prev.experiments.map((e) => (e.id === id ? { ...e, ...updates } : e))
    }));
  };

  const updatePortfolioChapter = (chapterId: string, content: string) => {
    setState((prev) => ({
      ...prev,
      portfolioChapters: prev.portfolioChapters.map((c) => (c.id === chapterId ? { ...c, content } : c))
    }));
  };

  const addNote = (note: string) => {
    setState((prev) => ({
      ...prev,
      notes: [note, ...prev.notes]
    }));
  };

  return {
    state,
    setCurrentDay,
    toggleTaskCompletion,
    markDayCompleted,
    saveSubmission,
    saveReflection,
    saveQuizScore,
    addExperiment,
    updateExperiment,
    updatePortfolioChapter,
    addNote
  };
}
