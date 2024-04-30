import { getJobs } from "@/api/data";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { faDownload, faV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

interface props {
  page?: boolean;
}

export interface JobProps {
  desc: string[];
  icon: string;
  title: string;
  jobs: {
    company: string;
    description: string;
    monthsCount: number;
    period: string;
    projectsCount: number;
    title: string;
    type: string;
    website: string;
  }[];
}

const EducationSection = async ({ page }: props) => {
  const careers: JobProps[] = await getJobs();

  const skills = [
    {
      logo: "https://vitejs.dev/",
      name: "6-Month Training Camp",
      school: "ASAC of LTUC College (Jordan)",
      website: "https://www.ltuc.com/",
      desc: "Python Based Web Dev (Code Fellows Curriculum)",
      cert: "https://vitejs.dev/",
    },
    {
      logo: "https://vitejs.dev/",
      name: "Bachelor of Computer Science",
      school: "International Islamic University Malaysia",
      website: "https://www.iium.edu.my/",
      desc: "Specialized in Data Science and Computational Intelligence",
      cert: "https://vitejs.dev/",
    },
  ];

  return (
    <PageSection
      title="Education"
      subtitle="Where All of This Started"
      color="secondary"
      id="education"
    >
      {skills.map(({ logo, name, school, website, desc, cert }, i) => (
        <Row className="my-5" key={i}>
          <Col md={6} className="text-white">
            <a href={website} target="_blank">
              <img src={logo} width="100%" />
            </a>
          </Col>

          <Col md={6} className="text-white">
            <Typography size={5} className="text-white">
              {school}
            </Typography>

            <Typography size={2} className="text-white my-3">
              {name}
            </Typography>

            <Typography size={6} className="text-white">
              {desc}
            </Typography>

            <a href={cert} target="_blank">
              <Button variant="light" className="mt-3">
                <FontAwesomeIcon icon={faDownload} /> Certificate
              </Button>
            </a>
          </Col>
        </Row>
      ))}
    </PageSection>
  );
};

export default EducationSection;
