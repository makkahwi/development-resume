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
  const t = await getTranslations({ locale, namespace: "Legal.Terms" });

  const base = brandConfig.appUrl;
  const path = `/${locale}/terms`;

  return {
    title: t("Title"),
    description: t("Subtitle"),
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        en: `${base}/en/terms`,
        ar: `${base}/ar/terms`,
      },
    },
  };
};

const TermsPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal.Terms" });
  const tCommon = await getTranslations({ locale, namespace: "Legal.Common" });

  const sections = [
    {
      title: t("Sections.Overview.Title"),
      body: t("Sections.Overview.Body"),
    },
    {
      title: t("Sections.Use.Title"),
      body: t("Sections.Use.Body"),
    },
    {
      title: t("Sections.Content.Title"),
      body: t("Sections.Content.Body"),
    },
    {
      title: t("Sections.Liability.Title"),
      body: t("Sections.Liability.Body"),
    },
    {
      title: t("Sections.Changes.Title"),
      body: t("Sections.Changes.Body"),
    },
    {
      title: t("Sections.Contact.Title"),
      body: t("Sections.Contact.Body"),
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

export default TermsPage;
