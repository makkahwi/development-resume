import Image from "next/image";

export interface ProjectProps {
  technologies: string[];
  title: string;
  description: string;
  url?: string;
  image: string;
}

const ProjectCard = ({
  technologies,
  title,
  description,
  url,
  image,
  short = true,
}: ProjectProps & { short?: boolean }) => {
  return (
    <div className="card">
      <div className="card-body text-center">
        <Image src={image} alt={title} width={400} height={400} />

        {technologies.length > 0 && (
          <div className="mb-3">
            {technologies.map((tech, index) => (
              <span key={index} className="badge bg-secondary me-1">
                {tech}
              </span>
            ))}
          </div>
        )}

        <h2>{title}</h2>
        {!short && <p>{description}</p>}

        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <i className="bi bi-link-45deg" />
          </a>
        )}
      </div>
    </div>
  );
};
export default ProjectCard;
