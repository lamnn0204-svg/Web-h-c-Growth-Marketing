export interface GrowthMetric {
  id: string;
  name: string;
  category: 'Acquisition' | 'Activation' | 'Retention' | 'Engagement' | 'Monetization' | 'Experimentation';
  definition: string;
  formula: string;
  whenToUse: string;
  example: string;
  ivieExample: string;
  commonMistakes: string;
  calculator?: {
    inputs: { id: string; label: string; defaultValue: number; unit?: string }[];
    calculate: (inputs: Record<string, number>) => { value: number; unit: string; interpretation: string };
  };
}

export const GROWTH_METRICS: GrowthMetric[] = [
  // ACQUISITION
  {
    id: 'cac',
    name: 'CAC (Customer Acquisition Cost)',
    category: 'Acquisition',
    definition: 'Tổng chi phí bỏ ra để có được một khách hàng mới trả phí hoặc thực hiện hành động chuyển đổi mục tiêu.',
    formula: 'CAC = Tổng chi phí Sales & Marketing / Số lượng khách hàng mới có được (New Customers)',
    whenToUse: 'Dùng để đánh giá hiệu quả kinh tế đơn vị (Unit Economics) của từng kênh kéo người dùng mới (Meta Ads, Google Ads, TikTok Ads, Referral).',
    example: 'Chi 50.000.000 VNĐ tiền quảng cáo, thu về 500 khách hàng mua hàng đầu tiên → CAC = 100.000 VNĐ/khách hàng.',
    ivieExample: 'Chi 80.000.000 VNĐ chạy chiến dịch Google Search Ads "khám nhi tại nhà", thu được 800 người dùng lần đầu đặt lịch và hoàn thành khám qua IVIE → CAC = 100.000 VNĐ/người dùng khám đầu tiên. [SIMULATED DATA]',
    commonMistakes: 'Chỉ tính chi phí chạy ad trực tiếp mà quên chi phí agency, creative production, tool CRM hoặc tính gộp cả organic users vào mẫu số làm đẹp số liệu ảo.',
    calculator: {
      inputs: [
        { id: 'totalCost', label: 'Tổng chi phí Marketing (VNĐ)', defaultValue: 50000000, unit: 'VNĐ' },
        { id: 'newUsers', label: 'Số khách hàng mới kích hoạt', defaultValue: 500 }
      ],
      calculate: (vals) => {
        const val = vals.newUsers > 0 ? Math.round(vals.totalCost / vals.newUsers) : 0;
        return {
          value: val,
          unit: 'VNĐ / User',
          interpretation: val > 200000 ? 'CAC tương đối cao so với giá trị đơn khám trung bình, cần tối ưu CVR landing page.' : 'CAC lành mạnh, tiếp tục duy trì và mở rộng quy mô kênh.'
        };
      }
    }
  },
  {
    id: 'cpa',
    name: 'CPA (Cost Per Acquisition / Action)',
    category: 'Acquisition',
    definition: 'Chi phí trung bình để một người dùng thực hiện một hành động cụ thể (đăng ký tài khoản, tải app, đặt lịch khám).',
    formula: 'CPA = Tổng ngân sách chiến dịch / Số lượng hành động hoàn thành',
    whenToUse: 'Đo lường hiệu quả chuyển đổi ở từng nấc phễu acquisition.',
    example: 'Chi 10.000.000 VNĐ, có 1.000 lượt cài đặt app → Cost Per Install (CPI) = 10.000 VNĐ.',
    ivieExample: 'Chạy chiến dịch Meta App Install cho phụ huynh tại Hà Nội, chi 20.000.000 VNĐ nhận được 1.200 lượt đăng ký tài khoản IVIE thành công → CPA (Sign-up) = 16.666 VNĐ. [SIMULATED DATA]',
    commonMistakes: 'Đánh đồng CPA (đăng ký) với CAC (khách hàng có doanh thu). Đăng ký tài khoản chưa chắc đã đi khám!'
  },
  {
    id: 'cpc_ctr',
    name: 'CPC & CTR (Cost Per Click & Click-Through Rate)',
    category: 'Acquisition',
    definition: 'CTR đo mức độ hấp dẫn của thông điệp/creative; CPC đo chi phí cho mỗi lượt truy cập vào phễu.',
    formula: 'CTR = (Clicks / Impressions) * 100% | CPC = Chi phí quảng cáo / Clicks',
    whenToUse: 'Tối ưu Creative & Hook của quảng cáo trước khi user đặt chân vào landing page / App Store.',
    example: '100.000 lượt hiển thị banner, 2.500 clicks → CTR = 2.5%. Chi phí 5.000.000 VNĐ → CPC = 2.000 VNĐ.',
    ivieExample: 'Creative thử nghiệm A: "Đặt lịch khám Nhi không chờ đợi" (CTR 3.2%, CPC 1.800 VNĐ) vs Creative B: "Ứng dụng sức khỏe số 1 Việt Nam" (CTR 0.9%, CPC 5.200 VNĐ). [HYPOTHESIS]',
    commonMistakes: 'Chỉ chăm chăm tối ưu CTR cao bằng clickbait giật gân, dẫn đến user vào trang thoát ngay (High Bounce Rate, Zero Activation).'
  },

  // ACTIVATION
  {
    id: 'activation_rate',
    name: 'Activation Rate (Tỷ lệ kích hoạt)',
    category: 'Activation',
    definition: 'Tỷ lệ phần trăm người dùng mới thực hiện thành công hành động then chốt (Activation Event) trải nghiệm giá trị cốt lõi lần đầu tiên.',
    formula: 'Activation Rate = (Số user hoàn thành Activation Event / Tổng số Sign-up trong cùng kỳ) * 100%',
    whenToUse: 'Đánh giá mức độ hiệu quả của quá trình Onboarding và Time-to-Value.',
    example: '1.000 người đăng ký Spotify, 650 người nghe ít nhất 3 bài hát trong ngày đầu → Activation Rate = 65%.',
    ivieExample: 'Hành động kích hoạt cốt lõi của IVIE là: "Người dùng hoàn thành đặt lịch hẹn khám đầu tiên (hoặc tư vấn video 1:1 thành công)". 10.000 người tạo tài khoản, 3.000 người hoàn thành đặt lịch → Activation Rate = 30%. [SIMULATED DATA]',
    commonMistakes: 'Nhầm lẫn việc "Đăng ký tài khoản thành công" hoặc "Xem trang chủ" là Activation. Đăng ký chỉ là Setup Moment, chưa chạm vào Aha Moment!',
    calculator: {
      inputs: [
        { id: 'signups', label: 'Số tài khoản mới đăng ký', defaultValue: 1000 },
        { id: 'activatedUsers', label: 'Số người hoàn thành lịch khám đầu', defaultValue: 320 }
      ],
      calculate: (vals) => {
        const rate = vals.signups > 0 ? Number(((vals.activatedUsers / vals.signups) * 100).toFixed(1)) : 0;
        return {
          value: rate,
          unit: '%',
          interpretation: rate >= 30 ? 'Tỷ lệ kích hoạt tốt cho app y tế/dịch vụ phức tạp.' : 'Drop-off cao trong onboarding, cần rút ngắn số bước từ đăng ký đến xem lịch bác sĩ.'
        };
      }
    }
  },
  {
    id: 'time_to_value',
    name: 'Time to Value (TTV)',
    category: 'Activation',
    definition: 'Khoảng thời gian từ lúc người dùng tải app/đăng ký cho đến khi họ nhận được giá trị thực tế đầu tiên (Aha Moment).',
    formula: 'TTV = Thời điểm xảy ra Activation Event - Thời điểm Sign-up',
    whenToUse: 'Rà soát ma sát (friction), giảm thiểu rào cản trong hành trình onboarding.',
    example: 'Uber: TTV là thời gian từ khi mở app đến khi xe được xác nhận đón (thường dưới 60 giây).',
    ivieExample: 'Với IVIE, nếu người dùng phải qua 8 bước xác thực CCCD, điền địa chỉ trước khi được xem lịch khám của bác sĩ Nhi → TTV kéo dài 15 phút gây bỏ rơi 60%. Nếu cho xem lịch bác sĩ ngay và chỉ điền thông tin khi xác nhận đặt → TTV giảm xuống 2 phút. [HYPOTHESIS]',
    commonMistakes: 'Bắt user khai báo quá nhiều thông tin y tế ngay tại màn hình đầu tiên khi chưa trao cho họ bất kỳ giá trị nào.'
  },

  // RETENTION
  {
    id: 'retention_cohort',
    name: 'Cohort Retention (D1 / D7 / D30 Retention)',
    category: 'Retention',
    definition: 'Tỷ lệ phần trăm người dùng thuộc một nhóm (cohort cùng cài đặt ngày X) quay trở lại sử dụng sản phẩm vào ngày thứ N.',
    formula: 'Retention Day N = (Active Users ngày thứ N thuộc Cohort / Tổng số Users ban đầu của Cohort) * 100%',
    whenToUse: 'Kiểm tra xem sản phẩm có đạt Product-Market Fit (PMF) hay không; biểu đồ Retention Curve có đi ngang (flatten) hay dốc tuột về 0.',
    example: '100 user cài app ngày 1/9. Ngày 2/9 có 40 user mở app (D1 = 40%). Ngày 8/9 có 22 user mở app (D7 = 22%). Ngày 30/9 có 15 user mở app (D30 = 15%).',
    ivieExample: 'App y tế có chu kỳ sử dụng không phải hàng ngày (Low Frequency, High Value). Với bệnh nhân mạn tính, D30 Repeat Booking Rate kỳ vọng là 25-30% khi đến kỳ tái khám. Với người ốm vặt, chỉ số xem xét là M3/M6 Retention. [SIMULATED DATA]',
    commonMistakes: 'Áp đặt tiêu chuẩn Retention hàng ngày của app mạng xã hội/Game (D1 > 50%) lên một sản phẩm y tế như IVIE rồi kết luận sản phẩm thất bại.',
    calculator: {
      inputs: [
        { id: 'cohortSize', label: 'Số người tham gia Cohort ban đầu', defaultValue: 5000 },
        { id: 'activeAtD30', label: 'Số người active tại Ngày thứ 30', defaultValue: 850 }
      ],
      calculate: (vals) => {
        const ret = vals.cohortSize > 0 ? Number(((vals.activeAtD30 / vals.cohortSize) * 100).toFixed(1)) : 0;
        return {
          value: ret,
          unit: '%',
          interpretation: ret >= 15 ? 'Đường cong Retention D30 ổn định cho sản phẩm y tế/đặt khám.' : 'Cần kiểm tra CRM trigger nhắc lịch tái khám và kết quả xét nghiệm.'
        };
      }
    }
  },
  {
    id: 'churn_rate',
    name: 'Churn Rate (Tỷ lệ rời bỏ)',
    category: 'Retention',
    definition: 'Tỷ lệ phần trăm khách hàng ngừng sử dụng dịch vụ hoặc không quay lại trong một chu kỳ nhất định.',
    formula: 'Monthly Churn Rate = (Số user rời bỏ trong tháng / Số user hoạt động đầu tháng) * 100%',
    whenToUse: 'Cảnh báo nguy cơ rò rỉ xô thủng (Leaky Bucket) của mô hình kinh doanh.',
    example: 'Đầu tháng có 10.000 active users, trong tháng có 800 người gỡ app/không quay lại trong 60 ngày → Churn = 8%.',
    ivieExample: 'Với nhóm bệnh nhân đăng ký gói chăm sóc sức khỏe gia đình định kỳ của IVIE, Churn Rate tháng giữ dưới 5% là ngưỡng sống còn của mô hình Subscription. [SIMULATED DATA]',
    commonMistakes: 'Cố gắng bơm tiền Acquisition bù vào Churn mà không sửa chữa lỗ hổng trải nghiệm bên trong sản phẩm.'
  },

  // ENGAGEMENT
  {
    id: 'dau_mau_stickiness',
    name: 'DAU, MAU & Stickiness (DAU/MAU Ratio)',
    category: 'Engagement',
    definition: 'Đo lường mức độ gắn kết và tần suất thói quen mở ứng dụng của người dùng.',
    formula: 'Stickiness Ratio = (DAU / MAU) * 100%',
    whenToUse: 'Đánh giá thói quen sử dụng sản phẩm hàng ngày/hàng tháng.',
    example: 'Facebook/TikTok có DAU/MAU > 50% (người dùng mở app mỗi 2 ngày). B2B SaaS thường ở mức 15-25%.',
    ivieExample: 'Do nhu cầu đi khám không diễn ra hàng ngày, IVIE cần các tiện ích đệm để nâng cao Stickiness: Sổ theo dõi chỉ số huyết áp, Lịch nhắc uống thuốc, Diễn đàn hỏi bác sĩ miễn phí. Nâng DAU/MAU từ 4% lên 12%. [HYPOTHESIS]',
    commonMistakes: 'Kỳ vọng user mở app IVIE mỗi ngày để "đặt khám". Phải tạo các tính năng tiện ích sức khỏe thường nhật (Content, Tracking) mới tạo ra daily touchpoints.'
  },

  // MONETIZATION
  {
    id: 'ltv_cac',
    name: 'LTV (Lifetime Value) & LTV:CAC Ratio',
    category: 'Monetization',
    definition: 'Tổng giá trị lợi nhuận biên hoặc doanh thu mà một khách hàng đóng góp cho doanh nghiệp trong toàn bộ vòng đời sử dụng sản phẩm.',
    formula: 'LTV = ARPU trung bình mỗi chu kỳ * Tỷ lệ lợi nhuận gộp * Thời gian gắn bó trung bình (Lifetime) | Tỷ số LTV:CAC = LTV / CAC',
    whenToUse: 'Quyết định xem doanh nghiệp có thể tăng ngân sách quảng cáo mở rộng quy mô (Scale) hay không. Tỷ số vàng là LTV:CAC >= 3:1.',
    example: 'LTV = 600.000 VNĐ, CAC = 150.000 VNĐ → LTV:CAC = 4:1 (Rất lành mạnh, sẵn sàng scale up).',
    ivieExample: 'Một bệnh nhân trung bình khám 3 lần/năm qua IVIE, phí hoa hồng nền tảng thu về là 150.000 VNĐ/lần khám + 50.000 VNĐ từ giao thuốc tận nơi. Trong 2 năm khách hàng đóng góp 800.000 VNĐ Gross Profit. Với CAC 200.000 VNĐ → LTV:CAC = 4:1. [SIMULATED DATA]',
    commonMistakes: 'Lấy tổng doanh thu tính LTV thay vì Gross Profit (Lợi nhuận gộp), dẫn đến định giá LTV quá cao và chi tiền CAC vượt mức chịu đựng của công ty.',
    calculator: {
      inputs: [
        { id: 'cac', label: 'Chi phí mua khách hàng - CAC (VNĐ)', defaultValue: 180000, unit: 'VNĐ' },
        { id: 'avgRevenuePerVisit', label: 'Phí dịch vụ/lần khám (VNĐ)', defaultValue: 120000, unit: 'VNĐ' },
        { id: 'visitsPerYear', label: 'Số lần khám/năm', defaultValue: 3 },
        { id: 'lifespanYears', label: 'Vòng đời gắn bó (Năm)', defaultValue: 2 }
      ],
      calculate: (vals) => {
        const ltv = vals.avgRevenuePerVisit * vals.visitsPerYear * vals.lifespanYears;
        const ratio = vals.cac > 0 ? Number((ltv / vals.cac).toFixed(1)) : 0;
        return {
          value: ratio,
          unit: `: 1 (LTV = ${ltv.toLocaleString('vi-VN')} VNĐ)`,
          interpretation: ratio >= 3 ? 'Tỷ số LTV:CAC cực kỳ lý tưởng (>= 3:1), an toàn để đẩy mạnh ngân sách Acquisition.' : 'Tỷ số dưới 3:1, cần tăng tần suất tái khám (Retention) hoặc hạ CAC.'
        };
      }
    }
  },
  {
    id: 'arpu_arppu',
    name: 'ARPU & ARPPU',
    category: 'Monetization',
    definition: 'ARPU: Doanh thu trung bình trên MỖI người dùng hoạt động; ARPPU: Doanh thu trung bình trên MỖI người dùng CÓ TRẢ TIỀN.',
    formula: 'ARPU = Tổng doanh thu / Tổng Active Users | ARPPU = Tổng doanh thu / Số Paying Users',
    whenToUse: 'Theo dõi chất lượng chi tiêu và tỷ lệ chuyển đổi từ người dùng miễn phí sang trả tiền (Conversion to Paid).',
    example: '10.000 active users, 500 người trả tiền tổng cộng 200.000.000 VNĐ → ARPU = 20.000 VNĐ, ARPPU = 400.000 VNĐ.',
    ivieExample: 'IVIE có 50.000 MAU sử dụng hỏi đáp/sổ sức khỏe miễn phí, trong đó 4.000 người trả tiền đặt khám/giao thuốc → Doanh thu 1.6 tỷ VNĐ. ARPU = 32.000 VNĐ; ARPPU = 400.000 VNĐ. [SIMULATED DATA]',
    commonMistakes: 'Nhầm lẫn hai chỉ số, lấy ARPPU áp dụng cho toàn bộ tập người dùng dẫn đến dự phóng doanh thu trên trời.'
  },

  // EXPERIMENTATION
  {
    id: 'ab_lift_significance',
    name: 'Conversion Lift & Statistical Significance',
    category: 'Experimentation',
    definition: 'Mức tăng trưởng tương đối của phương án thử nghiệm (Variant) so với phương án gốc (Control) và độ tin cậy thống kê (thường >= 95%).',
    formula: 'Lift % = ((CVR Variant - CVR Control) / CVR Control) * 100% | p-value < 0.05',
    whenToUse: 'Quyết định xem có nên triển khai rộng rãi (Rollout) một tính năng thử nghiệm hay không.',
    example: 'Control CVR = 5.0%, Variant CVR = 6.2% → Lift = ((6.2 - 5.0) / 5.0) * 100% = +24% tương đối.',
    ivieExample: 'Thử nghiệm hiển thị nhãn "Bác sĩ được đặt nhiều nhất tuần này": Control CVR đặt khám 8.0%, Variant CVR 10.5% (+31.25% Lift), p-value = 0.02 (Độ tin cậy 98%) → Validated & Scale up. [HYPOTHESIS]',
    commonMistakes: 'Dừng thử nghiệm quá sớm khi thấy Lift cao mà chưa đủ mẫu (Sample Size) dẫn đến dương tính giả (False Positive).'
  }
];
