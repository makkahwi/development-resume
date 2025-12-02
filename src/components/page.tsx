"use client";

type PageProps = {
   locale: string 
};

const LanguageSwitch =  ({ locale }: PageProps) => {
  return (
    <div
      role='button'
      onClick={() => {
        if (locale === "en") {
          window.location.href = "/ar"
        } else {
          window.location.href = "/en"
        }
      }}
    >
      {locale === "en" ? "ع" : "En"}
    </div>
  );
};

export default LanguageSwitch;