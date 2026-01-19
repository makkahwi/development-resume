import PageSection from "@/components/PageSection";

const TimelineSection = async ({ t }: { t: Function }) => {
  const contents = [
    {
      years: t("Timeline.Point1.Years"),
      title: t("Timeline.Point1.Title"),
      content: t("Timeline.Point1.Content"),
    },
    {
      years: t("Timeline.Point2.Years"),
      title: t("Timeline.Point2.Title"),
      content: t("Timeline.Point2.Content"),
    },
    {
      years: t("Timeline.Point3.Years"),
      title: t("Timeline.Point3.Title"),
      content: t("Timeline.Point3.Content"),
    },
    {
      years: t("Timeline.Point4.Years"),
      title: t("Timeline.Point4.Title"),
      content: t("Timeline.Point4.Content"),
    },
    {
      years: t("Timeline.Point5.Years"),
      title: t("Timeline.Point5.Title"),
      content: t("Timeline.Point5.Content"),
    },
    {
      years: t("Timeline.Point6.Years"),
      title: t("Timeline.Point6.Title"),
      content: t("Timeline.Point6.Content"),
    },
  ];

  return (
    <PageSection
      title={t("Timeline.Title")}
      subtitle={t("Timeline.Subtitle")}
      id="timeline"
    >
      {contents.map(({ years, title, content }, index) => (
        <div key={index} className="col-6 col-md-4 col-lg-2 mb-4 text-center">
          <h4 className="display-6">
            {years} | {title}
          </h4>

          <p>{content}</p>
        </div>
      ))}
    </PageSection>
  );
};

export default TimelineSection;
