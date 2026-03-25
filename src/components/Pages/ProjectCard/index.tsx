import { ProjectProps } from "@/types/data";
import Image from "next/image";

const ProjectCard = ({
  technologies,
  title,
  details,
  role,
  url,
  description,
  image,
  short = false,
  viewProjectLabel,
}: ProjectProps & {
  short?: boolean;
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
          {!short && <small className="fw-light text-xs mb-1">{role} @</small>}
          <h3 className="h5 fw-bold mb-3">{title}</h3>

          {!short && details ? (
            <ul className="mb-3 mh-10">
              {details.map((detail, index) => (
                <li key={index} className="">
                  {detail}
                </li>
              ))}
            </ul>
          ) : description ? (
            <p className="text-muted mb-3 flex-grow-1">{description}</p>
          ) : (
            ""
          )}

          {technologies?.length && technologies?.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mb-2">
              {technologies
                ?.filter((_, i) => (short ? i < 4 : true))
                .map((tech, index) => (
                  <small
                    key={index}
                    className="badge bg-primary bg-opacity-10 text-primary corners px-3 border-0 small"
                    style={{ fontSize: "0.6rem" }}
                  >
                    {tech}
                  </small>
                ))}
            </div>
          )}

          {!short && url && (
            <div className="mt-auto pt-3 border-top">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm w-100 px-4 border-0 corners"
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
