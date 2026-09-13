"use client";

import { useLanguage, LANGUAGES } from "@/providers/LanguageProvider";

import "./LanguageSelector.css";

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="language-selector-container">
      <label className="language-selector" htmlFor="site-language">
        <span className="language-selector-label">{t("language")}</span>
        <select
          id="site-language"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          aria-label={t("language")}
        >
          {LANGUAGES.map((item) => (
            <option value={item.code} key={item.code}>
              {item.code.toUpperCase()}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
