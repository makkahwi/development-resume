"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

type PageNavigatorSection = {
  id: string;
  label: string;
  iconClass: string; // font awesome class
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
            iconClass: "fa-solid fa-people-group",
          },
          {
            id: "projects",
            label: t("Common.Projects"),
            iconClass: "fa-solid fa-grip",
          },
          {
            id: "hands-off",
            label: t("Home.HandsOff"),
            iconClass: "fa-solid fa-compass",
          },
          {
            id: "skills",
            label: t("Common.Skills"),
            iconClass: "fa-solid fa-star",
          },
          {
            id: "testimonials",
            label: t("Home.Testimonials"),
            iconClass: "fa-solid fa-comments",
          },
          {
            id: "blog",
            label: t("Common.Blog"),
            iconClass: "fa-solid fa-book",
          },
        ];
      case normalizedPath === "/about":
        return [
          {
            id: "education",
            label: t("About.Education"),
            iconClass: "fa-solid fa-graduation-cap",
          },
        ];
      case normalizedPath === "/hands-on":
        return [
          {
            id: "timeline",
            label: t("HandsOn.Timeline"),
            iconClass: "fa-solid fa-clock-rotate-left",
          },
          {
            id: "highlights",
            label: t("HandsOn.Highlights"),
            iconClass: "fa-solid fa-bolt",
          },
          {
            id: "experiences",
            label: t("HandsOn.Experiences"),
            iconClass: "fa-solid fa-briefcase",
          },
          {
            id: "projects",
            label: t("Common.Projects"),
            iconClass: "fa-solid fa-grip",
          },
          {
            id: "skills",
            label: t("Common.Skills"),
            iconClass: "fa-solid fa-star",
          },
        ];
      case normalizedPath === "/hands-off":
        return [
          {
            id: "roles",
            label: t("HandsOff.Roles"),
            iconClass: "fa-solid fa-chalkboard-user",
          },
          {
            id: "decisions",
            label: t("HandsOff.Decisions"),
            iconClass: "fa-solid fa-diagram-project",
          },
          {
            id: "reality-map",
            label: t("HandsOff.RealityMap"),
            iconClass: "fa-solid fa-map",
          },
          {
            id: "patterns",
            label: t("HandsOff.Patterns"),
            iconClass: "fa-solid fa-repeat",
          },
          {
            id: "mentoring",
            label: t("HandsOff.Mentoring"),
            iconClass: "fa-solid fa-people-group",
          },
          {
            id: "snapshots",
            label: t("HandsOff.Snapshots"),
            iconClass: "fa-solid fa-camera",
          },
          {
            id: "principles",
            label: t("HandsOff.Principles"),
            iconClass: "fa-solid fa-compass",
          },
          {
            id: "advisory",
            label: t("HandsOff.Advisory"),
            iconClass: "fa-solid fa-comment-dots",
          },
          {
            id: "hands-off-cta",
            label: t("HandsOff.Cta"),
            iconClass: "fa-solid fa-flag",
          },
        ];
      case normalizedPath === "/non-profit":
        return [
          {
            id: "mentoring",
            label: t("NonProfit.Mentoring"),
            iconClass: "fa-solid fa-people-group",
          },
          {
            id: "community",
            label: t("NonProfit.Community"),
            iconClass: "fa-solid fa-globe",
          },
          {
            id: "projects",
            label: t("Common.Projects"),
            iconClass: "fa-solid fa-grip",
          },
          {
            id: "tools",
            label: t("NonProfit.Tools"),
            iconClass: "fa-solid fa-screwdriver-wrench",
          },
          {
            id: "trainees",
            label: t("NonProfit.Trainees"),
            iconClass: "fa-solid fa-user-graduate",
          },
          {
            id: "giveback-cta",
            label: t("NonProfit.Cta"),
            iconClass: "fa-solid fa-flag",
          },
        ];
      case normalizedPath === "/blog":
        return [];
      default:
        return [];
    }
  })();

  if (sections.length === 0 && inferredSections.length === 0) {
    return null;
  }

  const allSections = [
    { id: "hero", label: t("Common.Hero"), iconClass: "fa-solid fa-house" },
    ...(sections.length > 0 ? sections : inferredSections),
    {
      id: "contact",
      label: t("Common.Contact"),
      iconClass: "fa-solid fa-phone",
    },
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
          className="btn btn-dark ms-4 border-0 btn-sm p-2 my-2 text-decoration-none corners"
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
