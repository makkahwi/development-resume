"use client";

import { brandConfig } from "@/brand/config";
// import LanguageSwitch from "@/components/LanguageSwitch";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkItem = {
  key: string;
  href: string;
  scroll?: boolean;
  iconClass: string;
};

const navLinks: NavLinkItem[] = [
  { key: "home", href: "/", iconClass: "fa-house" },
  { key: "about", href: "/about", iconClass: "fa-user" },
  { key: "handsOn", href: "/hands-on", iconClass: "fa-code" },
  { key: "handsOff", href: "/hands-off", iconClass: "fa-list-check" },
  { key: "nonProfit", href: "/non-profit", iconClass: "fa-heart" },
  { key: "blog", href: "/blog", iconClass: "fa-book" },
  // Contact scrolls to section on the same page
  { key: "contact", href: "contact", scroll: true, iconClass: "fa-phone" },
];

const NavbarComp = () => {
  const locale = useLocale();
  const t = useTranslations("Layout.Nav");
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const buildHref = (item: NavLinkItem): string => {
    if (item.scroll) {
      // in-page anchor
      return `#${item.href}`;
    }
    // localized route
    return `/${locale}${item.href === "/" ? "" : item.href}`;
  };

  const isActive = (item: NavLinkItem): boolean => {
    if (item.scroll) return false;
    const normalized = item.href === "/" ? "" : item.href;
    return pathname === `/${locale}${normalized}`;
  };

  return (
    <nav className="chat-aware-navbar navbar navbar-expand-lg py-0 px-3 px-md-5 mt-3 fixed-top bg-light px-4 border-0 corners mx-4">
      <div className="container-fluid">
        {/* Brand */}
        <Link
          href={`/${locale}`}
          className="navbar-brand text-decoration-none d-flex align-items-center gap-2"
        >
          <Image src="/images/LogoC.png" width={50} height={50} alt="Logo" />
          <span className="text-primary fw-bold">{t("Title")}</span>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-controls="mainNavbar"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Links */}
        <div
          className={`navbar-collapse justify-content-end collapse ${
            isMobileMenuOpen ? "show" : ""
          }`}
          id="mainNavbar"
        >
          <ul className="navbar-nav align-items-lg-center">
            {navLinks.map(({ key, href, scroll, iconClass }) => (
              <li className="nav-item" key={key}>
                <Link
                  href={buildHref({ key, href, scroll, iconClass })}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`nav-link d-flex align-items-center gap-1 ${
                    isActive({ key, href, scroll, iconClass })
                      ? "text-primary fw-semibold"
                      : "text-secondary"
                  }`}
                >
                  <i className={`fa-solid ${iconClass} fw-bold`} />
                  <span className="d-inline d-lg-none d-xl-inline">
                    {t(key)}
                  </span>
                </Link>
              </li>
            ))}

            {/* <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <LanguageSwitch locale={locale} />
            </li> */}

            {/* CV button */}
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <a
                className="btn btn-primary text-light px-4 border-0 corners"
                href={brandConfig.cvUrl}
                onClick={() => setIsMobileMenuOpen(false)}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-solid fa-download me-1 fw-bold" />{" "}
                <span className="d-inline d-lg-none d-xl-inline">CV</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComp;
