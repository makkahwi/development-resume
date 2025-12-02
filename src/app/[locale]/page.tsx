import { brandConfig } from "@/brand/config";
import LanguageSwitch from "@/components/page";
import type { PageProps } from "@/types/base";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";


export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  const base = brandConfig.baseUrl;
  const path = `/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
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
    <main className="container py-5">
      <header className="mb-5">        
        <p className="lead">
          {t("subtitle")}
        </p>
      </header>
    </main>
  );
};

export default HomeLocalePage;