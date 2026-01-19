import { brandConfig } from "@/brand/config";
import ProjectsSection from "@/sections/Common/Projects";
import SkillsSection from "@/sections/Common/Skills";
import ExperiencesSection from "@/sections/HandsOn/Experiences";
import HandsOnHeroSection from "@/sections/HandsOn/Hero";
import HighlightsSection from "@/sections/HandsOn/Highlights";
import TimelineSection from "@/sections/HandsOn/Timeline";
import type { PageProps } from "@/types/base";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HandsOn" });

  const base = brandConfig.appUrl;
  const path = `/${locale}/hands-on`;

  return {
    title: t("Title"),
    description: t("Description"),
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        en: `${base}/en/hands-on`,
        ar: `${base}/ar/hands-on`,
      },
    },
  };
};

const HandsOnPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HandsOn" });

  return (
    <main className="py-5">
      <HandsOnHeroSection t={t} />

      <ExperiencesSection t={t} />

      <ProjectsSection t={t} />

      <SkillsSection t={t} />

      <HighlightsSection t={t} />

      <TimelineSection t={t} />
    </main>
  );
};

export default HandsOnPage;
