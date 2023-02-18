import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: {
            "main-text": "Welcome",
            "main-btn": "Main",
            "news-btn": "News",
            "login-btn": "Login",
            "logout-btn": "Logout",
            "profile-btn": "Profile",
            "submit-bnt": "Login",
            "email": "Email",
            "password": "Password",
            "404": "Page not found",
            "news-title": 'News',
            "download-btn": 'Download more'
        }
    },
    ua: {
        translation: {
            "main-text": "Ласкаво просимо",
            "main-btn": "Головна",
            "news-btn": "Новини",
            "login-btn": "Вхід",
            "logout-btn": "Вихід",
            "profile-btn": "Профіль",
            "submit-bnt": "Вхід",
            "email": "Електронна адреса",
            "password": "Пароль",
            "404": "Сторінку не знайдено",
            "news-title": 'Новини',
            "download-btn": 'Завантажити ще'
        }
    }
};

i18n.use(initReactI18next)
    .init({
        resources,
        lng: "ua",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;