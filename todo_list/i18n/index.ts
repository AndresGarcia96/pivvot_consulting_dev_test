import i18n from "i18next";

import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import AsyncStorage from "@react-native-async-storage/async-storage";

import translationEs from "./locales/es-CO/translation.json";
import translationEn from "./locales/en-US/translation.json";

const resources = {
  "es-CO": { translation: translationEs },
  "en-US": { translation: translationEn },
};

const initI18n = async () => {
  let savedLanguage;

  try {
    savedLanguage = await AsyncStorage.getItem("language");
  } catch (error) {
    console.error("Error retrieving language from AsyncStorage:", error);
  }

  if (!savedLanguage) {
    savedLanguage = Localization.locale || "es-CO";
  }

  i18n.use(initReactI18next).init({
    // compatibilityJSON: "v3",
    resources,
    lng: savedLanguage,
    fallbackLng: "es-CO",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
