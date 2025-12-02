"use client";

import { brandConfig } from "@/brand/config";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Layout.Footer");
  const { socials } = brandConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-5 pt-4 border-top bg-transparent">
      <div className="container text-center">
        <hr className="px-5 mx-5" />

        <img
          src="/images/LogoC.png"
          width={200}
          className="mt-5 mb-2"
          alt="Logo"
        />

        <h2 className="text-dark mt-0 mb-3 text-uppercase">
          {t(brandConfig.siteName)}
        </h2>

        <p className="text-muted mb-2">
          {t("AllRightsReserved")} © 2018 - {year}
        </p>

        <div className="d-flex justify-content-center gap-3 my-3">
          {socials.github && (
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="text-dark fs-5"
            >
              <i className="bi bi-github" />
            </a>
          )}
          {socials.linkedin && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-dark fs-5"
            >
              <i className="bi bi-linkedin" />
            </a>
          )}
          {socials.email && (
            <a href={socials.email} className="text-dark fs-5">
              <i className="bi bi-envelope" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
