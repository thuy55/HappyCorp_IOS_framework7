// Import các tệp dịch ngôn ngữ của bạn
import translationEN from "./locales/en/translation.json";
import translationVI from "./locales/vi/translation.json";

// Import i18n & các plugin
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
    .use(initReactI18next)  // Kết nối với React
    .init({
        resources: {
            vi: { translation: translationVI },
            en: { translation: translationEN },
            // Thêm các ngôn ngữ khác nếu cần
        },
        lng: localStorage.getItem("ELLM_language") || "en", // Lấy ngôn ngữ từ localStorage
        fallbackLng: "en", // Ngôn ngữ mặc định nếu không tìm thấy
        debug: process.env.NODE_ENV === "development", // Debug chỉ bật ở môi trường dev

        detection: {
            order: ["localStorage", "navigator"], // Thứ tự phát hiện ngôn ngữ
            caches: ["localStorage"], // Lưu ngôn ngữ vào localStorage
            lookupLocalStorage: "ELLM_language", // Key lưu trong localStorage
        },

        interpolation: {
            escapeValue: false, // React đã bảo vệ chống XSS
        },
    });

export default i18n;
