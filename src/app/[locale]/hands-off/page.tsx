import { brandConfig } from "@/brand/config";

import type { PageProps } from "@/types/base";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HandsOff" });

  const base = brandConfig.appUrl;
  const path = `/${locale}/hands-off`;

  return {
    title: t("Title"),
    description: t("Description"),
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
    <main className="py-5">
      <h1 className="mb-4">{t("Headline")}</h1>
    </main>
  );
};

export default HandsOffPage;
