import { brandConfig } from "@/brand/config";

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
    title: t("title"),
    description: t("description"),
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
      <h1 className="mb-4">{t("headline")}</h1>
    </main>
  );
};

export default NonProfitPage;
