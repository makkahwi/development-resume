"use client";

import { brandConfig } from "@/brand/config";
import ContactForm from "@/components/ContactForm";
import { useTranslations } from "next-intl";

const { socials } = brandConfig;

const renderSocialDetails = (type: string) => {
  switch (type) {
    case "github":
      return { icon: "bi-github", label: "Git It, Connect", color: "#000000" };
    case "linkedin":
      return {
        icon: "bi-linkedin",
        label: "Linked In Progress",
        color: "#000000",
      };
    case "twitter":
      return { icon: "bi-twitter", label: "X Tweets", color: "#000000" };
    case "facebook":
      return {
        icon: "bi-facebook",
        label: "We'd Friend Forever",
        color: "#000000",
      };
    case "instagram":
      return { icon: "bi-instagram", label: "Capture Life", color: "#000000" };
    case "whatsapp":
      return {
        icon: "bi-whatsapp",
        label: "Text Me Anytime",
        color: "#000000",
      };
    case "telegram":
      return {
        icon: "bi-telegram",
        label: "Let's Tele-chat",
        color: "#000000",
      };
    case "phone":
      return {
        icon: "bi-telephone-fill",
        label: "Call IF NEEDED",
        color: "#000000",
      };
    case "email":
      return {
        icon: "bi-envelope-fill",
        label: "Inbox Awaits You",
        color: "#000000",
      };
    default:
      return { icon: "bi-globe", label: "Let's Contact", color: "#000000" };
  }
};

export const socialLinks = Object.keys(socials).map((key) => {
  const { icon, label, color } = renderSocialDetails(key);

  return {
    type: key,
    url: socials[key as keyof typeof socials],
    icon,
    label,
    color,
  };
});

const Footer = () => {
  const t = useTranslations("Layout.Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-5 pt-4 border-top bg-transparent">
      <ContactForm />

      <div className="container text-center">
        <hr className="px-5 mx-5" />

        <img src="/images/LogoC.png" width={200} className="mt-5" alt="Logo" />

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
