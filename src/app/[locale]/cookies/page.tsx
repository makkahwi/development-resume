import { brandConfig } from "@/brand/config";
import PageHeroSection from "@/components/PageSection/PageHeroSection";
import LegalContent from "@/sections/Legal/Content";
import type { PageProps } from "@/types/base";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal.Cookies" });

  const base = brandConfig.appUrl;
  const path = `/${locale}/cookies`;

  return {
    title: t("Title"),
    description: t("Subtitle"),
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        en: `${base}/en/cookies`,
        ar: `${base}/ar/cookies`,
      },
    },
  };
};

const CookiesPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal.Cookies" });
  const tCommon = await getTranslations({ locale, namespace: "Legal.Common" });

  const sections = [
    {
      title: t("Sections.Overview.Title"),
      body: t("Sections.Overview.Body"),
    },
    {
      title: t("Sections.Necessary.Title"),
      body: t("Sections.Necessary.Body"),
    },
    {
      title: t("Sections.Analytics.Title"),
      body: t("Sections.Analytics.Body"),
    },
    {
      title: t("Sections.Manage.Title"),
      body: t("Sections.Manage.Body"),
    },
  ];

  return (
    <main>
      <PageHeroSection
        badge={tCommon("Badge")}
        title={t("Title")}
        subtitle={t("Subtitle")}
      />
      <LegalContent
        sections={sections}
        lastUpdatedLabel={tCommon("LastUpdated")}
        lastUpdatedDate={t("Updated")}
      />
    </main>
  );
};

export default CookiesPage;
