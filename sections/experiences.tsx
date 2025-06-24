import { getJobProjects, getJobs } from "@/api/data";
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

interface props {
  home?: boolean;
}

const CareerSection = async ({ home }: props) => {
  const careers: JobProps[] = await getJobs();
  const works: ProjectProps[] = await getJobProjects();

  return (
    <PageSection
      title="Experiences"
      subtitle="Navigating Career"
      color={home ? "info" : undefined}
      id="experiences"
    >
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <ul className="timeline-3">
              {careers
                .find(({ title }) => title === "Web Development")
                ?.jobs.map(
                  (
                    {
                      title,
                      company,
                      website,
                      description,
                      location,
                      type,
                      period,
                    },
                    i
                  ) => {
                    const projects = works?.filter(
                      ({ category, ...rest }) =>
                        (category === "Web Apps" ||
                          category === "Landing Pages") &&
                        rest.company === company
                    );

                    return (
                      <li className="row border-bottom">
                        <div className="col-md-6">
                          <small>{period}</small>
                        </div>

                        <div className="col-md-6">
                          <Typography size={6} color="info" justify="end">
                            {website ? (
                              <a
                                className="text-decoration-none"
                                href={website}
                                target="_blank"
                              >
                                <FontAwesomeIcon icon={faLink} /> {company}
                              </a>
                            ) : (
                              company
                            )}
                          </Typography>
                        </div>

                        <div className="col-md-12">
                          <h5 className="mt-3 mb-4">{title}</h5>
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
                          <Typography size={5} color="info" className="font">
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
                              <FontAwesomeIcon icon={faCode} />
                            </OverlayTrigger>
                          </Typography>
                        </div>

                        <div className="col-md-3">
                          {description.length ? (
                            <Col xs={1}>
                              <OverlayTrigger
                                overlay={<Tooltip>{description}</Tooltip>}
                              >
                                <Typography size={6} color="info">
                                  <FontAwesomeIcon icon={faInfoCircle} />
                                </Typography>
                              </OverlayTrigger>
                            </Col>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="col-md-12">
                          {projects.length ? (
                            <Col xs={12}>
                              <Typography
                                size={6}
                                color="info"
                                className="mt-3"
                              >
                                Projects |{" "}
                                {projects?.map(({ title, shortTitle }, i) => (
                                  <OverlayTrigger
                                    overlay={<Tooltip>{title}</Tooltip>}
                                  >
                                    <a
                                      href={"#" + title.replaceAll(" ", "_")}
                                      className="text-decoration-none"
                                      key={i}
                                    >
                                      {shortTitle || title}
                                      {i === projects.length - 1 ? "" : " "}
                                    </a>
                                  </OverlayTrigger>
                                ))}
                              </Typography>
                            </Col>
                          ) : (
                            ""
                          )}
                        </div>
                      </li>
                    );
                  }
                )}
            </ul>
          </div>
        </div>
      </div>

      {home && <PageButton link="/works" text="More Details" light />}
    </PageSection>
  );
};

export default CareerSection;
