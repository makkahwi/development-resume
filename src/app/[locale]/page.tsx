import { brandConfig } from "@/brand/config";
import AboutHeroSection from "@/sections/About/Hero";
import BlogSection from "@/sections/Common/Blog";
import ProjectsSection from "@/sections/Common/Projects";
import SkillsSection from "@/sections/Common/Skills";
import ClientsSection from "@/sections/Home/Clients";
import HomeHeroSection from "@/sections/Home/Hero";
import TestimonialsSection from "@/sections/Home/Testimonials";

import type { PageProps } from "@/types/base";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  const base = brandConfig.appUrl;
  const path = `/${locale}`;

  return {
    title: t("Title"),
    description: t("Subtitle"),
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        en: `${base}/en`,
        ar: `${base}/ar`,
      },
    },
  };
};

const HomeLocalePage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  const tAbout = await getTranslations({ locale, namespace: "About" });

  return (
    <main>
      <HomeHeroSection t={t} home />
      <ClientsSection t={t} home />
      <AboutHeroSection t={tAbout} short />
      <ProjectsSection t={t} short />
      <SkillsSection t={t} short />
      <TestimonialsSection t={t} home />
      <BlogSection t={t} />
    </main>
  );
};

export default HomeLocalePage;
