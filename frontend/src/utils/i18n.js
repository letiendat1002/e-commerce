import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          // here we will place our translations...
          sidebar: {
            title: 'Admin',
            title2: 'Dashboard',
            title3: 'Manage',
            title4: 'Product',
            title5: 'Manage Users',
            title6: 'Manage Category',
            title7: 'Manage Orders',
            title8: 'Manage Products',
          },
          dashboard: {
            title1: 'Analytics Dashboard',
            item_right1: 'TOTAL EARNINGS',
            item_right2: 'ORDERS',
            item_right3: 'CUSTOMERS',
            item_right4: 'MY BALANCE',
            item_right_footer: 'Since last week',
          },
        },
      },
      vi: {
        translation: {
          // here we will place our translations...
          sidebar: {
            title: 'Trang Quản Trị',
            title2: 'Bảng Điều Khiển',
            title3: 'Quản Lý',
            title4: 'Sản Phẩm',
            title5: 'Quản Lý Người Dùng',
            title6: 'Quản Lý Danh Mục',
            title7: 'Quản Lý Đặt Hàng',
          },
          dashboard: {
            title1: 'Bảng Điều Khiển Phân Tích',
            item_right1: 'Tổng Thu Nhập',
            item_right2: 'Đơn Hàng',
            item_right3: 'Khác Hàng',
            item_right4: 'Chí Phí',
            item_right_footer: 'Kể từ tuần trước',
          },
        },
      },
    },
  });

export default i18n;
