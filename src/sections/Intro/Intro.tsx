import PageSection from "@/components/PageSection";
import { Col, Row } from "react-bootstrap";

import NumberCounters from "./Numbers";

const AboutIntroSection = () => {
  return (
    <PageSection id="about">
      <Col lg={6} className="my-auto">
        <iframe
          src="https://www.youtube.com/embed/JxHy8wEhrEg"
          width="100%"
          style={{ minHeight: "350px" }}
        />
      </Col>

      <Col lg={6} className="my-auto">
        <h5 className="text-block text-dark">
          An individual with a constant passion & burning desire to keep
          exploring, learning & giving a try to things, which makes me a fit for
          the IT sector. I'm highly organized, detail-oriented and
          timing-particular, and I believe that also what makes me a good
          programmer. You may scroll down to see it for yourself, and you may
          also download my...
        </h5>
      </Col>

      <Col lg={12} className="mt-5">
        <Row className="justify-content-between py-auto px-5">
          <NumberCounters />
        </Row>
      </Col>
    </PageSection>
  );
};

export default AboutIntroSection;