"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage, LANGUAGES } from "@/providers/LanguageProvider";

import "./LanguageSelector.css";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef(null);
  const activeLanguage = LANGUAGES.find((item) => item.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!selectorRef.current?.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleLanguageChange = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="language-selector-container">
      <div className={`language-selector${isOpen ? " is-open" : ""}`} ref={selectorRef}>
        <button
          className="language-flag language-flag-active"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen((open) => !open);
          }}
          aria-label={`Selected language: ${activeLanguage.label}`}
          aria-expanded={isOpen}
          aria-controls="language-options"
          title={activeLanguage.label}
        >
          <img src={`/images/flags/${activeLanguage.flag}.svg`} alt="" aria-hidden="true" />
        </button>

        <div className="language-options" id="language-options" role="group" aria-label="Language options">
          {LANGUAGES.filter((item) => item.code !== language).map((item) => (
          <button
            className={`language-flag${language === item.code ? " is-active" : ""}`}
            type="button"
            key={item.code}
            onClick={() => handleLanguageChange(item.code)}
            aria-label={item.label}
            aria-pressed={language === item.code}
            title={item.label}
          >
            <img src={`/images/flags/${item.flag}.svg`} alt="" aria-hidden="true" />
          </button>
          ))}
        </div>
      </div>
    </div>
  );
}
