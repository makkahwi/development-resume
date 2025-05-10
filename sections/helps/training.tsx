import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import {
  faCode,
  faHandshake,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";

const TrainingSection = async () => {
  return (
    <PageSection
      title="Training Beginners"
      subtitle="Aspiring to Become a Developer But Unsure Where to Start?"
      id="training"
      color="light"
      bg2
    >
      <Row className="my-5 align-middle gx-5">
        <Col md={2} className="text-info text-center">
          <FontAwesomeIcon icon={faRocket} className="display-1 my-3" />
        </Col>

        <Col md={10} className="text-info">
          <Typography size={4} className="text-info lh-lg">
            I offer guided, self-paced training paths through real open-source
            projects — designed to help you build skills and land your first
            coding job.
          </Typography>
        </Col>

        <Col md={2} className="text-info text-center">
          <FontAwesomeIcon icon={faHandshake} className="display-1" />
        </Col>

        <Col md={10} className="text-info">
          <Typography size={4} className="text-info lh-lg">
            It’s a free, win-win collaboration: you gain experience, I support
            your growth. Scroll down to get in touch or book a session.
          </Typography>
        </Col>
      </Row>
    </PageSection>
  );
};

export default TrainingSection;
