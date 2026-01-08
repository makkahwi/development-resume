import { JobProps } from "@/types/data";

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
}: JobProps) => {
  return (
    <div className="card">
      <div className="card-body text-center">
        <p>
          {period} | {company} @ {location}
        </p>
        <h2>
          {title} <small>{type}</small>
        </h2>
        <p>{description}</p>

        <a href={url} target="_blank" rel="noopener noreferrer">
          <i className="bi bi-link" />
        </a>
      </div>
    </div>
  );
};
export default ExperienceCard;
