export interface InterviewQuestion {
  id: string;
  category: 'Foundation & Mindset' | 'Metrics & Analytics' | 'Experimentation' | 'IVIE Case Interview' | 'Career Transition & Behavioral';
  question: string;
  keyConcepts: string[];
  modelAnswer: string;
  commonPitfalls: string;
  proTipForLam: string;
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // 1. Foundation & Mindset
  {
    id: 'q-01',
    category: 'Foundation & Mindset',
    question: 'Sự khác biệt căn bản giữa Brand/Communication Marketer và Growth Marketer là gì?',
    keyConcepts: ['Full-funnel vs Top-funnel', 'Actionable Metrics vs Vanity Metrics', 'Experimentation Loops'],
    modelAnswer: 'Brand Marketer tập trung vào việc định vị thương hiệu, tạo cảm xúc, tăng mức độ nhận biết (Awareness) và thị phần tâm trí (Share of Voice). Họ làm việc theo từng Campaign lớn và đo lường bằng Reach, Impressions, Brand Sentiment. Ngược lại, Growth Marketer chịu trách nhiệm trên toàn bộ phễu AARRR (Acquisition đến Revenue & Referral), đặc biệt can thiệp sâu vào Product Experience (Activation, Retention). Growth Marketer vận hành bằng các chu kỳ thử nghiệm nhanh (Growth Sprints 1-2 tuần) dựa trên dữ liệu hành vi thực tế và đo lường bằng Unit Economics (CAC, LTV, Retention Cohort).',
    commonPitfalls: 'Nói tiêu cực về Brand Marketing. Hãy nhấn mạnh rằng Brand mang lại Trust & Lower CAC, còn Growth biến Trust đó thành Sustainable Revenue & Retention.',
    proTipForLam: 'Hãy tận dụng background Brand của bạn: "Tôi hiểu cách tạo ra thông điệp chạm đến cảm xúc, nhưng tôi dùng tư duy Growth để đo lường xem thông điệp đó kích hoạt hành vi gì trong sản phẩm".'
  },
  {
    id: 'q-02',
    category: 'Foundation & Mindset',
    question: 'North Star Metric (NSM) là gì? Nếu là Growth Lead tại IVIE – Bác sĩ ơi, bạn sẽ chọn NSM nào và tại sao?',
    keyConcepts: ['North Star Metric', 'Input vs Output Metrics', 'Value Delivery'],
    modelAnswer: 'North Star Metric là chỉ số then chốt thể hiện rõ nhất giá trị cốt lõi mà sản phẩm mang lại cho khách hàng, đồng thời thúc đẩy tăng trưởng doanh thu dài hạn của công ty. Với IVIE – Bác sĩ ơi, NSM lý tưởng không phải là "Số lượt tải app" hay "Số tài khoản đăng ký" (đều là Vanity metrics), mà là "Số ca khám / tư vấn y tế hoàn thành thành công hàng tháng" (Monthly Completed Consultations). Chỉ số này phản ánh cả 2 phía: Bệnh nhân nhận được giải pháp y tế kịp thời, và Bác sĩ/Bệnh viện cung cấp dịch vụ chuyên môn. Input metrics sẽ là: Lượng tìm kiếm bác sĩ, Tỷ lệ đặt lịch khám, Tỷ lệ có mặt (Show-up rate) và Tỷ lệ tái khám sau 30 ngày.',
    commonPitfalls: 'Chọn "Tổng doanh thu" hoặc "Số lượt tải app" làm North Star Metric. Doanh thu là kết quả (Lagging indicator), không thể hiện trực tiếp sự hài lòng và giá trị trao cho người dùng.',
    proTipForLam: 'Luôn vẽ cây KPI Tree chia nhỏ NSM thành 3-4 Input metrics để chứng minh tư duy cấu trúc bài bản.'
  },
  {
    id: 'q-03',
    category: 'Foundation & Mindset',
    question: 'Growth Loop khác gì so với Phễu truyền thống (Linear Funnel)? Cho ví dụ một Growth Loop tại IVIE.',
    keyConcepts: ['Growth Loops', 'Compounding Effect', 'Viral/Referral Loop'],
    modelAnswer: 'Phễu tuyến tính (Funnel) là mô hình một chiều: bạn đổ tiền vào Top (Acquisition) và thu được một tỷ lệ nhỏ ở Bottom (Revenue), hết tiền quảng cáo thì phễu cạn. Growth Loop là một hệ thống khép kín tự sinh: đầu ra của một chu kỳ (Input của user cũ) tạo thành đầu vào để kéo thêm user mới hoặc kích hoạt lại chính họ. Ví dụ tại IVIE: Một người mẹ đặt tiêm chủng cho con thành công → Hệ thống gửi Sổ tiêm chủng điện tử và mã "Tặng gói khám Tim mạch cho Ông Bà" → Người mẹ chia sẻ cho gia đình qua Zalo → Ông Bà kích hoạt đặt lịch khám mạn tính → Tiếp tục mời bạn bè cùng câu lạc bộ người cao tuổi.',
    commonPitfalls: 'Nghĩ rằng Growth Loop chỉ có Referral mời bạn bè. Có nhiều loại loops: Content Loop (SEO bài viết bác sĩ), Paid Loop (Lợi nhuận tái đầu tư ad), Viral Loop.',
    proTipForLam: 'Nhấn mạnh rằng Growth Loop tạo ra lãi kép (Compounding Growth), giảm sự lệ thuộc vào Facebook/Google Ads.'
  },

  // 2. Metrics & Analytics
  {
    id: 'q-04',
    category: 'Metrics & Analytics',
    question: 'Làm thế nào để đánh giá một kênh Acquisition có thực sự hiệu quả hay không ngoài chỉ số CPA?',
    keyConcepts: ['LTV:CAC', 'Payback Period', 'Cohort Quality', 'Retention by Channel'],
    modelAnswer: 'CPA thấp không đồng nghĩa với kênh hiệu quả nếu chất lượng người dùng kém. Tôi đánh giá qua 4 tiêu chí: 1) Tỷ số LTV:CAC theo từng kênh (mục tiêu >= 3:1); 2) Payback Period (thời gian thu hồi vốn CAC, lý tưởng dưới 6-12 tháng); 3) Retention Cohort theo kênh (kênh nào có đường cong D30/D90 Retention dốc thoai thoải và đi ngang thay vì rơi về 0); 4) Activation Rate (tỷ lệ người dùng từ kênh đó thực hiện Activation Event trong 7 ngày đầu). Một kênh có CAC 200k nhưng D30 Retention 25% tốt hơn nhiều kênh CAC 50k nhưng sau 7 ngày không ai quay lại.',
    commonPitfalls: 'Chỉ dừng lại ở CTR, CPC và số lượng tải app của kênh.',
    proTipForLam: 'Đưa ra ví dụ cụ thể về việc cắt giảm ngân sách của kênh có volume lớn nhưng churn cao để dồn tiền vào kênh chất lượng.'
  },
  {
    id: 'q-05',
    category: 'Metrics & Analytics',
    question: 'Sản phẩm y tế như IVIE có tần suất sử dụng tự nhiên thấp (Low Frequency). Bạn làm thế nào để theo dõi và cải thiện Retention?',
    keyConcepts: ['Usage Interval', 'Feature Adjacency', 'Engagement Bridges', 'Cohort Bracket'],
    modelAnswer: 'Sản phẩm y tế không phải là mạng xã hội để kỳ vọng DAU/MAU 50% hay D1 Retention 40%. Chu kỳ sử dụng tự nhiên (Natural Usage Interval) của người khỏe mạnh là 3-6 tháng/lần, còn bệnh nhân mạn tính là 30 ngày/lần. Chiến lược đo lường: Phân đoạn User thành 2 nhóm: Nhóm mạn tính (đo D30 & D60 Repeat Rate) và Nhóm khám cấp tính (đo M6 & M12 Retention). Để cải thiện Retention, tôi áp dụng chiến lược Feature Adjacency (Tính năng đệm): Xây dựng các tính năng có tần suất cao hơn như Sổ theo dõi huyết áp/đường huyết hàng ngày, Nhắc uống thuốc, Đọc tin tức sức khỏe kiểm chứng bởi bác sĩ để giữ chân user giữa các lần khám.',
    commonPitfalls: 'Cố ép người dùng mở app mỗi ngày bằng các push notification spam làm tăng tỷ lệ gỡ app.',
    proTipForLam: 'Dùng từ khóa chuyên ngành "Natural Frequency" và "Engagement Bridge" để gây ấn tượng mạnh với người phỏng vấn.'
  },

  // 3. Experimentation
  {
    id: 'q-06',
    category: 'Experimentation',
    question: 'Hãy mô tả cấu trúc của một Giả thuyết tăng trưởng (Growth Hypothesis) chuẩn. Cho ví dụ cho IVIE.',
    keyConcepts: ['Insight', 'Proposed Change', 'Expected Impact', 'Primary & Guardrail Metrics'],
    modelAnswer: 'Một Growth Hypothesis chuẩn không phải là một ý kiến cảm tính, mà là công thức: "Dựa trên [Insight/Data], nếu chúng tôi [Thực hiện thay đổi X] cho [Phân khúc người dùng Y], thì [Chỉ số chính Z] sẽ thay đổi [Mức độ kỳ vọng %], bởi vì [Lý do hành vi]. Đồng thời [Guardrail Metric] không bị suy giảm". Ví dụ IVIE: "Dựa trên việc 45% người dùng bỏ cuộc tại bước đăng ký do bị đòi CCCD quá sớm; Nếu chúng tôi cho phép xem lịch bác sĩ ngay và chỉ yêu cầu CCCD khi xác nhận thanh toán cho người dùng mới; thì Sign-up to Booking CVR sẽ tăng 20%; bởi vì giảm bớt rào cản nhận thức (Cognitive friction) và rút ngắn Time-to-Value; với điều kiện Guardrail Metric là tỷ lệ sai sót hồ sơ tại bệnh viện không vượt quá 2%".',
    commonPitfalls: 'Viết giả thuyết thiếu định lượng, thiếu cơ sở insight hoặc không có Guardrail metric.',
    proTipForLam: 'Luôn nhắc đến Guardrail Metric để chứng minh bạn là người làm tăng trưởng bền vững chứ không phá hoại hệ thống.'
  },
  {
    id: 'q-07',
    category: 'Experimentation',
    question: 'Bạn ưu tiên thử nghiệm như thế nào giữa ICE và RICE? Khi nào dùng cái nào?',
    keyConcepts: ['ICE (Impact, Confidence, Ease)', 'RICE (Reach, Impact, Confidence, Effort)', 'Prioritization Matrix'],
    modelAnswer: 'ICE (Impact, Confidence, Ease) phù hợp cho các giai đoạn sớm (Early-stage) hoặc các thử nghiệm Growth Marketing nhanh ở tầng Acquisition/Creative, nơi ta cần tốc độ và chưa có đủ dữ liệu quy mô. RICE (Reach, Impact, Confidence, Effort) phù hợp hơn khi can thiệp vào Product Funnel hoặc khi làm việc cùng đội ngũ Engineering/Product. RICE bổ sung yếu tố Reach (có bao nhiêu user bị tác động trong quý) và định lượng Effort theo person-weeks, giúp bảo vệ tài nguyên kỹ thuật khỏi những ý tưởng chỉ phục vụ cho một nhóm thiểu số.',
    commonPitfalls: 'Chấm điểm Confidence một cách cảm tính. Hãy giải thích rằng Confidence điểm 8-10 bắt buộc phải dựa trên dữ liệu user testing hoặc benchmark ngành trước đó.',
    proTipForLam: 'Kể về cách bạn quản lý Backlog với 20+ ý tưởng và chỉ chọn Top 3 thử nghiệm có RICE cao nhất vào sprint.'
  },

  // 4. IVIE Case Interview
  {
    id: 'q-08',
    category: 'IVIE Case Interview',
    question: 'Giả sử tỷ lệ chuyển đổi từ "Xem hồ sơ bác sĩ" đến "Bấm đặt lịch" của IVIE giảm 20% trong tháng vừa qua. Bạn sẽ điều tra và khắc phục như thế nào?',
    keyConcepts: ['Diagnostic Tree', 'Segmentation', 'Channel Quality vs Product Bug', 'Action Plan'],
    modelAnswer: 'Tôi tiếp cận bằng phương pháp chia để trị (Root Cause Analysis Tree): Bước 1 - Kiểm tra kỹ thuật và tính toàn vẹn dữ liệu: Có lỗi tracking GA4/Amplitude không? App update phiên bản mới có bị crash màn hình chọn giờ không? Bước 2 - Phân rã dữ liệu (Segmentation): Bị giảm trên iOS hay Android? Ở chuyên khoa cụ thể nào (Nhi, Sản, Ngoại)? Ở kênh Acquisition nào (organic hay paid campaign mới)? Bước 3 - Yếu tố nguồn cung (Supply Side): Có phải các bác sĩ uy tín bị kín lịch (Sold-out slots) khiến user không chọn được giờ? Bước 4 - Hành động: Nếu do thiếu lịch bác sĩ uy tín → Thử nghiệm thuật toán gợi ý bác sĩ tương đương cùng chuyên khoa có slot trống ngay; Nếu do chất lượng traffic từ ads kém → Điều chỉnh lại targeting.',
    commonPitfalls: 'Vội vàng kết luận là do giao diện xấu hoặc do giá khám đắt mà không kiểm tra dữ liệu phân đoạn.',
    proTipForLam: 'Sử dụng cấu trúc 4 bước rõ ràng, mạch lạc, thể hiện phong thái của một Senior Growth Marketer.'
  },

  // 5. Career Transition & Behavioral
  {
    id: 'q-09',
    category: 'Career Transition & Behavioral',
    question: 'Tại sao bạn lại quyết định chuyển từ Brand & Communication sang Growth Marketing vào thời điểm này?',
    keyConcepts: ['Data-driven Storytelling', 'Full-funnel Impact', 'Transferable Skills', 'Accountability'],
    modelAnswer: 'Trong thời gian làm Brand & Communication, tôi đã rèn luyện được năng lực thấu hiểu tâm lý khách hàng, tạo ra thông điệp chạm đúng insight và kỹ năng kể chuyện (storytelling). Tuy nhiên, tôi nhận thấy điểm nghẽn lớn nhất của Brand truyền thống là khó chứng minh tác động trực tiếp lên P&L của doanh nghiệp ngoài các chỉ số nhận diện. Tôi muốn gắn kết sức mạnh sáng tạo với tư duy sản phẩm, khoa học dữ liệu và thử nghiệm liên tục. Thay vì dừng lại ở việc kéo người dùng biết đến thương hiệu, tôi muốn đồng hành cùng họ từ lúc tải app, kích hoạt giá trị đầu tiên, giữ chân họ và tạo ra doanh thu bền vững. Đó là lý do tôi dành trọn vẹn 30 ngày hoàn thành bootcamp cá nhân và xây dựng case study tăng trưởng hoàn chỉnh cho IVIE – Bác sĩ ơi.',
    commonPitfalls: 'Bảo là "Vì chán làm Brand" hoặc "Vì Growth Marketing lương cao hơn".',
    proTipForLam: 'Đây là câu hỏi "bán mình" quan trọng nhất. Hãy nói với sự tự tin, biến quá khứ Brand thành lợi thế cạnh tranh độc nhất!'
  },
  {
    id: 'q-10',
    category: 'Career Transition & Behavioral',
    question: 'Nếu được tuyển dụng vào vị trí Growth Marketer, kế hoạch 30-60-90 ngày đầu tiên của bạn sẽ như thế nào?',
    keyConcepts: ['30-60-90 Plan', 'Listen & Learn', 'Quick Wins', 'Systematize & Scale'],
    modelAnswer: '30 ngày đầu (Listen & Audit): Nắm vững toàn bộ bức tranh dữ liệu (GA4, Amplitude), audit toàn bộ funnel hiện tại, phỏng vấn 10 khách hàng và 5 bác sĩ, hiểu sâu sắc Unit Economics và tìm ra điểm nghẽn rò rỉ lớn nhất. 60 ngày tiếp theo (Experiment & Quick Wins): Thiết lập quy trình Growth Sprint hàng tuần, xây dựng Backlog 15 thử nghiệm, triển khai 4-6 thử nghiệm nhanh ở tầng Activation và Onboarding để tạo ra các chiến thắng nhanh (Quick Wins). 90 ngày sau (Systematize & Scale): Đóng gói các thử nghiệm thành công vào sản phẩm lõi, tối ưu kênh Acquisition hiệu quả nhất, xây dựng Dashboard báo cáo tự động và đề xuất chiến lược tăng trưởng 6 tháng tiếp theo cho ban lãnh đạo.',
    commonPitfalls: 'Hứa hẹn tăng trưởng gấp đôi doanh thu ngay trong tháng đầu tiên.',
    proTipForLam: 'Kế hoạch thực tế và khiêm tốn ở giai đoạn Audit chứng tỏ bạn là người làm việc bài bản, đáng tin cậy.'
  }
];

export const CV_TRANSITION_BULLETS = [
  {
    before: 'Phụ trách truyền thông và xây dựng nội dung cho fanpage tăng 50.000 followers.',
    after: 'Tối ưu phễu Acquisition qua chiến lược Content-Led Growth, tăng 50.000 người theo dõi mục tiêu, đóng góp trực tiếp 18% lượng truy cập chất lượng cao vào web landing page với CPC tối ưu 1.200 VNĐ.'
  },
  {
    before: 'Lên ý tưởng và thực hiện các chiến dịch marketing cho sản phẩm.',
    after: 'Thiết kế và triển khai quy trình Growth Experimentation tuần hoàn; ưu tiên thử nghiệm bằng mô hình ICE/RICE, nâng tỷ lệ kích hoạt người dùng mới (Activation Rate) thêm 22.5% thông qua tối ưu hóa onboarding.'
  },
  {
    before: 'Chăm sóc khách hàng và gửi email marketing hàng tháng.',
    after: 'Xây dựng hành trình CRM tự động đa kênh (Push Notification & Email) dựa trên hành vi người dùng, cải thiện Cohort Retention D30 thêm 15% và tái kích hoạt thành công 8% nhóm người dùng ngủ đông (Inactive Users).'
  },
  {
    before: 'Phối hợp với các phòng ban nội bộ để ra mắt sản phẩm mới.',
    after: 'Làm việc liên chức năng (Cross-functional) cùng Product Manager, Data Analyst và Engineering để xây dựng hệ thống theo dõi sự kiện (Event Taxonomy) và Dashboard đo lường North Star Metric.'
  }
];
