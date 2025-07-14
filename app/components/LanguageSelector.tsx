import { Select } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { SUPPORTED_LANGUAGES } from "../i18n.languages";
import i18n from "../i18n";

const LANG_OPTIONS = [
  { label: "English", value: "en" },
  { label: "Français", value: "fr" },
  { label: "Español", value: "es" },
];

export function LanguageSelector({ label = "Language", helpText = "" }) {
  const { i18n: i18next } = useTranslation();
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("app_language") || i18next.language || "en";
    }
    return i18next.language || "en";
  });

  useEffect(() => {
    if (lang && i18next.language !== lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("app_language", lang);
    }
  }, [lang, i18next.language]);

  return (
    <Select
      label={label}
      options={LANG_OPTIONS}
      value={lang}
      onChange={setLang}
      helpText={helpText}
      name="language"
    />
  );
} 