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
      <div className="row g-4">
        {contents.map(({ years, title, content }, index) => (
          <div className="col-12" key={index}>
            <div className="card border-0 corners">
              <div className="card-body d-flex flex-column flex-md-row align-items-start gap-3">
                <div className="bg-primary bg-opacity-10 text-primary fw-semibold px-3 py-2 corners">
                  {years}
                </div>
                <div>
                  <h4 className="h6 fw-bold mb-2">{title}</h4>
                  <p className="text-muted mb-0">{content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default TimelineSection;
