import { ProjectProps } from "@/types/data";
import Image from "next/image";

const ProjectCard = ({
  technologies,
  title,
  description,
  url,
  image,
  short = false,
  technologiesLabel,
  viewProjectLabel,
}: ProjectProps & {
  short?: boolean;
  technologiesLabel: string;
  viewProjectLabel: string;
}) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card bg-light h-100 border-0 shadow-sm">
        {image && image.length > 0 && (
          <Image
            src={process.env.NEXT_PUBLIC_STORAGE_URL + image + "?alt=media"}
            alt={title}
            className="card-img-top"
            width={400}
            height={300}
            style={{ objectFit: "cover", height: "200px" }}
          />
        )}
        <div className="card-body d-flex flex-column">
          <h3 className="h5 fw-bold mb-3">{title}</h3>

          {!short && description && (
            <p className="text-muted mb-3 flex-grow-1">{description}</p>
          )}

          {technologies?.length && technologies?.length > 0 && (
            <div className="mb-3">
              {!short && (
                <h6 className="text-uppercase small fw-semibold text-secondary mb-2">
                  {technologiesLabel}
                </h6>
              )}
              <div className="d-flex flex-wrap gap-2">
                {technologies?.map((tech, index) => (
                  <span
                    key={index}
                    className="badge bg-primary bg-opacity-10 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {url && (
            <div className="mt-auto pt-3 border-top">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary btn-sm w-100"
              >
                {viewProjectLabel}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
