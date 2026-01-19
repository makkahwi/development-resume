import PageSection from "@/components/PageSection";

const OpenToSection = async ({ t }: { t: Function }) => {
  const openToList = [
    t("OpenTo.Development"),
    t("OpenTo.Advisory"),
    t("OpenTo.Mentorship"),
    t("OpenTo.Architecture"),
  ];

  return (
    <PageSection
      title={t("OpenTo.Title")}
      subtitle={t("OpenTo.Subtitle")}
      id="openTo"
    >
      <h3>{t("OpenTo.Intro")}</h3>
      <div className="row mb-4 text-center">
        {openToList.map((item, itemIndex) => (
          <div key={itemIndex} className="col-12 col-md-4 mb-2">
            <span>{item}</span>
          </div>
        ))}
      </div>

      <h4>{t("OpenTo.Conclusion")}</h4>
    </PageSection>
  );
};

export default OpenToSection;
