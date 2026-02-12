import { brandConfig } from "@/brand/config";
import EducationSection from "@/sections/About/Education";
import AboutHeroSection from "@/sections/About/Hero";

import type { PageProps } from "@/types/base";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  const base = brandConfig.appUrl;
  const path = `/${locale}/about`;

  return {
    title: t("Title"),
    description: t("Description"),
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        en: `${base}/en/about`,
        ar: `${base}/ar/about`,
      },
    },
  };
};

const AboutPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  const tStats = await getTranslations({ locale, namespace: "Stats" });

  return (
    <main>
      <AboutHeroSection t={t} tStats={tStats} />

      <EducationSection t={t} />

      {/* <OpenToSection t={t} /> */}
    </main>
  );
};

export default AboutPage;
