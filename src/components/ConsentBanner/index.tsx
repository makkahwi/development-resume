"use client";

import type { ConsentState } from "@/lib/consent";
import { readConsent, saveConsent } from "@/lib/consent";
import { useEffect, useState } from "react";

const ConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    const existing = readConsent();
    setConsent(existing);

    // Show banner only if analytics is not granted yet
    if (!existing.analytics && !existing.marketing) {
      setVisible(true);
    }
  }, []);

  if (!visible || !consent) return null;

  const acceptAll = () => {
    const updated: ConsentState = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(updated);
    setConsent(updated);
    setVisible(false);
  };

  const necessaryOnly = () => {
    const updated: ConsentState = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(updated);
    setConsent(updated);
    setVisible(false);
  };

  return (
    <div
      className="position-fixed bottom-0 start-0 end-0 bg-dark text-light py-3 px-3 px-md-5 shadow-lg"
      style={{ zIndex: 1080 }}
    >
      <div className="container d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
        <div>
          <h2 className="h6 mb-1">Cookies & Analytics</h2>
          <p className="mb-0 small">
            We use cookies to make this site work and to understand how it’s
            used. You can allow analytics or continue with necessary cookies
            only.
          </p>
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-primary btn-sm px-4 border-0 corners"
            onClick={necessaryOnly}
          >
            Necessary only
          </button>
          <button
            type="button"
            className="btn btn-light btn-sm px-4 border-0 corners"
            onClick={acceptAll}
          >
            Allow all
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
