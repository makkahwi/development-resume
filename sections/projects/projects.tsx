import { getProjects } from "@/api/data";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";

const ProjectsSection = async () => {
  const projects = await getProjects();

  return (
    <Fragment>
      {projects.map(({ link = "", img = "", texts = [""] }, i = 0) => (
        <PageSection color={i % 2 === 0 ? "info" : "secondary"} key={i}>
          <Row className="align-items-center">
            <Col
              md={6}
              className={
                (i % 2 === 0 ? "order-md-1" : "order-md-2") + " text-center"
              }
            >
              <a href={link} target="_blank">
                <img src={img} width="75%" />
              </a>
            </Col>

            <Col
              md={6}
              className={
                (i % 2 === 0 ? "order-md-2" : "order-md-1") + " text-center"
              }
            >
              {texts.map((text, y) => (
                <Typography size={4} className="my-5" color="white" key={y}>
                  {text}
                </Typography>
              ))}
            </Col>
          </Row>
        </PageSection>
      ))}
    </Fragment>
  );
};

export default ProjectsSection;
