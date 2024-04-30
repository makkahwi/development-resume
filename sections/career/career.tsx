import { getJobs } from "@/api/data";
import CardComp from "@/components/Card";
import CarouselComp from "@/components/carousel";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import { JobProps } from "../home/background";

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
    <div className="bg-info text-white my-1 p-4 rounded-5">
      <Typography size={6} color="white">
        {period + " @ "}
        {website ? (
          <a
            href={website}
            target="_blank"
            className="text-decoration-none text-inherit"
          >
            {company}
          </a>
        ) : (
          company
        )}
      </Typography>

      <Typography size={5} color="white" className="my-3">
        {title}
      </Typography>

      <Typography size={6} color="white">
        {type + " " + description}
      </Typography>
    </div>
  );

  const CareerSlide = ({
    title,
    desc,
    icon,
    jobs,
  }: {
    title: string;
    desc: string[];
    icon: any;
    jobs: {}[];
  }) => (
    <CardComp color="info">
      <Typography size={3} justify="center" color="info" className="mt-5">
        <FontAwesomeIcon icon={icon} /> {title}
        <div className="m-5">
          <Row>
            {jobs?.map((job, i) => (
              <Col md={4} className="p-2 d-flex" key={i}>
                <JobBox {...job} />
              </Col>
            ))}
          </Row>
        </div>
      </Typography>
    </CardComp>
  );

  return (
    <PageSection title="Careers" subtitle="Navigating Careers and Experiences">
      <CarouselComp
        controls
        indicators
        items={careers.map((career, i) => (
          <CareerSlide {...career} key={i} />
        ))}
        dark
      />
    </PageSection>
  );
};

export default CareerSection;
