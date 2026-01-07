"use client";

type PageProps = {
  locale: string;
};

const LanguageSwitch = ({ locale }: PageProps) => {
  return (
    <button
      className="btn btn-primary text-light px-4 corners"
      onClick={() => {
        if (locale === "en") {
          window.location.href = window.location.href.replace("/en", "/ar");
        } else {
          window.location.href = window.location.href.replace("/ar", "/en");
        }
      }}
    >
      <i className="fa-solid bi-globe fw-bold" /> {locale === "en" ? "ع" : "En"}
    </button>
  );
};

export default LanguageSwitch;
