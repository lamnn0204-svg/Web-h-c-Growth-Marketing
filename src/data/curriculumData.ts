export interface DailyResource {
  title: string;
  source: string;
  url: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estTime: string;
  keyTakeaway: string;
}

export interface DailyQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  hint: string;
  level: string;
  ivieContext: string;
}

export interface DayCurriculum {
  day: number;
  phase: number;
  phaseTitle: string;
  title: string;
  objective: string;
  morning: {
    time: string;
    breakdown: { time: string; title: string; content: string }[];
  };
  evening: {
    tasks: DailyTask[];
  };
  outputOfTheDay: {
    title: string;
    description: string;
    template: string;
    sampleOutput: string;
  };
  resources: DailyResource[];
  quiz: DailyQuizQuestion[];
  careerApplication: {
    cvBullet: string;
    interviewTalkingPoint: string;
    skillGained: string;
  };
  commonMistakes: string[];
}

export const PHASES = [
  { phase: 1, title: 'Growth Foundation', days: '1 - 3', desc: 'Tư duy tăng trưởng, Growth Loops, AARRR, North Star Metric & Growth Model' },
  { phase: 2, title: 'Acquisition', days: '4 - 6', desc: 'Kéo người dùng, Paid vs Organic, CAC, CPA, CVR & Ad-to-Product Funnel' },
  { phase: 3, title: 'Activation', days: '7 - 9', desc: 'Aha Moment, Time-to-Value, Onboarding Journey & Drop-off Analysis' },
  { phase: 4, title: 'Retention (Deep Dive)', days: '10 - 14', desc: 'Cohort Retention D1/D7/D30, Habit Loop, CRM Automation & Resurrection' },
  { phase: 5, title: 'Monetization', days: '15 - 17', desc: 'ARPU, ARPPU, LTV:CAC, Marketplace Take Rate & IVIE Monetization Canvas' },
  { phase: 6, title: 'Experimentation', days: '18 - 21', desc: 'Hypothesis Design, ICE/RICE Prioritization, A/B Testing & Guardrail Metrics' },
  { phase: 7, title: 'Growth Strategy', days: '22 - 25', desc: 'Chiến lược 90 ngày, Cây KPI Tree, Growth Sprints & Cross-functional' },
  { phase: 8, title: 'Analytics & Dashboard', days: '26 - 27', desc: 'GA4, Event Taxonomy, Funnel Drop-off Tracking & Simulated Data Dashboard' },
  { phase: 9, title: 'Capstone Project', days: '28 - 29', desc: 'Hoàn thiện Case Study Growth Marketing 21 phần cho IVIE - Bác sĩ ơi' },
  { phase: 10, title: 'Final Review & Career', days: '30', desc: 'Mock Interview, 50 Câu hỏi phỏng vấn, Định vị CV/LinkedIn chuyển từ Brand' }
];

export const DAYS_DATA: DayCurriculum[] = [
  // DAY 1
  {
    day: 1,
    phase: 1,
    phaseTitle: 'Growth Foundation',
    title: 'Growth Marketing là gì? Brand Marketing vs Growth Marketing',
    objective: 'Nắm vững bản chất của Growth Marketing, chuyển dịch tư duy từ Brand Awareness sang Full-funnel Actionable Impact.',
    morning: {
      time: '09:30 - 11:30',
      breakdown: [
        { time: '09:30-09:45', title: 'Warm-up & Đổi kính tư duy', content: 'Từ góc nhìn Brand (tạo cảm xúc, reach) sang Growth (tác động trực tiếp vào retention và revenue).' },
        { time: '09:45-10:20', title: 'Lý thuyết Cốt lõi', content: 'Khái niệm Growth Marketing: Tối ưu liên tục dựa trên thử nghiệm và số liệu. Khác biệt giữa Vanity Metrics (Reach, Likes) và Actionable Metrics (Activation Rate, Cohort Retention).' },
        { time: '10:20-10:45', title: 'Framework & Tư duy', content: 'Phễu tuyến tính (Funnel) vs Vòng lặp tăng trưởng (Growth Loop). Tại sao Growth Loop tạo ra lãi kép cho sản phẩm số.' },
        { time: '10:45-11:15', title: 'Áp dụng vào IVIE – Bác sĩ ơi', content: 'Nếu IVIE chi 500 triệu làm TVC tăng nhận biết thương hiệu nhưng tỷ lệ drop-off từ cài app đến đặt lịch khám là 70%, điều gì xảy ra? Vấn đề nằm ở đâu?' },
        { time: '11:15-11:30', title: 'Quiz & Tự kiểm tra', content: '3 câu hỏi kiểm tra khả năng phân biệt Vanity vs Actionable metric.' }
      ]
    },
    evening: {
      tasks: [
        {
          id: 'd1-t1',
          title: 'Phân loại Metric của IVIE',
          description: 'Liệt kê 5 chỉ số Vanity của IVIE bạn thường thấy khi làm Brand và chuyển đổi chúng thành 5 chỉ số Actionable tương ứng trong Growth.',
          hint: 'Thay vì "Lượt tải app", hãy dùng "Số người dùng hoàn thành đăng ký và tìm bác sĩ trong 24h đầu".',
          level: 'Level 1: Knowledge & Transition',
          ivieContext: 'Áp dụng cho ứng dụng IVIE - Bác sĩ ơi.'
        },
        {
          id: 'd1-t2',
          title: 'Vẽ So sánh Brand vs Growth cho IVIE',
          description: 'Viết đoạn phân tích 150-200 từ: "Nếu giữ nguyên tư duy Brand & Comms khi vận hành app IVIE, công ty sẽ gặp rủi ro gì về mặt kinh tế đơn vị (Unit Economics)?"',
          hint: 'Nhắc đến nguy cơ "Leaky Bucket" (Xô thủng): tốn tiền mua user nhưng không giữ chân được ai.',
          level: 'Level 2: Application',
          ivieContext: 'Bảo vệ ngân sách tiếp thị trước ban giám đốc.'
        }
      ]
    },
    outputOfTheDay: {
      title: 'Bản Đồ Chuyển Đổi Tư Duy Brand → Growth cho IVIE',
      description: 'Bảng đối chiếu 5 hành vi & 5 chỉ số hành động cốt lõi thay thế cho chỉ số nhận diện truyền thống.',
      template: `### BẢN ĐỐI CHIẾU CHỈ SỐ IVIE - BÁC SĨ ƠI
1. Lượt xem Fanpage / Video -> [Actionable Metric tương ứng]
2. Lượt tải ứng dụng -> [Actionable Metric tương ứng]
3. Số lượng tài khoản đăng ký -> [Actionable Metric tương ứng]
4. Bình luận hỏi giá khám -> [Actionable Metric tương ứng]
5. Giải thưởng thương hiệu y tế uy tín -> [Actionable Metric tương ứng]`,
      sampleOutput: `1. Lượt xem Video -> Cost Per Visitor truy cập danh sách Bác sĩ
2. Lượt tải ứng dụng -> Activation Rate: Tỷ lệ đặt lịch khám đầu tiên thành công
3. Số tài khoản đăng ký -> D7 & D30 Retention Rate (Tỷ lệ người dùng còn hoạt động sau 7 & 30 ngày)
4. Bình luận hỏi giá khám -> In-app Search-to-Booking CVR (%)
5. Giải thưởng uy tín -> Net Promoter Score (NPS) & Tỷ lệ bệnh nhân giới thiệu người thân (K-factor)`
    },
    resources: [
      { title: 'The Growth Marketing Handbook', source: 'Reforge', url: 'https://www.reforge.com/blog', difficulty: 'Intermediate', estTime: '25 phút', keyTakeaway: 'Hiểu bản chất Growth Loop thay thế cho Phễu truyền thống.' },
      { title: 'Vanity Metrics vs Actionable Metrics', source: 'Amplitude Guide', url: 'https://amplitude.com/blog', difficulty: 'Beginner', estTime: '15 phút', keyTakeaway: 'Cách nhận diện các chỉ số ảo gây ảo tưởng thành công.' }
    ],
    quiz: [
      { question: 'Chỉ số nào sau đây là "Vanity Metric" đối với app IVIE – Bác sĩ ơi?', options: ['Số ca khám trực tuyến hoàn thành', 'Tổng lượt hiển thị bài viết fanpage', 'Tỷ lệ người dùng tái khám sau 30 ngày', 'Chi phí để có 1 người đặt khám thành công (CAC)'], correctIndex: 1, explanation: 'Lượt hiển thị bài viết không phản ánh bất kỳ hành vi tạo ra giá trị y tế hay doanh thu nào cho IVIE.' },
      { question: 'Điểm khác biệt lớn nhất của Growth Marketer so với Brand Marketer là gì?', options: ['Growth Marketer chỉ làm quảng cáo trả phí (Paid Ads)', 'Growth Marketer chịu trách nhiệm toàn phễu (Full-funnel) và can thiệp vào sản phẩm', 'Growth Marketer không cần quan tâm đến trải nghiệm khách hàng', 'Growth Marketer chỉ chạy các chiến dịch lớn mỗi năm 1 lần'], correctIndex: 1, explanation: 'Growth Marketer can thiệp sâu vào Onboarding, Activation, Retention và Monetization cùng team Product.' }
    ],
    careerApplication: {
      cvBullet: 'Chuyển dịch chiến lược đo lường từ Vanity Metrics sang Actionable Metrics, thiết lập hệ thống chỉ số hành vi gắn liền với Retention và Revenue.',
      interviewTalkingPoint: 'Tôi kết hợp sự nhạy bén về tâm lý và thông điệp từ Brand với tư duy khoa học dữ liệu của Growth để tối ưu toàn bộ vòng đời khách hàng.',
      skillGained: 'Tư duy Full-funnel, Phân biệt Vanity vs Actionable Metrics, Hiểu cơ chế Growth Loop'
    },
    commonMistakes: [
      'Nghĩ rằng Growth Marketing chỉ là "Performance Marketing chạy ads rẻ".',
      'Đánh đồng số lượt tải app với sự thành công của sản phẩm y tế.'
    ]
  },

  // DAY 2
  {
    day: 2,
    phase: 1,
    phaseTitle: 'Growth Foundation',
    title: 'Khung AARRR & Customer Journey trong HealthTech',
    objective: 'Làm chủ khung Pirate Funnel (AARRR) và ánh xạ hành trình bệnh nhân của IVIE vào từng nấc phễu.',
    morning: {
      time: '09:30 - 11:30',
      breakdown: [
        { time: '09:30-09:45', title: 'Khởi động', content: 'Tổng quan lịch sử khung AARRR của Dave McClure.' },
        { time: '09:45-10:20', title: '5 Nấc phễu AARRR', content: 'Acquisition (Thu hút) -> Activation (Kích hoạt giá trị đầu) -> Retention (Giữ chân quay lại) -> Referral (Lan tỏa) -> Revenue (Doanh thu).' },
        { time: '10:20-10:45', title: 'Hành trình người dùng HealthTech', content: 'Đặc thù ngành y tế: Tâm lý lo âu, rào cản tín nhiệm cao, tần suất khám không liên tục.' },
        { time: '10:45-11:15', title: 'Áp dụng vào IVIE', content: 'Định nghĩa cụ thể từng bước của AARRR đối với bệnh nhân đặt khám và bác sĩ tư vấn video.' },
        { time: '11:15-11:30', title: 'Quiz', content: 'Kiểm tra độ hiểu về vị trí các sự kiện trong phễu.' }
      ]
    },
    evening: {
      tasks: [
        {
          id: 'd2-t1',
          title: 'Vẽ AARRR Funnel của IVIE',
          description: 'Mô tả rõ ràng hành động tương ứng của người dùng tại mỗi nấc trong 5 nấc AARRR của IVIE.',
          hint: 'Activation không phải là đăng ký tài khoản, mà là đặt ca khám đầu tiên!',
          level: 'Level 2: Application',
          ivieContext: 'Áp dụng cho dịch vụ Đặt khám tại cơ sở y tế.'
        }
      ]
    },
    outputOfTheDay: {
      title: 'Bản Đồ IVIE AARRR Funnel v1',
      description: 'Cấu trúc 5 giai đoạn chuyển đổi của IVIE kèm chỉ số đo lường chính.',
      template: `### IVIE AARRR FUNNEL v1
- Acquisition: [Kênh & Hành vi] -> Metric: [Chỉ số]
- Activation: [Hành vi nhận giá trị] -> Metric: [Chỉ số]
- Retention: [Hành vi lặp lại] -> Metric: [Chỉ số]
- Referral: [Cơ chế chia sẻ] -> Metric: [Chỉ số]
- Revenue: [Dòng tiền phát sinh] -> Metric: [Chỉ số]`,
      sampleOutput: `- Acquisition: Tải app từ Google Search / QR tại bệnh viện -> Metric: Cost Per Install (CPI)
- Activation: Tìm bác sĩ & Hoàn tất đặt lịch khám đầu tiên -> Metric: Sign-up to Book CVR (30%)
- Retention: Tái khám định kỳ sau 30 ngày hoặc mở sổ sức khỏe -> Metric: D30 Repeat Booking Rate
- Referral: Chia sẻ mã giảm giá khám cho người thân qua Zalo -> Metric: Viral K-factor
- Revenue: Phí dịch vụ trên mỗi ca khám & đơn thuốc -> Metric: Net Revenue per Consultation`
    },
    resources: [
      { title: 'The Pirate Funnel (AARRR) Explained', source: 'HubSpot Academy', url: 'https://academy.hubspot.com', difficulty: 'Beginner', estTime: '20 phút', keyTakeaway: 'Nắm cấu trúc phân tầng và tỷ lệ chuyển đổi giữa các nấc phễu.' }
    ],
    quiz: [
      { question: 'Hành động nào của người dùng IVIE được coi là bước "Activation"?', options: ['Bấm vào quảng cáo Facebook', 'Đăng ký tài khoản bằng số điện thoại', 'Hoàn thành ca khám/tư vấn video đầu tiên', 'Giới thiệu bạn bè qua Zalo'], correctIndex: 2, explanation: 'Activation là khi người dùng nhận được giá trị cốt lõi giải quyết vấn đề sức khỏe của họ.' }
    ],
    careerApplication: {
      cvBullet: 'Thiết kế khung AARRR cho sản phẩm y tế số, định vị chính xác điểm kích hoạt (Activation Point) và tỷ lệ suy giảm qua từng giai đoạn.',
      interviewTalkingPoint: 'Tôi không nhìn sản phẩm dưới góc độ các trang màn hình rời rạc, mà nhìn dưới dạng phễu hành vi liên kết chặt chẽ AARRR.',
      skillGained: 'Phân tích phễu AARRR, Định vị điểm nghẽn hành trình khách hàng'
    },
    commonMistakes: ['Coi việc xem trang chủ hoặc đăng ký thành công là Activation.']
  },

  // DAY 3
  {
    day: 3,
    phase: 1,
    phaseTitle: 'Growth Foundation',
    title: 'North Star Metric (NSM) & Xây dựng Growth Model đầu tiên cho IVIE',
    objective: 'Xác định North Star Metric chuẩn xác và lập phương trình Growth Model định lượng đầu tiên cho IVIE.',
    morning: {
      time: '09:30 - 11:30',
      breakdown: [
        { time: '09:30-09:45', title: 'Khởi động', content: 'Tại sao công ty cần một chỉ số Bắc Đẩu (North Star Metric)?' },
        { time: '09:45-10:20', title: 'Công thức North Star Metric', content: 'Chỉ số đo lường giá trị trao cho khách hàng + Tác động kinh doanh dài hạn. Tiêu chí của một NSM tốt.' },
        { time: '10:20-10:45', title: 'Cây KPI (Input vs Output Metrics)', content: 'Làm sao tách NSM (Output Metric) thành 3-4 Input Metrics mà team có thể hành động hàng tuần.' },
        { time: '10:45-11:15', title: 'Thực hành IVIE', content: 'Lựa chọn giữa "Doanh thu", "Lượt tải app" hay "Số ca khám hoàn thành hàng tháng" (Monthly Completed Consultations).' },
        { time: '11:15-11:30', title: 'Quiz', content: 'Phân biệt Input vs Output metrics.' }
      ]
    },
    evening: {
      tasks: [
        {
          id: 'd3-t1',
          title: 'Thiết lập Cây KPI cho IVIE',
          description: 'Chọn North Star Metric cho IVIE và vẽ cây phân rã thành các Input Metrics cụ thể.',
          hint: 'Input metrics bao gồm: Lượt tìm kiếm bác sĩ, Tỷ lệ đặt lịch, Tỷ lệ có mặt (Show-up), Tỷ lệ tái khám.',
          level: 'Level 3: Analysis & Architecture',
          ivieContext: 'Mô hình tăng trưởng quý tới của IVIE.'
        }
      ]
    },
    outputOfTheDay: {
      title: 'IVIE Growth Model & KPI Tree v1',
      description: 'Phương trình tăng trưởng định lượng và cây phân rã chỉ số cho IVIE.',
      template: `### PHƯƠNG TRÌNH GROWTH MODEL IVIE
Growth = [Traffic x CVR cài app x Activation Rate] + [Existing Users x Retention] + [Referral]
- North Star Metric: ...
  + Input Metric 1: ...
  + Input Metric 2: ...
  + Input Metric 3: ...
  + Guardrail Metric: ...`,
      sampleOutput: `### PHƯƠNG TRÌNH GROWTH MODEL IVIE
Monthly Completed Bookings = (Total Searches x Search-to-Book CVR x Show-up Rate) + (Active Base x D30 Repeat Rate)
- North Star Metric: Số ca khám y tế hoàn thành thành công hàng tháng (Monthly Completed Consultations)
  + Input 1: Lượng tìm kiếm bác sĩ hàng tháng (Discovery Volume)
  + Input 2: Tỷ lệ Search-to-Booking CVR
  + Input 3: Tỷ lệ người bệnh có mặt đúng giờ (Show-up Rate)
  + Input 4: Tỷ lệ tái khám sau 30 ngày (D30 Repeat Rate)
  + Guardrail Metric: Điểm đánh giá CSAT sau khám (>= 4.5/5 sao)`
    },
    resources: [
      { title: 'Choosing Your North Star Metric', source: 'Lenny Rachitsky', url: 'https://www.lennysnewsletter.com', difficulty: 'Intermediate', estTime: '30 phút', keyTakeaway: '6 loại North Star Metric phổ biến và cách chọn metric phù hợp với marketplace/service.' }
    ],
    quiz: [
      { question: 'Tại sao "Tổng doanh thu" KHÔNG NÊN là North Star Metric tốt nhất cho IVIE?', options: ['Vì doanh thu quá khó tính toán', 'Vì doanh thu là chỉ số trễ (Lagging) và không phản ánh trực tiếp giá trị thực sự người bệnh nhận được', 'Vì ban giám đốc không quan tâm đến doanh thu', 'Vì chỉ số này chỉ đo được trên web'], correctIndex: 1, explanation: 'Doanh thu là kết quả sau cùng. Nếu tăng giá khám đột ngột doanh thu có thể tăng ngắn hạn nhưng người bệnh thất vọng rời bỏ nền tảng.' }
    ],
    careerApplication: {
      cvBullet: 'Xây dựng Growth Model định lượng và KPI Tree xoay quanh North Star Metric (Completed Consultations), kết nối chỉ số vận hành với kết quả kinh doanh.',
      interviewTalkingPoint: 'Tôi giúp toàn đội ngũ tập trung vào 1 North Star Metric duy nhất thay vì bị phân tán bởi hàng chục báo cáo rời rạc.',
      skillGained: 'Xây dựng KPI Tree, Thiết lập North Star Metric, Tư duy hệ thống'
    },
    commonMistakes: ['Chọn chỉ số doanh thu ngắn hạn làm NSM thay vì chỉ số phản ánh giá trị cốt lõi.']
  },

  // DAY 4
  {
    day: 4,
    phase: 2,
    phaseTitle: 'Acquisition',
    title: 'Acquisition Funnel & Động lực kéo người dùng (Paid vs Organic)',
    objective: 'Nắm vững cấu trúc Acquisition Funnel, phân biệt hiệu quả kinh tế giữa Organic, SEO, Direct và Paid Performance Channels.',
    morning: {
      time: '09:30 - 11:30',
      breakdown: [
        { time: '09:30-09:45', title: 'Khởi động', content: 'Tại sao phụ thuộc hoàn toàn vào Paid Ads là tự sát trong dài hạn?' },
        { time: '09:45-10:20', title: 'Các kênh Acquisition chính', content: 'Paid (Meta, Google, TikTok), Organic (SEO bài viết y khoa, ASO), Referral (Giới thiệu), Offline-to-Online (Bệnh viện partnership).' },
        { time: '10:20-10:45', title: 'Chỉ số đo lường kênh', content: 'CPM, CPC, CTR, CPA, CVR qua từng nấc: Impression -> Click -> Landing/Store -> Install.' },
        { time: '10:45-11:15', title: 'Phân tích kênh IVIE', content: 'Kênh Google Search tiếp cận nhu cầu có sẵn (High Intent); Kênh Meta tạo nhu cầu (Low Intent, Higher Friction).' },
        { time: '11:15-11:30', title: 'Quiz', content: 'Đọc và tính toán CVR phễu Acquisition.' }
      ]
    },
    evening: {
      tasks: [
        {
          id: 'd4-t1',
          title: 'Lập Ma trận Kênh Acquisition cho IVIE',
          description: 'Lập bảng phân tích 4 kênh Acquisition chính của IVIE: Intent Level, Ưu điểm, Rủi ro, và Chỉ số đo lường chính.',
          hint: 'Ghi rõ nhãn [ASSUMPTION] / [HYPOTHESIS] cho các chi phí ước lượng.',
          level: 'Level 3: Analysis',
          ivieContext: 'Phân bổ ngân sách tiếp thị quý 4.'
        }
      ]
    },
    outputOfTheDay: {
      title: 'Ma Trận Kênh Acquisition IVIE (Channel Matrix)',
      description: 'Bảng đánh giá toàn diện các kênh kéo người dùng của IVIE.',
      template: `### MA TRẬN KÊNH ACQUISITION IVIE
| Kênh | Ý định người dùng (Intent) | CPA dự kiến [ASSUMPTION] | Ưu điểm | Nhược điểm |
| Google Search Ads | ... | ... | ... | ... |
| Meta Ads | ... | ... | ... | ... |
| SEO Y khoa | ... | ... | ... | ... |
| QR Code tại Bệnh viện | ... | ... | ... | ... |`,
      sampleOutput: `### MA TRẬN KÊNH ACQUISITION IVIE
| Kênh | Ý định (Intent) | CPA dự kiến [ASSUMPTION] | Ưu điểm | Nhược điểm |
| Google Search | Cực cao (Đang đau ốm) | 120.000 VNĐ | CVR đặt lịch cao (35%) | Volume từ khóa có hạn, giá bid cao |
| Meta Ads | Trung bình (Quan tâm sức khỏe) | 65.000 VNĐ | Quy mô lớn, hình ảnh trực quan | CVR đặt lịch thấp hơn, cần nuôi dưỡng |
| SEO Y khoa | Cao (Tìm triệu chứng bệnh) | 15.000 VNĐ (Blended) | Bền vững, chi phí rẻ dài hạn | Cần thời gian 6-9 tháng để rank top |
| QR tại Bệnh viện | Tối đa (Đang đứng chờ khám) | 10.000 VNĐ | Đúng tâm lý muốn tránh xếp hàng | Phụ thuộc mối quan hệ với viện |`
    },
    resources: [
      { title: 'Traction Channels: 19 Ways to Acquire Customers', source: 'Gabriel Weinberg', url: 'https://tractionbook.com', difficulty: 'Beginner', estTime: '30 phút', keyTakeaway: 'Bullseye Framework để tìm ra 1-2 kênh tăng trưởng chủ lực.' }
    ],
    quiz: [
      { question: 'Người tìm kiếm từ khóa "đặt khám bác sĩ nhi bệnh viện việt đức" trên Google có đặc điểm gì?', options: ['Ý định khám thấp, chỉ xem cho vui', 'Ý định mua cao (High Intent), tỷ lệ chuyển đổi thành ca khám cao', 'Không bao giờ tải app', 'Chỉ muốn xin tư vấn miễn phí'], correctIndex: 1, explanation: 'Họ có nhu cầu cấp bách, cụ thể về chuyên khoa và cơ sở y tế.' }
    ],
    careerApplication: {
      cvBullet: 'Xây dựng ma trận kênh Acquisition đa chiều kết hợp giữa High-Intent Search và Low-Cost O2O Partnership, tối ưu hóa Blended CPA.',
      interviewTalkingPoint: 'Tôi không chạy ads dàn trải, mà phân bổ theo mức độ ý định (Intent Level) của bệnh nhân.',
      skillGained: 'Phân tích kênh kéo người dùng, Đánh giá Intent, Tối ưu Blended CAC'
    },
    commonMistakes: ['Đánh đồng chi phí rẻ (CPI thấp) với kênh hiệu quả mà bỏ qua chất lượng người dùng thực sự đi khám.']
  },

  // DAY 5
  {
    day: 5,
    phase: 2,
    phaseTitle: 'Acquisition',
    title: 'Unit Economics trong Acquisition: CAC, LTV, ROAS & Payback Period',
    objective: 'Nắm vững toán học tăng trưởng: Tính toán CAC, LTV, tỷ số LTV:CAC và thời gian thu hồi vốn Payback Period.',
    morning: {
      time: '09:30 - 11:30',
      breakdown: [
        { time: '09:30-09:45', title: 'Khởi động', content: 'Bẫy đốt tiền trong các startup công nghệ.' },
        { time: '09:45-10:20', title: 'Công thức Unit Economics', content: 'CAC (Blended vs Paid), LTV (Gross Profit x Lifetime), Tỷ số LTV:CAC lý tưởng (3:1). Payback Period.' },
        { time: '10:20-10:45', title: 'ROAS vs CAC trong mô hình Marketplace', content: 'Tại sao chỉ nhìn ROAS trên doanh thu đơn hàng đầu tiên sẽ khiến bạn bỏ lỡ cơ hội scale up.' },
        { time: '10:45-11:15', title: 'Bài toán kinh tế IVIE', content: 'Chi phí mua một người đặt khám là 180.000 VNĐ. Phí hoa hồng thu về từ lần khám đầu là 80.000 VNĐ. Khi nào công ty có lãi?' },
        { time: '11:15-11:30', title: 'Quiz', content: 'Bài tập tính toán CAC và LTV:CAC.' }
      ]
    },
    evening: {
      tasks: [
        {
          id: 'd5-t1',
          title: 'Tính toán Unit Economics cho IVIE',
          description: 'Sử dụng công cụ tính toán Growth Metrics trên dashboard để mô phỏng bài toán kinh tế cho 3 phân khúc người dùng của IVIE.',
          hint: 'Bệnh nhân mạn tính có số lần khám/năm cao hơn, do đó LTV cao hơn nhóm khám cấp tính.',
          level: 'Level 4: Quantitative Strategy',
          ivieContext: 'Mô phỏng dữ liệu [SIMULATED DATA].'
        }
      ]
    },
    outputOfTheDay: {
      title: 'Bảng Tính Unit Economics & Payback Period IVIE',
      description: 'Mô hình tài chính đơn vị chứng minh tính khả thi mở rộng ngân sách của IVIE.',
      template: `### UNIT ECONOMICS CHO 1 USER IVIE [SIMULATED DATA]
- CAC (Chi phí mua người dùng): ... VNĐ
- Doanh thu hoa hồng/ca khám: ... VNĐ
- Tần suất khám/năm: ... lần
- Thời gian gắn bó trung bình: ... năm
- LTV (Giá trị trọn đời): ... VNĐ
- Tỷ số LTV:CAC: ... : 1
- Payback Period (Thời gian hoàn vốn): ... tháng`,
      sampleOutput: `### UNIT ECONOMICS CHO 1 USER IVIE [SIMULATED DATA]
- CAC Blended: 150.000 VNĐ
- Lợi nhuận gộp/ca khám: 80.000 VNĐ
- Tần suất khám: 3 lần/năm
- Thời gian gắn bó: 2.5 năm
- LTV = 80.000 x 3 x 2.5 = 600.000 VNĐ
- Tỷ số LTV:CAC = 600.000 / 150.000 = 4.0 : 1 (Lành mạnh)
- Payback Period = 150.000 / (80.000 x 3 / 12) = 7.5 tháng`
    },
    resources: [
      { title: 'The Ultimate Guide to CAC and LTV', source: 'Andreessen Horowitz (a16z)', url: 'https://a16z.com', difficulty: 'Advanced', estTime: '35 phút', keyTakeaway: 'Cách tính LTV dựa trên Gross Margin thay vì Revenue.' }
    ],
    quiz: [
      { question: 'Nếu một kênh có CAC là 200.000 VNĐ và LTV là 300.000 VNĐ (tỷ số 1.5:1), bạn nên làm gì?', options: ['Tăng gấp đôi ngân sách ngay lập tức', 'Dừng hoặc tái cấu trúc kênh, vì sau chi phí vận hành kênh này đang lỗ', 'Chỉ cần tuyển thêm nhân sự sales', 'Chuyển toàn bộ sang chạy TikTok'], correctIndex: 1, explanation: 'Tỷ số dưới 3:1 thường không đủ bù đắp chi phí vận hành (Overhead) và hỗ trợ khách hàng.' }
    ],
    careerApplication: {
      cvBullet: 'Thiết lập mô hình Unit Economics chuẩn xác (LTV:CAC 4:1, Payback Period 7.5 tháng), bảo vệ kế hoạch mở rộng ngân sách tiếp thị trước CFO.',
      interviewTalkingPoint: 'Tôi nói chuyện với ban giám đốc bằng ngôn ngữ tài chính và lợi nhuận gộp, không chỉ dừng lại ở số clicks.',
      skillGained: 'Tính toán CAC, LTV, Payback Period, Phân tích tính bền vững kinh doanh'
    },
    commonMistakes: ['Lấy doanh thu tổng để tính LTV thay vì lợi nhuận gộp thực tế của công ty.']
  },

  // DAY 6
  {
    day: 6,
    phase: 2,
    phaseTitle: 'Acquisition',
    title: 'Ad → Landing Page → Product Funnel & Tối ưu CVR',
    objective: 'Thiết kế hành trình liền mạch từ thông điệp quảng cáo đến Landing Page và App Store nhằm tối đa hóa tỷ lệ chuyển đổi.',
    morning: {
      time: '09:30 - 11:30',
      breakdown: [
        { time: '09:30-09:45', title: 'Khởi động', content: 'Tại sao quảng cáo hay nhưng Landing Page không ai đặt lịch?' },
        { time: '09:45-10:20', title: 'Nguyên lý Message Match', content: 'Sự đồng nhất giữa Hook quảng cáo, Tiêu đề Landing Page và Màn hình Onboarding.' },
        { time: '10:20-10:45', title: 'Phân tích Drop-off và Friction', content: 'Giảm tải nhận thức (Cognitive load), Social proof, Bác sĩ bảo chứng, CTA rõ ràng.' },
        { time: '10:45-11:15', title: 'Thực tế IVIE', content: 'So sánh luồng tải app chung chung vs Landing Page chuyên biệt theo bệnh học: "Đặt lịch khám Nhi Việt Đức".' },
        { time: '11:15-11:30', title: 'Quiz', content: 'Kiểm tra lỗi đứt gãy phễu quảng cáo.' }
      ]
    },
    evening: {
      tasks: [
        {
          id: 'd6-t1',
          title: 'Thiết kế Wireframe Phễu Ad-to-Landing Page cho IVIE',
          description: 'Viết kịch bản Message Match gồm: 1 Mẫu quảng cáo Meta Ads, 1 Tiêu đề & Cấu trúc Landing Page tương ứng, và 1 Nút bấm kêu gọi hành động.',
          hint: 'Đối tượng: Phụ huynh có con bị ho sốt tại Hà Nội.',
          level: 'Level 3: Application & Copywriting',
          ivieContext: 'Chiến dịch chuyên khoa Nhi.'
        }
      ]
    },
    outputOfTheDay: {
      title: 'Kế Hoạch Message Match Ad-to-Landing Page IVIE',
      description: 'Bản thiết kế hành trình chuyển đổi liền mạch từ quảng cáo vào trang chuyển đổi.',
      template: `### KẾ HOẠCH MESSAGE MATCH
- Target Audience: ...
- Ad Hook & Visual: ...
- Landing Page Headline & Social Proof: ...
- Key Call to Action (CTA): ...
- Expected CVR Lift: ... % [HYPOTHESIS]`,
      sampleOutput: `### KẾ HOẠCH MESSAGE MATCH (CHUYÊN KHOA NHI)
- Target: Phụ huynh có con 0-6 tuổi tại Hà Nội
- Ad Hook: "Con sốt nửa đêm, đừng bế con ra viện xếp hàng 4 tiếng. Đặt trước bác sĩ Nhi đầu ngành trên IVIE."
- Landing Page: "Khám Nhi Đích Danh Bác Sĩ Bệnh Viện Nhi TW - Không Xếp Hàng, Đúng Giờ Hẹn" + Đánh giá của 1.200 mẹ bỉm sữa.
- CTA: "Chọn Giờ Khám Ngày Mai Ngay"
- Expected Lift: Tăng CVR từ 3.5% lên 6.8% (+94% lift) [HYPOTHESIS]`
    },
    resources: [
      { title: 'The Conversion Centered Design Guide', source: 'Unbounce', url: 'https://unbounce.com', difficulty: 'Beginner', estTime: '25 phút', keyTakeaway: '7 nguyên lý loại bỏ ma sát trên Landing Page chuyển đổi cao.' }
    ],
    quiz: [
      { question: 'Hiện tượng "Message Mismatch" xảy ra khi nào?', options: ['Khi quảng cáo hứa hẹn một điều nhưng trang đích lại nói về điều khác hoặc đưa về trang chủ chung chung', 'Khi chạy quảng cáo không có hình ảnh', 'Khi ngân sách quá nhỏ', 'Khi trang đích tải quá nhanh'], correctIndex: 0, explanation: 'Mất kết nối thông điệp làm user mất phương hướng và thoát trang ngay lập tức.' }
    ],
    careerApplication: {
      cvBullet: 'Tối ưu phễu Ad-to-Product thông qua nguyên tắc Message Match, tăng CVR chuyển đổi Landing Page thêm 94% và hạ CPA kênh trả phí.',
      interviewTalkingPoint: 'Tôi kết nối thông điệp sáng tạo chặt chẽ với trải nghiệm trang đích, không bao giờ dẫn traffic vào ngõ cụt.',
      skillGained: 'Tối ưu Conversion Rate (CRO), Message Matching, Thiết kế phễu quảng cáo'
    },
    commonMistakes: ['Dẫn tất cả traffic từ các quảng cáo chuyên biệt về trang chủ tổng quan của website.']
  }
];

// Helper to get day by number
export function getDayData(dayNumber: number): DayCurriculum {
  const found = DAYS_DATA.find((d) => d.day === dayNumber);
  if (found) return found;

  // Fallback programmatic generator for days 7 to 30 based on phases
  const phaseInfo = PHASES.find((p) => {
    const [start, end] = p.days.split('-').map((s) => parseInt(s.trim()));
    return dayNumber >= start && dayNumber <= end;
  }) || PHASES[0];

  return {
    day: dayNumber,
    phase: phaseInfo.phase,
    phaseTitle: phaseInfo.title,
    title: `Ngày ${dayNumber}: ${phaseInfo.title} Chuyên Sâu cho IVIE – Bác sĩ ơi`,
    objective: `Làm chủ các phương pháp luận và kỹ thuật thực chiến trong ${phaseInfo.title}, áp dụng trực tiếp vào sản phẩm IVIE – Bác sĩ ơi.`,
    morning: {
      time: '09:30 - 11:30',
      breakdown: [
        { time: '09:30-09:45', title: 'Khởi động & Liên kết kiến thức', content: `Kết nối bài học Ngày ${dayNumber - 1} với mục tiêu hôm nay.` },
        { time: '09:45-10:20', title: 'Lý thuyết Chuyên sâu', content: `Nắm vững lý thuyết trọng tâm về ${phaseInfo.title} và các metric hành vi liên quan.` },
        { time: '10:20-10:45', title: 'Phương pháp luận & Framework', content: `Cách cấu trúc bài toán và thiết lập khung phân tích tiêu chuẩn.` },
        { time: '10:45-11:15', title: 'Thực hành phân tích IVIE – Bác sĩ ơi', content: `Mổ xẻ trực tiếp trên bài toán của IVIE: Bệnh nhân, Bác sĩ, Cơ sở y tế.` },
        { time: '11:15-11:30', title: 'Quiz & Kiểm tra nhanh', content: 'Tự đánh giá mức độ thấu hiểu trước khi bước vào bài tập thực hành buổi tối.' }
      ]
    },
    evening: {
      tasks: [
        {
          id: `d${dayNumber}-t1`,
          title: `Bài tập Thực chiến Ngày ${dayNumber}: ${phaseInfo.title}`,
          description: `Phân tích và xây dựng giải pháp Growth cho IVIE – Bác sĩ ơi dựa trên lý thuyết buổi sáng. Nêu rõ vấn đề, insight, metric và giải pháp.`,
          hint: 'Gắn nhãn [ASSUMPTION], [HYPOTHESIS] hoặc [SIMULATED DATA] cho mọi số liệu đưa ra.',
          level: 'Level 4: Strategy & Execution',
          ivieContext: 'Áp dụng cho bài toán tăng trưởng thực tế của IVIE.'
        }
      ]
    },
    outputOfTheDay: {
      title: `Sản Phẩm Output Ngày ${dayNumber}: IVIE ${phaseInfo.title} Artifact`,
      description: `Tài liệu hoặc mô hình phân tích tăng trưởng hoàn thiện có thể đưa thẳng vào Capstone Portfolio.`,
      template: `### OUTPUT NGÀY ${dayNumber} - IVIE ${phaseInfo.title}
1. Bối cảnh & Vấn đề phát hiện: ...
2. Giả thuyết tăng trưởng (Hypothesis): ...
3. Metric chính (Primary Metric) & Guardrail Metric: ...
4. Phương án đề xuất triển khai: ...
5. Bài học rút ra (Key Learning): ...`,
      sampleOutput: `### OUTPUT HOÀN THIỆN NGÀY ${dayNumber}
- Vấn đề: Tỷ lệ chuyển đổi còn điểm nghẽn ở giai đoạn này.
- Giả thuyết: Nếu áp dụng cơ chế tự động hóa và giảm bớt rào cản thao tác, chỉ số mục tiêu sẽ tăng 20-25%.
- Primary Metric: Conversion / Retention Rate theo kỳ. Guardrail: Điểm chất lượng dịch vụ CSAT.
- Phương án: Đóng gói thành thử nghiệm A/B và theo dõi trong 14 ngày.`
    },
    resources: [
      { title: `Tài liệu Growth Thực chiến: ${phaseInfo.title}`, source: 'Amplitude & Reforge', url: 'https://www.reforge.com', difficulty: 'Intermediate', estTime: '25 phút', keyTakeaway: 'Nắm vững phương pháp luận chuẩn quốc tế từ các chuyên gia hàng đầu.' }
    ],
    quiz: [
      { question: `Trọng tâm của giai đoạn ${phaseInfo.title} là gì?`, options: ['Tập trung vào hành vi tạo giá trị bền vững thay vì vanity metrics', 'Chỉ chạy quảng cáo đốt tiền', 'Không cần phân tích số liệu', 'Chỉ làm theo cảm tính'], correctIndex: 0, explanation: 'Growth Marketer luôn lấy hành vi người dùng và dữ liệu làm kim chỉ nam.' }
    ],
    careerApplication: {
      cvBullet: `Làm chủ năng lực ${phaseInfo.title}, xây dựng giải pháp tối ưu hóa dữ liệu thực tế đóng góp trực tiếp vào tăng trưởng dài hạn.`,
      interviewTalkingPoint: `Tôi tiếp cận bài toán ${phaseInfo.title} một cách có hệ thống, luôn đặt câu hỏi về Unit Economics và trải nghiệm người bệnh.`,
      skillGained: `${phaseInfo.title}, Phân tích dữ liệu, Thiết kế giải pháp tăng trưởng`
    },
    commonMistakes: ['Làm theo cảm tính mà không dựa trên dữ liệu phân khúc (Segmentation).']
  };
}
