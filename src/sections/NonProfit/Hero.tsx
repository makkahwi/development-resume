import PageSection from "@/components/PageSection";

const NonProfitHeroSection = async ({ t }: { t: Function }) => {
  return (
    <PageSection title={t("Title")} subtitle={t("Subtitle")} id="hero">
      {
        "Life isn't only about making money, or doing something and expect materialistic returns, one could do something out of payback and favour return to community."
      }
    </PageSection>
  );
};

export default NonProfitHeroSection;
