import PageSection from "@/components/PageSection";

const HandsOffMentoring = async ({ t }: { t: any }) => {
  const blocks = [
    {
      period: t("Mentoring.Blocks.Early.Period"),
      body: t("Mentoring.Blocks.Early.Body"),
    },
    {
      period: t("Mentoring.Blocks.SecondCommand.Period"),
      body: t("Mentoring.Blocks.SecondCommand.Body"),
    },
    {
      period: t("Mentoring.Blocks.FounderPhase.Period"),
      body: t("Mentoring.Blocks.FounderPhase.Body"),
    },
  ];

  return (
    <PageSection title={t("Mentoring.Title")}>
      <div className="border-start ps-3">
        {blocks.map(({ period, body }, i) => (
          <div className="mb-3" key={i}>
            <div className="small text-muted fw-semibold">{period}</div>

            <div className="small">{body}</div>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default HandsOffMentoring;
