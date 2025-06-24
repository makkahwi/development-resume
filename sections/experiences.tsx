import { getClients, getJobProjects, getJobs } from "@/api/data";
import PageButton from "@/components/PageButton";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import {
  faClock,
  faCode,
  faInfoCircle,
  faLink,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, OverlayTrigger, Tooltip } from "react-bootstrap";

import { JobProps } from "./about/statistics";
import { ProjectProps } from "./works/works";
import { ClientProps } from "./clients";

interface props {
  home?: boolean;
}

const CareerSection = async ({ home }: props) => {
  const careers: JobProps[] = await getJobs();
  const works: ProjectProps[] = await getJobProjects();
  const clients: ClientProps[] = await getClients();

  return (
    <PageSection
      title="Experiences"
      subtitle="Navigating Career"
      color={home ? "info" : undefined}
      id="experiences"
    >
      <ul className="timeline-3">
        {careers
          .find(({ title }) => title === "Web Development")
          ?.jobs.map(
            (
              { title, company, website, description, location, type, period },
              i
            ) => {
              const projects = works?.filter(
                ({ category, ...rest }) =>
                  (category === "Web Apps" || category === "Landing Pages") &&
                  rest.company === company
              );

              const owner = clients.find(({ name }) => name === company);

              const CompanyView = () =>
                owner?.img ? (
                  <img
                    src={`https://firebasestorage.googleapis.com/v0/b/resume-data-8215f.appspot.com/o/${owner?.img}?alt=media`}
                    height="75px"
                  />
                ) : (
                  company
                );

              return (
                <li
                  id={company}
                  className={`timeline-item ${
                    i % 2 === 1 ? "timeline-inverted" : ""
                  }`}
                  key={i}
                >
                  <div className="timeline-panel row">
                    <div className="col-md-12">
                      <small
                        className={
                          "text-muted d-block " +
                          (i % 2 === 0 ? "float-end" : "")
                        }
                      >
                        {period}
                      </small>
                    </div>

                    <div className="col-md-12">
                      <h5 className="mt-3 mb-4">
                        {title} @{" "}
                        {website ? (
                          <a
                            href={website}
                            target="_blank"
                            className="text-decoration-none"
                          >
                            <CompanyView />
                          </a>
                        ) : (
                          <CompanyView />
                        )}
                      </h5>
                    </div>

                    <div className="col-md-3">
                      <Typography size={6} color="info">
                        <FontAwesomeIcon icon={faClock} /> {type}
                      </Typography>
                    </div>

                    <div className="col-md-3">
                      <Typography size={6} color="info">
                        <FontAwesomeIcon icon={faLocationPin} /> {location}
                      </Typography>
                    </div>

                    <div className="col-md-3">
                      <Typography size={6} color="info" className="font">
                        <OverlayTrigger
                          overlay={
                            <Tooltip>
                              {projects
                                .reduce<string[]>(
                                  (final, { technologies }) => [
                                    ...final,
                                    ...technologies.filter(
                                      (tech) => !final.includes(tech)
                                    ),
                                  ],
                                  []
                                )
                                .join(", ")}
                            </Tooltip>
                          }
                        >
                          <span>
                            <FontAwesomeIcon icon={faCode} /> Tech
                          </span>
                        </OverlayTrigger>
                      </Typography>
                    </div>

                    <div className="col-md-3">
                      {description && (
                        <OverlayTrigger
                          overlay={<Tooltip>{description}</Tooltip>}
                        >
                          <Typography size={6} color="info">
                            <FontAwesomeIcon icon={faInfoCircle} /> Details
                          </Typography>
                        </OverlayTrigger>
                      )}
                    </div>

                    <div className="col-md-12">
                      {projects.length > 0 && (
                        <Typography size={6} color="info" className="mt-3">
                          Projects |{" "}
                          {projects.map(({ title, shortTitle }, j) => (
                            <OverlayTrigger
                              key={j}
                              overlay={<Tooltip>{title}</Tooltip>}
                            >
                              <a
                                href={`#${title.replaceAll(" ", "_")}`}
                                className="text-decoration-none me-2"
                              >
                                {shortTitle || title}
                              </a>
                            </OverlayTrigger>
                          ))}
                        </Typography>
                      )}
                    </div>
                  </div>
                </li>
              );
            }
          )}
      </ul>

      {home && <PageButton link="/works" text="More Details" light />}
    </PageSection>
  );
};

export default CareerSection;
