import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
            title3: 'Overview',
            title4: 'Product',
            title5: 'Manage Users',
            title6: 'Manage Category',
            title7: 'Manage Orders',
            title8: 'Manage Products',
          },
          dashboard: {
            title1: 'Analytics Dashboard',
            item_right1: 'EARNINGS',
            item_right2: 'ORDERS',
            item_right3: 'CUSTOMERS',
            item_right4: 'PRODUCTS',
            item_right_footer: 'Since last week',
            item_title1: 'Statistics Of Orders By Year',
            item_title2: 'Statistics Of Orders By Quarter',
            item_title3: 'Statistical Orders By Month',
            item_title4: 'Display For Year',
            item_title5: 'Display For Month',
            item_title6: 'Display For Quater',
            item_title7: 'Month',
            item_title8: 'POTENTIAL CUSTOMERS',
            item_title9: 'TIME',
            item_title10: 'NAME',
            item_title11: 'ORDERS',
            item_title12: 'TOP',
          },
        },
      },
      vi: {
        translation: {
          // here we will place our translations...
          sidebar: {
            title: 'Admin',
            title2: 'Bảng Điều Khiển',
            title3: 'Tổng thể',
            title4: 'Sản Phẩm',
            title5: 'Quản Lý Người Dùng',
            title6: 'Quản Lý Danh Mục',
            title7: 'Quản Lý Đặt Hàng',
          },
          dashboard: {
            title1: 'Bảng Điều Khiển Phân Tích',
            item_right1: 'DOANH THU',
            item_right2: 'ĐƠN HÀNG',
            item_right3: 'KHÁCH HÀNG',
            item_right4: 'SẢN PHẨM',
            item_right_footer: 'Kể từ tuần trước',
            item_title1: 'Thống kê ĐH theo từng năm',
            item_title2: 'Thống kê đơn hàng theo từng qúy',
            item_title3: 'Thống kê đơn hàng theo tháng',
            item_title4: 'Hiển Thị Theo Năm',
            item_title5: 'Hiển Thị Theo Tháng',
            item_title6: 'Hiển Thị Theo Quý',
            item_title7: 'Tháng',
            item_title8: 'KHÁCH HÀNG TIỀM NĂNG',
            item_title9: 'Thời gian',
            item_title10: 'Họ Tên',
            item_title11: 'Đơn Hàng',
            item_title12: 'Vị Trí',
          },
        },
      },
    },
  });

export default i18n;
