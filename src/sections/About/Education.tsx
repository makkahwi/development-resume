import PageSection from "@/components/PageSection";
import { educationsList } from "@/lib/data";

const EducationSection = async ({ t }: { t: Function }) => {
  return (
    <PageSection
      title={t("Education.Title")}
      subtitle={t("Education.Subtitle")}
      id="education"
      color="light"
    >
      <div className="row g-4">
        {educationsList.map(
          (
            { cert, description, downloads, logo, label, school, url },
            index,
          ) => (
            <div key={index} className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <img
                      src={
                        process.env.NEXT_PUBLIC_STORAGE_URL +
                        logo +
                        "?alt=media"
                      }
                      alt={label}
                      className="img-fluid"
                      style={{ maxHeight: "80px", objectFit: "contain" }}
                    />
                  </div>
                  <h4 className="h6 fw-bold mb-2">{school}</h4>
                  <p className="text-muted small mb-0">{description}</p>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </PageSection>
  );
};

export default EducationSection;
