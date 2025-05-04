import { getJobProjects, getJobs } from "@/api/data";
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
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

import { JobProps } from "./education";
import { ProjectProps } from "./works/works";

const CareerSection = async () => {
  const careers: JobProps[] = await getJobs();
  const works: ProjectProps[] = await getJobProjects();

  const JobBox = ({
    company = "",
    website = "",
    description = "",
    location = "",
    title = "",
    type = "",
    period = "",
  }) => {
    const projects = works?.filter(
      ({ category, ...rest }) =>
        (category === "Web Apps" || category === "Landing Pages") &&
        rest.company === company
    );

    return (
      <div
        className="bg-white text-white my-1 p-4 pb-2"
        id={company.replaceAll(" ", "_")}
      >
        <Row>
          <Col xs={7}>
            <Typography size={6} color="info">
              {period}
            </Typography>
          </Col>

          <Col xs={5}>
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
          </Col>

          <Col xs={10} className="my-3">
            <Typography size={5} color="info" className="font">
              {title}
            </Typography>
          </Col>

          <Col xs={2} className="my-3">
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
          </Col>

          <Col xs={7}>
            <Typography size={6} color="info">
              <FontAwesomeIcon icon={faClock} /> {type}
            </Typography>
          </Col>

          <Col xs={description.length ? 4 : 5}>
            <Typography size={6} color="info">
              <FontAwesomeIcon icon={faLocationPin} /> {location}
            </Typography>
          </Col>

          {description.length ? (
            <Col xs={1}>
              <OverlayTrigger overlay={<Tooltip>{description}</Tooltip>}>
                <Typography size={6} color="info">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </Typography>
              </OverlayTrigger>
            </Col>
          ) : (
            ""
          )}

          {projects.length ? (
            <Col xs={12}>
              <Typography size={6} color="info" className="mt-3">
                Projects |{" "}
                {projects?.map(({ title, shortTitle }, i) => (
                  <OverlayTrigger overlay={<Tooltip>{title}</Tooltip>}>
                    <a href={"#" + title.replaceAll(" ", "_")} key={i}>
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
        </Row>
      </div>
    );
  };

  const CareerSlide = ({ jobs }: { jobs: {}[] }) => (
    <div className="m-5">
      <Row>
        {jobs?.map((job, i) => (
          <Col md={4} className="p-2 d-flex" key={i}>
            <JobBox {...job} />
          </Col>
        ))}
      </Row>
    </div>
  );

  return (
    <PageSection
      title="Experiences"
      subtitle="Navigating Career"
      color="info"
      id="experiences"
    >
      {careers
        .filter(({ title }) => title === "Web Development")
        .map((career, i) => (
          <CareerSlide {...career} key={i} />
        ))}
    </PageSection>
  );
};

export default CareerSection;
