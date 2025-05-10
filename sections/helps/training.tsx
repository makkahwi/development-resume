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
      subtitle="You Need To Be Self-Motivated"
      id="training"
      color="light"
      bg2
    >
      <Row className="my-5 align-middle gx-5">
        <Col md={2} className="text-info text-center">
          <FontAwesomeIcon icon={faCode} className="display-1" />

          <br />

          <FontAwesomeIcon icon={faRocket} className="display-1 my-3" />

          <br />

          <FontAwesomeIcon icon={faHandshake} className="display-1" />
        </Col>

        <Col md={10} className="text-info">
          <Typography size={4} className="text-info lh-lg">
            If you are already interested in becoming a coder / developer, but
            finding some difficulty in deciding where is the start point, or
            just need some external factors of pushing, motivations and follow
            ups so you would be able to move. I could help you with having as
            many as you need of guided self-training course path so you
            penetrate the field and ease getting your first coding job.
          </Typography>

          <Typography size={4} className="text-info lh-lg">
            What I'd offer you is money-free win-win deal of developing
            open-source products that both we'll benefit from in various ways.
            After several successful cases I've been through, I'm sure we really
            could be a help for each other. Soon I'll share those cases to see
            for yourself. Scroll down to contacts so you either reach me out, or
            booking a session right away.
          </Typography>
        </Col>
      </Row>
    </PageSection>
  );
};

export default TrainingSection;
