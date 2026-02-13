import PageSection from "@/components/PageSection";

const HandsOffPatterns = async ({ t }: { t: (key: string) => string }) => {
  const patterns = [
    t("Patterns.Items.MvpMlp"),
    t("Patterns.Items.UserFeedback"),
    t("Patterns.Items.ArchForIteration"),
    t("Patterns.Items.DocAsProduct"),
    t("Patterns.Items.PairingOnboarding"),
  ];

  return (
    <PageSection title={t("Patterns.Title")} id="patterns">
      <p className="text-muted text-center mb-5">{t("Patterns.Intro")}</p>

      <div className="d-flex flex-wrap justify-content-center gap-3">
        {patterns.map((pattern, i) => (
          <span
            key={i}
            className="badge bg-primary bg-opacity-10 text-primary px-4 py-3 fs-6 corners"
          >
            {pattern}
          </span>
        ))}
      </div>
    </PageSection>
  );
};

export default HandsOffPatterns;
