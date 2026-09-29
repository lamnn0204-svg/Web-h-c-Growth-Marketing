export interface SkillComparison {
  dimension: string;
  brandComms: string;
  growthMarketing: string;
  gapLevel: 'Low' | 'Medium' | 'High';
  bridgingStrategy: string;
}

export const SKILL_GAP_ANALYSIS: SkillComparison[] = [
  {
    dimension: 'Mindset & Triết lý',
    brandComms: 'Nhận diện thương hiệu (Awareness), cảm xúc (Sentiment), thông điệp sáng tạo (Creative storytelling), độ phủ (Reach).',
    growthMarketing: 'Tối ưu hóa toàn phễu (Full-funnel), tác động trực tiếp vào Product Retention & Revenue, lấy dữ liệu và thử nghiệm liên tục làm trọng tâm.',
    gapLevel: 'High',
    bridgingStrategy: 'Chuyển đổi góc nhìn từ "Khách hàng nhớ gì về ta" sang "Khách hàng thực hiện hành vi nào tạo ra giá trị bền vững cho cả hai bên".'
  },
  {
    dimension: 'Chỉ số đo lường (Metrics)',
    brandComms: 'Vanity Metrics: Impressions, Reach, Likes, Shares, PR Mentions, SOV (Share of Voice).',
    growthMarketing: 'Actionable Metrics: CAC, LTV, Activation Rate, D1/D7/D30 Cohort Retention, Churn, Payback Period, Net Revenue Retention.',
    gapLevel: 'High',
    bridgingStrategy: 'Học cách xây dựng KPI Tree: Tách North Star Metric thành các Input Metrics cụ thể có thể tác động hàng tuần.'
  },
  {
    dimension: 'Phương pháp luận (Methodology)',
    brandComms: 'Campaign-based (theo chiến dịch lớn quý/năm, ngân sách cố định, big launch).',
    growthMarketing: 'Experimentation-driven (thử nghiệm nhanh hàng tuần, quy trình Build - Measure - Learn, ICE/RICE Prioritization).',
    gapLevel: 'High',
    bridgingStrategy: 'Thay vì chờ 3 tháng để launch 1 chiến dịch, chia nhỏ thành các Growth Sprints 1-2 tuần với giả thuyết (Hypothesis) rõ ràng.'
  },
  {
    dimension: 'Phạm vi phễu (Funnel Scope)',
    brandComms: 'Tập trung chủ yếu ở Top of Funnel (Awareness & Consideration). Bàn giao lead/user cho team Sales/Product.',
    growthMarketing: 'Toàn bộ AARRR: Acquisition → Activation → Retention → Referral → Revenue. Can thiệp sâu vào User Onboarding và In-app Journey.',
    gapLevel: 'High',
    bridgingStrategy: 'Làm việc sâu sát với Product Manager và Data Analyst để tối ưu onboarding, Time-to-Value và Habit Loop.'
  },
  {
    dimension: 'Công cụ & Kỹ thuật số (Tools)',
    brandComms: 'Social Media Dashboards, PR Monitoring, Canva/Figma, Brand Guidelines, Media Buying Manager.',
    growthMarketing: 'Product Analytics (Amplitude, Mixpanel, GA4), A/B Testing tools, CRM/Marketing Automation (Customer.io, Braze, OneSignal), SQL cơ bản.',
    gapLevel: 'Medium',
    bridgingStrategy: 'Thành thạo đọc biểu đồ Funnel Drop-off và Cohort Retention Table; hiểu cơ chế Event-driven tracking.'
  },
  {
    dimension: 'Copywriting & Content',
    brandComms: 'Văn phong truyền cảm hứng, định vị giá trị thương hiệu, nghệ thuật chơi chữ, thông điệp cảm xúc.',
    growthMarketing: 'Behavioral Copywriting: Thúc đẩy hành vi tiếp theo (Next Best Action), giảm cognitive friction, micro-copy trong onboarding.',
    gapLevel: 'Low',
    bridgingStrategy: 'Đòn bẩy thế mạnh sẵn có của Lâm: Kết hợp sự nhạy bén ngôn từ với tâm lý học hành vi (Behavioral Design).'
  }
];

export const LEARNING_PHILOSOPHY = {
  headline: 'Nguyên lý Học tập: Thực chiến - Dữ liệu - Sản phẩm',
  principles: [
    {
      title: '40% Theory, 60% Practice',
      desc: 'Mỗi ngày học 2 tiếng buổi sáng lý thuyết hệ thống, buổi tối bắt buộc tạo ra ít nhất 1 Output cụ thể cho IVIE – Bác sĩ ơi.'
    },
    {
      title: 'Zero Vanity Metrics',
      desc: 'Tập trung 100% vào các chỉ số hành vi: Activation Rate, Time-to-Value, D30 Retention, LTV:CAC thay vì Reach và Views.'
    },
    {
      title: 'Socratic Challenge',
      desc: 'Mentor không mớm cơm đáp án. Lâm phải tự đặt câu hỏi phản biện: "Hành động này mang lại giá trị gì cho bệnh nhân và bác sĩ?".'
    },
    {
      title: 'Minh bạch Dữ liệu (Data Tagging)',
      desc: 'Mọi con số đều được gắn nhãn rõ ràng: [REAL DATA], [ASSUMPTION], [HYPOTHESIS], [SIMULATED DATA]. Không ngộ nhận số giả lập là số thật.'
    },
    {
      title: 'Portfolio-Ready Artifacts',
      desc: 'Sau mỗi module đều có 1 tài sản Growth hoàn chỉnh (Funnel, Retention Matrix, Experiment Backlog, 90-Day Roadmap) để đưa thẳng vào hồ sơ ứng tuyển.'
    }
  ]
};
