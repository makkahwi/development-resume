import { brandConfig } from "@/brand/config";
import BlogSection from "@/sections/Common/Blog";

import type { PageProps } from "@/types/base";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });

  const base = brandConfig.appUrl;
  const path = `/${locale}/blog`;

  return {
    title: t("Title"),
    description: t("Description"),
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        en: `${base}/en/blog`,
        ar: `${base}/ar/blog`,
      },
    },
  };
};

const BlogPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });

  return (
    <main className="py-5">
      <BlogSection t={t} />
    </main>
  );
};

export default BlogPage;
