import PageSection from "@/components/PageSection";

const HandsOffPatterns = async ({ t }: { t: any }) => {
  const patterns = [
    t("Patterns.Items.MvpMlp"),
    t("Patterns.Items.UserFeedback"),
    t("Patterns.Items.ArchForIteration"),
    t("Patterns.Items.DocAsProduct"),
    t("Patterns.Items.PairingOnboarding"),
  ];

  return (
    <PageSection title={t("Patterns.Title")}>
      <p className="small text-muted mb-4">{t("Patterns.Intro")}</p>

      <div className="d-flex flex-wrap gap-2">
        {patterns.map((pattern, i) => (
          <span
            key={i}
            className="badge bg-light text-secondary border rounded-pill px-3 py-2"
          >
            {pattern}
          </span>
        ))}
      </div>
    </PageSection>
  );
};

export default HandsOffPatterns;
