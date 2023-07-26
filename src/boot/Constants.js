import { boot } from 'quasar/wrappers'

const Constants = {
  // Authentication
  AUTHENTICATION_EMAIL: 'au_e_m',
  // Retailer
  RETAILER_ID: 'rt_i_pt',
  RETAILER_CODE : 'rt_c_pt',
  // Product
  PRODUCT_ID: 'pd_id',
  PRODUCT_VARIATION_LENGTH: 'pd_dt_vr',
  PRODUCT_VARIATION_ID: 'pd_vr_i',
  PRODUCT_VARIATION_ATTRIBUTES: 'pd_vr_at',
  PRODUCT_INFO: 'pd_cr_pt',
  PRODUCT_BACK_HISTORY: 'pd_a_e_pt',
  PRODUCT_ATTRIBUTE_TYPES: 'pd_at_ty',
  // Warehouse
  WAREHOUSE_IMPORT_TICKET_ID: 'wh_ip_t_i',
  WAREHOUSE_ADD_EDIT_TICKET: 'wh_a_e_t',
  WAREHOUSE_IMPORT_TICKET_ITEMS: 'warehouseImportTicketItems',
  // Promotion
  PROMOTION_ID: 'pm_i_pt',
  PROMOTION_SUBJECT: 'pm_s_pt',
  PROMOTION_SUBJECT_RETAILER: 'pm_s_pt_r',
  PROMOTION_DETAIL: 'pm_s_d',
  PROMOTION_REPORT_DETAIL_RETAILER_ID: 'pm_rp_rt_id',
  PROMOTION_REPORT_DETAIL_SELLOUT_RETAILER_ID: 'pm_rp_oso_rt_id',
  PROMOTION_REPORT_DETAIL_SELLOUT_SELECTED_TAB: 'pm_rp_oso_sl_tb',
  // Category
  CATEGORIES: 'ct_g_l',
  MAIN_CATEGORY: 'mc_g_i',
  // Product Groups
  PRODUCT_GROUPS: 'pd_gr_l',
  PRODUCT_CATEGORY: 'pd_ct_l',
  GROUPS: 'gr_pd_l',
  LEVEL_GROUPS: 'lg_pd_l',
  REWARD_GROUPS: 'rw_gr_l',
  // Rows per page option
  ROW_PER_PAGE_OPTIONS: [10, 20, 50],
  //Account
  PACKAGE_AND_PAYMENT: "pk_a_p",
  COMPANY_INFORMATION: "co_if",

  //FIREBASE
  FCM_VAPIDKEY:
    'BKnjbUY8A9FIUSnn5_fgVLrQeUi0Onbk9TzD0eUpe_Seyht3A7QgI84Ow8BMEumdr0DTAYrxVElSs69GhybjKxA',

  //
  IS_MEGASOP_STAFF: 'is_mgs_s'

};

export default boot(({ app }) => {
  app.config.globalProperties.$Constants = Constants
})

export { Constants }
