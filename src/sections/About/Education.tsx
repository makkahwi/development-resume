import { educationsList } from "@/api/hardCodedData";
import PageSection from "@/components/PageSection";

const EducationSection = async ({ t }: { t: Function }) => {
  return (
    <PageSection
      title={t("Education.Title")}
      subtitle={t("Education.Subtitle")}
      id="education"
    >
      {educationsList.map(
        ({ cert, description, downloads, logo, label, school, url }, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-2 mb-4 text-center">
            <h4 className="display-6">{school}</h4>
            <h2>{cert}</h2>

            <p>{description}</p>
          </div>
        )
      )}
    </PageSection>
  );
};

export default EducationSection;
