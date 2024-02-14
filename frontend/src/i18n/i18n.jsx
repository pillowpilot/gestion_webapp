import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import topbar_en from "./en/topbar";
import inferences_en from "./en/inferences";
import lots_en from "./en/lots";
import properties_en from "./en/properties";
import users_en from "./en/users";
import login_en from "./en/login";
import errors_en from "./en/errors";
import notfound_en from "./en/notfound";

import topbar_es from "./es/topbar";
import inferences_es from "./es/inferences";
import lots_es from "./es/lots";
import properties_es from "./es/properties";
import users_es from "./es/users";
import login_es from "./es/login";
import errors_es from "./es/errors";
import notfound_es from "./es/notfound";


i18n.use(initReactI18next).init({
  debug: true,
  lng: "es",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources: {
    en: {
      translation: {
        topbar: topbar_en,
        inferences: inferences_en,
        lots: lots_en,
        properties: properties_en,
        users: users_en,
        login: login_en,
        errors: errors_en,
        notfound: notfound_en,
      },
    },
    es: {
      translation: {
        topbar: topbar_es,
        inferences: inferences_es,
        lots: lots_es,
        properties: properties_es,
        users: users_es,
        login: login_es,
        errors: errors_es,
        notfound: notfound_es,
      },
    },
  },
});

export default i18n;
