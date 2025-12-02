"use client";

import Cookies from "js-cookie";

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CONSENT_COOKIE_KEY = "site-consent-v1";

// Default: only necessary is true
const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export const readConsent = (): ConsentState => {
  if (typeof window === "undefined") {
    return DEFAULT_CONSENT;
  }

  const raw = Cookies.get(CONSENT_COOKIE_KEY);
  if (!raw) return DEFAULT_CONSENT;

  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return {
      necessary: true, // always true
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return DEFAULT_CONSENT;
  }
}

export const saveConsent = (consent: ConsentState) => {
  // Store for e.g. 180 days
  Cookies.set(CONSENT_COOKIE_KEY, JSON.stringify(consent), {
    expires: 180,
    sameSite: "Lax",
  });
}
