import PageSection from "@/components/PageSection";

const HandsOffMentoring = async ({ t }: { t: any }) => {
  const blocks = [
    {
      period: t("Mentoring.Blocks.FounderPhase.Period"),
      body: t("Mentoring.Blocks.FounderPhase.Body"),
    },
    {
      period: t("Mentoring.Blocks.SecondCommand.Period"),
      body: t("Mentoring.Blocks.SecondCommand.Body"),
    },
    {
      period: t("Mentoring.Blocks.Early.Period"),
      body: t("Mentoring.Blocks.Early.Body"),
    },
  ];

  return (
    <PageSection title={t("Mentoring.Title")} color="light" id="mentoring">
      <div className="card border-0 shadow-sm corners">
        <div className="card-body p-4">
          <div className="position-relative">
            {blocks.map(({ period, body }, i) => (
              <div
                className="position-relative ps-5 pb-4"
                key={i}
                style={{ marginBottom: i < blocks.length - 1 ? "2rem" : "0" }}
              >
                {/* Timeline line */}
                {i < blocks.length - 1 && (
                  <div
                    className="position-absolute bg-primary"
                    style={{
                      left: "11px",
                      top: "24px",
                      width: "2px",
                      height: "calc(100% + 2rem)",
                      opacity: 0.3,
                    }}
                  />
                )}

                {/* Timeline dot */}
                <div
                  className="position-absolute bg-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    left: "0",
                    top: "4px",
                    width: "24px",
                    height: "24px",
                  }}
                >
                  <div
                    className="bg-white rounded-circle"
                    style={{ width: "10px", height: "10px" }}
                  />
                </div>

                {/* Content */}
                <div>
                  <h4 className="h6 text-primary fw-bold mb-2">{period}</h4>
                  <p className="text-muted mb-0">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
};

export default HandsOffMentoring;
