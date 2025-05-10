import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import {
  faHandHoldingHand,
  faHandshake,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";

const IntroSection = async () => {
  return (
    <PageSection
      title="Helping Others"
      subtitle="No Expected Return"
      id="intro"
      color="light"
      bg2
    >
      <Row className="my-5 align-middle gx-5">
        <Col md={3} className="text-info text-center">
          <FontAwesomeIcon icon={faHeart} className="display-1 my-3" />{" "}
          <FontAwesomeIcon icon={faHandshake} className="display-1 my-3" />{" "}
          <FontAwesomeIcon
            icon={faHandHoldingHand}
            className="display-1 my-3"
          />
        </Col>

        <Col md={9} className="text-info">
          <Typography size={4} className="text-info lh-lg">
            Life isn't only about making money, or doing something and expect
            materialistic returns, one could do something out of{" "}
            <b> payback and favour return </b> to community.
          </Typography>
        </Col>
      </Row>
    </PageSection>
  );
};

export default IntroSection;
