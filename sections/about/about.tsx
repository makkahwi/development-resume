import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

import StatisticsSection from "./statistics";

const AboutSection = () => {
  return (
    <PageSection id="about" bg2>
      <Row>
        <Col md={12} className="my-auto">
          <Typography size={5} justify="center" className="p-5 lh-lg">
            An individual with a constant passion & burning desire to keep
            exploring, learning & giving a try to things, which makes me a fit
            for the IT sector. I'm highly organized, detail-oriented and
            timing-particular, and I believe that also what makes me a good
            programmer. You may scroll down to see it for yourself.
          </Typography>
        </Col>
      </Row>

      <StatisticsSection />

      <Row>
        <Col md={12} className="my-auto text-center">
          <ButtonGroup className="corners">
            <Button variant="info" className="text-white px-4">
              <a
                href="https://firebasestorage.googleapis.com/v0/b/resume-data-8215f.appspot.com/o/Suhaib-Ahmad-WD-Resume-Sheet.pdf?alt=media"
                target="_blank"
              >
                Download Resume Sheet
              </a>
            </Button>

            <Button variant="info" className="text-white px-4">
              <a
                href="https://firebasestorage.googleapis.com/v0/b/resume-data-8215f.appspot.com/o/Suhaib%20Ahmad%20Psychometric.pdf?alt=media"
                target="_blank"
              >
                Download Psychometric Test
              </a>
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </PageSection>
  );
};

export default AboutSection;
