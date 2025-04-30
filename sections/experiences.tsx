import { getJobs } from "@/api/data";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { Button, Col, Row } from "react-bootstrap";

import { JobProps } from "./education";

const CareerSection = async () => {
  const careers: JobProps[] = await getJobs();

  const JobBox = ({
    company = "",
    website = "",
    description = "",
    title = "",
    type = "",
    period = "",
  }) => (
    <div className="bg-white text-white my-1 p-4">
      <Typography size={6} color="info">
        {period + " @ "}
        {website ? (
          <Button
            variant="info"
            className="text-white m-0 px-1 py-0"
            href={website}
            target="_blank"
          >
            {company}
          </Button>
        ) : (
          company
        )}
      </Typography>

      <Typography size={5} color="info" className="my-3">
        {title}
      </Typography>

      <Typography size={6} color="info">
        {type + " " + description}
      </Typography>
    </div>
  );

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
