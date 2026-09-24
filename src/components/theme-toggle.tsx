"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const storageKey = "makkahwi_theme";
const changeEvent = "makkahwi-theme-change";

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(changeEvent, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(changeEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");

  function toggleTheme() {
    const nextTheme: Theme = getTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch {
      // The theme still changes for this page when storage is unavailable.
    }
    window.dispatchEvent(new Event(changeEvent));
  }

  return (
    <button
      type="button"
      className="themeToggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
