export type ExperimentStatus =
  | 'Backlog'
  | 'Prioritized'
  | 'Running'
  | 'Completed'
  | 'Validated'
  | 'Invalidated'
  | 'Iterate';

export interface GrowthExperiment {
  id: string;
  name: string;
  problem: string;
  insight: string;
  hypothesis: string;
  segment: string;
  proposedChange: string;
  primaryMetric: string;
  secondaryMetric: string;
  guardrailMetric: string;
  expectedResult: string;
  effort: number; // 1-10
  impact: number; // 1-10
  confidence: number; // 1-10
  iceScore: number;
  riceScore: number;
  reachEstimate?: number;
  durationDays: number;
  decisionRule: string;
  status: ExperimentStatus;
  result?: string;
  learning?: string;
  nextAction?: string;
  tag: 'HYPOTHESIS' | 'SIMULATED DATA';
}

export const INITIAL_IVIE_EXPERIMENTS: GrowthExperiment[] = [
  {
    id: 'exp-01',
    name: 'Shorten Onboarding: Bỏ qua khai báo BHYT/CCCD tại bước đăng ký',
    problem: 'Tỷ lệ drop-off từ Đăng ký tài khoản đến Tìm kiếm bác sĩ lên đến 45%. Người dùng cảm thấy bị thẩm vấn quá sớm.',
    insight: 'Người dùng tải app y tế trong tâm trạng lo lắng, họ muốn xem bác sĩ có thể giải quyết vấn đề của họ ngay chứ chưa muốn nộp thông tin định danh.',
    hypothesis: 'Nếu trì hoãn yêu cầu điền CCCD/BHYT cho đến lúc xác nhận thanh toán đặt khám, thì Activation Rate từ Sign-up sang First Search sẽ tăng ít nhất 20%.',
    segment: 'Toàn bộ New Users lần đầu tải app',
    proposedChange: 'Cho phép đăng ký chỉ bằng OTP Số điện thoại, sau đó dẫn thẳng vào màn hình Khám phá Bác sĩ. Chỉ nhắc bổ sung hồ sơ khi đã chọn lịch khám.',
    primaryMetric: 'Sign-up to First Search CVR (%)',
    secondaryMetric: 'First Booking Completion Rate (%)',
    guardrailMetric: 'Tỷ lệ điền sai hồ sơ bảo hiểm khi đến bệnh viện (phải < 2%)',
    expectedResult: 'Tăng CVR từ 55% lên 66% (+20% tương đối)',
    effort: 3,
    impact: 8,
    confidence: 8,
    iceScore: 6.3,
    riceScore: 480,
    reachEstimate: 40000,
    durationDays: 14,
    decisionRule: 'Nếu CVR tăng >= 15% với p-value < 0.05 và lỗi hồ sơ tại viện không tăng quá 1%, triển khai 100%.',
    status: 'Validated',
    result: 'CVR tăng từ 55% lên 67.4% (+22.5% lift), p-value = 0.008. Tỷ lệ sai sót hồ sơ tại quầy giữ nguyên 1.1%. [SIMULATED DATA]',
    learning: 'Giảm thiểu Cognitive Friction và Time-to-Value trong Onboarding đem lại hiệu quả tức thì đối với app Healthcare.',
    nextAction: 'Áp dụng vĩnh viễn vào luồng Onboarding chính thức trên cả iOS và Android.',
    tag: 'HYPOTHESIS'
  },
  {
    id: 'exp-02',
    name: 'Social Proof Badge: "Bác sĩ được đặt nhiều nhất tuần này"',
    problem: 'Bệnh nhân mất trung bình 12 phút lướt danh sách bác sĩ mà không chọn được ai vì thiếu tín nhiệm (Analysis Paralysis).',
    insight: 'Người Việt Nam có tâm lý tin tưởng vào đánh giá đám đông và chứng nhận chuyên môn của các chuyên gia hàng đầu.',
    hypothesis: 'Nếu gắn huy hiệu "Top 5% Bác sĩ được đặt nhiều nhất tuần" cùng số ca khám thành công thực tế, CVR từ Xem hồ sơ bác sĩ sang Bấm Đặt lịch sẽ tăng 15%.',
    segment: 'Bệnh nhân tìm kiếm Bác sĩ chuyên khoa Nhi & Tai Mũi Họng',
    proposedChange: 'Bổ sung badge nổi bật kèm hiển thị "Đã có 142 lượt khám hài lòng tháng này" trên thẻ bác sĩ.',
    primaryMetric: 'Profile View to Start Booking CVR (%)',
    secondaryMetric: 'Thời gian ra quyết định trung bình (Time on Profile)',
    guardrailMetric: 'Đánh giá CSAT sau khám (không được giảm)',
    expectedResult: 'CVR tăng từ 35% lên 40.2%',
    effort: 2,
    impact: 7,
    confidence: 7,
    iceScore: 5.3,
    riceScore: 360,
    reachEstimate: 20000,
    durationDays: 10,
    decisionRule: 'Nếu CVR tăng >= 10% với độ tin cậy thống kê 95%, áp dụng cho toàn bộ danh mục chuyên khoa.',
    status: 'Running',
    result: 'Đang theo dõi ngày thứ 6: Variant đang dẫn trước +12.8% CVR, p-value = 0.041.',
    tag: 'HYPOTHESIS'
  },
  {
    id: 'exp-03',
    name: 'Automated Chronic Refill: Nhắc tái khám & giao thuốc định kỳ tự động',
    problem: 'Bệnh nhân mạn tính (tăng huyết áp, tiểu đường) có tỷ lệ tái khám qua app sau 30 ngày chỉ đạt 18%, phần lớn quay về cách mua thuốc tự do bên ngoài.',
    insight: 'Đơn thuốc mạn tính thường kéo dài đúng 30 ngày. Bệnh nhân hay quên ngày tái khám hoặc ngại đặt lại vì thủ tục lặp lại rườm rà.',
    hypothesis: 'Nếu kích hoạt push notification cá nhân hóa kèm nút "1-Click Tái khám với Bác sĩ [Tên]" vào ngày thứ 25 sau đợt khám trước, D30 Repeat Rate sẽ tăng 25%.',
    segment: 'Bệnh nhân có hồ sơ bệnh án mạn tính được kê đơn thuốc 30 ngày',
    proposedChange: 'Hệ thống tự động phát hiện ngày hết thuốc, gửi thông báo đẩy và Zalo ZNS trước 5 ngày kèm ưu đãi miễn phí giao thuốc tận nhà.',
    primaryMetric: 'D30 Repeat Booking Rate (%)',
    secondaryMetric: 'Doanh thu đơn thuốc điện tử (Rx Revenue)',
    guardrailMetric: 'Tỷ lệ tắt nhận thông báo đẩy (Opt-out rate < 3%)',
    expectedResult: 'Repeat Rate tăng từ 18% lên 23.5%',
    effort: 5,
    impact: 9,
    confidence: 8,
    iceScore: 7.3,
    riceScore: 420,
    reachEstimate: 8000,
    durationDays: 30,
    decisionRule: 'Nếu tỷ lệ đặt tái khám tăng trên 20% và Opt-out không vượt 2.5%, tích hợp vào CRM Journey cố định.',
    status: 'Prioritized',
    tag: 'HYPOTHESIS'
  },
  {
    id: 'exp-04',
    name: 'Video Teleconsult: Cam kết "Bác sĩ phản hồi trong 5 phút hoặc hoàn tiền"',
    problem: 'Tỷ lệ đặt lịch tư vấn trực tuyến (Telemedicine) thấp do người dùng nghi ngờ: liệu bác sĩ có online thật không hay phải chờ đợi vô thời hạn.',
    insight: 'Khi bị sốt hoặc có triệu chứng cấp, yếu tố tốc độ là quan trọng nhất để người dùng chuyển đổi từ băn khoăn sang hành động.',
    hypothesis: 'Nếu đưa ra cam kết "Bác sĩ chuyên khoa trực tuyến phản hồi trong 5 phút - Hoàn tiền 100% nếu trễ hẹn", CVR đặt khám trực tuyến sẽ tăng 30%.',
    segment: 'Người dùng truy cập mục "Khám từ xa / Bác sĩ ơi" vào ban đêm (19h - 23h)',
    proposedChange: 'Banner cam kết nổi bật ngay đầu màn hình tư vấn từ xa, hiển thị đồng hồ đếm ngược kết nối.',
    primaryMetric: 'Telemedicine Booking CVR (%)',
    secondaryMetric: 'Số lượng cuộc gọi tư vấn hoàn thành mỗi đêm',
    guardrailMetric: 'Chi phí bồi hoàn do trễ hẹn (chiếm dưới 2% tổng doanh thu ca khám)',
    expectedResult: 'CVR tăng từ 8% lên 10.4%',
    effort: 6,
    impact: 8,
    confidence: 7,
    iceScore: 7.0,
    riceScore: 310,
    reachEstimate: 12000,
    durationDays: 14,
    decisionRule: 'Nếu CVR tăng > 20% và net revenue dương sau khi trừ tiền bồi hoàn, nhân rộng ca trực.',
    status: 'Backlog',
    tag: 'HYPOTHESIS'
  },
  {
    id: 'exp-05',
    name: 'Referral Loop: "Tặng gói khám tổng quát cho Bố Mẹ khi con tiêm chủng"',
    problem: 'Chi phí mua người dùng mới (CAC) qua kênh Facebook Ads tăng 35% trong quý vừa qua.',
    insight: 'Người mẹ đi tiêm chủng cho con nhỏ thường là người chịu trách nhiệm chính chăm sóc sức khỏe cho cả bố mẹ ruột và bố mẹ chồng trong gia đình.',
    hypothesis: 'Nếu tặng voucher giảm 150k gói khám sức khỏe người cao tuổi sau khi mẹ hoàn thành tiêm chủng cho bé, K-factor (Referral) sẽ tăng từ 0.05 lên 0.18.',
    segment: 'Khách hàng nữ hoàn thành lịch tiêm chủng cho trẻ nhỏ',
    proposedChange: 'Màn hình Thank You sau khi hoàn tất khám/tiêm hiển thị thiệp cảm ơn điện tử để chia sẻ Zalo cho người thân.',
    primaryMetric: 'Viral Coefficient (K-factor)',
    secondaryMetric: 'Số lượt đặt khám người cao tuổi mới qua mã giới thiệu',
    guardrailMetric: 'Tỷ lệ gian lận tạo nhiều tài khoản ảo (Fraud rate < 1%)',
    expectedResult: 'K-factor đạt 0.15, đem về thêm 600 lượt đặt khám không tốn CAC quảng cáo',
    effort: 4,
    impact: 7,
    confidence: 6,
    iceScore: 5.7,
    riceScore: 280,
    reachEstimate: 5000,
    durationDays: 21,
    decisionRule: 'Nếu thu được > 300 lượt khám mới với CAC < 50k, scale up chương trình Referral gia đình.',
    status: 'Prioritized',
    tag: 'HYPOTHESIS'
  },
  {
    id: 'exp-06',
    name: 'Dynamic Slot Scarcity: Hiển thị "Chỉ còn 2 suất khám buổi sáng"',
    problem: 'Người dùng xem lịch khám nhưng chần chừ không thanh toán ngay (Drop-off tại bước chọn giờ là 40%).',
    insight: 'Tâm lý sợ lỡ cơ hội (FOMO) kích thích hành động nhanh chóng đối với các bác sĩ đầu ngành tại bệnh viện lớn.',
    hypothesis: 'Hiển thị số lượng slot khám còn lại theo thời gian thực sẽ thôi thúc bệnh nhân chốt lịch ngay lập tức.',
    segment: 'Bệnh nhân xem lịch khám các Bệnh viện tuyến Trung ương',
    proposedChange: 'Hiển thị tag đỏ nhấp nháy nhẹ: "Chỉ còn 2 suất sáng nay" hoặc "Đang có 3 người xem lịch này".',
    primaryMetric: 'Slot Selection to Checkout CVR (%)',
    secondaryMetric: 'Average Time to Checkout (giây)',
    guardrailMetric: 'Tỷ lệ hủy lịch sau khi đặt (Cancellation Rate)',
    expectedResult: 'CVR tăng từ 45% lên 54%',
    effort: 3,
    impact: 6,
    confidence: 8,
    iceScore: 5.7,
    riceScore: 320,
    reachEstimate: 15000,
    durationDays: 10,
    decisionRule: 'Nếu CVR tăng >= 12% và hủy lịch không tăng quá 2%, giữ lại tính năng.',
    status: 'Backlog',
    tag: 'HYPOTHESIS'
  },
  {
    id: 'exp-07',
    name: 'Smart Search: Tự động gợi ý chuyên khoa theo mô tả triệu chứng dân gian',
    problem: 'Bệnh nhân không biết chuyên khoa chính xác (ví dụ: đau khớp vai tìm sang khám Ngoại tiêu hóa), dẫn đến bỏ tìm kiếm.',
    insight: 'Người dùng thường tìm theo triệu chứng bình dân ("đau mỏi vai gáy", "bé đi ngoài phân sống") thay vì tên chuyên khoa y tế.',
    hypothesis: 'Nếu thanh tìm kiếm hỗ trợ dịch từ triệu chứng thông thường sang chuyên khoa và bác sĩ tương ứng, tỷ lệ Search-to-Click sẽ tăng 25%.',
    segment: 'Người dùng sử dụng ô tìm kiếm trên app và web',
    proposedChange: 'Bổ sung Semantic / Tag search: Gõ "nổi mẩn đỏ ngứa" tự động đề xuất Chuyên khoa Da liễu & Nhi khoa.',
    primaryMetric: 'Search Query to Doctor Card Click Rate (%)',
    secondaryMetric: 'Tỷ lệ tìm kiếm không có kết quả (Zero-result Search Rate)',
    guardrailMetric: 'Tỷ lệ khám nhầm chuyên khoa bị bác sĩ từ chối',
    expectedResult: 'Zero-result giảm từ 18% xuống dưới 3%',
    effort: 5,
    impact: 8,
    confidence: 9,
    iceScore: 7.3,
    riceScore: 450,
    reachEstimate: 30000,
    durationDays: 14,
    decisionRule: 'Nếu tỷ lệ click bác sĩ tăng > 18%, rollout vĩnh viễn.',
    status: 'Validated',
    result: 'Zero-result giảm từ 19.2% xuống 2.8%, CVR từ Search sang Xem hồ sơ bác sĩ tăng 28.4%. [SIMULATED DATA]',
    learning: 'Bệnh nhân không cần học thuật ngữ y khoa; nền tảng phải thích nghi với ngôn ngữ tự nhiên của người bệnh.',
    nextAction: 'Mở rộng bộ từ khóa triệu chứng cho 20 chuyên khoa còn lại.',
    tag: 'HYPOTHESIS'
  },
  {
    id: 'exp-08',
    name: 'Win-back Inactive: Kích hoạt lại người dùng ngủ đông 60 ngày bằng Kiểm tra sức khỏe AI',
    problem: 'Có 35.000 tài khoản đã đăng ký nhưng không có bất kỳ tương tác nào trong suốt 60 ngày qua (Inactive Users).',
    insight: 'Người khỏe mạnh thường quên app sức khỏe cho đến khi có triệu chứng hoặc được nhắc nhở về nguy cơ tiềm ẩn.',
    hypothesis: 'Gửi thông báo Push & Email trắc nghiệm cá nhân: "Đánh giá nguy cơ sức khỏe tim mạch/huyết áp trong 1 phút" sẽ kéo được 8% Inactive quay lại app.',
    segment: 'Users đã đăng ký tài khoản từ 60-120 ngày trước, chưa có lượt khám nào',
    proposedChange: 'Chiến dịch CRM tương tác: Mini assessment 4 câu hỏi đơn giản cho ra điểm số sức khỏe kèm lời khuyên bác sĩ.',
    primaryMetric: 'Resurrection / Win-back Rate (%)',
    secondaryMetric: 'First Booking from Resurrected Cohort',
    guardrailMetric: 'Tỷ lệ gỡ app khi nhận thông báo (Uninstallation rate < 1.5%)',
    expectedResult: 'Tái kích hoạt 2.800 người dùng ngủ đông',
    effort: 4,
    impact: 7,
    confidence: 6,
    iceScore: 5.7,
    riceScore: 245,
    reachEstimate: 35000,
    durationDays: 14,
    decisionRule: 'Nếu tỷ lệ mở app đạt >= 7% và có > 150 đơn đặt khám, đưa vào kịch bản Win-back tự động D60.',
    status: 'Prioritized',
    tag: 'HYPOTHESIS'
  },
  {
    id: 'exp-09',
    name: 'In-app Chat Pre-screen: Hỏi trợ lý điều dưỡng trước khi đặt khám',
    problem: 'Bệnh nhân ngần ngại đặt lịch vì không chắc tình trạng của mình có cần đi viện lớn hay chỉ cần theo dõi tại nhà.',
    insight: 'Có một nhân viên y tế/điều dưỡng xác nhận sơ bộ trong 60 giây sẽ giải tỏa 90% sự phân vân của bệnh nhân.',
    hypothesis: 'Tích hợp nút "Chat nhanh với điều dưỡng viên 24/7" ngay tại trang chủ sẽ tăng tỷ lệ tin cậy và thúc đẩy đặt lịch khám phù hợp.',
    segment: 'New Users truy cập lần đầu vào khung giờ 8h - 17h',
    proposedChange: 'Thêm floating widget hỗ trợ tư vấn phân luồng bệnh viện.',
    primaryMetric: 'Visitor to Booking CVR (%)',
    secondaryMetric: 'Thời gian hoàn tất đặt lịch (Time to Booking)',
    guardrailMetric: 'Thời gian chờ phản hồi của điều dưỡng viên (phải < 90 giây)',
    expectedResult: 'CVR tăng thêm 15%',
    effort: 7,
    impact: 8,
    confidence: 7,
    iceScore: 7.3,
    riceScore: 380,
    reachEstimate: 18000,
    durationDays: 21,
    decisionRule: 'Nếu CVR tăng > 12% và chi phí vận hành điều dưỡng bù đắp được bằng doanh thu ca khám.',
    status: 'Backlog',
    tag: 'HYPOTHESIS'
  },
  {
    id: 'exp-10',
    name: 'Subscription Pass: Ra mắt gói thành viên "Bác sĩ Gia Đình 365"',
    problem: 'Doanh thu phụ thuộc vào phí hoa hồng từng ca khám đơn lẻ (Transactional), biên độ doanh thu theo mùa biến động cao.',
    insight: 'Gia đình có con nhỏ và người già sẵn sàng trả phí thuê bao cố định hàng tháng để được ưu tiên kết nối bác sĩ 24/7 và miễn phí giao thuốc.',
    hypothesis: 'Gói Hội viên "IVIE Care 365" (199k/tháng hoặc 1.8tr/năm) sẽ tạo dòng tiền định kỳ (Recurring Revenue) và tăng tần suất sử dụng gấp 2.5 lần.',
    segment: 'Khách hàng đã từng khám ít nhất 2 lần qua IVIE trong 6 tháng gần nhất',
    proposedChange: 'Popup giới thiệu gói Subscription sau ca khám thứ hai với ưu đãi dùng thử tháng đầu.',
    primaryMetric: 'Subscription Take Rate (%)',
    secondaryMetric: 'Annual Recurring Revenue (ARR)',
    guardrailMetric: 'Bác sĩ quá tải lượt tư vấn video',
    expectedResult: '5% khách hàng đủ điều kiện chuyển đổi sang hội viên trả phí hàng tháng',
    effort: 8,
    impact: 9,
    confidence: 7,
    iceScore: 8.0,
    riceScore: 350,
    reachEstimate: 6000,
    durationDays: 30,
    decisionRule: 'Nếu có ít nhất 250 subscriber trong 30 ngày thử nghiệm, thành lập Product Squad chuyên trách Subscription.',
    status: 'Backlog',
    tag: 'HYPOTHESIS'
  }
];
