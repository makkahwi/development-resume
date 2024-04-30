import { getJobs } from "@/api/data";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

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
      logo: "https://firebasestorage.googleapis.com/v0/b/resume-data-8215f.appspot.com/o/LTUC.png?alt=media&token=0861e72f-6869-4a5d-998a-76da75acb347",
      name: "6-Month Training Camp",
      school: "ASAC of LTUC College (Jordan)",
      website: "https://www.ltuc.com/",
      desc: "Python Based Web Dev (Code Fellows Curriculum)",
      cert: "https://firebasestorage.googleapis.com/v0/b/resume-data-8215f.appspot.com/o/Scroll.pdf?alt=media&token=b2c8e784-f491-4852-b732-e9ba2a2eeb02",
      downloads: [
        {
          label: "Individual Works",
          link: "https://github.com/makkahwi/asac-works",
        },
        {
          label: "Midterm",
          link: "https://silent-speakers.github.io/silent-speakers/",
        },
        {
          label: "Final",
          link: "https://tadreebi.netlify.app/",
        },
      ],
    },
    {
      logo: "https://firebasestorage.googleapis.com/v0/b/resume-data-8215f.appspot.com/o/IIUM.png?alt=media&token=cd8fc1bb-7a2a-42f0-ab69-160f39b41168",
      name: "Bachelor of Computer Science",
      school: "International Islamic University Malaysia",
      website: "https://www.iium.edu.my/",
      desc: "Specialized in Data Science and Computational Intelligence",
      cert: "https://firebasestorage.googleapis.com/v0/b/resume-data-8215f.appspot.com/o/Scroll.pdf?alt=media&token=b2c8e784-f491-4852-b732-e9ba2a2eeb02",
      downloads: [
        {
          label: "FYP Project",
          link: "https://github.com/makkahwi/iDecide",
        },
      ],
    },
  ];

  return (
    <PageSection
      title="Education"
      subtitle="Where All of This Started"
      color="secondary"
      id="education"
    >
      {skills.map(
        ({ logo, name, school, website, desc, cert, downloads }, i) => (
          <Row className="my-5 gx-5" key={i}>
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

              <ButtonGroup className="mt-3">
                <Button variant="light">
                  <a href={cert} target="_blank">
                    <FontAwesomeIcon icon={faDownload} /> Certificates
                  </a>
                </Button>

                {downloads.map(({ link, label }, y) => (
                  <Button variant={"light"} key={y}>
                    <a href={link} target="_blank">
                      {label}
                    </a>
                  </Button>
                ))}
              </ButtonGroup>
            </Col>
          </Row>
        )
      )}
    </PageSection>
  );
};

export default EducationSection;
