import { brandConfig } from "@/brand/config";
import BlogSection from "@/sections/Home/Blog";
import ClientsSection from "@/sections/Home/Clients";
import HomeHeroSection from "@/sections/Home/Hero";
import ProjectsSection from "@/sections/Home/Projects";
import SkillsSection from "@/sections/Home/Skills";
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
    description: t("Description"),
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

  return (
    <main className="py-5">
      <HomeHeroSection t={t} />
      <ProjectsSection t={t} />
      <SkillsSection t={t} />
      <ClientsSection t={t} />
      <TestimonialsSection t={t} />
      <BlogSection t={t} />
    </main>
  );
};

export default HomeLocalePage;
