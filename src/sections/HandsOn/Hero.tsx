import PageHeroSection from "@/components/PageSection/PageHeroSection";

const HandsOnHeroSection = async ({ t }: { t: (key: string) => string }) => {
  return (
    <PageHeroSection
      badge={t("Intro.Badge")}
      title={t("Intro.Title")}
      subtitle={t("Intro.Subtitle")}
    />
  );
};

export default HandsOnHeroSection;
