"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import LanguageSwitch from "@/components/LanguageSwitch";
import { brandConfig } from "@/brand/config";

type NavLinkItem = {
  key: string;
  href: string;
  scroll?: boolean;
  iconClass: string;
};

const navLinks: NavLinkItem[] = [
  { key: "home", href: "/", iconClass: "bi-house-door" },
  { key: "about", href: "/about", iconClass: "bi-person" },
  { key: "handsOn", href: "/hands-on", iconClass: "bi-code-slash" },
  { key: "handsOff", href: "/hands-off", iconClass: "bi-list-check" },
  { key: "nonProfit", href: "/non-profit", iconClass: "bi-heart" },
  { key: "blog", href: "/blog", iconClass: "bi-journal-text" },
  // Contact scrolls to section on the same page
  { key: "contact", href: "contact", scroll: true, iconClass: "bi-phone" },
];

const NavbarComp = () => {
  const locale = useLocale();
  const t = useTranslations("Layout.Nav");
  const pathname = usePathname();

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
    <nav className="navbar navbar-expand-lg py-0 px-3 px-md-5 mt-3 fixed-top bg-light shadow-sm corners mx-4">
      <div className="container-fluid">
        {/* Brand */}
        <Link
          href={`/${locale}`}
          className="navbar-brand text-decoration-none text-uppercase d-flex align-items-center gap-2"
        >
          <img src="/images/LogoC.png" width={50} alt="Logo" />
          <span className="text-primary fw-bold">{t(brandConfig.siteName)}</span>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse justify-content-end" id="mainNavbar">
          <ul className="navbar-nav align-items-lg-center">
            {navLinks.map((item) => (
              <li className="nav-item" key={item.key}>
                <Link
                  href={buildHref(item)}
                  className={`nav-link d-flex align-items-center gap-1 ${
                    isActive(item) ? "text-primary fw-semibold" : "text-secondary"
                  }`}
                >
                  <i className={`bi ${item.iconClass} fw-bold`} />
                  <span className="d-inline d-lg-none d-xl-inline">
                    {t(item.key)}
                  </span>
                </Link>
              </li>
            ))}

            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <LanguageSwitch locale={locale} />
            </li>

            {/* CV button */}
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <a
                className="btn btn-primary text-light px-4 corners"
                href="https://firebasestorage.googleapis.com/v0/b/resume-data-8215f.appspot.com/o/Suhaib-Ahmad-ATS-Resume-Sheet.pdf?alt=media"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-download me-1 fw-bold" />{' '}
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
