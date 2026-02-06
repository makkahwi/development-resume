"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

type PageNavigatorSection = {
  id: string;
  label: string;
  iconClass: string; // bootstrap icon class
};

type PageNavigatorProps = {
  sections?: PageNavigatorSection[];
};

const PageNavigator = ({ sections = [] }: PageNavigatorProps) => {
  const t = useTranslations("PageNav");
  const pathname = usePathname();

  const normalizedPath = (() => {
    if (!pathname) return "/";
    const cleaned = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
    return cleaned === "" ? "/" : cleaned;
  })();

  const inferredSections: PageNavigatorSection[] = (() => {
    switch (true) {
      case normalizedPath === "/":
        return [
          {
            id: "clients",
            label: t("Home.Clients"),
            iconClass: "bi bi-people",
          },
          {
            id: "projects",
            label: t("Common.Projects"),
            iconClass: "bi bi-grid-3x3-gap",
          },
          { id: "skills", label: t("Common.Skills"), iconClass: "bi bi-stars" },
          {
            id: "hands-off",
            label: t("Home.HandsOff"),
            iconClass: "bi bi-compass",
          },
          {
            id: "give-back",
            label: t("Home.GiveBack"),
            iconClass: "bi bi-heart",
          },
          {
            id: "testimonials",
            label: t("Home.Testimonials"),
            iconClass: "bi bi-chat-quote",
          },
          {
            id: "blog",
            label: t("Common.Blog"),
            iconClass: "bi bi-journal-text",
          },
        ];
      case normalizedPath === "/about":
        return [
          {
            id: "education",
            label: t("About.Education"),
            iconClass: "bi bi-mortarboard",
          },
          {
            id: "personal",
            label: t("About.Personal"),
            iconClass: "bi bi-person",
          },
          {
            id: "openTo",
            label: t("About.OpenTo"),
            iconClass: "bi bi-briefcase",
          },
        ];
      case normalizedPath === "/hands-on":
        return [
          {
            id: "experiences",
            label: t("HandsOn.Experiences"),
            iconClass: "bi bi-briefcase",
          },
          {
            id: "projects",
            label: t("Common.Projects"),
            iconClass: "bi bi-grid-3x3-gap",
          },
          { id: "skills", label: t("Common.Skills"), iconClass: "bi bi-stars" },
          {
            id: "highlights",
            label: t("HandsOn.Highlights"),
            iconClass: "bi bi-lightning",
          },
          {
            id: "timeline",
            label: t("HandsOn.Timeline"),
            iconClass: "bi bi-clock-history",
          },
        ];
      case normalizedPath === "/hands-off":
        return [
          {
            id: "roles",
            label: t("HandsOff.Roles"),
            iconClass: "bi bi-person-workspace",
          },
          {
            id: "decisions",
            label: t("HandsOff.Decisions"),
            iconClass: "bi bi-diagram-3",
          },
          {
            id: "reality-map",
            label: t("HandsOff.RealityMap"),
            iconClass: "bi bi-map",
          },
          {
            id: "patterns",
            label: t("HandsOff.Patterns"),
            iconClass: "bi bi-repeat",
          },
          {
            id: "mentoring",
            label: t("HandsOff.Mentoring"),
            iconClass: "bi bi-people",
          },
          {
            id: "snapshots",
            label: t("HandsOff.Snapshots"),
            iconClass: "bi bi-camera",
          },
          {
            id: "principles",
            label: t("HandsOff.Principles"),
            iconClass: "bi bi-compass",
          },
          {
            id: "advisory",
            label: t("HandsOff.Advisory"),
            iconClass: "bi bi-chat-square-text",
          },
          {
            id: "hands-off-cta",
            label: t("HandsOff.Cta"),
            iconClass: "bi bi-flag",
          },
        ];
      case normalizedPath === "/non-profit":
        return [
          {
            id: "mentoring",
            label: t("NonProfit.Mentoring"),
            iconClass: "bi bi-people",
          },
          {
            id: "community",
            label: t("NonProfit.Community"),
            iconClass: "bi bi-globe",
          },
          {
            id: "projects",
            label: t("Common.Projects"),
            iconClass: "bi bi-grid-3x3-gap",
          },
          {
            id: "tools",
            label: t("NonProfit.Tools"),
            iconClass: "bi bi-tools",
          },
          {
            id: "giveback-cta",
            label: t("NonProfit.Cta"),
            iconClass: "bi bi-flag",
          },
        ];
      case normalizedPath === "/blog":
        return [
          {
            id: "blog",
            label: t("Common.Blog"),
            iconClass: "bi bi-journal-text",
          },
        ];
      default:
        return [];
    }
  })();

  if (sections.length === 0 && inferredSections.length === 0) {
    return null;
  }

  const allSections = [
    { id: "hero", label: t("Common.Hero"), iconClass: "bi bi-house" },
    ...(sections.length > 0 ? sections : inferredSections),
    { id: "contact", label: t("Common.Contact"), iconClass: "bi bi-telephone" },
  ];

  return (
    <div
      className="position-fixed top-50 start-0 translate-middle-y d-flex flex-column"
      style={{ zIndex: 1040 }}
    >
      {allSections.map(({ id, label, iconClass }, index) => (
        <a
          key={`${id}-${index}`}
          href={`#${id}`}
          className="btn btn-dark ms-4 rounded-3 border-0 btn-sm p-2 my-2 text-decoration-none"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title={label}
        >
          <i className={iconClass} />
        </a>
      ))}
    </div>
  );
};

export default PageNavigator;
