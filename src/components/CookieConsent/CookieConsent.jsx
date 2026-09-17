"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";

import "./CookieConsent.css";

const STORAGE_KEY = "capicci-cookie-consent";

export default function CookieConsent() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Storage is unavailable in private mode or with cookies blocked --
      // showing the banner is the safe default.
      setVisible(true);
    }
  }, []);

  const respond = (choice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Nothing to persist to; the banner still closes for this session.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-label="Cookies">
      <p className="mono sm cookie-consent-label">[ Cookies ]</p>
      <p className="cookie-consent-text">{t("cookieText")}</p>

      <div className="cookie-consent-actions">
        <button
          type="button"
          className="cookie-consent-btn cookie-consent-btn--accept"
          onClick={() => respond("accepted")}
        >
          {t("cookieAccept")}
        </button>
        <button
          type="button"
          className="cookie-consent-btn"
          onClick={() => respond("declined")}
        >
          {t("cookieDecline")}
        </button>
      </div>
    </div>
  );
}
