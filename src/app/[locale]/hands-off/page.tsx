import { brandConfig } from "@/brand/config";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HandsOff" });

  const base = brandConfig.baseUrl;
  const path = `/${locale}/hands-off`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        en: `${base}/en/hands-off`,
        ar: `${base}/ar/hands-off`,
      },
    },
  };
};

const HandsOffPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HandsOff" });

  return (
    <main className="container py-5">
      <h1 className="mb-4">
        {t("headline")}
      </h1>
    </main>
  );
};

export default HandsOffPage;
