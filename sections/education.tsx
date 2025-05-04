import { getEducation, getJobs } from "@/api/data";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

interface props {
  page?: boolean;
}

interface EduProps {
  logo: string;
  name: string;
  school: string;
  website: string;
  desc: string;
  cert: string;
  downloads: {
    label: string;
    link: string;
  }[];
}

const EducationSection = async ({ page }: props) => {
  const education: EduProps[] = await getEducation();

  return (
    <PageSection
      title="Education"
      subtitle="Where All of This Started"
      color="dark"
      id="education"
      bg2
    >
      {education?.map(
        ({ logo, name, school, website, desc, cert, downloads }, i) => (
          <Row className="my-5 align-middle gx-5" key={i}>
            <Col md={6} className="text-white">
              <a href={website} target="_blank">
                <img src={logo} width="100%" />
              </a>
            </Col>

            <Col md={6} className="text-white mt-5">
              <Typography size={5} className="text-white">
                {school}
              </Typography>

              <Typography size={2} className="text-white my-3">
                {name}
              </Typography>

              <Typography size={6} className="text-white">
                {desc}
              </Typography>

              {/* <ButtonGroup className="mt-3 corners">
                <Button variant="light" className="px-4">
                  <a href={cert} target="_blank">
                    <FontAwesomeIcon icon={faDownload} /> Certificates
                  </a>
                </Button>

                {downloads.map(({ link, label }, y) => (
                  <Button variant="light" className="px-4" key={y}>
                    <a href={link} target="_blank">
                      {label}
                    </a>
                  </Button>
                ))}
              </ButtonGroup> */}
            </Col>
          </Row>
        )
      )}
    </PageSection>
  );
};

export default EducationSection;
