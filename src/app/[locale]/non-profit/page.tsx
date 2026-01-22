import { brandConfig } from "@/brand/config";
import ProjectsSection from "@/sections/Common/Projects";
import NonProfitCTA from "@/sections/NonProfit/CTA";
import HelpGroupsSection from "@/sections/NonProfit/HelpGroups";
import NonProfitHeroSection from "@/sections/NonProfit/Hero";
import MentoringSection from "@/sections/NonProfit/Mentoring";
import OpenSourceSection from "@/sections/NonProfit/OpenSource";
import ToolsSection from "@/sections/NonProfit/Tools";
import type { PageProps } from "@/types/base";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NonProfit" });

  const base = brandConfig.appUrl;
  const path = `/${locale}/non-profit`;

  return {
    title: t("Title"),
    description: t("Description"),
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        en: `${base}/en/non-profit`,
        ar: `${base}/ar/non-profit`,
      },
    },
  };
};

const NonProfitPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NonProfit" });

  return (
    <main className="py-5">
      <NonProfitHeroSection t={t} />

      <HelpGroupsSection t={t} />

      <OpenSourceSection t={t} />

      <ProjectsSection t={t} openSourceOnly />

      <ProjectsSection t={t} focOnly />

      <ToolsSection t={t} />

      <MentoringSection t={t} />

      <NonProfitCTA t={t} />
    </main>
  );
};

export default NonProfitPage;
