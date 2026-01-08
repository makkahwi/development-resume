import { clientsList } from "@/api/hardCodedData";
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
}: JobProps) => {
  const companyLogo = clientsList.find(
    (client) => client.label === company
  )?.image;

  return (
    <div className="card">
      <div className="card-body text-center">
        <p>
          {period} |{" "}
          {companyLogo ? (
            <Image
              src={
                process.env.NEXT_PUBLIC_STORAGE_URL + companyLogo + "?alt=media"
              }
              alt={company}
              width={50}
              height={50}
            />
          ) : (
            company
          )}
          @ {location}
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
