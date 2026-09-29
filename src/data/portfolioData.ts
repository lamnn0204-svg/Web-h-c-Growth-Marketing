export interface PortfolioChapter {
  id: string;
  order: number;
  code: string;
  title: string;
  summary: string;
  tag: 'ASSUMPTION' | 'SIMULATED DATA' | 'HYPOTHESIS';
  content: string;
}

export const CAPSTONE_CHAPTERS: PortfolioChapter[] = [
  {
    id: 'ch-01',
    order: 1,
    code: '01',
    title: 'Business Context (Bối cảnh Doanh nghiệp)',
    summary: 'Tổng quan thị trường y tế số Việt Nam và vị thế của ISOFH Care / IVIE.',
    tag: 'ASSUMPTION',
    content: `### 1. Bối cảnh Thị trường & Doanh nghiệp
- **Thị trường HealthTech tại Việt Nam**: Nhu cầu khám chữa bệnh tăng cao, đặc biệt sau đại dịch. Các bệnh viện tuyến trung ương (Bạch Mai, Việt Đức, Nhi TW) luôn trong tình trạng quá tải nghiêm trọng từ 4-5h sáng.
- **ISOFH Care / IVIE - Bác sĩ ơi**: Đóng vai trò là cầu nối số hóa giữa người bệnh và mạng lưới cơ sở y tế hàng đầu. 
- **Mục tiêu kinh doanh**: Mở rộng tệp người dùng chủ động đặt khám, giảm tỷ lệ vắng mặt (No-show), đa dạng hóa nguồn thu từ tư vấn từ xa (Telemedicine) và giao thuốc tại nhà.`
  },
  {
    id: 'ch-02',
    order: 2,
    code: '02',
    title: 'Product Context (Bối cảnh Sản phẩm)',
    summary: 'Hệ sinh thái sản phẩm và các trụ cột dịch vụ của ứng dụng IVIE – Bác sĩ ơi.',
    tag: 'ASSUMPTION',
    content: `### 2. Hệ sinh thái Sản phẩm IVIE - Bác sĩ ơi
Ứng dụng di động (iOS, Android) và Nền tảng Web với 4 dịch vụ cốt lõi:
1. **Đặt khám cơ sở y tế**: Đặt trước giờ khám chính xác tại hơn 30 bệnh viện & phòng khám uy tín.
2. **Khám bệnh từ xa (Telemedicine)**: Gọi video 1:1 bảo mật với các bác sĩ chuyên khoa đầu ngành.
3. **Hồ sơ sức khỏe điện tử**: Lưu trữ xét nghiệm, đơn thuốc, lịch sử khám trọn đời cho cả gia đình.
4. **Mua thuốc theo đơn**: Kết nối nhà thuốc chuẩn GPP giao thuốc tận cửa.`
  },
  {
    id: 'ch-03',
    order: 3,
    code: '03',
    title: 'Target User & Personas (Chân dung Khách hàng Mục tiêu)',
    summary: 'Phân đoạn 3 chân dung người dùng chính: Bố mẹ trẻ bận rộn, Bệnh nhân mạn tính, Người ở tỉnh xa.',
    tag: 'ASSUMPTION',
    content: `### 3. Phân khúc Khách hàng Trọng tâm
1. **Chị Mai (32 tuổi) - Bố mẹ trẻ thành thị**: Cần đặt lịch khám Nhi ngoài giờ, tư vấn video khi con sốt ban đêm, không muốn con bị lây chéo bệnh ở viện.
2. **Anh Tuấn (42 tuổi) - Người chăm sóc bệnh mạn tính**: Đặt lịch tái khám định kỳ cho bố mẹ bị cao huyết áp/tiểu đường, cần giao thuốc tận nhà.
3. **Bác Bình (56 tuổi) - Bệnh nhân tỉnh xa**: Cần ý kiến chuyên gia đầu ngành tuyến TW trước phẫu thuật, muốn biết giờ khám chính xác để đi lại trong ngày.`
  },
  {
    id: 'ch-04',
    order: 4,
    code: '04',
    title: 'Problem Statement (Vấn đề & Điểm nghẽn Tăng trưởng)',
    summary: 'Rò rỉ phễu (Leaky Funnel) ở bước Onboarding và tỷ lệ lặp lại sau 30 ngày còn thấp.',
    tag: 'SIMULATED DATA',
    content: `### 4. Điểm nghẽn Tăng trưởng Lớn nhất
- **Drop-off lớn trong Onboarding**: 45% người dùng tải app rời đi ngay sau bước đăng ký vì bị đòi hỏi quá nhiều thông tin định danh (CCCD/BHYT) trước khi được xem lịch bác sĩ.
- **Tần suất tự nhiên thấp (Low Natural Frequency)**: Người dùng có tâm lý "khỏi bệnh là quên app", dẫn đến D30 Retention của nhóm thông thường chỉ đạt 12-15%.
- **Chi phí Acquisition tăng cao**: CAC kênh Paid Ads tăng 30% do cạnh tranh quảng cáo từ các phòng khám tư.`
  },
  {
    id: 'ch-05',
    order: 5,
    code: '05',
    title: 'Growth Goal (Mục tiêu Tăng trưởng 90 ngày)',
    summary: 'Chuyển đổi từ mô hình phụ thuộc Paid Ads sang tăng trưởng bền vững nhờ Activation và Retention.',
    tag: 'HYPOTHESIS',
    content: `### 5. Mục tiêu Tăng trưởng Cụ thể
- Tăng **Activation Rate** (Sign-up to First Booking) từ **30% lên 42%**.
- Cải thiện **D30 Repeat Booking Rate** ở nhóm bệnh nhân mạn tính từ **18% lên 28%**.
- Giảm **Blended CAC** 25% thông qua tối ưu phễu chuyển đổi và phát triển Referral Loop gia đình.
- Tăng số ca khám hoàn thành hàng tháng (North Star Metric) thêm **35%** trong 90 ngày.`
  },
  {
    id: 'ch-06',
    order: 6,
    code: '06',
    title: 'North Star Metric & KPI Tree',
    summary: 'Chỉ số Bắc Đẩu: Monthly Completed Consultations (Số ca khám y tế hoàn thành hàng tháng).',
    tag: 'HYPOTHESIS',
    content: `### 6. North Star Metric & Cây KPI
**North Star Metric**: Monthly Completed Consultations (Số ca khám/tư vấn y tế hoàn thành thành công mỗi tháng).
- **Input Metric 1 (Acquisition)**: Số lượng lượt tìm kiếm bác sĩ hàng tháng (Total Monthly Searches).
- **Input Metric 2 (Activation)**: Tỷ lệ Search-to-Booking CVR (Search to Booked Rate).
- **Input Metric 3 (Fulfillment)**: Tỷ lệ có mặt khám thực tế (Show-up Rate).
- **Input Metric 4 (Retention)**: Tỷ lệ tái khám định kỳ D30/D60 (Repeat Consult Rate).`
  },
  {
    id: 'ch-07',
    order: 7,
    code: '07',
    title: 'Growth Model (Mô hình Tăng trưởng)',
    summary: 'Mô hình phương trình tăng trưởng định lượng của IVIE.',
    tag: 'HYPOTHESIS',
    content: `### 7. Phương trình Mô hình Tăng trưởng
\`Growth = [Traffic Kênh x Install CVR x Activation Rate] + [Existing Active Users x Retention Rate] + [Referral Users]\`
Doanh thu gộp = \`North Star Metric x (Phí hoa hồng khám TB + Giá trị đơn thuốc TB)\`.
Trọng tâm tăng trưởng nằm ở đòn bẩy kép: Rút ngắn Time-to-Value trong Activation và xây dựng CRM Trigger tái khám tự động trong Retention.`
  },
  {
    id: 'ch-08',
    order: 8,
    code: '08',
    title: 'Funnel Architecture (Cấu trúc Toàn Phễu AARRR)',
    summary: 'Sơ đồ luồng 7 bước chuyển đổi từ Khám phá đến Tái sử dụng.',
    tag: 'SIMULATED DATA',
    content: `### 8. Phễu Chuyển đổi Chi tiết
1. **Khám phá / Tải app**: 120.000 visits/tháng (Baseline)
2. **Đăng ký tài khoản (Sign-up)**: 48.000 users (40% CVR)
3. **Tìm kiếm Bác sĩ / Bệnh viện**: 26.400 users (55% CVR)
4. **Bắt đầu đặt lịch (Checkout flow)**: 14.520 users (55% CVR)
5. **Hoàn tất đặt lịch hẹn (Activation Event)**: 7.920 users (54.5% CVR)
6. **Thực hiện khám thực tế (Show-up)**: 6.336 users (80% Show-up rate)
7. **Tái khám sau 30 ngày (Retention)**: 1.267 users (20% Repeat)`
  },
  {
    id: 'ch-09',
    order: 9,
    code: '09',
    title: 'Acquisition Analysis (Phân tích Kênh Kéo Người dùng)',
    summary: 'Ma trận kênh: Google Search Ads, Meta App Install, Content/SEO Bệnh học, Bệnh viện Partnership.',
    tag: 'ASSUMPTION',
    content: `### 9. Đánh giá & Tối ưu Kênh Acquisition
- **Google Search (High Intent)**: Chi phí CPA cao nhưng CVR đặt khám cao nhất (40%). Tập trung từ khóa bệnh học cụ thể và tên bác sĩ đầu ngành.
- **Meta Ads (Awareness & Consideration)**: Tối ưu cho phụ huynh trẻ với hook "Khám Nhi không chờ đợi". Chuyển mục tiêu tối ưu từ "App Install" sang "In-app Event: First Doctor Search".
- **Bệnh viện Partnership (Offline-to-Online)**: Mã QR đặt khám tại cổng viện và bàn tiếp đón giúp kéo tệp người dùng đang đứng chờ chuyển sang dùng app lần sau với chi phí CAC ~ 0đ.`
  },
  {
    id: 'ch-10',
    order: 10,
    code: '10',
    title: 'Activation Framework (Khung Kích hoạt Giá trị Đầu tiên)',
    summary: 'Định vị Aha Moment và thiết kế Onboarding tinh gọn.',
    tag: 'HYPOTHESIS',
    content: `### 10. Activation Framework
- **Set-up Moment**: Nhập số điện thoại xác thực OTP trong 15 giây.
- **Aha Moment**: Bệnh nhân nhìn thấy danh sách bác sĩ chuyên khoa đúng bệnh với khung giờ trống ngày mai và nút đặt lịch rõ ràng.
- **Habit Moment**: Hoàn thành cuộc khám đầu tiên êm đẹp, nhận được đơn thuốc điện tử lưu an toàn trên máy.
- **Hành động can thiệp**: Trì hoãn điền CCCD/BHYT đến bước cuối, rút ngắn số bước onboarding từ 8 bước xuống 3 bước.`
  },
  {
    id: 'ch-11',
    order: 11,
    code: '11',
    title: 'Retention Framework & Cohorts (Chiến lược Giữ chân)',
    summary: 'Thiết kế Retention đường cong đi ngang cho nhóm bệnh nhân mạn tính và bà mẹ bỉm sữa.',
    tag: 'SIMULATED DATA',
    content: `### 11. Phân tích Giữ chân & Bảng Cohort
- Bệnh nhân mạn tính có chu kỳ tự nhiên 30 ngày (theo đợt thuốc). Thiết lập hệ thống kích hoạt tự động vào D25: Nhắc kiểm tra lượng thuốc còn lại và đặt lịch tái khám với bác sĩ quen thuộc.
- Đối với nhóm ốm vặt: Duy trì Engagement thông qua Sổ theo dõi tiêm chủng cho bé và Cẩm nang sơ cấp cứu nhi khoa.`
  },
  {
    id: 'ch-12',
    order: 12,
    code: '12',
    title: 'Engagement Strategy (Chiến lược Tương tác Thường nhật)',
    summary: 'Xây dựng các tiện ích đệm (Engagement Bridges) nâng cao DAU/MAU.',
    tag: 'HYPOTHESIS',
    content: `### 12. Chiến lược Tương tác
- **Sổ tay chỉ số sức khỏe**: Ghi chép huyết áp, đường huyết, cân nặng của con hàng tuần.
- **Diễn đàn Hỏi Bác sĩ 24/7**: Cho phép người dùng đặt câu hỏi ngắn, nhận phản hồi sơ bộ từ bác sĩ trực trong 2 giờ.
- Kết quả: Nâng tỷ lệ Stickiness (DAU/MAU) từ mức 4% lên 12%.`
  },
  {
    id: 'ch-13',
    order: 13,
    code: '13',
    title: 'Resurrection Strategy (Chiến lược Tái kích hoạt Ngủ đông)',
    summary: 'Kịch bản Win-back sau 60-90 ngày không hoạt động.',
    tag: 'HYPOTHESIS',
    content: `### 13. Kịch bản Tái kích hoạt (Win-back)
- **Trigger**: 60 ngày không mở app kể từ ca khám gần nhất.
- **Kênh tiếp cận**: Zalo ZNS (tỷ lệ mở 85%) và Push Notification.
- **Thông điệp**: "Đã 2 tháng kể từ lần khám gần nhất, Bác sĩ [Tên] gửi bạn bài kiểm tra nhanh 1 phút đánh giá tiến triển sức khỏe" + Tặng voucher miễn phí giao thuốc.`
  },
  {
    id: 'ch-14',
    order: 14,
    code: '14',
    title: 'Monetization Analysis (Mô hình Doanh thu & Unit Economics)',
    summary: 'Cơ cấu Take Rate, Giá trị trọn đời LTV và Tỷ số LTV:CAC.',
    tag: 'SIMULATED DATA',
    content: `### 14. Mô hình Doanh thu & Unit Economics
- **Mô hình Marketplace Take Rate**: Thu phí hoa hồng 15-20% trên mỗi ca khám thành công.
- **Doanh thu bổ trợ**: Phí vận chuyển thuốc theo đơn, gói khám sức khỏe tổng quát doanh nghiệp (B2B2C).
- **Unit Economics**: Blended CAC = 150.000 VNĐ; LTV trung bình 2 năm = 600.000 VNĐ; Tỷ số LTV:CAC = 4:1 (Lành mạnh).`
  },
  {
    id: 'ch-15',
    order: 15,
    code: '15',
    title: 'Growth Opportunities (Bản đồ Cơ hội Tăng trưởng)',
    summary: 'Xác định 5 cơ hội lớn nhất theo ma trận tác động vs độ khó.',
    tag: 'HYPOTHESIS',
    content: `### 15. Cơ hội Tăng trưởng Hàng đầu
1. Rút ngắn thời gian Onboarding và tối ưu tìm kiếm theo ngôn ngữ triệu chứng bình dân.
2. Tự động hóa CRM nhắc tái khám mạn tính trước 5 ngày hết thuốc.
3. Ra mắt Referral "Tặng gói khám Tim mạch cho Ông Bà khi mẹ tiêm chủng cho con".
4. Cam kết bác sĩ video phản hồi trong 5 phút vào ban đêm.
5. Triển khai gói thành viên Bác sĩ Gia đình 365 (Subscription).`
  },
  {
    id: 'ch-16',
    order: 16,
    code: '16',
    title: 'Experiment Backlog (Danh mục Thử nghiệm Đã Thiết kế)',
    summary: 'Hệ thống 10 thử nghiệm tăng trưởng với giả thuyết và chỉ số rào chắn rõ ràng.',
    tag: 'HYPOTHESIS',
    content: `### 16. Danh mục 10 Thử nghiệm Tăng trưởng
Đã thiết kế chi tiết trong Growth Experiment Lab với đầy đủ các trường: Problem, Insight, Hypothesis, Segment, Proposed Change, Primary Metric, Secondary Metric, Guardrail Metric, Expected Result, ICE/RICE Score và Decision Rule.`
  },
  {
    id: 'ch-17',
    order: 17,
    code: '17',
    title: 'Prioritization Matrix (Ưu tiên theo ICE & RICE)',
    summary: 'Xếp hạng các thử nghiệm trọng điểm để chạy trong quý tới.',
    tag: 'HYPOTHESIS',
    content: `### 17. Thứ tự Ưu tiên Thử nghiệm
1. **EXP-01 (Shorten Onboarding)**: RICE 480 - Ưu tiên hàng đầu vì tác động toàn bộ New Users với công sức kỹ thuật thấp.
2. **EXP-07 (Smart Search Triệu chứng)**: RICE 450 - Xóa bỏ rào cản thuật ngữ y khoa, mở rộng phễu tìm kiếm.
3. **EXP-03 (Automated Chronic Refill)**: RICE 420 - Tác động trực tiếp vào LTV và Retention bền vững.`
  },
  {
    id: 'ch-18',
    order: 18,
    code: '18',
    title: '90-Day Growth Roadmap (Lộ trình Thực thi 90 Ngày)',
    summary: 'Phân kỳ 3 giai đoạn: Fix the Leak, Accelerate Retention, Scale Loops.',
    tag: 'HYPOTHESIS',
    content: `### 18. Lộ trình Triển khai 90 Ngày
- **Tháng 1 (Fix The Leaky Bucket)**: Triển khai EXP-01 & EXP-07, sửa chữa tỷ lệ drop-off trong Onboarding và Search. Tối ưu Tracking GA4.
- **Tháng 2 (Retention & CRM Engine)**: Kích hoạt luồng Zalo/Push nhắc tái khám mạn tính (EXP-03), kiểm tra Win-back Inactive (EXP-08).
- **Tháng 3 (Scale & Loops)**: Thử nghiệm Referral mẹ bỉm sữa (EXP-05), tối ưu ngân sách vào kênh Paid có LTV:CAC cao nhất.`
  },
  {
    id: 'ch-19',
    order: 19,
    code: '19',
    title: 'KPI Framework & Monitoring (Khung Theo dõi Hiệu suất)',
    summary: 'Bộ chỉ số đo lường hiệu quả vận hành của Growth Squad.',
    tag: 'HYPOTHESIS',
    content: `### 19. Khung Đánh giá Hiệu suất (KPI Framework)
- **Weekly Growth Cadence**: Đánh giá 3 chỉ số nhịp tim (Heartbeat): Weekly Completed Bookings, Activation Rate, Uninstallation Rate.
- **Velocity**: Tối thiểu hoàn thành và học hỏi từ 2 thử nghiệm/tuần.
- **Win Rate mục tiêu**: Đạt tỷ lệ thử nghiệm thành công >= 35%.`
  },
  {
    id: 'ch-20',
    order: 20,
    code: '20',
    title: 'Expected Business Impact (Tác động Kinh doanh Dự kiến)',
    summary: 'Dự báo tăng trưởng sau 90 ngày thực thi chiến lược.',
    tag: 'SIMULATED DATA',
    content: `### 20. Tác động Kinh doanh Kỳ vọng (90 Ngày)
- Lượt khám hoàn thành hàng tháng tăng từ **6.336 lên 8.550 ca/tháng (+35%)**.
- Tỷ lệ người dùng tái khám định kỳ D30 tăng từ **20% lên 27%**.
- Doanh thu gộp từ dịch vụ nền tảng ước tính tăng trưởng **42%**.
- Tỷ số LTV:CAC được củng cố ở mức **4.2 : 1**.`
  },
  {
    id: 'ch-21',
    order: 21,
    code: '21',
    title: 'Personal Learning & Career Plan (Kế hoạch Phát triển Nghề nghiệp)',
    summary: 'Chiến lược định vị cá nhân từ Brand Marketer trở thành Growth Marketing Specialist.',
    tag: 'ASSUMPTION',
    content: `### 21. Kế hoạch Phát triển Cá nhân của Ngô Ngọc Lâm
- **Định vị bản thân**: "Growth Marketer có thế mạnh kép: Năng lực thấu hiểu tâm lý & thông điệp sâu sắc từ nền tảng Brand & Communication kết hợp với tư duy đo lường số liệu, phân tích phễu và thử nghiệm thực chiến của Product Growth".
- **Hồ sơ ứng tuyển**: Sử dụng toàn bộ Case Study IVIE 21 chương làm Portfolio minh chứng năng lực thực tế khi phỏng vấn vị trí Growth Marketing Executive / Growth Marketer.`
  }
];
