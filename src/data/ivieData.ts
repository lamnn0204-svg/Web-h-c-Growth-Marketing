export interface IviePersona {
  id: string;
  name: string;
  age: string;
  occupation: string;
  needs: string[];
  painPoints: string[];
  coreUseCases: string[];
  tag: 'ASSUMPTION';
}

export const IVIE_PERSONAS: IviePersona[] = [
  {
    id: 'urban_busy_parents',
    name: 'Bố mẹ trẻ thành thị bận rộn (Chị Mai)',
    age: '28 - 38 tuổi',
    occupation: 'Nhân viên văn phòng / Quản lý tại Hà Nội & TP.HCM',
    needs: [
      'Khám nhi, tai mũi họng, tiêm chủng cho con ngoài giờ hành chính hoặc cuối tuần',
      'Không muốn con phải chờ đợi 3-4 tiếng ở bệnh viện đông đúc nguy cơ lây chéo bệnh',
      'Lưu trữ hồ sơ tiêm chủng, đơn thuốc của con trên điện thoại'
    ],
    painPoints: [
      'Thời gian eo hẹp, không thể nghỉ làm nửa ngày để xếp hàng lấy số',
      'Lo lắng về trình độ chuyên môn của bác sĩ phòng khám tự do',
      'Khó theo dõi lại lịch sử điều trị giữa các lần khám'
    ],
    coreUseCases: ['Đặt lịch khám chuyên khoa Nhi tại viện trung ương', 'Tư vấn video với bác sĩ nhi khoa lúc nửa đêm khi con sốt', 'Hồ sơ sức khỏe gia đình'],
    tag: 'ASSUMPTION'
  },
  {
    id: 'chronic_elderly_care',
    name: 'Người chăm sóc bệnh nhân mạn tính / Người cao tuổi (Anh Tuấn)',
    age: '35 - 50 tuổi',
    occupation: 'Kinh doanh tự do / Chuyên viên, chăm sóc bố mẹ bị huyết áp, tiểu đường',
    needs: [
      'Đặt lịch tái khám định kỳ theo hẹn với đúng bác sĩ quen thuộc',
      'Giao thuốc định kỳ tận nhà theo đơn điện tử',
      'Nhắc lịch uống thuốc và đo huyết áp/đường huyết mỗi ngày'
    ],
    painPoints: [
      'Bố mẹ đi lại khó khăn, ngại chen chúc tại bệnh viện lớn',
      'Thường xuyên quên lịch tái khám hoặc hết thuốc đột ngột',
      'Đơn thuốc giấy hay bị thất lạc hoặc rách nát'
    ],
    coreUseCases: ['Tái khám trực tuyến qua video với bác sĩ điều trị', 'Đơn thuốc điện tử & giao thuốc định kỳ', 'Nhắc nhở sức khỏe tự động'],
    tag: 'ASSUMPTION'
  },
  {
    id: 'provincial_patients',
    name: 'Bệnh nhân ở tỉnh xa cần chuyên gia đầu ngành (Bác Bình)',
    age: '45 - 65 tuổi',
    occupation: 'Cán bộ hưu trí / Nông dân / Công nhân tại các tỉnh vệ tinh (Hưng Yên, Phú Thọ, Nam Định)',
    needs: [
      'Tiếp cận các Giáo sư, Bác sĩ trưởng khoa các viện tuyến TW (Bạch Mai, Việt Đức, Nhi TW)',
      'Hỏi ý kiến chuyên gia thứ hai (Second Opinion) trước các phẫu thuật quan trọng',
      'Đặt trước giờ khám chính xác để đi xe khách lên Hà Nội khám xong về ngay trong ngày'
    ],
    painPoints: [
      'Phải dậy từ 3-4 giờ sáng bắt xe đò lên Hà Nội, chen chúc mệt mỏi',
      'Bị "cò mồi" bệnh viện lừa đảo hoặc bán số thứ tự giả',
      'Chi phí ăn ở đi lại phát sinh tốn kém gấp 3 lần tiền khám'
    ],
    coreUseCases: ['Đặt lịch khám hẹn giờ đích danh Giáo sư / Chuyên gia TW', 'Tư vấn online xem xét kết quả xét nghiệm chụp chiếu trước khi đi xa'],
    tag: 'ASSUMPTION'
  }
];

export const IVIE_PRODUCT_OVERVIEW = {
  appName: 'IVIE - Bác sĩ ơi',
  brandOwner: 'ISOFH CARE (Công ty Cổ phần Công nghệ ISOFH)',
  description: 'Nền tảng chuyển đổi số y tế toàn diện kết nối người dân với hệ thống cơ sở y tế hàng đầu, bác sĩ chuyên khoa và dịch vụ chăm sóc sức khỏe tại nhà.',
  keyPillars: [
    { title: 'Đặt lịch khám', desc: 'Chọn viện, chuyên khoa, bác sĩ, khung giờ khám chính xác, thanh toán trước không chờ đợi.' },
    { title: 'Bác sĩ ơi (Telemedicine)', desc: 'Tư vấn khám bệnh từ xa qua gọi video 1:1 bảo mật 24/7 với bác sĩ chuyên khoa.' },
    { title: 'Hồ sơ sức khỏe cá nhân', desc: 'Lưu trữ toàn bộ lịch sử khám, đơn thuốc điện tử, kết quả xét nghiệm, chẩn đoán hình ảnh trọn đời.' },
    { title: 'Nhà thuốc online & Tiện ích', desc: 'Giao thuốc tận nơi theo đơn bác sĩ, sổ tay tiêm chủng, diễn đàn giải đáp y khoa miễn phí.' }
  ],
  hospitalPartners: ['Bệnh viện Hữu nghị Việt Đức', 'Bệnh viện K', 'Bệnh viện Bạch Mai', 'Bệnh viện Đa khoa Hồng Ngọc', 'Bệnh viện Đại học Y Hà Nội'],
  dataDisclaimer: 'Tất cả các số liệu quy mô người dùng, tỷ lệ chuyển đổi (CVR) và doanh thu hiển thị trong chương trình học này là DỮ LIỆU GIẢ LẬP [SIMULATED DATA] hoặc GIẢ ĐỊNH HỌC TẬP [ASSUMPTION], nhằm phục vụ mục đích đào tạo và rèn luyện kỹ năng thực chiến của Ngô Ngọc Lâm.'
};

export const IVIE_SIMULATED_FUNNEL = [
  { step: 'App Store / Web Landing Visits', count: 120000, cvrFromPrev: 100, tag: 'SIMULATED DATA' },
  { step: 'App Install & Account Registration', count: 48000, cvrFromPrev: 40.0, tag: 'SIMULATED DATA' },
  { step: 'Doctor Search / Hospital Discovery', count: 26400, cvrFromPrev: 55.0, tag: 'SIMULATED DATA' },
  { step: 'Start Booking / Consult Flow', count: 14520, cvrFromPrev: 55.0, tag: 'SIMULATED DATA' },
  { step: 'First Booking Confirmed (Activation Event)', count: 7920, cvrFromPrev: 54.5, tag: 'SIMULATED DATA' },
  { step: 'Consultation Completed (Show-up)', count: 6336, cvrFromPrev: 80.0, tag: 'SIMULATED DATA' },
  { step: '30-Day Repeat Booking (Retention)', count: 1267, cvrFromPrev: 20.0, tag: 'SIMULATED DATA' }
];
