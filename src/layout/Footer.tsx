"use client";

import { brandConfig } from "@/brand/config";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Layout.Footer");
  const { socials } = brandConfig;
  const year = new Date().getFullYear();

  const renderSocialIcon = (type: string) => {
    switch (type) {
      case "github":
        return "bi-github"
      case "linkedin":
        return "bi-linkedin"
      case "twitter":
        return "bi-twitter"
      case "facebook":
        return "bi-facebook"
      case "instagram":
        return "bi-instagram"
      case "whatsapp":
        return "bi-whatsapp"
      case "telegram":
        return "bi-telegram"
      case "phone":
        return "bi-telephone-fill"
      case "email":
        return "bi-envelope-fill"
      default:
        return "bi-globe";
    }
  };

  const socialLinks = Object.keys(socials).map(key => ({
    type: key,
    url: socials[key as keyof typeof socials],
    icon: renderSocialIcon(key)
  }));

  return (
    <footer className="mt-5 pt-4 border-top bg-transparent">
      <div className="container text-center">
        <hr className="px-5 mx-5" />

        <img
          src="/images/LogoC.png"
          width={200}
          className="mt-5"
          alt="Logo"
        />

        <h2 className="text-dark my-3 text-uppercase">
          {t(brandConfig.siteName)}
        </h2>

        <p className="text-muted mt-5 mb-2">
          {t("AllRightsReserved")} © 2018 - {year}
        </p>

        <div className="d-flex justify-content-center gap-3 my-3">
          {socialLinks.map(({ type, url, icon }) => (
            <a
              key={type}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-dark"
            >
              <i className={`bi ${icon}`} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
