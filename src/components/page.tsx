"use client";

type PageProps = {
   locale: string 
};

const LanguageSwitch =  ({ locale }: PageProps) => {
  return (
    <button
      className="btn btn-primary text-light px-4 corners"
      onClick={() => {
        if (locale === "en") {
          window.location.href = "/ar"
        } else {
          window.location.href = "/en"
        }
      }}
    >      
      <i className="bi bi-globe fw-bold" />{" "}
      {locale === "en" ? "ع" : "En"}
    </button>
  );
};

export default LanguageSwitch;