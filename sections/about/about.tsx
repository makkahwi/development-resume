import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { Col, Row } from "react-bootstrap";
import StatisticsSection from "./statistics";

const AboutSection = () => {
  return (
    <PageSection id="about">
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
    </PageSection>
  );
};

export default AboutSection;
