import debt from './debt'
export default {
  head: {
    brand: 'Megasop',
    title: 'Giải Pháp Chuyển Đổi Số Chuỗi Cung Ứng Cho Doanh Nghiệp'
  },
  // Header
  header: {
    personal_info: 'Thông tin cá nhân',
    logout: 'Đăng xuất',

    manager: 'Quản trị',
    employee: 'Nhân viên',

    user_manual: 'Hướng dẫn sử dụng MEGASOP'
  },

  // Trang Login
  login: {
    welcome: 'Chào mừng bạn đến với MEGASOP!',
    login_to_start: 'Bạn vui lòng đăng nhập để bắt đầu sử dụng nền tảng',
    email: 'Email',
    please_enter_email: 'Vui lòng nhập địa chỉ email!',
    email_is_not_valid: 'Địa chỉ email không hợp lệ!',
    password: 'Mật khẩu',
    please_enter_password: 'Vui lòng nhập mật khẩu!',
    forgot_password: 'Quên mật khẩu?',
    remember_password: 'Nhớ mật khẩu',
    login: 'Đăng nhập',
    do_not_have_password: 'Bạn chưa có tài khoản?',
    create_acc: 'Tạo tài khoản',
    double_check_info: 'Vui lòng kiểm tra lại thông tin nhập vào!',
    login_failed:
      'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin nhập vào!'
  },

  // Trang quên mật khẩu
  forgot_pass: {
    forgot_password: 'Quên mật khẩu?',
    introduce:
      'Nhập địa chỉ email của bạn, chúng tôi sẽ gửi hướng dẫn cài đặt lại mật khẩu cho bạn.',
    email: 'Email',
    please_enter_email: 'Vui lòng nhập địa chỉ email!',
    email_incorrect: 'Email không đúng. Vui lòng kiểm tra lại!',
    email_exists: 'Email của bạn không tồn tại!',
    sent: 'Gửi',
    back: 'Quay lại trang đăng nhập'
  },

  // Trang đăng ký
  register: {
    personal: 'Cá nhân',
    company_representative: 'Đại diện công ty',
    company: 'Công ty',
    details_and_scale: 'Chi tiết và quy mô',
    personal_info: 'Thông tin cá nhân',
    full_name: 'Họ tên',
    enter_full_name: 'Nhập họ tên',
    country: 'Quốc gia',
    phone: 'Số điện thoại',
    enter_phone: 'Nhập số điện thoại',
    email: 'Email',
    enter_email: 'Nhập số điện thoại',
    submit: 'Bằng cách gửi biểu mẫu này, tôi đồng ý với các',
    terms: 'Điều khoản',
    conditions: 'Điều kiện',
    ipi: 'của MEGASOP',
    login: 'Đăng nhập',
    continue: 'Tiếp tục',
    back: 'Quay lại',
    sent: 'Gửi',

    company_info: 'Thông tin công ty',
    contact_and_login: 'Liên hệ và đăng nhập',
    company_name: 'Tên công ty',
    enter_company_name: 'Nhập tên công ty',
    company_website_address: 'Địa chỉ trang web công ty',
    branch: 'Ngành',
    select_branch: 'Chọn ngành',
    email_login: 'Email * (Dùng để đăng nhập vào hệ thống)',
    scale_organizations: 'Quy mô tổ chức',
    average_order: 'Số lượng đơn trung bình ngày',
    number_of_salesman: 'Số lượng salesman',
    number_of_distributors: 'Số lượng Nhà phân phối',
    number_of_retailers: 'Số lượng Đại lý',
    please_enter_a_valid_website_address:
      'Vui lòng nhập địa chỉ trang web hợp lệ.',
    please_enter_at_least_3_characters: 'Vui lòng nhập ít nhất 3 ký tự',
    please_enter_at_least_5_characters: 'Vui lòng nhập ít nhất 5 ký tự',
    please_enter_a_valid_email: 'Vui lòng nhập email hợp lệ.',
    please_enter_a_number_greater_than_1_and_less_than_9991000:
      'Vui lòng nhập số lớn hơn 1 và nhỏ hơn 999.999.',
    please_enter_no_more_than_50_characters:
      'Vui lòng chỉ nhập nhiều nhất 50 ký tự.',
    please_do_not_use_special_characters:
      'Vui lòng không dùng các ký tự đặc biệt.',
    please_enter_a_valid_phone_number: 'Vui lòng nhập số điện thoại hợp lệ.',
    please_select_a_career: 'Vui lòng lựa chọn ngành nghề.',
    registered: 'đã được đăng ký'
  },

  // Trang thông tin cá nhân
  personal: {
    personal_info: 'Thông tin cá nhân',
    general_info: 'Thông tin chung',
    change_password: 'Đổi mật khẩu',
    login_info: 'Thông tin đăng nhập',
    company_name: 'Tên công ty',
    full_name: 'Họ tên',
    email: 'Email',
    phone: 'Số điện thoại',
    password: 'Mật khẩu',

    edit_info: 'Chỉnh sửa thông tin',
    please_enter_at_least_3_characters: 'Vui lòng nhập ít nhất 3 ký tự',
    please_enter_only_50_characters_at_most: 'Vui lòng nhập tối đa 50 ký tự',
    please_do_not_use_special_characters:
      'Vui lòng không sử dụng ký tự đặc biệt',
    please_enter_a_valid_phone_number:
      'Vui lòng nhập số điện thoại đúng định dạng',
    current_password: 'Mật khẩu hiện tại',
    enter_current_password: 'Nhập mật khẩu hiện tại',
    new_password: 'Mật khẩu mới',
    enter_new_password: 'Nhập mật khẩu mới',
    confirm_new_password: 'Xác nhận lại mật khẩu',
    enter_confirm_new_password: 'Vui lòng nhập lại mật khẩu mới',
    password_incorrect: 'Mật khẩu đã nhập chưa đúng. Vui lòng nhập lại',
    please_enter_at_least_8_characters: 'Vui lòng nhập ít nhất 8 ký tự',
    please_enter_only_32_characters_at_most: 'Vui lòng nhập tối đa 32 ký tự',
    correct_password: 'Mật khẩu phải bao gồm chữ thường, chữ in hoa và số',
    confirm_password_incorrect:
      'Mật khẩu xác nhận chưa đúng. Vui lòng kiểm tra lại',
    update_successful: 'Cập nhật thông tin cá nhân thành công',
    update_failed: 'Cập nhật thông tin cá nhân thất bại',
    update_password_successful: 'Cập nhật mật khẩu thành công',
    old_password_is_incorrect: 'Mật khẩu cũ không chính xác',

    update_avatar_successfully: 'Cập nhật ảnh đại diện thành công',
    avatar_update_failed: 'Cập nhật ảnh đại diện thất bại'
  },

  //Left menu
  menu: {
    account: 'Tài khoản',
    operational_dashboard: 'Dashboard vận hành',
    list_of_employee: 'Quản lý nhân viên',
    retailer_list: 'Danh sách đại lý',
    attribute_list: 'Danh sách thuộc tính',
    product_portfolio: 'Danh mục sản phẩm',
    list_of_product: 'Danh sách sản phẩm',
    list_of_warehouses: 'Danh sách kho hàng',
    warehouse_received: 'Danh sách phiếu nhập kho',
    import_history: 'Lịch sử nhập kho',
    export_history: 'Lịch sử xuất kho',
    inventory_list: 'Báo cáo tồn kho',
    order_list: 'Quản lý đơn hàng',
    promotions: 'Quản lý CTKM/ CSBH',
    setting: 'Cài đặt',
    language: 'Ngôn ngữ',

    // Accordion
    warehouse_management: 'Quản lý kho',
    product_management: 'Quản trị sản phẩm',
    retailer_management: 'Quản lý đại lý',
    debt_management: 'Quản lý công nợ',


    toggle_title: 'Tự động ẩn',
    expand_button: 'Mở',
    collapse_button: 'Đóng',
  },

  // Dùng chung toàn cục
  general: {
    create: 'Tạo mới',
    edit: 'Chỉnh sửa',
    updated: 'Cập nhật',
    save: 'Lưu',
    cancel: 'Hủy bỏ',
    cancelled: 'Đã hủy',
    agree: 'Đồng ý',
    completed: 'Hoàn thành',
    active: 'Hoạt động',
    closed: 'Đóng',
    confirmed: 'Xác nhận',
    no_data: 'Không có dữ liệu',
    status: 'Trạng thái',
    select_status: 'Chọn trạng thái',
    waiting_for_approval: 'Chờ duyệt',
    running: 'Đang chạy',
    inactive: 'Ngưng hoạt động',
    from_date: 'Từ ngày',
    to_date: 'Đến ngày',
    code_order: 'Mã đơn hàng',
    approve: 'Duyệt',
    pause: 'Tạm ngưng',
    activated: 'Kích hoạt',
    back: 'Quay lại',
    show_more: 'Hiện thêm',
    show_less: 'Ẩn bớt',
    no_results: 'Không có kết quả',
    rows_per_page: 'Số hàng mỗi trang',
    required_value: 'Trường thông tin bắt buộc không được để trống',
    invalid_value: 'Trường thông tin không hợp lệ',
    auto_allocate: 'Tự động phân bổ',
    create_payment: 'Tạo mới thanh toán',
    cancel_payment: 'Hủy thanh toán',
    reject: 'Từ chối',
    checking: 'Kiểm tra',
    waiting_for_confirm: 'Chờ xác nhận'
  },

  // Trang Tài khoản
  account: {
    company_profile_bill: 'Thông tin và bill công ty',
    company_profile: 'Thông tin công ty',
    package_and_payment: 'Gói và thanh toán',

    representative_profile: 'Thông tin người đại diện',
    full_name: 'Họ và tên',
    country: 'Quốc gia',
    phone_number: 'Số điện thoại',
    personal_email: 'Email cá nhân',

    company_name: 'Tên công ty',
    website: 'Địa chỉ trang web',
    career: 'Ngành nghề',
    email_login: 'Email (đăng nhập)',
    retailer_link: 'Link đại lý',
    user_link: 'Link người tiêu dùng',
    language: 'Ngôn ngữ',

    organization_size: 'Quy mô tổ chức',
    organization_size_information: 'Thông tin quy mô tổ chức',
    monthly_order: 'Số đơn hàng/tháng',
    number_of_salesman: 'Số lượng Salesman',
    number_of_distributors: 'Số lượng nhà phân phối',
    number_of_retailers: 'Số lượng đại lý',

    please_enter_at_least_3_characters: 'Vui lòng nhập ít nhất 3 ký tự.',
    please_enter_a_valid_phone_number: 'Vui lòng nhập số điện thoại hợp lệ.',
    please_enter_a_valid_email: 'Vui lòng nhập email hợp lệ.',
    please_enter_no_more_than_50_characters:
      'Vui lòng chỉ nhập nhiều nhất 50 ký tự.',
    please_enter_at_least_5_characters: 'Vui lòng nhập ít nhất 5 ký tự',
    please_do_not_use_special_characters:
      'Vui lòng không dùng các ký tự đặc biệt.',
    please_enter_a_valid_website_address:
      'Vui lòng nhập địa chỉ trang web hợp lệ.',
    please_select_a_career: 'Vui lòng lựa chọn ngành nghề.',
    please_enter_a_number_greater_than_1_and_less_than_9991000:
      'Vui lòng nhập số lớn hơn 1 và nhỏ hơn 999.999.',

    successfully_updated_representative_information:
      'Cập nhật thông tin người đại diện thành công',
    unable_to_save_representative_information:
      'Không thể lưu thông tin người đại diện',
    successfully_updated_company_information:
      'Cập nhật thông tin công ty thành công',
    unable_to_save_company_information: 'Không thể lưu thông tin công ty',
    successfully_updated_organization_size_:
      'Cập nhật Quy mô tổ chức thành công',
    unable_to_save_organization_size: 'Không thể lưu thông tin Quy mô tổ chức'

    // FMCG: "Hàng tiêu dùng nhanh",
    // cosmetic: "Mỹ phẩm & làm đẹp",
    // personal_care: "Sản phẩm chăm sóc cá nhân & vệ sinh",
    // fashion_accessories: "Thời trang & phụ kiện",
    // packaged_food: "Thực phẩm đóng gói",
    // agricultural_goods: "Hàng nông nghiệp",
    // personal_electronics: "Điện tử cá nhân",
    // home_electric: "Đồ điện gia dụng",
    // other_household_appliances: "Các thiết bị gia dụng khác",
    // furniture: "Đồ nội thất",
    // other_branch: "Ngành khác",
  },

  // Trang Dashboard
  dashboard: {
    operational_dashboard: 'Dashboard vận hành',

    statistical: 'Thống kê',
    sales_statistical: 'Doanh số',
    order_statistical: 'Đơn hàng',
    average_sales_statistical: 'Doanh số TB',
    retailer_order_statistical: 'Đại lý đặt hàng',

    marketable_product: 'Sản phẩm bán chạy',
    sold: 'Bán',
    inventory: 'Tồn',

    need_to_import_inventory: 'Cần nhập kho',
    create_a_stock_received_docket: 'Tạo phiếu',
    make_order: 'Đặt',
    need: 'Cần',

    message_no_data: 'Vui lòng cung cấp thông tin để dữ liệu được hiển thị',

    order: 'Đơn hàng',
    to_pay: 'Chờ xác nhận',
    to_ship: 'Chờ giao',
    returned: 'Đơn trả',
    cancelled: 'Hủy',
    completed: 'Hoàn thành',
    confirmed: 'Xác nhận',

    retailer_promotion: 'CTKM Đại lý',
    user_promotion: 'CTKM Người tiêu dùng',

    running_promotion: 'Đang chạy',
    discount_promotion: 'Chiết khấu và giảm giá',
    order_promotion: 'Đơn hàng',
    gift_promotion: 'Quà tặng',

    order_status: 'Trạng thái đơn hàng',
    average_order_processing_time: 'Thời gian xử lý đơn hàng trung bình',
    minute: '(Phút)',
    minuteTooltip: 'phút'
  },

  // Trang Danh sách nhân viên
  employee: {
    list: {
      employee_list: 'Danh sách nhân viên',
      search_by_name: 'Tìm kiếm theo tên',
      ordinal_number: 'STT',
      full_name: 'Họ tên',
      email: 'Email',
      phone: 'Điện thoại',
      address: 'Địa chỉ',
      status: 'Trạng thái',
      action: 'Trạng thái',
      records_per_page: 'Trang',

      edit_tooltip: 'Chỉnh sửa',
      reset_password_tooltip: 'Đặt lại mật khẩu',
      lock_acc: 'Khóa tài khoản',
      unlock_acc: 'Kích hoạt tài khoản',

      confirm_reset_password: 'Bạn chắc chắn muốn reset mật khẩu cho nhân viên',
      confirm_lock_acc: 'Bạn chắc chắn muốn khóa tài khoản của',
      confirm_unlock_acc: 'Bạn chắc chắn muốn mở khóa tài khoản cho',

      reset_password_notification: 'Cập nhật mật khẩu cho',
      successfully: 'thành công',
      failed: 'thất bại'
    },
    create: {
      create_a_employee: 'Tạo mới nhân viên',
      edit_employee: 'Chỉnh sửa nhân viên',

      full_name: 'Họ tên',
      enter_employee_name: 'Nhập tên nhân viên',
      please_enter_the_full_name: 'Vui lòng nhập họ tên',
      email: 'Email',
      enter_the_email: 'Nhập địa chỉ email',
      please_enter_the_email: 'Vui lòng nhập email',
      phone_number: 'Điện thoại',
      enter_the_phone_number: 'Nhập số điện thoại',
      please_enter_the_phone_number: 'Vui lòng nhập số điện thoại',
      address: 'Địa chỉ',
      enter_address: 'Nhập địa chỉ',
      please_enter_the_address: 'Vui lòng nhập địa chỉ',
      choose_your_avatar: 'Chọn hình avatar',
      select_a_picture: 'Chọn hình',

      create_successful: 'Cập nhật nhân viên thành công',
      exist_email: 'đã được sử dụng. Vui lòng nhập email khác.',
      exceeded_the_limit: 'Tạo nhân viên thất bại. Vượt số lượng giới hạn.',
      update_successful: 'Cập nhật nhân viên thành công',
      update_failed: 'Cập nhật nhân viên thất bại. Vui lòng thử lại',

      employee_information: 'Thông tin nhân viên'
    }
  },

  // Trang danh sách đại lý
  retailers: {
    retailer_list: 'Danh sách đại lý',
    total_retailer: 'Tổng số đại lý',
    inactive: 'Ngưng hoạt động',
    active: 'Đang hoạt động',
    waiting_for_approval: 'Đang chờ duyệt',
    number_of_retailer_with_orders_per_day: 'Số đại lý có đơn trong ngày',
    number_of_retailers_with_first_order: 'Số đại lý có đơn đầu tiên',

    province_city: 'Tỉnh/Thành phố',
    select_province_city: 'Chọn Tỉnh/Thành phố',
    search_by_name: 'Tìm kiếm theo tên',
    add_retailer: 'Thêm đại lý',
    export_excel: 'Xuất excel',

    retailer_name_col: 'Tên đại lý',
    retailer_code_col: 'Mã đại lý',
    create_date_col: 'Ngày tạo',
    phone_col: 'Điện thoại',
    city_col: 'Thành phố',
    order_sellin_col: 'Đơn hàng sellin',
    order_value_sellin_col: 'Giá trị đơn sellin',
    order_sellout_col: 'Đơn hàng sellout',
    order_value_sellout_col: 'Giá trị đơn sellout',
    status_col: 'Trạng thái',

    create_a_new_retailer: 'Tạo mới đại lý',
    retailer_name: 'Tên đại lý',
    enter_retailer_name: 'Nhập tên đại lý',
    please_enter_retailer_name: 'Vui lòng nhập tên đại lý',
    bod: 'Ngày sinh nhật',
    agent: 'Người đại diện',
    enter_agent_name: 'Nhập tên người đại diện',
    please_enter_agent_name: 'Vui lòng nhập tên người đại diện',
    id_card: 'CMND/CCCD',
    enter_id_card: 'Nhập CMND hoặc CCCD',
    please_enter_9_numbers_or_12_numbers: 'Vui lòng nhập 9 số hoặc 12 số',
    email: 'Email',
    enter_email: 'Nhập email',
    please_enter_email: 'Vui lòng nhập email',
    incorrect_email: 'Email không đúng. Vui lòng kiểm tra lại',
    phone_log_in: 'Điện thoại (Tên đăng nhập)',
    phone_number: 'Số điện thoại',
    enter_phone_number: 'Nhập số điện thoại',
    please_enter_phone_number: 'Vui lòng nhập số điện thoại',
    incorrect_phone: 'Số điện thoại không đúng. Vui lòng kiểm tra lại!',
    address: 'Địa chỉ',
    enter_address: 'Nhập địa chỉ',
    please_enter_address: 'Vui lòng nhập địa chỉ',
    district: 'Quận/Huyện',
    select_district: 'Chọn Quận/Huyện',
    ward: 'Phường/Xã',
    select_ward: 'Chọn Phường/Xã',
    select_avatar: 'Chọn ảnh đại diện',
    select_picture: 'Chọn hình',

    create_successful: 'Tạo đại lý thành công.',
    exists_email: 'đã được sử dụng. Vui lòng nhập email khác.',
    exists_phone: 'đã được sử dụng. Vui lòng nhập số điện thoại khác.',
    exceeded_the_limit: 'Tạo đại lý thất bại. Vượt số lượng giới hạn.',
    update_successful: 'Cập nhật đại lý thành công',
    update_failed: 'Cập nhật đại lý thất bại. Vui lòng thử lại',

    retailer_details: 'Chi tiết đại lý',
    details: {
      detail: 'Chi tiết',
      retailer_name: 'Tên đại lý',
      retailer_code: 'Mã đại lý',
      bod: 'Ngày sinh',
      create_date: 'Ngày tạo',
      status: 'Trạng thái',
      agent: 'Người đại diện',
      card_id: 'CMND/CCCD',
      email: 'Email',
      phone: 'Số điện thoại',
      address: 'Địa chỉ',
      ward: 'Phường/Xã',
      district: 'Quận/Huyện',
      city: 'Tỉnh/Thành phố',

      invoice_information: 'Thông tin hóa đơn',
      payment_agent_name: 'Tên đại lý thanh toán',
      enter_payment_agent_name: 'Nhập tên đại lý thanh toán',
      address_invoice: 'Địa chỉ thanh toán',
      enter_address_invoice: 'Nhập địa chỉ thanh toán',
      tax_code: 'Mã số thuế',
      enter_tax_code: 'Nhập mã số thuế',
      phone_invoice: 'Số điện thoại',
      enter_phone_invoice: 'Nhập số điện thoại',
      bank_invoice: 'Ngân hàng',
      bank_invoice_name: 'Tên ngân hàng',
      enter_bank_invoice_name: 'Nhập tên ngân hàng',
      branch_invoice: 'Chi nhánh',
      bank_branch_invoice: 'Chi nhánh ngân hàng',
      enter_bank_branch_invoice: 'Nhập chi nhánh ngân hàng',
      bank_account_number: 'Số tài khoản',
      enter_bank_account_number: 'Nhập số tài khoản',
      bank_account_name: 'Tên tài khoản',
      enter_bank_account_name: 'Nhập tên tài khoản',

      general: 'Tổng quan',
      sellin: 'Mua vào',
      sellout: 'Bán ra',
      number_of_sellin_orders: 'Số lượng đơn mua vào',
      sellin_value: 'Giá trị mua vào',
      date_order: 'Số ngày/đơn',
      average_order_value: 'Giá trị đơn trung bình',
      number_of_orders_sold: 'Số lượng đơn bán ra',
      sellout_value: 'Giá trị bán ra',
      usage_voucher_quantity: 'Số lượng voucher đã dùng',
      total_value_usage_voucher: 'Tổng giá trị voucher đã dùng',

      sales_sellin_info: 'Thông tin doanh số mua vào',
      sellin_order_history: 'Lịch sử đơn hàng mua vào',
      sales_sellout_info: 'Thông tin doanh số bán ra',
      sellout_order_history: 'Lịch sử đơn hàng bán ra',

      id_col: 'STT',
      order_code_col: 'Mã đơn hàng',
      orderer: 'Người đặt hàng',
      order_date_col: 'Ngày đặt hàng',
      total_col: 'Tổng tiền',
      status_col: 'Trạng thái',
      voucher_code_col: 'Mã voucher',
      total_discount_col: 'Tổng giảm',
      final_cost: 'Thành tiền',

      finish_status: 'Hoàn thành',
      cancelled_status: 'Đơn hàng đã hủy',
      new_status: 'Chờ xác nhận',
      approve_status: 'Đã xác nhận',
      delivered_status: 'Đã giao',
      returned_status: 'Đơn hàng đã bị trả'
    },

    edit_retailer: 'Chỉnh sửa thông tin đại lý',
    retailer_information: 'Thông tin đại lý',
    updated_avatar_successful: 'Cập nhật avatar thành công.',
    updated_avatar_failed: 'Cập nhật avatar thất bại.',
    paused_retailer_successful: 'Tạm dừng thành công.',
    approved_retailer_successful: 'Duyệt thành công.',
    activated_retailer_successful: 'Kích hoạt thành công.',
    update_retailer_successful: 'Cập nhật thông tin đại lý thành công.',
    update_retailer_failed: 'Cập nhật thông tin đại lý thất bại.',
    incorrect_card_id: 'CMND/CCCD không đúng xác định. Vui lòng kiểm tra lại.'
  },

  // Trang danh sách thuộc tính
  attributes: {
    attribute_list: 'Danh sách thuộc tính',

    attribute_type: 'Loại thuộc tính',
    select_attribute_type: 'Chọn loại thuộc tính',
    search_by_attribute_name: 'Tìm kiếm theo giá trị thuộc tính',
    add_attribute_value: 'Thêm giá trị thuộc tính',
    create_attribute_type: 'Tạo mới loại thuộc tính',

    id_col: 'STT',
    attribute_type_col: 'Loại thuộc tính',
    attribute_value_col: 'Giá trị thuộc tính',
    the_number_of_products_col: 'Số lượng sản phẩm',
    status_col: 'Trạng thái',
    action_col: 'Hành động',

    attribute_information: 'Thông tin thuộc tính',
    create_new_attribute: 'Tạo mới thuộc tính',

    status_type: 'Loại trạng thái',
    enter_attribute_value: 'Nhập giá trị thuộc tính',
    attribute_type_name: 'Tên giá trị thuộc tính',
    enter_the_attribute_type_name: 'Nhập tên giá trị thuộc tính',
    attribute_value_list: 'Danh sách giá trị thuộc tính',
    confirm_delete_attribute: 'Bạn có chắc muốn xóa thuộc tính',
    updated_attribute_successful: 'Cập nhật thuộc tính thành công.',
    updated_attribute_failed: 'Cập nhật thuộc tính thất bại. Vui lòng thử lại.',
    create_attribute_successful: 'Tạo thuộc tính thành công.',
    create_attribute_failed: 'Tạo thuộc tính thất bại. Vui lòng thử lại.',
    exists_attribute: 'Thuộc tính đã tồn tại.',
    delete_attribute_successful: 'Xóa thuộc tính thành công.',
    delete_attribute_failed: 'Xóa thuộc tính thất bại. Vui lòng thử lại.',
    create_new_attribute_successful: 'Tạo mới thuộc tính thành công.',
    create_new_attribute_failed:
      'Tạo mới thuộc tính thất bại. Vui lòng thử lại.'
  },

  // Trang danh sách danh mục
  category: {
    product_category: 'Danh mục sản phẩm',
    search_by_category_name: 'Tìm kiếm theo tên danh mục',

    add_category_level: 'Thêm cấp danh mục',
    edit_category: 'Chỉnh sửa danh mục',

    category_level: 'Cấp danh mục',
    select_the_category_level_to_add: 'Chọn cấp danh mục cần thêm',
    category_level_1: 'Danh mục cấp 1',
    select_category_level_1: 'Chọn danh mục cấp 1',
    category_level_2: 'Danh mục cấp 2',
    select_category_level_2: 'Chọn danh mục cấp 2',
    category_level_3: 'Danh mục cấp 3',
    category_name: 'Tên danh mục',
    thumbnail: 'Hình thumbnail',
    upload_image: 'Tải ảnh',
    upload_image_size: 'Tải ảnh lên với tỉ lệ 1:1, dung lượng dưới 1MB',
    upload_image_ratio: 'Tỉ lệ ảnh 1:1 với dung lượng dưới 5MB',

    category: 'Danh mục',
    confirm_delete_category: 'sẽ được xóa',

    create_category_successful: 'Tạo danh mục thành công!',
    create_category_failed: 'Tạo danh mục thất bại. Vui lòng thử lại!',
    update_category_successful: 'Cập nhật danh mục thành công!',
    update_category_failed: 'Cập nhật danh mục thất bại. Vui lòng thử lại!',
    delete_category: 'Xóa danh mục',
    successful: 'thành công!',
    failed: 'thất bại!',
    not_found_lv2: 'Không tìm thấy danh mục cấp 2',
    please_enter_category_name: 'Vui lòng nhập tên danh mục',
    please_enter_category_name_max_36:
      'Vui lòng nhập tên danh mục tối đa 36 ký tự',

    id_col: 'STT',
    product_name: 'Tên sản phẩm',
    sku_number: 'Số lượng SKU'
  },

  // Trang danh sách, tạo, chỉnh sửa, chi tiết sản phẩm
  products: {
    product_list: 'Danh sách sản phẩm',
    search_by_product_name: 'Tìm kiếm theo tên sản phẩm',

    id_col: 'STT',
    sku_code_col: 'Mã SKU',
    version_name_col: 'Tên phiên bản',
    level_1_col: 'Cấp 1',
    level_2_col: 'Cấp 2',
    level_3_col: 'Cấp 3',
    purchase_price_col: 'Giá thu mua',
    sales_price_col: 'Giá bán',
    brick_price_col: 'Giá gạch',
    status_col: 'Trạng thái',
    show_column: 'Hiển thị Columns',

    create_product: 'Tạo sản phẩm',
    detail_product: 'Chi tiết sản phẩm',
    edit_product: 'Chỉnh sửa sản phẩm',
    product_information: 'Thông tin sản phẩm',
    product_name: 'Tên sản phẩm',
    enter_product_name: 'Nhập tên sản phẩm',
    please_enter_product_name: 'Vui lòng nhập tên sản phẩm',
    product_name_must_have_1_100: 'Tên sản phẩm phải có 1 - 100 ký tự',
    attribute: 'Thuộc tính',
    select_attribute: 'Chọn thuộc tính',
    please_select_main_category: 'Vui lòng chọn ngành hàng chính cho sản phẩm',
    category: 'Ngành hàng',
    select_category: 'Chọn ngành hàng',
    sku_information: 'Thông tin SKU',
    add_version: 'Thêm phiên bản',
    sku_code_col: 'Mã SKU',
    sku_name_col: 'Tên SKU',
    purchase_price: 'Giá thu mua',
    sales_price: 'Giá bán',
    brick_price_col: 'Giá gạch',
    small_unit_col: 'Đơn vị nhỏ',
    minimum_purchase_col: 'Mua tối thiểu',
    target_rate: 'Mức tăng',
    status_col: 'Trạng thái',

    create_product_successful: 'Tạo sản phẩm thành công',
    please_check_information_again: 'Vui lòng kiểm tra lại thông tin',
    update_product_successful: 'Chỉnh sửa sản phẩm thành công'
  },

  // tạo, chỉnh sửa SKU
  sku: {
    create_sku: 'Tạo mới SKU',
    edit_sku: 'Chỉnh sửa SKU',
    product_list: 'Danh sách sản phẩm',
    create_product: 'Tạo mới sản phẩm',
    edit_product: 'Chỉnh sửa sản phẩm',
    detail_product: 'Chi tiết sản phẩm',

    info: 'Thông tin',
    sku_status: 'Trạng thái SKU',
    sku_name: 'Tên SKU',
    enter_sku_name: 'Nhập tên SKU',
    please_enter_sku_name: 'Vui lòng nhập tên SKU',
    sku_name_too_long: 'Tên SKU không được vượt quá 100 ký tự',
    sku_code: 'Mã SKU',
    enter_sku_code: 'Nhập mã SKU',
    please_enter_sku_code: 'Vui lòng nhập mã SKU',

    attribute: 'Thuộc tính',
    select_attribute_value: 'Chọn giá trị thuộc tính',
    price: 'Giá',
    please_check_product_price: 'Vui lòng kiểm tra giá sản phẩm',
    purchase_price: 'Giá thu mua',
    enter_purchase_price: 'Nhập giá thu mua',
    sales_price: 'Giá bán',
    enter_sales_price: 'Nhập giá bán',
    brick_price: 'Giá gạch',
    enter_brick_price: 'Nhập giá gạch',
    tooltip_brick_price:
      'Là một giá ảo của sản phẩm, tạo cảm giác được lợi cho người dùng để kích mua. Giá gạch chỉ mang tính chất tượng trưng và không liên quan tới các CTKM. Một sản phẩm có giá gạch vẫn được áp dụng CTKM',

    unit_purchase_level: 'Đơn vị/Mức mua',
    large_unit: 'Đơn vị lớn',
    select_large_unit: 'Chọn đơn vị lớn',
    small_unit: 'Đơn vị nhỏ',
    select_small_unit: 'Chọn đơn vị nhỏ',
    small_unit_conversion_rate: 'Tỉ lệ chuyển đổi đơn vị nhỏ',
    enter_small_unit_conversion_rate: 'Nhập tỉ lệ chuyển đổi đơn vị nhỏ',
    minimum_purchase: 'Mua tối thiểu',
    enter_minimum_purchase: 'Nhập số lượng mua tối thiểu',
    target_rate: 'Mức tăng',
    enter_target_rate: 'Nhập mức tăng',
    description: 'Mô tả',
    please_enter_description: 'Vui lòng nhập mô tả',

    image: 'Hình ảnh',
    image_size: 'Dung lượng ảnh dưới 100KB',

    create_product_successful: 'Tạo phiên bản thành công',
    update_product_failed: 'Chỉnh sửa sản phẩm thất bại. Vui lòng thử lại',
    sku_code_exists: 'Mã SKU đã tồn tại. Vui lòng nhập lại mã khác',
    can_not_inactive_sku:
      'Không thể Ngưng hoạt động SKU vì đang có trong đơn treo. Hãy hoàn thành các đơn có sản phẩm.'
  },

  // Trang danh sách kho hàng
  warehouses: {
    warehouse_list: 'Danh sách kho hàng',
    search_by_warehouse_name: 'Tìm kiếm theo tên kho',

    id_col: 'STT',
    warehouse_code_col: 'Mã kho',
    warehouse_name_col: 'Tên kho',
    warehouse_type_col: 'Loại kho',
    address_col: 'Địa chỉ',
    status_col: 'Trạng thái',

    warehouse_info: 'Thông tin kho hàng',
    create_a_new_warehouse: 'Tạo mới kho hàng',

    enter_warehouse_name: 'Nhập tên kho',
    please_enter_warehouse_name: 'Vui lòng nhập tên kho',
    warehouse_code: 'Mã kho',
    enter_warehouse_code: 'Nhập mã kho',
    please_enter_warehouse_code: 'Vui lòng nhập mã kho',
    exists_warehouse_code: 'đã được sử dụng. Vui lòng nhập mã kho khác.',
    warehouse_type: 'Loại kho',
    province_city: 'Tỉnh/Thành phố',
    select_province_city: 'Chọn Tỉnh/Thành phố',
    district: 'Quận/Huyện',
    select_district: 'Chọn Quận/Huyện',
    ward: 'Phường/Xã',
    select_ward: 'Chọn Phường/Xã',
    address: 'Địa chỉ',
    enter_address: 'Nhập địa chỉ',
    please_enter_address: 'Vui lòng nhập địa chỉ',

    create_failed: 'Tạo kho thất bại. Vượt số lượng giới hạn.',

    enable_warehouses_status: 'Kích hoạt trạng thái kho'
  },

  // Trang danh sách phiếu nhập kho
  stock: {
    warehouse_received: 'Phiếu nhập kho',
    warehouse_received_list: 'Danh sách phiếu nhập kho',

    warehouse: 'Kho',
    select_warehouse: 'Chọn kho',
    search_by_received_code: 'Tìm kiếm theo mã phiếu nhập',

    id_col: 'STT',
    import_time_col: 'Thời gian nhập',
    received_code_col: 'Mã phiếu',
    warehouse_name_col: 'Tên kho',
    staff_in_charge_col: 'Nhân viên phụ trách',
    note_col: 'Ghi chú',
    status_col: 'Trạng thái',

    create_warehouse_received: 'Tạo mới phiếu nhập kho',
    warehouse_received_information: 'Thông tin phiếu nhập kho',
    warehouse_name: 'Tên kho',
    select_warehouse_name: 'Chọn tên kho',
    warehouse_code: 'Mã kho',
    note: 'Ghi chú',
    enter_note: 'Nhập ghi chú',

    imported_product: 'Sản phẩm nhập kho',
    export_template: 'Xuất template',
    import_file: 'Import file',
    product_code_col: 'Mã sản phẩm',
    product_name_col: 'Tên sản phẩm',
    unit_col: 'ĐVT',
    amount_col: 'Số lượng',
    error_col: 'Lỗi',
    add_product: 'Thêm sản phẩm',
    import_error: 'Danh sách sản phẩm import lỗi',

    choose_product: 'Chọn sản phẩm',
    search_product: 'Tìm kiếm sản phẩm',

    choose_file: 'Chọn file tải lên',
    import_successful: 'Import danh sách sản phẩm thành công',
    import_failed:
      'import danh sách sản phẩm thất bại. Vui lòng kiểm tra lại file import',
    not_found: 'No products found',

    please_enter_product_quantity: 'Vui lòng nhập số lượng sản phẩm',

    warehouse_received_detail: 'Chi tiết phiếu nhập',
    import_btn: 'Nhập',

    imported: 'Đã nhập',
    wait_for_import: 'Chờ nhập',
    cancelled: 'Đã hủy',
    imported_products: 'Danh sách sản phẩm nhập kho',

    cancel_successful: 'Hủy thành công',
    cancel_failed: 'Hủy thất bại',
    approve_successful: 'Duyệt thành công',
    approve_failed: 'Duyệt thất bại',

    edit_warehouse_received_title: 'Chỉnh sửa phiếu nhập kho',
    edit_warehouse_received_success: 'Chỉnh sửa phiếu nhập thành công!',
    edit_warehouse_received_fail: 'Chỉnh sửa phiếu nhập thất bại!'
  },

  // Trang lịch sử nhập kho
  import: {
    import_history: 'Lịch sử nhập kho',

    warehouse: 'Kho',
    select_warehouse: 'Chọn kho',
    search_by_product_name: 'Tìm kiếm theo tên sản phẩm',

    id_col: 'STT',
    import_time_col: 'Thời gian nhập',
    product_code_col: 'Mã sản phẩm',
    product_name_col: 'Tên sản phẩm',
    unit_col: 'ĐVT',
    amount_col: 'Số lượng',
    form_code_col: 'Mã phiếu',
    warehouse_name_col: 'Tên kho',
    staff_in_charge_col: 'Nhân viên phụ trách',
    note_col: 'Ghi chú',

    rule_select_date:
      'Vui lòng chọn ngày kết thúc trong khoảng 30 ngày kể từ ngày bắt đầu!'
  },

  export_history: {
    from: 'Từ ngày',
    to: 'Đến ngày',
    search_by_product_name: 'Tìm kiếm theo tên sản phẩm',
    ordinal_number: 'STT',
    export_time: 'Thời gian xuất',
    product_id: 'Mã sản phẩm',
    product_name: 'Tên sản phẩm',
    unit: 'ĐVT',
    amount: 'Số lượng',
    order_id: 'Mã đơn hàng',
    warehouse_name: 'Tên kho',
    warehouse_address: 'Địa chỉ kho',
    staff_in_charge: 'Nhân viên phụ trách',
    note: 'Ghi chú'
  },

  inventory_list: {
    warehouse: 'Kho hàng',
    all: 'Tất cả',
    search_by_product_name: 'Tìm kiếm theo tên sản phẩm',
    ordinal_number: 'STT',
    product_id: 'Mã sản phẩm',
    product_name: 'Tên sản phẩm',
    unit: 'ĐVT',
    inventory_for_the_day: 'Tồn trong ngày',
    import_the_day: 'Nhập trong ngày',
    export_the_day: 'Xuất trong ngày',
    hang_on_the_order: 'Treo trên đơn',
    actual_inventory: 'Tồn thực tế',
    available_inventory: 'Tồn khả dụng',
    // Them
    inventory_history: 'Lịch sử tồn kho',
    inventory_for_the_period: 'Tồn đầu kỳ',
    import_the_period: 'Nhập trong kỳ',
    export_the_period: 'Xuất trong kỳ',
    please_select_an_end_date:
      'Vui lòng chọn ngày kết thúc trong khoảng 30 ngày kể từ ngày bắt đầu!'
  },

  order_list: {
    total_order: 'Tổng số đơn',
    to_pay: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    delivered: 'Đã giao',
    completed: 'Hoàn thành',
    refunded: 'Đã bị trả',
    orders_waiting_cancelled_from_customer:
      'Số đơn Chờ xác nhận bị hủy từ khách hàng',
    orders_waiting_cancelled_by_sold_out:
      'Số đơn Chờ xác nhận bị hủy vì hết hàng',
    orders_waiting_canceled_by_other_reason:
      'Số đơn Chờ xác nhận bị hủy vì lý do khác',
    cancelled_order_confirmed: 'Số đơn Đã xác nhận bị hủy',
    status: 'Trạng thái',
    select_status: 'Chọn trạng thái',
    from: 'Từ ngày',
    to: 'Đến ngày',
    search_by_order_code: 'Tìm kiếm theo mã đơn hàng',
    order_code: 'Mã đơn hàng',
    name_of_customer: 'Tên khách hàng',
    phone_number: 'Số điện thoại',
    order_creation_time: 'Thời gian tạo đơn',
    order_creator: 'Người tạo đơn',
    total_amount: 'Tổng tiền',
    // Them
    order_create: 'Tạo đơn',
    order_print: 'In đơn',
    order_detail: 'Chi tiết đơn hàng',
    order_progress: 'Tiến độ đơn hàng',
    order_information: 'Thông tin đơn hàng',
    name_of_receiver: 'Tên người nhận hàng',
    delivery_address: 'Địa chỉ nhận hàng',
    select_reason: 'Chọn lý do',
    reason_cancel: 'Lý do hủy đơn',
    reason_return: 'Lý do trả hàng',
    enter_reason_cancel: 'Nhập lý do hủy đơn',
    enter_reason_return: 'Nhập lý do trả hàng',
    order_sku: 'SKU đặt mua',
    temporary_total_money: 'Tổng tiền tạm tính',
    total_discount: 'Tổng khuyến mãi',
    delivery_fee: 'Phí vận chuyển',
    vat_fee: 'Thuế VAT',
    total_money: 'TỔNG TIỀN',
    cancel: 'Hủy đơn',
    delivery: 'Giao hàng',
    complete_order: 'Hoàn thành đơn',
    warehouse_return: 'Kho hàng trả về',
    choose_a_warehouse: 'Chọn kho hàng',
    shipment_detail: 'Chi tiết giao hàng',
    delivery_warehouse: 'Kho giao hàng',
    choose_a_delivery_warehouse: 'Chọn kho giao hàng',
    canceled: 'Đã bị hủy',
    unit_price: 'Đơn giá',
    total: 'Tổng cộng',
    product_is_out_of_stock: 'Sản phẩm hết hàng',
    customer_request: 'Khách hàng yêu cầu',
    another_reason: 'Lý do khác',
    all_orders_have_been_delivered: 'Đã giao hết đơn hàng',
    the_order_has_been_returned: 'Đơn đã bị trả hàng',
    inventory_number: 'Số lượng tồn kho',
    order: 'Đơn hàng',
    canceled_successfully: 'được hủy thành công',
    confirmed_successfully: 'được xác nhận thành công',
    not_enough_stock_for_the_order: 'Kho không đủ hàng cho đơn hàng',
    being_delivered: 'đang được giao',
    have_been_delivered: 'đã được giao hết',
    be_returned: 'bị trả lại',
    inventory_number: 'Tồn kho'
  },

  order_create: {
    formality: 'Hình thức',
    group: 'Nhóm',
    buy_from: 'Mua từ',
    order_information: 'Thông tin đơn hàng',
    reward_information: 'Thông tin quà tặng',
    text_notif: {
      list_reward_empty_first: 'Thêm mới sản phẩm vào đơn hàng',
      list_reward_empty_last: 'để được nhận ưu đãi hoặc sản phẩm tặng kèm theo chương trình khuyến mãi',
      product_is_exists: 'Sản phẩm đã tồn tại',
      order_is_empty: 'Tạo đơn hàng thất bại! Vui lòng thêm sản phẩm vào đơn hàng',
      create_order_fail: 'Tạo đơn hàng thất bại',
      create_order_done: 'Tạo đơn hàng thành công!',
    },
    buttons: {
      cancel: 'Từ chối',
      save: 'Xác nhận đơn'
    },
    options: {
      placeholder: {
        enter_retailer_name: 'Nhập tên đại lý',
        enter_retailer_phone: 'Nhập số điện thoại'
      }
    }
  },

  promotions: {
    promotion_title: 'Chương trình khuyến mãi',
    number_of_retailer_promotions_running: 'Số CTKM cho Đại lý đang chạy',
    number_of_user_promotions_running: 'Số CTKM cho Người tiêu dùng đang chạy',
    total_sales_retailer_promotions_running:
      'Tổng doanh số CTKM cho Đại lý đang chạy',
    total_sales_user_promotions_running:
      'Tổng doanh số CTKM cho Người tiêu dùng đang chạy',
    total_discount_retailer_promotion_running:
      'Tổng chiết khấu CTKM cho Đại lý đang chạy',
    total_discount_user_promotion_running:
      'Tổng chiết khấu CTKM cho Người tiêu dùng đang chạy',
    promotions_list: 'Danh sách CTKM',
    from: 'Từ ngày',
    to: 'Đến ngày',
    status: 'Trạng thái',
    select_status: 'Chọn trạng thái',
    to_approval: 'Chờ duyệt',
    approved: 'Đã duyệt',
    pending: 'Tạm hoãn',
    paused: 'Tạm dừng',
    running: 'Đang chạy',
    end: 'Kết thúc',
    cancelled: 'Hủy bỏ',
    search_by_promotion_name_id: 'Tìm bằng mã CTKM, tên CTKM',
    ordinal_number: 'STT',
    promotion_id: 'Mã CTKM',
    promotion_name: 'Tên CTKM',
    early_application_date: 'Ngày áp dụng sớm',
    start_day: 'Ngày bắt đầu',
    end_day: 'Ngày kết thúc',
    subjects_of_application: 'Đối tượng áp dụng',
    condition_type: 'Loại điều kiện',
    bonus_type: 'Loại thưởng',
    show_columns: 'Hiển thị cột',
    select_object: 'Chọn đối tượng',
    consumer: 'Người tiêu dùng',
    retailer: 'Đại lý',
    // Them
    promotion_detail_title: 'Chi tiết CTKM',
    promotion_detail_desc_title: 'Chi tiết mô tả CTKM',
    report: 'Báo cáo',
    update_history: 'Lịch sử cập nhật',
    rerun: 'Chạy lại',
    describe: 'Mô tả',
    see_detail: 'Xem chi tiết',
    area_of_application: 'Vùng áp dụng',
    show_less: 'Hiển thị ít hơn',
    agent_apply: 'Đại lý áp dụng',
    to_v2: 'đến',
    reduce: 'Giảm',
    for_order: '/đơn hàng',
    for_each_order: '/sản phẩm',
    old_early_application_date: 'Ngày áp dụng sớm cũ',
    new_early_application_date: 'Ngày áp dụng sớm mới',
    old_start_date: 'Ngày bắt đầu cũ',
    new_start_date: 'Ngày bắt đầu mới',
    old_end_date: 'Ngày kết thúc cũ',
    new_end_date: 'Ngày kết thúc mới',
    old_status: 'Trạng thái cũ',
    new_status: 'Trạng thái mới',
    note: 'Ghi chú',
    confirm_delete_promotion: 'Bạn có chắc muốn hủy bỏ CTKM này không',
    order_value: 'Giá trị đơn hàng',
    product_giveaway: 'Tặng sản phẩm',
    amount: 'Số lượng',
    please_edit_the_start_date_of_the_promotion:
      'Vui lòng chỉnh sửa ngày bắt đầu của CTKM.',
    promotion_approve_success: 'Duyệt chương trình khuyến mãi thành công.',
    promotion_pending_success: 'Tạm hoãn chương trình khuyến mãi thành công.',
    promotion_rerun_success:
      'Chương trình khuyến mãi được chạy lại thành công.',
    promotion_pause_success: 'Tạm ngưng chương trình khuyến mãi thành công.',
    promotion_end: 'Chương trình khuyến mãi đã kết thúc.',
    promotion_cannot_end: 'Chương trình khuyến mãi không thể kết thúc.',
    report_promotion_retailer_title: 'Báo cáo CTKM cho Đại lý',
    report_promotion_consumer_title: 'Báo cáo CTKM cho Người tiêu dùng',
    report_promotion: 'Báo cáo CTKM',
    sales_information: 'Thông tin doanh số',
    total_sales_completed_order: 'Tổng doanh số đơn hàng hoàn thành',
    total_product_sale: 'Tổng doanh số sản phẩm',
    total_discount: 'Tổng chiết khấu',
    total_amount_gift: 'Tổng số lượng quà tặng',
    cir_index: 'Chỉ số CIR',
    list_of_agent_promotion: 'Danh sách Đại lý tham gia CTKM',
    search_by_retailer_code_name: 'Tìm bằng mã đại lý, tên đại lý',
    retailer_code: 'Mã đại lý',
    retailer_name: 'Tên đại lý',
    sales_order: 'Doanh số ĐH',
    sales_product: 'Doanh số SP',
    total_product: 'Tổng số SP',
    discount: 'Chiết khấu',
    gift: 'Quà tặng',
    category: 'Danh mục',
    enter_amount_money: 'Nhập số tiền',
    enter_ratio: 'Nhập tỉ lệ',
    currency: 'đồng',
    selected_products: 'Sản phẩm đã chọn',
    reduction_money: 'Số tiền giảm',
    percentage_decrease: 'Tỷ lệ phần trăm giảm',
    not_found_product: 'Không tìm thấy sản phẩm.',
    edit_successful_product_groups: 'Chỉnh sửa nhóm sản phẩm thành công',
    please_fill_in_the_information_about_the_reward_limit:
      'Vui lòng điền thông tin xét thưởng hạn mức ',
    before_adding_a_new_limit: ' trước thêm hạn mức mới.',
    please_add_a_limited_product: 'Vui lòng thêm sản phẩm tặng hạn mức ',
    please_enter_the_discount_limit_value:
      'Vui lòng điền giá trị giảm giá hạn mức ',
    please_enter_a_numeric_value: 'Vui lòng nhập giá trị số.',
    promo_code_already_exists: 'Mã chương trình khuyến mãi đã tồn tại.',
    create_a_successful_promotion: 'Tạo chương trình khuyến mãi thành công.',
    edit_promotion_title_for_consumer: 'Chỉnh sửa CTKM cho Người tiêu dùng',
    edit_promotion_title_for_retailer: 'Chỉnh sửa CTKM cho Đại lý',
    edit_promotion: 'Chỉnh sửa CTKM',
    enter_a_note_on_promotion_changes:
      'Nhập ghi chú về thay đổi chương trình khuyến mãi',
    please_check_promotion_information:
      'Vui lòng kiểm tra thông tin chương trình khuyến mãi.',
    edit_promotions_successful: 'Chỉnh sửa chương trình khuyến mãi thành công.',
    edit_promotions_failed: 'Chỉnh sửa chương trình khuyến mãi thất bại.',
    number_of_gift: 'Số quà tặng',
    customer_phone_number: 'SĐT khách hàng',
    detailed_report_of_promotional_offers_for_consumers:
      'Báo cáo chi tiết CTKM cho Người tiêu dùng',
    detailed_report_of_promotional_offers_for_retailers:
      'Báo cáo chi tiết CTKM cho Đại lý',
    detail_report: 'Báo cáo chi tiết',
    detail_report_promotion: 'Báo cáo chi tiết CTKM',
    search_by_order_code: 'Tìm bằng mã đơn hàng',
    choose_an_agent: 'Chọn đại lý'
  },

  promotions_retailer: {
    create_promotion_for_retailer: 'Tạo CTKM cho Đại lý',
    promotion_information: 'Thông tin CTKM',
    condition_apply: 'Điều kiện áp dụng',
    select_condition: 'Chọn điều kiện',
    number_of_products: 'Số lượng sản phẩm',
    product_sales: 'Doanh số sản phẩm',
    order_sales: 'Doanh số sản phẩm',
    bonus_type: 'Loại thưởng',
    select_bonus_type: 'Chọn loại thưởng',
    total_product: 'Tổng sản phẩm',
    depreciation: 'Giảm giá trị',
    percentage_reduction: 'Giảm phần trăm',
    reward_type: 'Loại xét thưởng',
    select_reward_type: 'Chọn loại xét thưởng',
    reward_level: 'Mức xét thưởng',
    reward_range: 'Khoảng xét thưởng',
    start_day: 'Ngày bắt đầu',
    end_day: 'Ngày kết thúc',
    promotion_id: 'Mã CTKM',
    enter_promotion_id: 'Nhập mã CTKM',
    promotion_name: 'Tên CTKM',
    enter_promotion_name: 'Nhập tên CTKM',
    content: 'Nội dung',
    enter_promotion_content: 'Nhập nội dung chương trình khuyến mãi',
    upload_image_ratio:
      'Tải ảnh lên với tỉ lệ ảnh 3.25:1.9, dung lượng dưới 1MB',
    show_banners_to_consumers_or_retailer:
      'Hiện banner với người tiêu dùng hoặc đại lý',
    retailer_area_application_of_the_promotion: 'Đại lý/Vùng áp dụng CTKM',
    appoint: 'Chỉ định',
    select_retailer: 'Chỉ định',
    all: 'Tất cả',
    select_a_geographic_area: 'Chọn vùng địa lý',
    province_city: 'Tỉnh/Thành phố',
    product_portfolio: 'Danh mục sản phẩm',
    add_product_group_to_create_catalog:
      'Thêm nhóm sản phẩm để tạo danh mục sản phẩm áp dụng CTKM',
    add_product_group: 'Thêm nhóm sản phẩm',
    select_product: 'Chọn sản phẩm',
    search_product: 'Tìm kiếm sản phẩm',
    ordinal_number: 'STT',
    product_id: 'Mã sản phẩm',
    product_name: 'Tên sản phẩm',
    selected_product: 'Sẩn phẩm đã chọn',
    constitution: 'Cơ cấu',
    condition_apply: 'Điều kiện áp dụng',
    product_number: 'Điều kiện áp dụng',
    add_a_bonus_limits_to_create_structure:
      'Thêm hạn mức thưởng để tạo cơ cấu khuyến mãi áp dụng cho nhóm sản phẩm',
    limit: 'Hạn mức',
    bonus_level_when_buying_from: 'Mức xét thưởng khi mua từ',
    enter_quantity: 'Nhập số lượng',
    product_group: 'Nhóm sản phẩm',
    product: 'Sản phẩm',
    amount: 'Sản phẩm',
    unit: 'Đơn vị',
    add_a_gift: 'Sản phẩm'
  },

  promotions_end_user: {
    create_promotions_for_endUser: 'Tạo CTKM cho Người tiêu dùng',
    promotion: 'CTKM',
    create_promotion: 'Tạo CTKM',
    continue: 'Tiếp tục',
    promotion_information: 'Thông tin CTKM',
    consumer: 'Người tiêu dùng',
    bonus_type: 'Loại thưởng',
    choose_a_bonus_type: 'Chọn loại thưởng',
    reward_type: 'Loại xét thưởng',
    select_a_reward_type: 'Chọn loại xét thưởng',
    reward_level: 'Mức xét thưởng',
    reward_range: 'Khoảng xét thưởng',
    early_date_of_application: 'Ngày áp dụng sớm',
    early_start_dates: 'Ngày bắt đầu sớm',
    start_date: 'Ngày bắt đầu',
    end_date: 'Ngày kết thúc',
    promotion_id: 'Mã CTKM',
    enter_promotion_id: 'Nhập mã CTKM',
    promotion_name: 'Tên CTKM',
    enter_promotion_name: 'Nhập tên CTKM',
    content: 'Nội dung',
    enter_promotion_content: 'Nhập nội dung chương trình khuyến mãi',
    upload_image_ratio:
      'Tải ảnh lên với tỉ lệ ảnh 3.25:1.9, dung lượng dưới 1MB',
    show_banners_to_consumers_or_retailer:
      'Hiện banner với người tiêu dùng hoặc đại lý',
    where_promotion_applies: 'Nơi áp dụng CTKM',
    select_a_geographic_region: 'Chọn vùng địa lý',
    back: 'Quay lại',
    product_categories_and_quotas_will_be_deleted:
      'Danh mục sản phẩm và hạn mức sẽ bị xóa',
    agree: 'Đồng ý',
    promotion_creation_failed:
      'Tạo chương trình khuyến mãi thất bại. Vui lòng kiểm tra lại thông tin',
    product_categories: 'Danh mục sản phẩm',
    records_per_page: 'Bản ghi trên mỗi trang',
    create_successful_product_groups: 'Tạo nhóm sản phẩm thành công',
    product_description: 'Mô tả sản phẩm ',
    edit_product_group: 'Chỉnh sửa nhóm sản phẩm',
    add_bonus_limits_to_create_structure:
      'Thêm hạn mức thưởng để tạo cơ cấu khuyến mãi áp dụng cho nhóm sản phẩm',
    add_a_bonus_limit: 'Thêm hạn mức thưởng',
    limit: 'Hạn mức',
    approximately_buying_from: 'Khoảng xét thưởng khi mua từ',
    add_a_gift: 'Thêm quà tặng',
    enter_the_quantity: 'Nhập số lượng'
  },

  setting: {
    show_on_apps_and_websites: 'Hiển thị trên ứng dụng và trang web',
    user: 'Người dùng',
    app_name: 'Tên ứng dụng',
    brand_logo: 'Logo thương hiệu',
    app_icons: 'Icon ứng dụng',
    landing_page_background_image: 'Hình nền trang landing page',
    landing_page_first_screen:
      'Landing page là màn hình đầu tiên khi người dùng mở app',
    ratio_image: 'Tỉ lệ hình ảnh 1:2(w:h)',
    click_here_to_upload_photos: 'Bấm vào đây để tải ảnh lên',
    retailer: 'Đại lý',
    show_email_name_notification: 'Hiển thị tên Email thông báo',
    email_name_to_employee: 'Tên email tới nhân viên',
    email_name_to_retailer: 'Tên email tới đại lý',
    enter_display_name: 'Nhập tên hiển thị',
    update_email_name: 'Cập nhật tên Email',
    update_information: 'Cập nhật thông tin',
    enter_app_name: 'Nhập tên ứng dụng ',
    change_image: 'Thay đổi hình ảnh',
    please_enter_name_with_limit_character:
      'Vui lòng nhập tên có độ dài từ 5 đến 64 ký tự',
    update_information_success: 'Cập nhật thông tin thành công',
    update_information_fail: 'Không thể lưu thông tin',
    update_email_success: 'Cập nhật tên Email thành công'
  },

  private_information: {
    private_information: 'Thông tin cá nhân',
    public_information: 'Thông tin chung',
    company_name: 'Tên công ty',
    email: 'Email',
    phone_number: 'Số điện thoại',
    edit_information: 'Chỉnh sửa thông tin',
    please_enter_at_least_3_characters: 'Vui lòng nhập ít nhất 3 ký tự.',
    please_enter_a_valid_phone_number: 'Vui lòng nhập số điện thoại hợp lệ.',
    login_information: 'Thông tin đăng nhập',
    password: 'Mật khẩu',
    change_password: 'Đổi mật khẩu',
    current_password: 'Mật khẩu hiện tại',
    enter_current_password: 'Nhập mật khẩu hiện tại',
    new_password: 'Nhập mật khẩu hiện tại',
    enter_new_password: 'Nhập mật khẩu mới',
    confirm_the_new_password: 'Xác nhận mật khẩu mới',
    Enter_a_new_password: 'Nhập lại mật khẩu mới'
  },

  // Verify Email Page
  verify: {
    confirm_your_email_address: 'Xác nhận địa chỉ email của bạn',
    account_activation_link_has_been_sent:
      'Đường dẫn kích hoạt tài khoản đã được gửi đến địa chỉ email của bạn',
    please_click: 'Vui lòng bấm vào đường dẫn trong mail để tiếp tục.',
    resend: 'Gửi lại',
    back_to_login: 'Trở về trang đăng nhập',
    not_found_email_message: 'Email của bạn  không tồn tại!'
  },
  // Thank you Page
  thankYou: {
    thank_you_for_the_information: 'Cảm ơn bạn đã gửi thông tin',
    please_check_email:
      'Megasop sẽ cập nhật thông tin về tài khoản của bạn chậm nhất sau 1 ngày làm việc. Vui lòng theo dõi và kiểm tra mail thường xuyên.',
    read_information:
      'Trong lúc chờ đợi, bạn có thể đọc các thông tin bổ ích về số hóa chuỗi cung ứng tại',
    contact_number_text: 'Nếu cần hỗ trợ gấp, bạn vui lòng liên hệ số',
    back_to_login: 'Trở về trang đăng nhập'
  },
  // Reset password Page
  resetPassword: {
    change_password_title: 'Thay đổi mật khẩu',
    new_password_different_old_password:
      'Mật khẩu mới của bạn phải khác với mật khẩu cũ mà bạn đã sử dụng.',
    new_password: 'Mật khẩu mới',
    confirm_new_password: 'Xác nhận mật khẩu',
    set_new_password: 'Đặt mật khẩu mới',
    back_to_login: 'Trở về trang đăng nhập',
    more_than_eight_character: 'Vui lòng nhập mật khẩu trên 8 ký tự.',
    please_confirm_password: 'Vui lòng xác nhận mật khẩu.',
    update_password_success: 'Cập nhật mật khẩu thành công.',
    update_password_fail:
      'Cập nhật mật khẩu thất bại. Vui lòng liên hệ Support Team.'
  },

  // Options in promotion
  conditionTypes: {
    1: 'Số lượng sản phẩm',
    2: 'Doanh số sản phẩm',
    3: 'Giá trị đơn hàng'
  },
  rewardTypes: {
    1: 'Tặng sản phẩm',
    2: 'Giảm giá trị',
    3: 'Giảm phần trăm (%)'
  },
  subjectOfApplication: {
    CONSUMER: 'Người tiêu dùng',
    RETAILER: 'Đại lý'
  },
  // Danh sách branch | Get Industries
  industries: {
    1: 'Hàng tiêu dùng nhanh',
    2: 'Mỹ phẩm & làm đẹp',
    3: 'Sản phẩm chăm sóc cá nhân & vệ sinh',
    4: 'Thời trang & phụ kiện',
    5: 'Thực phẩm đóng gói',
    6: 'Hàng nông nghiệp',
    7: 'Điện tử cá nhân',
    8: 'Đồ điện gia dụng',
    9: 'Các thiết bị gia dụng khác',
    10: 'Đồ nội thất',
    11: 'Các ngành khác'
  },
  // Danh sách đơn vị lớn, đơn vị nhỏ || units
  units: {
    1: 'Đôi',
    2: 'Cái',
    3: 'Chai',
    4: 'Hộp',
    5: 'Lọ',
    6: 'Bao',
    7: 'Bịch',
    8: 'Bình',
    9: 'Bộ',
    10: 'Bó',
    11: 'Cặp',
    12: 'Cây',
    13: 'Chiếc',
    14: 'Con',
    15: 'Combo',
    16: 'Củ',
    17: 'Cuộn',
    18: 'Dây',
    19: 'Gói',
    20: 'Hủ',
    21: 'Khay',
    22: 'Lô',
    23: 'Lốc',
    24: 'Mét',
    25: 'Ổ',
    26: 'Ống',
    27: 'Quả',
    28: 'Quyển',
    29: 'SET',
    30: 'Sợi',
    31: 'Thùng',
    32: 'Trái',
    33: 'Túi',
    34: 'Tuýp',
    35: 'Vỉ',
    36: 'Viên'
  },
  // debt
  debt: { ...debt }
}
