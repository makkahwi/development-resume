import { brandConfig } from "@/brand/config";
import AboutHeroSection from "@/sections/About/Hero";
import BlogSection from "@/sections/Common/Blog";
import ProjectsSection from "@/sections/Common/Projects";
import SkillsSection from "@/sections/Common/Skills";
import ClientsSection from "@/sections/Home/Clients";
import GiveBackHighlights from "@/sections/Home/GiveBackHighlights";
import HandsOffHighlights from "@/sections/Home/HandsOffHighlights";
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
  const tHome = await getTranslations({ locale, namespace: "Home" });
  const tAbout = await getTranslations({ locale, namespace: "About" });
  const tBlog = await getTranslations({ locale, namespace: "Blog" });
  const tStats = await getTranslations({ locale, namespace: "Stats" });

  return (
    <main>
      <HomeHeroSection t={tHome} />
      <ClientsSection t={tHome} />
      <AboutHeroSection t={tAbout} tStats={tStats} short />
      <ProjectsSection t={tHome} short />
      <HandsOffHighlights t={tHome} locale={locale} />
      <SkillsSection t={tHome} short />
      <TestimonialsSection t={tHome} />
      <BlogSection
        title={tHome("Blog.Title")}
        subtitle={tHome("Blog.Subtitle")}
        locale={locale}
        short
        ctaLabel={tBlog("ReadMore")}
      />
    </main>
  );
};

export default HomeLocalePage;
