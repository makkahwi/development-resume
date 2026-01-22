import PageSection from "@/components/PageSection";

const TimelineSection = async ({ t }: { t: Function }) => {
  const contents = [
    {
      years: t("Timeline.Point6.Years"),
      title: t("Timeline.Point6.Title"),
      content: t("Timeline.Point6.Content"),
    },
    {
      years: t("Timeline.Point5.Years"),
      title: t("Timeline.Point5.Title"),
      content: t("Timeline.Point5.Content"),
    },
    {
      years: t("Timeline.Point4.Years"),
      title: t("Timeline.Point4.Title"),
      content: t("Timeline.Point4.Content"),
    },
    {
      years: t("Timeline.Point3.Years"),
      title: t("Timeline.Point3.Title"),
      content: t("Timeline.Point3.Content"),
    },
    {
      years: t("Timeline.Point2.Years"),
      title: t("Timeline.Point2.Title"),
      content: t("Timeline.Point2.Content"),
    },
    {
      years: t("Timeline.Point1.Years"),
      title: t("Timeline.Point1.Title"),
      content: t("Timeline.Point1.Content"),
    },
  ];

  return (
    <PageSection
      title={t("Timeline.Title")}
      subtitle={t("Timeline.Subtitle")}
      id="timeline"
      color="light"
    >
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="position-relative">
            {contents.map(({ years, title, content }, index) => (
              <div
                key={index}
                className="position-relative ps-5 pb-4"
                style={{
                  marginBottom: index < contents.length - 1 ? "2rem" : "0",
                }}
              >
                {/* Timeline line */}
                {index < contents.length - 1 && (
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
                  <h4 className="h6 text-primary fw-bold mb-2">
                    {years} | {title}
                  </h4>
                  <p className="text-muted mb-0">{content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
};

export default TimelineSection;
