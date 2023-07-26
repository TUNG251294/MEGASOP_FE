import { Constants } from 'src/boot/Constants'

const routes = [
  {
    path: '/maintenance',
    name: 'maintenance',
    component: () => import('pages/Maintenance.vue'),
    meta: { removeKey: true }
  },
  {
    path: '/',
    component: () => import('pages/Login.vue'),
    meta: { removeKey: true }
  },
  {
    path: '/forgot-password',
    component: () => import('pages/ForgotPassword.vue')
  },
  {
    path: '/register',
    component: () => import('pages/Register.vue')
  },
  {
    path: '/verify-email',
    component: () => import('pages/VerifyEmail.vue')
  },
  {
    path: '/activate-account',
    component: () => import('pages/ActivateAccount.vue')
  },
  {
    path: '/thank-you',
    component: () => import('pages/RegisterVerifyEmail.vue')
  },
  {
    path: '/reset-password/:key',
    component: () => import('pages/ResetPassword.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('pages/Dashboard.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true,
          breadcrumbs: [
            { text: 'menu.operational_dashboard', active: true }
          ]
        }
      },
      // Setting
      {
        path: 'setting',
        component: () => import('pages/Setting.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true,
          breadcrumbs: [
            { text: 'menu.setting', active: true }
          ]
        }
      },

      {
        path: 'account',
        component: () => import('pages/Account.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true,
          breadcrumbs: [
            { text: 'menu.account', active: true }
          ]
        }
      },
      {
        path: 'account-info',
        component: () => import('pages/AccountInformation.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true,
          breadcrumbs: [
            { text: 'personal.personal_info', active: true }
          ]
         }
      },
      {
        path: 'account-setting',
        component: () => import('pages/AccountSetting.vue'),
        meta: { 
          requireLogin: true,
          breadcrumbs: [
            { text: 'menu.account', to: 'account', active: false },
            { text: 'menu.setting', active: true },
          ] 
        }
      },
      {
        path: 'bill-address-setting',
        component: () => import('pages/BillAddressSetting.vue'),
        meta: { 
          requireLogin: true,
          breadcrumbs: [
            { text: 'menu.account', to: 'account', active: false },
          ]
        }
      },
      // { path: "plan-pricing", component: () => import("pages/PlanPricing.vue"), meta: { requireLogin: true, removeKey: true } },
      {
        path: 'retailers',
        component: () => import('pages/Retailers.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true,
          breadcrumbs: [
            {text: 'menu.retailer_list', active: true}
          ]
        }
      },
      {
        path: 'retailer-detail',
        component: () => import('pages/RetailersDetails.vue'),
        meta: {
          requireLogin: true,
          backpropagation: true,
          back: '/retailers',
          key: Constants.RETAILER_ID,
          breadcrumbs: [
            {text: 'retailers.retailer_list', to: 'reailers', active: true},
            {text: 'retailers.retailer_details', active: true},
          ]
        }
      },
      {
        path: 'salesmen',
        component: () => import('pages/Salesmen.vue'),
        meta: { requireLogin: true, removeKey: true }
      },
      // Products Management
      {
        path: 'products',
        component: () => import('pages/Products.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true,
          breadcrumbs: [
            {text: 'menu.list_of_product', active: true}
          ]
        }
      },
      {
        path: 'product-detail',
        component: () => import('pages/ProductDetail.vue'),
        meta: {
          requireLogin: true,
          backpropagation: true,
          back: '/products',
          key: Constants.PRODUCT_ID,
          breadcrumbs: [
            {text: 'products.product_list', to: 'products', active:false},
            {text: 'products.detail_product', active:true}
          ]
        }
      },
      {
        path: 'product-create',
        component: () => import('pages/ProductCreate.vue'),
        meta: { 
          requireLogin: true,
          breadcrumbs: [
            {text: 'products.product_list', to: 'products', active:false},
            {text: 'sku.create_product', active:true}
          ]
         }
      },
      {
        path: 'product-edit',
        component: () => import('pages/ProductEdit.vue'),
        meta: {
          requireLogin: true,
          backpropagation: true,
          back: '/products',
          key: Constants.PRODUCT_ID,
          breadcrumbs: [
            {text: 'products.product_list', to: 'products', active:false},
            {text: 'products.detail_product', to: 'product-detail', active:true},
            {text: 'products.edit_product', active:true}
          ]
        }
      },
      {
        path: 'product-attributes',
        component: () => import('pages/ProductAttributes.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true,
          breadcrumbs: [
            {text: 'menu.attribute_list', active: true}
          ]
        }
      },
      {
        path: 'product-category',
        component: () => import('pages/ProductCategory.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true,
          breadcrumbs: [
            {text: 'menu.product_portfolio', active: true}
          ]
        }
      },
      // SKU Management
      {
        path: 'sku-create',
        component: () => import('pages/ProductSkuCreate.vue'),
        meta: {
          requireLogin: true,
          backpropagation: true,
          back: '/products',
          key: Constants.PRODUCT_BACK_HISTORY,
          breadcrumbs: [
            {text: 'products.product_list', to: 'products', active:false},
            {text: 'sku.create_product', to: 'product-create', active:true},
            {text: 'sku.create_sku', active:true}
          ]
        }
      },
      {
        path: 'sku-edit',
        component: () => import('pages/ProductSkuEdit.vue'),
        meta: {
          requireLogin: true,
          backpropagation: true,
          back: '/products',
          key: Constants.PRODUCT_VARIATION_ID,
          breadcrumbs: [
            {text: 'products.product_list', to: 'products', active:false},
            {text: 'products.detail_product', to: 'product-detail', active:true},
            {text: 'products.edit_product', to: 'product-edit', active:true},
            {text: 'sku.edit_sku', active:true}
          ]
        }
      },
      // Warehouse Management
      {
        path: 'warehouses',
        component: () => import('pages/Warehouses.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true,
          breadcrumbs: [
            {text: 'menu.list_of_warehouses', active: true}
          ]
        }
      },
      {
        path: 'warehouse-receipt',
        component: () => import('pages/WarehouseReceipt.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true,
          breadcrumbs: [
            {text: 'menu.warehouse_received', active: true}
          ]
        }
      },
      {
        path: 'warehouse-receipt-create',
        component: () => import('pages/WarehouseReceiptCreate.vue'),
        meta: {
          requireLogin: true,
          backpropagation: false,
          back: '/warehouse-receipt',
          key: Constants.WAREHOUSE_ADD_EDIT_TICKET,
          removeDeterminedKey: false,
          determinedKey: ['WAREHOUSE_IMPORT_TICKET_ITEMS'],
          breadcrumbs: [
            {text: 'stock.warehouse_received', to: 'warehouse-receipt', active: false},
            {text: 'stock.create_warehouse_received', active: true}
          ]
        }
      },
      {
        path: 'warehouse-receipt-detail',
        component: () => import('pages/WarehouseReceiptDetail.vue'),
        meta: {
          requireLogin: true,
          backpropagation: true,
          back: '/warehouse-receipt',
          key: Constants.WAREHOUSE_IMPORT_TICKET_ID,
          breadcrumbs: [
            {text: 'stock.warehouse_received', to: 'warehouse-receipt', active: false},
            {text: 'stock.warehouse_received_detail', active: true}
          ]
        }
      },
      {
        path: 'warehouse-receipt-edit',
        component: () => import('pages/WarehouseReceiptEdit.vue'),
        meta: {
          requireLogin: true,
          requireAdmin: true,
          backpropagation: true,
          back: '/warehouse-receipt-detail',
          key: Constants.WAREHOUSE_IMPORT_TICKET_ID,
          removeDeterminedKey: true,
          determinedKey: ['WAREHOUSE_IMPORT_TICKET_ITEMS'],
          breadcrumbs: [
            {text: 'stock.warehouse_received', to: 'warehouse-receipt', active: false},
            {text: 'stock.edit_warehouse_received_title', active: true}
          ]
        }
      },
      {
        path: 'warehouse-export-history',
        component: () => import('pages/WarehouseExportHistory.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true,
          breadcrumbs: [
            {text: 'menu.export_history', active: true}
          ]
        }
      },
      {
        path: 'warehouse-import-history',
        component: () => import('pages/WarehouseImportHistory.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true,
          breadcrumbs: [
            {text: 'menu.import_history', active: true}
          ] 
        }
      },
      {
        path: 'warehouse-inventory',
        component: () => import('pages/WarehouseInventory.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true,
          breadcrumbs: [
            {text: 'menu.inventory_list', active: true}
          ] 
        }
      },
      {
        path: 'warehouse-inventory-history',
        component: () => import('pages/WarehouseInventoryHistory.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true, 
          breadcrumbs: [
            {text: 'menu.inventory_list', to: 'warehouse-inventory', active: true},
            {text: 'inventory_list.inventory_history', active: true}
          ]
        }
      },
      // Orders Management
      {
        path: 'orders',
        component: () => import('pages/Orders.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true,
          breadcrumbs: [
            { text: 'menu.order_list', active: true }
          ]
        }
      },
      {
        path: 'order-create',
        component: () => import('pages/OrderCreate.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true,
          breadcrumbs: [
            { text: 'menu.order_list', to: 'orders', active: false },
            { text: 'order_list.order_create', active: true }
          ]
        }
      },

      // Promotions Management
      {
        path: 'promotions',
        component: () => import('pages/Promotions.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true,
          breadcrumbs: [
            {text: 'menu.promotions', active: true}
          ]
        }
      },
      {
        path: 'consumer-promotion-create',
        component: () => import('pages/ConsumerPromotionCreate.vue'),
        meta: {
          requireLogin: true,
          backpropagation: true,
          back: '/promotions',
          key: Constants.PROMOTION_SUBJECT,
          removeDeterminedKey: true,
          determinedKey: [
            'PRODUCT_GROUPS',
            'PRODUCT_CATEGORY',
            'GROUPS',
            'LEVEL_GROUPS'
          ],
          breadcrumbs: [
            {text: 'promotions_end_user.promotion', to: 'promotions', active: false},
            {text: 'promotions_end_user.create_promotion', active: true},
          ]
        }
      },
      {
        path: 'consumer-promotion-report',
        component: () => import('pages/ConsumerPromotionReport.vue'),
        meta: {
          requireLogin: true,
          backpropagation: true,
          back: '/promotion-detail',
          key: Constants.PROMOTION_SUBJECT,
          breadcrumbs: [
            {text: 'promotions_end_user.promotion', to: 'promotions', active: false},
            {text: 'promotions.promotion_detail_title', to: 'promotion-detail', active: false},
            {text: 'promotions.report_promotion', active: true},
          ]
        }
      },
      {
        path: 'consumer-promotion-report-detail',
        component: () => import('pages/ConsumerPromotionReportDetail.vue'),
        meta: { requireLogin: true }
      },
      {
        path: 'consumer-promotion-edit',
        component: () => import('pages/ConsumerPromotionEdit.vue'),
        meta: {
          requireLogin: true,
          backpropagation: true,
          back: '/promotion-detail',
          key: Constants.PROMOTION_SUBJECT,
          breadcrumbs: [
            {text: 'promotions_end_user.promotion', to: 'promotions', active: false},
            {text: 'promotions.edit_promotion', active: true},
          ]
        }
      },
      {
        path: 'retailer-promotion-create',
        component: () => import('pages/RetailerPromotionCreate.vue'),
        meta: {
          requireLogin: true,
          backpropagation: true,
          back: '/promotions',
          key: Constants.PROMOTION_SUBJECT_RETAILER,
          removeDeterminedKey: true,
          determinedKey: [
            'PRODUCT_GROUPS',
            'PRODUCT_CATEGORY',
            'GROUPS',
            'LEVEL_GROUPS'
          ],
          breadcrumbs: [
            {text: 'promotions_end_user.promotion', to: 'promotions', active: false},
            {text: 'promotions_end_user.create_promotion', active: true},
          ]
        }
      },
      {
        path: 'retailer-promotion-report',
        component: () => import('pages/RetailerPromotionReport.vue'),
        meta: {
          requireLogin: true,
          backpropagation: true,
          back: '/promotion-detail',
          key: Constants.PROMOTION_SUBJECT_RETAILER,
          breadcrumbs: [
            {text: 'promotions.promotion_title', to: 'promotions', active: false},
            {text: 'promotions.promotion_detail_title', to: 'promotion-detail', active: false},
            {text: 'promotions.report_promotion', active: true},
          ]
        }
      },
      {
        path: 'retailer-promotion-report-detail',
        component: () => import('pages/RetailerPromotionReportDetail.vue'),
        meta: { 
          requireLogin: true,
          breadcrumbs: [
            {text: 'promotions.promotion_title', to: 'promotions', active: false},
            {text: 'promotions.promotion_detail_title', to: 'promotion-detail', active: false},
            {text: 'promotions.report_promotion', active: true},
          ]
        }
      },
      {
        path: 'retailer-promotion-edit',
        component: () => import('pages/RetailerPromotionEdit.vue'),
        meta: {
          requireLogin: true,
          backpropagation: true,
          back: '/promotion-detail',
          key: Constants.PROMOTION_SUBJECT_RETAILER,
          breadcrumbs: [
            {text: 'menu.promotions', to: 'promotions', active: false},
            {text: 'promotions.edit_promotion', active: true},
          ]
        }
      },
      {
        path: 'promotion-detail',
        component: () => import('pages/PromotionDetail.vue'),
        meta: {
          requireLogin: true,
          backpropagation: true,
          back: '/promotions',
          key: Constants.PROMOTION_ID,
          breadcrumbs: [
            {text: 'menu.promotions', to: 'promotions', active: false},
            {text: 'promotions.promotion_detail_title', active: true},
          ]
        }
      },
      // Staff Management
      {
        path: 'staffs',
        component: () => import('pages/Staffs.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true, 
          requireAdmin: true,
          breadcrumbs: [
            {text: 'menu.list_of_employee', active: true}
          ]
        }
      },
      // Debt Management
      {
        path: 'debt',
        component: () => import('pages/Debt.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true, 
          requireAdmin: true,
          breadcrumbs: [
            {text: 'debt.menu.debt_list', active: true}
          ]
        }
      },
      {
        path: 'debt-orders',
        component: () => import('pages/DebtOrder.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true, 
          requireAdmin: true,
          breadcrumbs: [
            {text: 'debt.menu.debt_orders', active: true}
          ]
        }
      },
      {
        path: 'debt-payment-transactions',
        component: () => import('src/pages/DebtPaymentTransaction.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true, 
          requireAdmin: true,
          breadcrumbs: [
            {text: 'debt.menu.payment_transactions', active: true}
          ]
        }
      },
      {
        path: 'debt-adjustments',
        component: () => import('pages/DebtAdjustment.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true, 
          requireAdmin: true,
          breadcrumbs: [
            {text: 'debt.menu.debt_adjustments_long', active: true}
          ]
        }
      },
      {
        path: 'debt-book-closure',
        component: () => import('pages/DebtBookClosure.vue'),
        meta: { 
          requireLogin: true, 
          removeKey: true, 
          requireAdmin: true,
          breadcrumbs: [
            {text: 'debt.menu.debt_book_closure', active: true}
          ]
        }
      },
      {
        path: 'debt-history-book-closure',
        component: () => import('pages/DebtHistoryBookClosure.vue'),
        // meta: { requireLogin: true }
        meta: { 
          requireLogin: true, 
          removeKey: true, 
          requireAdmin: true,
          breadcrumbs: [
            {text: 'debt.menu.debt_book_closure', to: 'debt-book-closure', active: false},
            {text: 'debt.menu.debt_history_book_closure', active: true}
          ]
        }
      }
    ]
  },
  {
    path: '/403',
    name: '403',
    component: () => import('pages/Error403.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
