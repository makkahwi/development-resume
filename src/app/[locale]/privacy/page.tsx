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
  const t = await getTranslations({ locale, namespace: "Legal.Privacy" });

  const base = brandConfig.appUrl;
  const path = `/${locale}/privacy`;

  return {
    title: t("Title"),
    description: t("Subtitle"),
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        en: `${base}/en/privacy`,
        ar: `${base}/ar/privacy`,
      },
    },
  };
};

const PrivacyPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal.Privacy" });
  const tCommon = await getTranslations({ locale, namespace: "Legal.Common" });

  const sections = [
    {
      title: t("Sections.Overview.Title"),
      body: t("Sections.Overview.Body"),
    },
    {
      title: t("Sections.Data.Title"),
      body: t("Sections.Data.Body"),
    },
    {
      title: t("Sections.Usage.Title"),
      body: t("Sections.Usage.Body"),
    },
    {
      title: t("Sections.Sharing.Title"),
      body: t("Sections.Sharing.Body"),
    },
    {
      title: t("Sections.Choices.Title"),
      body: t("Sections.Choices.Body"),
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

export default PrivacyPage;
