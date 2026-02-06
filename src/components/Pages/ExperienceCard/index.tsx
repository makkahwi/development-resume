import { clientsList } from "@/lib/data";
import { JobProps } from "@/types/data";
import Image from "next/image";

const ExperienceCard = ({
  company,
  description,
  location,
  monthsCount,
  period,
  projectsCount,
  title,
  type,
  url,
  viewEmployerLabel,
}: JobProps & { viewEmployerLabel: string }) => {
  const companyLogo = clientsList.find(
    (client) => client.label === company,
  )?.image;

  return (
    <div className="col-lg-4">
      <div className="card h-100 border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            {companyLogo && (
              <Image
                src={
                  process.env.NEXT_PUBLIC_STORAGE_URL +
                  companyLogo +
                  "?alt=media"
                }
                alt={company}
                className="me-3"
                width={50}
                height={50}
                style={{ objectFit: "contain" }}
              />
            )}
            <div className="flex-grow-1">
              <h3 className="h5 fw-bold mb-1">{title}</h3>
              <div className="text-muted small">
                <span className="me-2">
                  {companyLogo ? company : <strong>{company}</strong>}
                </span>
                <span className="me-2">•</span>
                <span className="me-2">{location}</span>
                <span className="me-2">•</span>
                <span className="badge bg-primary bg-opacity-10 text-primary">
                  {type}
                </span>
              </div>
            </div>
          </div>

          <p className="text-muted small mb-3">{period}</p>

          {/* <p className="text-muted mb-3">{description}</p> */}

          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-primary px-4 border-0 corners"
            >
              {viewEmployerLabel} <i className="fa-solid fa-arrow-right ms-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
export default ExperienceCard;
