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
            <img
              src={process.env.NEXT_PUBLIC_STORAGE_URL + logo + "?alt=media"}
              alt={label}
              className="img-fluid mb-2"
            />

            <h4 className="display-6">{school}</h4>

            <p>{description}</p>
          </div>
        )
      )}
    </PageSection>
  );
};

export default EducationSection;
