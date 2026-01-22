import { brandConfig } from "@/brand/config";
import HandsOffAdvisory from "@/sections/HandsOff/Advisory";
import HandsOffDecisions from "@/sections/HandsOff/Decisions";
import HandsOffIntro from "@/sections/HandsOff/Intro";
import HandsOffMentoring from "@/sections/HandsOff/Mentoring";
import HandsOffPatterns from "@/sections/HandsOff/Patterns";
import HandsOffPrinciples from "@/sections/HandsOff/Principles";
import HandsOffRealityMap from "@/sections/HandsOff/RealityMap";
import HandsOffRoles from "@/sections/HandsOff/Roles";
import HandsOffSnapshots from "@/sections/HandsOff/Snapshots";

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
      <HandsOffIntro t={t} />

      <HandsOffRoles t={t} />

      <HandsOffDecisions t={t} />

      <HandsOffRealityMap t={t} />

      <HandsOffPatterns t={t} />

      <HandsOffMentoring t={t} />

      <HandsOffSnapshots t={t} />

      <HandsOffPrinciples t={t} />

      <HandsOffAdvisory t={t} />
    </main>
  );
};

export default HandsOffPage;
