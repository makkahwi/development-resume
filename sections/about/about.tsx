import PageButton from "@/components/PageButton";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { faJs, faNodeJs, faReact } from "@fortawesome/free-brands-svg-icons";
import {
  faBrain,
  faCode,
  faDownload,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

import StatisticsSection from "./statistics";

interface props {
  home?: boolean;
}

const AboutSection = async ({ home }: props) => {
  return (
    <PageSection id="about" bg2 color={home ? "light" : "white"}>
      <StatisticsSection home={home} />

      {home ? (
        <PageButton link="/about" text="More Of Me" />
      ) : (
        <Row>
          <Col md={12} className="my-auto">
            <Typography size={5} className="py-3 lh-lg">
              With nearly a decade of experience in{" "}
              <span className="text-info">
                <FontAwesomeIcon icon={faCode} /> web development{" "}
                <FontAwesomeIcon icon={faCode} />{" "}
              </span>
              , I specialize in{" "}
              <b>
                building performant, scalable, and user-centric web
                applications.
              </b>{" "}
              I’ve grown from{" "}
              <span style={{ color: "#61dafb" }}>
                <FontAwesomeIcon icon={faRocket} /> front-end
              </span>{" "}
              foundations into full-stack leadership — balancing clean code,
              intuitive UX, and product thinking.
            </Typography>

            <Typography size={5} className="py-3 lh-lg">
              My focus since 2020 has been on{" "}
              <span style={{ color: "#323330" }}>
                <FontAwesomeIcon icon={faJs} /> JavaScript
              </span>
              ,{" "}
              <span style={{ color: "#3178C6" }}>
                <FontAwesomeIcon icon={faJs} /> TypeScript
              </span>
              , and modern frameworks like{" "}
              <span style={{ color: "#61dafb" }}>
                <FontAwesomeIcon icon={faReact} /> React.Js
              </span>
              ,{" "}
              <span>
                <FontAwesomeIcon icon={faReact} /> Next.Js
              </span>{" "}
              and{" "}
              <span style={{ color: "#E0234E" }}>
                <FontAwesomeIcon icon={faNodeJs} /> Nest.Js
              </span>
              , backed by hands-on work in both{" "}
              <span style={{ color: "#61dafb" }}>
                <FontAwesomeIcon icon={faRocket} /> client
              </span>{" "}
              and{" "}
              <span style={{ color: "#E0234E" }}>
                <FontAwesomeIcon icon={faBrain} /> backend
              </span>{" "}
              environments.
            </Typography>

            <Typography size={5} className="py-3 lh-lg">
              Been part of startups for most of the time, but also tested
              working with small firms & big cooperations. I've led development
              efforts, contributed to open-source, and overseen product
              deliverables — always aiming to turn ideas into impactful
              software. I'm driven by curiosity, quality, and collaborative
              problem-solving.
            </Typography>
          </Col>

          <Col md={12} className="my-auto text-center mt-5">
            <ButtonGroup className="corners font">
              <Button
                variant="info"
                className="text-white px-4"
                href="https://firebasestorage.googleapis.com/v0/b/resume-data-8215f.appspot.com/o/Suhaib-Ahmad-ATS-Resume-Sheet.pdf?alt=media"
                target="_blank"
              >
                <FontAwesomeIcon icon={faDownload} /> ATS-Friendly Resume
              </Button>

              <Button
                variant="info"
                className="text-white px-4"
                href="https://firebasestorage.googleapis.com/v0/b/resume-data-8215f.appspot.com/o/Suhaib-Ahmad-UI-Resume-Sheet.pdf?alt=media"
                target="_blank"
              >
                <FontAwesomeIcon icon={faDownload} /> User-Friendly Resume
              </Button>

              <Button
                variant="info"
                className="text-white px-4"
                href="https://firebasestorage.googleapis.com/v0/b/resume-data-8215f.appspot.com/o/Suhaib%20Ahmad%20Psychometric.pdf?alt=media"
                target="_blank"
              >
                <FontAwesomeIcon icon={faDownload} /> Download Psychometric Test
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      )}
    </PageSection>
  );
};

export default AboutSection;
