import debt from './debt'
export default {
  head: {
    brand: 'Megasop',
    title: 'Supply Chain Digital Transformation Solutions for Enterprises'
  },
  // Header
  header: {
    personal_info: 'Personal Information',
    logout: 'Logout',

    manager: 'Manager',
    employee: 'Employee',

    user_manual: 'MEGASOP user manual'
  },

  // Trang Login
  login: {
    welcome: 'Welcome to MEGASOP!',
    login_to_start: 'Please login to start using the platform',
    email: 'Email',
    please_enter_email: 'Please enter email',
    email_is_not_valid: 'Email address is not valid!',
    password: 'Password',
    please_enter_password: 'Please enter password',
    forgot_password: 'Forgot password?',
    remember_password: 'Remember password',
    login: 'Login',
    do_not_have_password: 'Do not have an account?',
    create_acc: 'Create account',
    double_check_info: 'Please double check your input!',
    login_failed: 'Login failed. Please double check your input!'
  },

  // Trang quên mật khẩu
  forgot_pass: {
    forgot_password: 'Forgot password?',
    introduce:
      'Enter your email address and we will send you password reset instructions.',
    email: 'Email',
    please_enter_email: 'Please enter email',
    email_incorrect: 'Email is incorrect. Please check again!',
    email_exists: 'Your email does not exist!',
    sent: 'Sent',
    back: 'Back to login page'
  },

  // Trang đăng ký
  register: {
    personal: 'Personal',
    company_representative: 'Company representative',
    company: 'Company',
    details_and_scale: 'Details and scale',
    personal_info: 'Personal Information',
    full_name: 'Full name',
    enter_full_name: 'Enter full name',
    country: 'Country',
    phone: 'Phone',
    enter_phone: 'Enter phone',
    email: 'Email',
    enter_email: 'Enter email',
    submit: 'By submitting this form, I agree to the',
    terms: 'Terms',
    conditions: 'Conditions',
    ipi: 'of MEGASOP',
    login: 'Login',
    continue: 'Continue',
    back: 'Back',
    sent: 'Sent',

    company_info: 'Company information',
    contact_and_login: 'Contact and login',
    company_name: 'Company name',
    enter_company_name: 'Enter company name',
    company_website_address: 'Company website address',
    branch: 'Branch',
    select_branch: 'Select branch',
    email_login: 'Email * (Used to log in to the system)',
    scale_organizations: 'Scale organizations',
    average_order: 'Average number of orders per day',
    number_of_salesman: 'Number of salesman',
    number_of_distributors: 'Number of Distributors',
    number_of_retailers: 'Number of Retailers',
    please_enter_a_valid_website_address:
      'Please enter a valid website address',
    please_enter_at_least_3_characters: 'Please enter at least 3 characters',
    please_enter_at_least_5_characters: 'Please enter at least 5 characters',
    please_enter_a_valid_email: 'Please enter a valid email',
    please_enter_no_more_than_50_characters:
      'Please enter no more than 50 characters',
    please_do_not_use_special_characters:
      'Please do not use special characters',
    please_enter_a_number_greater_than_1_and_less_than_9991000:
      'Please enter a number greater than 1 and less than 999,999',
    please_enter_a_valid_phone_number: 'Please enter a valid phone number',
    please_select_a_career: 'Please select a branch',
    registered: 'has been existed'
  },

  // Trang thông tin cá nhân
  personal: {
    personal_info: 'Personal Information',
    general_info: 'General information',
    change_password: 'Change password',
    login_info: 'Login information',
    company_name: 'Company name',
    full_name: 'Full name',
    email: 'Email',
    phone: 'Phone',
    password: 'Password',

    edit_info: 'Edit information',
    please_enter_at_least_3_characters: 'Please enter at least 3 characters',
    please_enter_only_50_characters_at_most:
      'Please enter only 50 characters at most',
    please_do_not_use_special_characters:
      'Please do not use special characters',
    please_enter_a_valid_phone_number: 'Please enter a valid phone number',
    current_password: 'Current password',
    enter_current_password: 'Enter current password',
    new_password: 'New password',
    enter_new_password: 'Enter new password',
    confirm_new_password: 'Confirm new password',
    enter_confirm_new_password: 'Enter confirm new password',
    password_incorrect: 'The password entered is incorrect. Please re-enter',
    please_enter_at_least_8_characters: 'Please enter at least 8 characters',
    please_enter_only_32_characters_at_most:
      'Please enter only 32 characters at most',
    correct_password:
      'Password must contain lowercase letters, uppercase letters and numbers',
    confirm_password_incorrect:
      'Confirmed password is not correct, please check again',
    update_successful: 'Successfully updated personal information',
    update_failed: 'Update of personal information failed',
    update_password_successful: 'Password update successful',
    old_password_is_incorrect: 'Old password is incorrect',

    update_avatar_successfully: 'Update avatar successfully',
    avatar_update_failed: 'Avatar update failed'
  },

  // Left menu
  menu: {
    account: 'Account',
    operational_dashboard: 'Operational Dashboard',
    list_of_employee: 'Employee Manager',
    retailer_list: 'Retailer List',
    attribute_list: 'Attribute List',
    product_portfolio: 'Product Portfolio',
    list_of_product: 'List of Product',
    list_of_warehouses: 'List of Warehouses',
    warehouse_received: 'List of Warehouse Received',
    import_history: 'Import History',
    export_history: 'Export History',
    inventory_list: 'Inventory Report',
    order_list: 'Order Manager',
    promotions: 'Promotion Manager',
    setting: 'Setting',
    language: 'Language',

    // Accordion
    warehouse_management: 'Warehouse Manager',
    product_management: 'Product Manager',
    retailer_management: 'Retailer Manager',
    debt_management: 'Debt Manager',

    toggle_title: 'Auto hide',
    expand_button: 'Open',
    collapse_button: 'Close',
  },

  // Dùng chung toàn cục
  general: {
    create: 'Create',
    edit: 'Edit',
    updated: 'Updated',
    save: 'Save',
    cancel: 'Cancel',
    cancelled: 'Cancelled',
    agree: 'Agree',
    completed: 'Completed',
    running: 'Running',
    closed: 'Close',
    confirmed: 'Confirm',
    no_data: 'No data',
    status: 'Status',
    select_status: 'Select status',
    waiting_for_approval: 'Waiting for approval',
    active: 'Active',
    inactive: 'Inactive',
    from_date: 'From',
    to_date: 'To',
    approve: 'Approve',
    pause: 'Pause',
    activated: 'Activated',
    back: 'Back',
    show_more: 'Show more',
    show_less: 'Show less',
    no_results: 'No results',
    rows_per_page: 'Rows per page',
    required_value: 'Required fields cannot be left blank',
    invalid_value: 'Invalid information field',
    reject: 'Reject',
    auto_allocate: 'Auto allocate',
    create_payment: 'Create payment',
    cancel_payment: 'Cancel payment',
    checking: 'Checking',
    waiting_for_confirm: 'Waiting for comfirmation'
  },

  // Trang Tài khoản
  account: {
    company_profile_bill: 'Company Profile and Bill',
    company_profile: 'Company Profile',
    package_and_payment: 'Package and payment',

    representative_profile: 'Representative Profile',
    full_name: 'Full Name',
    country: 'Country',
    phone_number: 'Phone Number',
    personal_email: 'Personal Email',

    company_name: 'Company Name',
    website: 'Website',
    career: 'Career',
    email_login: 'Email (login)',
    retailer_link: 'Retailer Link',
    user_link: 'User Link',
    language: 'Language',

    organization_size: 'Organization size',
    monthly_order: 'Monthly Order',
    number_of_salesman: 'Number of Salesman',
    number_of_distributors: 'Number of Distributors',
    number_of_retailers: 'Number of Retailers',
    organization_size_information: 'Organization size information',

    please_enter_at_least_3_characters: 'Please enter at least 3 characters',
    please_enter_a_valid_phone_number: 'Please enter a valid phone number',
    please_enter_a_valid_email: 'Please enter a valid email',
    please_enter_no_more_than_50_characters:
      'Please enter no more than 50 characters',
    please_enter_at_least_5_characters: 'Please enter at least 5 characters',
    please_do_not_use_special_characters:
      'Please do not use special characters',
    please_enter_a_valid_website_address:
      'Please enter a valid website address',
    please_select_a_career: 'Please select a profession',
    please_enter_a_number_greater_than_1_and_less_than_9991000:
      'Please enter a number greater than 1 and less than 999,999',

    successfully_updated_representative_information:
      'Successfully updated Representative information',
    unable_to_save_representative_information:
      'Unable to save Representative information',
    successfully_updated_company_information:
      'Successfully updated Company information',
    unable_to_save_company_information: 'Unable to save Company information',
    successfully_updated_organization_size_:
      'Successfully updated Organization size ',
    unable_to_save_organization_size: 'Unable to save Organization size'

    // FMCG: "FMCG",
    // cosmetic: "Cosmetic",
    // personal_care: "Personal Care",
    // fashion_accessories: "Fashion Accessories",
    // packaged_food: "Packaged food",
    // agricultural_goods: "Agricultural goods",
    // personal_electronics: "Personal electronics",
    // home_electric: "Home electric",
    // other_household_appliances: "Other household appliances",
    // furniture: "Furniture",
    // other_branch: "Other Branch",
  },

  // Trang Dashboard
  dashboard: {
    operational_dashboard: 'Operational Dashboard',

    statistical: 'Statistical',
    sales_statistical: 'Sales',
    order_statistical: 'Order',
    average_sales_statistical: 'Average Sales',
    retailer_order_statistical: 'Retailer Order',

    marketable_product: 'Marketable Product',
    sold: 'Sold',
    inventory: 'Inventory',

    need_to_import_inventory: 'Need to import inventory',
    create_a_stock_received_docket: 'Create',
    make_order: 'Order',
    need: 'Need',

    message_no_data: 'Please provide information for data to be displayed',

    order: 'Order',
    to_pay: 'Waiting for confirm',
    to_ship: 'Waiting for delivery',
    returned: 'Returned',
    cancelled: 'Cancelled',
    completed: 'Completed',
    confirmed: 'Confirmed',

    retailer_promotion: 'Retailer Promotion',
    user_promotion: 'User Promotion',

    running_promotion: 'Running',
    discount_promotion: 'Discount',
    order_promotion: 'Order',
    gift_promotion: 'Gift',

    order_status: 'Order status',
    average_order_processing_time: 'Average order processing time',
    minute: '(Minute)',
    minuteTooltip: 'minute'
  },

  // Trang Danh sách nhân viên
  employee: {
    list: {
      employee_list: 'Employee List',
      search_by_name: 'Search by name',

      ordinal_number: 'Ordinal number',
      full_name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      status: 'Status',
      action: 'Action',
      records_per_page: 'Records per page',

      edit_tooltip: 'Edit',
      reset_password_tooltip: 'Reset password',
      lock_acc: 'Lock account',
      unlock_acc: 'Unlock account',

      confirm_reset_password: 'Are you sure want to reset the password for',
      confirm_lock_acc: 'Are you sure want to lock account of',
      confirm_unlock_acc: 'Are you sure want to unlock account for',

      reset_password_notification: 'Update password for',
      lock_acc_notification: 'Lock account for',
      unlock_acc_notification: 'Unlock account for',
      successfully: 'successfully',
      failed: 'failed'
    },
    create: {
      create_a_employee: 'Create a employee',
      edit_employee: 'Edit employee',

      full_name: 'Full Name',
      enter_employee_name: 'Enter Employee name',
      please_enter_the_full_name: 'Please enter the full name',
      email: 'Email',
      enter_the_email: 'Enter the email',
      please_enter_the_email: 'Please enter the email',
      phone_number: 'Phone number',
      enter_the_phone_number: 'Enter the phone number',
      please_enter_the_phone_number: 'Please enter the phone number',
      address: 'Address',
      enter_address: 'Enter Address',
      please_enter_the_address: 'Please enter the address',
      choose_your_avatar: 'Choose your avatar',
      select_a_picture: 'Select a Picture',

      create_successful: 'Successful',
      exist_email: 'has been used. Please enter another email',
      exceeded_the_limit: 'Failed. Exceeded the limit',
      update_successful: 'Successful',
      update_failed: 'Failed. Please try again'
    }
  },

  // Trang danh sách đại lý
  retailers: {
    retailer_list: 'Retailer List',
    total_retailer: 'Total Retailer',
    inactive: 'Inactive',
    active: 'Active',
    waiting_for_approval: 'Waiting for approval',
    number_of_retailer_with_orders_per_day:
      'Number of retailer with orders per day',
    number_of_retailers_with_first_order:
      'Number of Retailers with first order',

    province_city: 'Province/City',
    select_province_city: 'Select Province/City',
    search_by_name: 'Search by name',
    add_retailer: 'Add Retailer',
    export_excel: 'Export excel',

    retailer_name_col: 'Retailer name',
    retailer_code_col: 'Retailer code',
    create_date_col: 'Create date',
    phone_col: 'Phone',
    city_col: 'City',
    order_sellin_col: 'Order sellin',
    order_value_sellin_col: 'Order value sellin',
    order_sellout_col: 'Order sellout',
    order_value_sellout_col: 'Order value sellout',
    status_col: 'Status',

    create_a_new_retailer: 'Create a new retailer',
    retailer_name: 'Retailer name',
    enter_retailer_name: 'Enter retailer name',
    please_enter_retailer_name: 'Please enter retailer name',
    bod: 'BOD',
    agent: 'Agent',
    enter_agent_name: 'Enter agent name',
    please_enter_agent_name: 'Please enter agent name',
    id_card: 'ID card',
    enter_id_card: 'Enter ID card',
    please_enter_9_numbers_or_12_numbers:
      'Please enter 9 numbers or 12 numbers',
    email: 'Email',
    enter_email: 'Enter email',
    please_enter_email: 'Please enter email',
    incorrect_email: 'Email is incorrect. Please check again',
    phone_log_in: 'Phone (Log in)',
    phone_number: 'Phone number',
    enter_phone_number: 'Enter phone number',
    please_enter_phone_number: 'Please enter phone number',
    incorrect_phone: 'Phone is incorrect. Please check again',
    address: 'Address',
    enter_address: 'Enter Address',
    please_enter_address: 'Please enter address',
    district: 'District',
    select_district: 'Select District',
    ward: 'Ward',
    select_ward: 'Select Ward',
    select_avatar: 'Select Avatar',
    select_picture: 'Select Picture',

    create_successful: 'Successful',
    exists_email: 'has been used. Please enter another email',
    exists_phone: 'has been used. Please enter another phone number',
    exceeded_the_limit: 'Failed. Exceeded the limit',
    update_successful: 'Successful',
    update_failed: 'Failed. Please try again',

    retailer_details: 'Retailer Details',
    details: {
      detail: 'Details',
      retailer_name: 'Retailer name',
      retailer_code: 'Retailer code',
      bod: 'BOD',
      create_date: 'Create date',
      status: 'Status',
      agent: 'Agent',
      card_id: 'Card ID',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      ward: 'Ward',
      district: 'District',
      city: 'City',

      invoice_information: 'Invoice Information',
      payment_agent_name: 'Payment retailer name',
      enter_payment_agent_name: 'Enter payment retailer name',
      address_invoice: 'Payment address',
      enter_address_invoice: 'Enter payment address',
      tax_code: 'Tax code',
      enter_tax_code: 'Enter tax code',
      phone_invoice: 'Phone',
      enter_phone_invoice: 'Enter phone number',
      bank_invoice: 'Bank',
      bank_invoice_name: 'Bank name',
      enter_bank_invoice_name: 'Enter bank name',
      branch_invoice: 'Branch',
      bank_branch_invoice: 'Bank branch',
      enter_bank_branch_invoice: 'Enter bank branch',
      bank_account_number: 'Bank account number',
      enter_bank_account_number: 'Enter bank account number',
      bank_account_name: 'Bank account name',
      enter_bank_account_name: 'Enter bank account name',

      general: 'General',
      sellin: 'Sellin',
      sellout: 'Sellout',
      number_of_sellin_orders: 'Number of sellin orders',
      sellin_value: 'Sellin value',
      date_order: 'Number of days/order',
      average_order_value: 'Average order value',
      number_of_orders_sold: 'Number of orders sold',
      sellout_value: 'Sellout value',
      usage_voucher_quantity: 'Number of vouchers used',
      total_value_usage_voucher: 'Total value of voucher used',

      sales_sellin_info: 'Information on sellin sales',
      sellin_order_history: 'Sellin order history',
      sales_sellout_info: 'Information on sellout sales',
      sellout_order_history: 'Sellout order history',

      id_col: '#ID',
      order_code_col: 'Order code',
      orderer: 'Orderer',
      order_date_col: 'Order date',
      total_col: 'Total',
      status_col: 'Status',
      voucher_code_col: 'Voucher code',
      total_discount_col: 'Total discount',
      final_cost: 'Final cost',

      finish_status: 'Completed',
      cancelled_status: 'Cancelled',
      new_status: 'Wait for confirmation',
      approve_status: 'Confirmed',
      delivered_status: 'Delivered',
      returned_status: 'Returned'
    },

    edit_retailer: 'Edit retailer information',
    retailer_information: 'Retailer Information',
    updated_avatar_successful: 'Updated avatar successful',
    updated_avatar_failed: 'Updated avatar failed',
    paused_retailer_successful: 'Paused successful',
    approved_retailer_successful: 'Approved successful',
    activated_retailer_successful: 'Activated successful',
    update_retailer_successful: 'Updated retailer successful',
    update_retailer_failed: 'Updated retailer failed',
    incorrect_card_id: 'Card ID is incorrect. Please check again'
  },

  // Trang danh sách thuộc tính
  attributes: {
    attribute_list: 'Attribute List',

    attribute_type: 'Attribute type',
    select_attribute_type: 'Select attribute type',
    search_by_attribute_name: 'Search by attribute value',
    add_attribute_value: 'Add attribute value',
    create_attribute_type: 'Create attribute type',

    id_col: '#ID',
    attribute_type_col: 'Attribute type',
    attribute_value_col: 'Attribute value',
    the_number_of_products_col: 'Number of products',
    status_col: 'Status',
    action_col: 'Action',

    attribute_information: 'Attribute Information',
    create_new_attribute: 'Create new attribute',

    status_type: 'Status type',
    enter_attribute_value: 'Enter attribute value',
    attribute_type_name: 'Attribute type name',
    enter_the_attribute_type_name: 'Enter attribute type name',
    attribute_value_list: 'Attribute value list',
    confirm_delete_attribute: 'Are you sure want to delete',
    updated_attribute_successful: 'Updated attribute successful',
    updated_attribute_failed: 'Updated attribute failed. Please try again',
    create_attribute_successful: 'Create attribute successful',
    create_attribute_failed: 'Create attribute failed. Please try again',
    exists_attribute: 'Attribute already exists',
    delete_attribute_successful: 'Delete attribute successful',
    delete_attribute_failed: 'Delete attribute failed. Please try again',
    create_new_attribute_successful: 'Create new attribute successful',
    create_new_attribute_failed: 'Create new attribute failed. Please try again'
  },

  // Trang danh sách danh mục
  category: {
    product_category: 'Product Category',
    search_by_category_name: 'Search by category name',

    add_category_level: 'Add category level',
    edit_category: 'Edit category',

    category_level: 'Category level',
    select_the_category_level_to_add: 'Select the category level to add',
    category_level_1: 'Category level 1',
    select_category_level_1: 'Select category level 1',
    category_level_2: 'Category level 2',
    select_category_level_2: 'Select category level 2',
    category_level_3: 'Category level 3',
    category_name: 'Category name',
    thumbnail: 'Thumbnail',
    upload_image: 'Upload image',
    upload_image_size: 'Upload image sale 1:1 is less than 1MB',
    upload_image_ratio: 'Image aspect ratio 1:1 with a capacity of 5MB',
    category: 'Category',
    confirm_delete_category: 'will be deleted',

    create_category_successful: 'Create category successful',
    create_category_failed: 'Create category failed. Please try again',
    update_category_successful: 'Update category successful',
    update_category_failed: 'Update category failed. Please try again',
    delete_category: 'Delete category',
    successful: 'successful',
    failed: 'failed',
    not_found_lv2: '2nd level category not found',
    please_enter_category_name: 'Please enter category name',
    please_enter_category_name_max_36:
      'Please enter category name up to 36 characters',

    id_col: '#ID',
    product_name: 'Product name',
    sku_number: 'SKU number'
  },

  // Trang danh sách, tạo, chỉnh sửa, chi tiết sản phẩm
  products: {
    product_list: 'Product List',
    search_by_product_name: 'Search by product name',

    id_col: '#ID',
    sku_code_col: 'SKU code',
    version_name_col: 'Version name',
    level_1_col: 'Level 1',
    level_2_col: 'Level 2',
    level_3_col: 'Level 3',
    purchase_price_col: 'Purchase price',
    sales_price_col: 'Sales price',
    brick_price_col: 'Brick price',
    status_col: 'Status',
    show_column: 'Show column',

    create_product: 'Create product',
    detail_product: 'Detail product',
    edit_product: 'Edit product',
    product_information: 'Product information',
    product_name: 'Product name',
    enter_product_name: 'Enter product name',
    please_enter_product_name: 'Please enter product name',
    product_name_must_have_1_100: 'Product name must have 1 - 100 characters',
    attribute: 'Attribute',
    select_attribute: 'Select attribute',
    please_select_main_category:
      'Please select the main category for the product',
    category: 'Category',
    select_category: 'Select category',
    sku_information: 'SKU information',
    add_version: 'Add version',
    sku_code_col: 'SKU code',
    sku_name_col: 'SKU name',
    purchase_price: 'Purchase price',
    sales_price: 'Sales price',
    brick_price_col: 'Brick price',
    small_unit_col: 'Small unit',
    minimum_purchase_col: 'Minimum purchase',
    target_rate: 'Target rate',
    status_col: 'Status',

    create_product_successful: 'Create product successful',
    please_check_information_again: 'Please check information again',
    update_product_successful: 'Update product successful'
  },

  // tạo, chỉnh sửa SKU
  sku: {
    create_sku: 'Create SKU',
    edit_sku: 'Edit SKU',
    product_list: 'Product List',
    create_product: 'Create product',
    edit_product: 'Edit product',
    detail_product: 'Detail product',

    info: 'Information',
    sku_status: 'SKU status',
    sku_name: 'SKU name',
    enter_sku_name: 'Enter SKU name',
    please_enter_sku_name: 'Please enter SKU name',
    sku_name_too_long: 'SKU name is too long. Please change the SKU name',
    sku_code: 'SKU code',
    enter_sku_code: 'Enter SKU code',
    please_enter_sku_code: 'Please enter SKU code',

    attribute: 'Attribute',
    select_attribute_value: 'Select attribute value',
    price: 'Price',
    please_check_product_price: 'Please check product price',
    purchase_price: 'Purchase price',
    enter_purchase_price: 'Enter purchase price',
    sales_price: 'Sales price',
    enter_sales_price: 'Enter sales price',
    brick_price: 'Brick price',
    enter_brick_price: 'Enter brick price',
    tooltip_brick_price:
      'As a virtual price of the product, creating a sense of benefit for users to click to buy. Tile prices are for representational purposes only and are not related to promotions. A product with a brick price still applies the promotion',

    unit_purchase_level: 'Unit/Purchase level',
    large_unit: 'Large unit',
    select_large_unit: 'Select large unit',
    small_unit: 'Small unit',
    select_small_unit: 'Select small unit',
    small_unit_conversion_rate: 'Small unit conversion rate',
    enter_small_unit_conversion_rate: 'Enter small unit conversion rate',
    minimum_purchase: 'Minimum purchase',
    enter_minimum_purchase: 'Enter minimum purchase',
    target_rate: 'Target rate',
    enter_target_rate: 'Enter target rate',
    description: 'Description',
    please_enter_description: 'Please enter description',

    image: 'Image',
    image_size: 'Image size less than 100KB',

    create_product_successful: 'Create product successful',
    update_product_failed: 'Update product failed. Please try again',
    sku_code_exists: 'SKU code already exists, please choose another one',
    can_not_inactive_sku:
      'SKU cannot be deactivated because it is on suspension. Please complete product orders.'
  },

  // Trang danh sách kho hàng
  warehouses: {
    warehouse_list: 'Warehouse List',
    search_by_warehouse_name: 'Search by warehouse name',

    id_col: '#ID',
    warehouse_code_col: 'Warehouse code',
    warehouse_name_col: 'Warehouse name',
    warehouse_type_col: 'Warehouse type',
    address_col: 'Address',
    status_col: 'Status',

    warehouse_info: 'Warehouses Information',
    create_a_new_warehouse: 'Create a new warehouse',

    enter_warehouse_name: 'Enter warehouse name',
    please_enter_warehouse_name: 'Please enter warehouse name',
    warehouse_code: 'Warehouse code',
    enter_warehouse_code: 'Enter warehouse code',
    please_enter_warehouse_code: 'Please enter warehouse code',
    exists_warehouse_code: 'has been used. Please enter another code',
    warehouse_type: 'Warehouse type',
    province_city: 'Province/City',
    select_province_city: 'Select Province/City',
    district: 'District',
    select_district: 'Select District',
    ward: 'Ward',
    select_ward: 'Select Ward',
    address: 'Address',
    enter_address: 'Enter address',
    please_enter_address: 'Please enter address',

    create_failed: 'Warehouse creation failed. Exceeded the limit',

    enable_warehouses_status: 'Enable warehouse status'
  },

  // Trang danh sách phiếu nhập kho
  stock: {
    warehouse_received: 'Warehouse received',
    warehouse_received_list: 'Warehouse received list',

    warehouse: 'Warehouse',
    select_warehouse: 'Select warehouse',
    search_by_received_code: 'Search by received code',

    id_col: '#ID',
    import_time_col: 'Import time',
    received_code_col: 'Received code',
    warehouse_name_col: 'Warehouse name',
    staff_in_charge_col: 'Staff in charge',
    note_col: 'Note',
    status_col: 'Status',

    create_warehouse_received: 'Create warehouse received',
    warehouse_received_information: 'Warehouse received information',
    warehouse_name: 'Warehouse name',
    select_warehouse_name: 'Select warehouse name',
    warehouse_code: 'Warehouse code',
    note: 'Note',
    enter_note: 'Enter note',

    imported_product: 'Imported product',
    export_template: 'Export template',
    import_file: 'Import file',
    product_code_col: 'Product code',
    product_name_col: 'Product name',
    unit_col: 'Unit',
    amount_col: 'Amount',
    error_col: 'Error',
    add_product: 'Add product',
    import_error: 'List of products imported with errors',

    choose_product: 'Choose product',
    search_product: 'Search product',

    choose_file: 'Choose file to upload',
    import_successful: 'Import successful',
    import_failed: 'Import failed. Please check file import',
    not_found: 'No products found',

    please_enter_product_quantity: 'Please enter product quantity',

    warehouse_received_detail: 'Warehouse received detail',
    import_btn: 'Import',

    imported: 'Imported',
    wait_for_import: 'Wait for import',
    cancelled: 'cancelled',
    imported_products: 'Imported products',

    cancel_successful: 'Cancel successful',
    cancel_failed: 'Cancel failed',
    approve_successful: 'Approve successful',
    approve_failed: 'Approve failed',

    edit_warehouse_received_title: 'Edit warehouse received',
    edit_warehouse_received_success:
      'The edit warehouse received a successful!',
    edit_warehouse_received_fail: 'The warehouse received edit failed!'
  },

  // Trang lịch sử nhập kho
  import: {
    import_history: 'Import History',

    warehouse: 'Warehouse',
    select_warehouse: 'Select warehouse',
    search_by_product_name: 'Search by product name',

    id_col: '#ID',
    import_time_col: 'Import time',
    product_code_col: 'Product code',
    product_name_col: 'Product name',
    unit_col: 'Unit',
    amount_col: 'Amount',
    form_code_col: 'Form code',
    warehouse_name_col: 'Warehouse name',
    staff_in_charge_col: 'Staff in charge',
    note_col: 'Note',

    rule_select_date:
      'Please select an end date within 30 days from the start date'
  },

  export_history: {
    from: 'From',
    to: 'To',
    search_by_product_name: 'Search by product name',
    ordinal_number: 'Ordinal number',
    export_time: 'Export time',
    product_id: 'Product ID',
    product_name: 'Product name',
    unit: 'Unit',
    amount: 'Amount',
    order_id: 'Order ID',
    warehouse_name: 'Warehouse name',
    warehouse_address: 'Warehouse address',
    staff_in_charge: 'Staff in charge',
    note: 'Note'
  },

  inventory_list: {
    warehouse: 'Warehouse',
    all: 'all',
    search_by_product_name: 'Search by product name',
    ordinal_number: 'Ordinal number',
    product_id: 'Product ID',
    product_name: 'Product name',
    unit: 'Unit',
    inventory_for_the_day: 'Inventory for the day',
    import_the_day: 'Import the day',
    export_the_day: 'Export the day',
    hang_on_the_order: 'Hang on the order',
    actual_inventory: 'Actual inventory',
    available_inventory: 'Available inventory',
    // Them
    inventory_history: 'Inventory history',
    inventory_for_the_period: 'Inventory for the period',
    import_the_period: 'Import the period',
    export_the_period: 'Export the period',
    please_select_an_end_date:
      'Please select an end date within 30 days of the start date!'
  },

  order_list: {
    total_order: 'Total order',
    to_pay: 'To pay',
    confirmed: 'Confirmed',
    delivered: 'Delivered',
    completed: 'Completed',
    refunded: 'Refunded',
    orders_waiting_cancelled_from_customer:
      'Number of orders waiting for confirmation to be cancelled from customers',
    orders_waiting_cancelled_by_sold_out:
      'Number of orders waiting for confirmation cancelled because out of stock',
    orders_waiting_canceled_by_other_reason:
      'Number of orders waiting for confirmation cancelled for other reasons',
    cancelled_order_confirmed: 'Canceled confirmed order number',
    status: 'Status',
    select_status: 'Select Status',
    from: 'From',
    to: 'To',
    search_by_order_code: 'Search by order code',
    order_code: 'Order code',
    name_of_customer: 'Name of customer',
    phone_number: 'Phone number',
    order_creation_time: 'Order creation time',
    order_creator: 'Order creator',
    total_amount: 'Total amount',
    // Them
    order_create: 'Create order',
    order_print: 'Print order',
    order_detail: 'Order details',
    order_progress: 'Order progress',
    order_information: 'Order Information',
    name_of_receiver: 'Name of consignee',
    delivery_address: 'Delivery address',
    select_reason: 'Select the reason',
    reason_cancel: 'Reason for cancellation',
    reason_return: 'Reason for return',
    enter_reason_cancel: 'Enter the reason for the cancellation',
    enter_reason_return: 'Enter the reason for the return',
    order_sku: 'Order SKUs',
    temporary_total_money: 'Temporary total money',
    total_discount: 'Total promotion',
    delivery_fee: 'Delivery fee',
    vat_fee: 'VAT fee',
    total_money: 'TOTAL CASH',
    cancel: 'Cancel',
    delivery: 'Delivery',
    complete_order: 'Complete the order',
    warehouse_return: 'Warehouse returns',
    choose_a_warehouse: 'Choose a warehouse',
    shipment_detail: 'Shipment Details',
    delivery_warehouse: 'Delivery warehouse',
    choose_a_delivery_warehouse: 'Choose a delivery warehouse',
    canceled: 'Canceled',
    unit_price: 'Unit price',
    total: 'total',
    product_is_out_of_stock: 'Product is out of stock',
    customer_request: 'Customer request',
    another_reason: 'Another reason',
    all_orders_have_been_delivered: 'Orders have been delivered',
    the_order_has_been_returned: 'The order has been returned',
    inventory_number: 'Inventory number',
    order: 'Order',
    canceled_successfully: 'canceled successfully',
    confirmed_successfully: 'successfully confirmed',
    not_enough_stock_for_the_order: 'Not enough stock for the order',
    being_delivered: 'being delivered',
    have_been_delivered: 'have been delivered',
    be_returned: 'Returned',
    inventory_number: 'Inventory'
  },

  order_create: {
    formality: 'Formality',
    group: 'Group',
    buy_from: 'Buy from',
    order_information: 'Order information',
    reward_information: 'Gift information',
    text_notif: {
      list_reward_empty_first: 'Add a new product to your order',
      list_reward_empty_last: 'to receive a promotion or a product that comes with a promotion',
      product_is_exists: 'Product already exists',
      order_is_empty: 'Order creation failed! Please add products to your order',
      create_order_fail: 'Order creation failed!',
      create_order_done: 'Order creation successful!',
    },
    buttons: {
      cancel: 'Cancel',
      save: 'Save'
    },
    options: {
      placeholder: {
        enter_retailer_name: 'Enter reatiler name',
        enter_retailer_phone: 'Enter phone number'
      }
    }
  },

  promotions: {
    promotion_title: 'Promotions',
    number_of_retailer_promotions_running:
      'Number of Retailer Promotions running',
    number_of_user_promotions_running: 'Number of User Promotions running',
    total_sales_retailer_promotions_running:
      'Total sales Retailer promotions running',
    total_sales_user_promotions_running: 'Total sales User promotions running',
    total_discount_retailer_promotion_running:
      'Total discount Retailer promotion running',
    total_discount_user_promotion_running:
      'Total discount User promotion running',
    promotions_list: 'Promotions List',
    from: 'From',
    to: 'To',
    status: 'Status',
    select_status: 'Select Status',
    to_approval: 'To approval',
    approved: 'Approved',
    pending: 'Pending',
    paused: 'Paused',
    running: 'Running',
    end: 'End',
    cancelled: 'Cancelled',
    search_by_promotion_name_id: 'Search by promotion name, promotion id',
    ordinal_number: 'Ordinal number',
    promotion_id: 'Promotion ID',
    promotion_name: 'Promotion name',
    early_application_date: 'Early application date',
    start_day: 'Start day',
    end_day: 'End day',
    subjects_of_application: 'Subject of application',
    condition_type: 'Condition type',
    bonus_type: 'Bonus type',
    status: 'Status',
    show_columns: 'Show Columns',
    select_object: 'Select Object',
    consumer: 'Consumer',
    retailer: 'Retailer',
    // Them
    promotion_detail_title: 'Promotion details',
    promotion_detail_desc_title: 'Detailed description of the promotion',
    report: 'Report',
    update_history: 'Update history',
    rerun: 'Run again',
    describe: 'Description',
    see_detail: 'See details',
    area_of_application: 'Area of application',
    show_less: 'Show less',
    agent_apply: 'Agents apply',
    to_v2: 'to',
    reduce: 'Reduce',
    for_order: 'for order',
    for_each_order: 'for each product',
    old_early_application_date: 'Old early application date',
    new_early_application_date: 'New early application date',
    old_start_date: 'Old start date',
    new_start_date: 'New start date',
    old_end_date: 'Old end date',
    new_end_date: 'New end date',
    old_status: 'Old status',
    new_status: 'New status',
    note: 'Note',
    confirm_delete_promotion: 'Are you sure you want to cancel this promotion',
    order_value: 'Order value',
    product_giveaway: 'Product giveaway',
    amount: 'Amount',
    please_edit_the_start_date_of_the_promotion:
      'Please edit the promotion start date.',
    promotion_approve_success: 'Approve successful promotions.',
    promotion_pending_success: 'Postponing successful promotions.',
    promotion_rerun_success: 'The promotion was successfully re-run.',
    promotion_pause_success: 'Suspend successful promotion.',
    promotion_end: 'Promotion has ended.',
    promotion_cannot_end: 'Promotion cannot end.',
    report_promotion_retailer_title: 'Report Promotions to Retailers',
    report_promotion_consumer_title: 'Report Promotions to Consumers',
    report_promotion: 'Report Promotions',
    sales_information: 'Sales information',
    total_sales_completed_order: 'Total sales of completed orders',
    total_product_sale: 'Total product sales',
    total_discount: 'Total discount',
    total_amount_gift: 'Total amount of gifts',
    cir_index: 'CIR Index',
    list_of_agent_promotion: 'List of Agents participating in Promotions',
    search_by_retailer_code_name: 'Search by retailer code, retailer name',
    retailer_code: 'Retailer code',
    retailer_name: 'Retailer name',
    sales_order: 'Sales of orders',
    sales_product: 'Sales of products',
    total_product: 'Total products',
    discount: 'Discount',
    gift: 'Gift',
    category: 'Category',
    enter_amount_money: 'Enter amount',
    enter_ratio: 'Enter the ratio',
    currency: 'đ',
    selected_products: 'Selected product',
    reduction_money: 'Amount reduced',
    percentage_decrease: 'Percentage decrease',
    not_found_product: 'No products found.',
    edit_successful_product_groups: 'Edit product group successfully',
    please_fill_in_the_information_about_the_reward_limit:
      'Please fill in the information about the reward limit ',
    before_adding_a_new_limit: ' before adding a new limit.',
    please_add_a_limited_product: 'Please add a limited product ',
    please_enter_the_discount_limit_value:
      'Please enter the discount limit value ',
    please_enter_a_numeric_value: 'Please enter a numeric value.',
    promo_code_already_exists: 'Promo code already exists.',
    create_a_successful_promotion: 'Create a successful promotion.',
    edit_promotion_title_for_consumer: 'Edit Promotion for Consumers',
    edit_promotion_title_for_retailer: 'Edit Promotion for Retailers',
    edit_promotion: 'Edit promotion',
    enter_a_note_on_promotion_changes: 'Enter a note on promotion changes',
    please_check_promotion_information: 'Please check promotion information.',
    edit_promotions_successful: 'Edit successful promotions.',
    edit_promotions_failed: 'Edit failed promotions.',
    number_of_gift: 'Number of gifts',
    customer_phone_number: 'Customer phone number',
    detailed_report_of_promotional_offers_for_consumers:
      'Detailed report of promotional offers for consumers',
    detailed_report_of_promotional_offers_for_retailers:
      'Detailed report of sales promotion to retailers',
    detail_report: 'Detailed report',
    detail_report_promotion: 'Detailed report of promotion',
    search_by_order_code: 'Search by order code',
    choose_an_agent: 'Choose an agent'
  },

  promotions_retailer: {
    create_promotion_for_retailer: 'Create Promotion for retailer',
    promotion_information: 'Promotion information',
    condition_apply: 'Condition apply',
    select_condition: 'Select condition',
    number_of_products: 'Number of products',
    product_sales: 'Product sales',
    order_sales: 'Order sales',
    bonus_type: 'Bonus type',
    select_bonus_type: 'Select bonus type',
    total_product: 'Total product',
    depreciation: 'depreciation',
    percentage_reduction: 'Percentage reduction',
    reward_type: 'Reward type',
    select_reward_type: 'Select reward type',
    reward_level: 'Reward level',
    reward_range: 'Reward range',
    start_day: 'Start day',
    end_day: 'End day',
    promotion_id: 'Promotion id',
    enter_promotion_id: 'Enter promotion id',
    promotion_name: 'Promotion name',
    enter_promotion_name: 'Enter promotion name',
    content: 'Content',
    enter_promotion_content: 'Enter promotion content',
    upload_image_ratio: 'Upload photos 3,25:1.9 aspect ratio less than 1MB',
    show_banners_to_consumers_or_retailer:
      'Show banners to consumers or retailer',
    retailer_area_application_of_the_promotion:
      'Retailer/Area application of the promotion',
    appoint: 'Appoint',
    select_retailer: 'Select retailer',
    all: 'All',
    select_a_geographic_area: 'Select a geographic area',
    province_city: 'Province/City',
    product_portfolio: 'Product portfolio',
    add_product_group_to_create_catalog:
      'Add a product group to create a product catalog that applies promotion',
    add_product_group: 'Add product group',
    select_product: 'Select product',
    search_product: 'Search product',
    ordinal_number: 'Ordinal number',
    product_id: 'Product ID',
    product_name: 'Product name',
    selected_product: 'Selected product',
    constitution: 'Constitution',
    condition_apply: 'Condition apply',
    product_number: 'Product number',
    add_a_bonus_limits_to_create_structure:
      'Add a bonus limit to create a promotion structure that applies to product groups',
    limit: 'Limit',
    bonus_level_when_buying_from: 'Bonus level when buying from',
    enter_quantity: 'Enter quantity',
    product_group: 'Product group',
    product: 'Product',
    amount: 'Amount',
    unit: 'Unit',
    add_a_gift: 'Add a gift'
  },

  promotions_end_user: {
    create_promotions_for_endUser: 'Create Promotions for EndUser',
    promotion: 'Promotion',
    create_promotion: 'Create Promotion',
    continue: 'Continue',
    promotion_information: 'Promotion information',
    consumer: 'Consumer',
    bonus_type: 'Bonus type',
    choose_a_bonus_type: 'Choose a bonus type',
    reward_type: 'Reward type',
    select_a_reward_type: 'Select a reward type',
    reward_level: 'Reward level',
    reward_range: 'Reward range',
    early_date_of_application: 'Early date of application',
    early_start_dates: 'Early start dates',
    start_date: 'Start date',
    end_date: 'End date',
    enter_promotion_content: 'Enter promotion content',
    show_banners_to_consumers_or_retailer:
      'Show banners to consumers or retailer',
    where_promotion_applies: 'Where promotion applies',
    select_a_geographic_region: 'Select a geographic region',
    back: 'back',
    product_categories_and_quotas_will_be_deleted:
      'Product categories and quotas will be deleted',
    agree: 'Agree',
    promotion_creation_failed:
      'Promotion creation failed. Please double check the information',
    product_categories: 'Product Categories',
    records_per_page: 'Records per page',
    create_successful_product_groups: 'Create successful product groups',
    product_description: 'Product Description',
    edit_product_group: 'Edit product group',
    add_bonus_limits_to_create_structure:
      'Add bonus limits to create a promotion structure that applies to product groups',
    add_a_bonus_limit: 'Add a bonus limit',
    limit: 'Limit',
    approximately_buying_from: 'Approximately buying from',
    add_a_gift: 'Add a gift',
    enter_the_quantity: 'Enter the quantity'
  },

  setting: {
    show_on_apps_and_websites: 'Show on apps and websites',
    user: 'User',
    app_name: 'App name',
    brand_logo: 'Brand logo',
    app_icons: 'App icons',
    landing_page_background_image: 'Landing page background image',
    landing_page_first_screen:
      'Landing page is the first screen when the user opens the app',
    ratio_image: 'Image scale is 1:2(w:h)',
    click_here_to_upload_photos: 'Click here to upload photos',
    retailer: 'Retailer',
    show_email_name_notification: 'Show email name notification',
    email_name_to_employee: 'Email name to employee',
    email_name_to_retailer: 'Email name to retailer',
    enter_display_name: 'Enter display name',
    update_email_name: 'Update email name',
    update_information: 'Update information',
    enter_app_name: 'Enter app name ',
    change_image: 'Change image',
    please_enter_name_with_limit_character:
      'Please enter a name between 5 and 64 characters in length',
    update_information_success: 'Information updated successful',
    update_information_fail: 'Unable to save information',
    update_email_success: 'Email updated successful'
  },

  private_information: {
    private_information: 'Private information',
    public_information: 'Public information',
    company_name: 'Company name',
    email: 'Email',
    phone_number: 'Phone number',
    edit_information: 'Edit information',
    please_enter_at_least_3_characters: 'Please enter at least 3 characters',
    please_enter_a_valid_phone_number: 'Please enter a valid phone number',
    login_information: 'Login information',
    password: 'Password',
    change_password: 'Change password',
    current_password: 'Current password',
    enter_current_password: 'Enter current password',
    new_password: 'New password',
    enter_new_password: 'Enter new password',
    confirm_the_new_password: 'Confirm the new password',
    Enter_a_new_password: 'Enter a new password'
  },

  // Verify Email Page
  verify: {
    confirm_your_email_address: 'Confirm your email address',
    account_activation_link_has_been_sent:
      'Account activation link has been sent to your email address',
    please_click: 'Please click on the link in the email to continue.',
    resend: 'Resend',
    back_to_login: 'Back to login page',
    not_found_email_message: 'Your email does not exist!'
  },
  // Thank you Page
  thankYou: {
    thank_you_for_the_information: 'Thank you for the information',
    please_check_email:
      'Megasop will update your account information within 1 working day at the latest. Please follow up and check your email regularly.',
    read_information:
      'In the meantime, you can read useful information about supply chain digitization at',
    contact_number_text: 'If you need help, please contact',
    back_to_login: 'Back to login page'
  },

  // Reset password Page
  resetPassword: {
    change_password_title: 'Change Password',
    new_password_different_old_password:
      'Your new password must be different from the old password you used.',
    new_password: 'New password',
    confirm_new_password: 'Confirm password',
    set_new_password: 'Set a new password',
    back_to_login: 'Back to login page',
    more_than_eight_character:
      'Please enter a password of more than 8 characters.',
    please_confirm_password: 'Please confirm the password.',
    update_password_success: 'Password update successful.',
    update_password_fail: 'Password update failed. Please contact Support Team.'
  },

  // Options in promotion
  conditionTypes: {
    1: 'Number of products',
    2: 'Product sales',
    3: 'Order value'
  },
  rewardTypes: {
    1: 'Product giveaway',
    2: 'Decrease in value',
    3: 'Percentage reduction (%)'
  },
  subjectOfApplication: {
    CONSUMER: 'Consumer',
    RETAILER: 'Retailer'
  },
  // Danh sách branch | Get Industries
  industries: {
    1: 'Fast Moving Consumer Goods',
    2: 'Cosmetic beauty',
    3: 'Personal care & hygiene products',
    4: 'Fashion & accessories',
    5: 'Packaged food',
    6: 'Agricultural goods',
    7: 'Personal electronics',
    8: 'Home electric',
    9: 'Other household appliances',
    10: 'Furniture',
    11: 'Other industries'
  },
  // Danh sách đơn vị lớn, đơn vị nhỏ || units
  units: {
    1: 'Pair',
    2: 'Peace',
    3: 'Bottle',
    4: 'Carton',
    5: 'Jar',
    6: 'Bag',
    7: 'Bag',
    8: 'Jug',
    9: 'Set',
    10: 'Bundle',
    11: 'Pair',
    12: 'UNY',
    13: 'Peace',
    14: 'Subunit',
    15: 'Combo',
    16: 'UNU',
    17: 'Roll',
    18: 'Line',
    19: 'Pack',
    20: 'Jar',
    21: 'Tray',
    22: 'Batch',
    23: 'Batch',
    24: 'Meter',
    25: 'Loaf',
    26: 'Tube',
    27: 'UNQ',
    28: 'UNB',
    29: 'SET',
    30: 'Yarns',
    31: 'Tank',
    32: 'UNQ',
    33: 'Bag',
    34: 'UNA',
    35: 'Tray',
    36: 'Peace'
  },
  // debt
  debt: { ...debt }
}
