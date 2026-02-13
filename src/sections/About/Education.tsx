import PageSection from "@/components/PageSection";
import { educationsList } from "@/lib/data";
import Image from "next/image";

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
              <div className="card h-100 border-0 p-3 shadow-sm">
                <div className="card-body">
                  <div className="mb-3">
                    <a href={url} target="_blank" rel="noreferrer">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${logo}?alt=media`}
                        alt={label}
                        width={160}
                        height={80}
                        className="img-fluid"
                        style={{ objectFit: "contain" }}
                      />
                    </a>
                  </div>
                  <div className="d-flex align-items-start justify-content-between gap-2">
                    <div>
                      <h4 className="h6 fw-bold mb-2">{school}</h4>
                      <p className="text-muted small mb-0">{description}</p>
                    </div>
                    {(label || cert) && (
                      <span className="badge text-bg-primary-subtle text-primary fw-semibold">
                        {label || cert}
                      </span>
                    )}
                  </div>
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
