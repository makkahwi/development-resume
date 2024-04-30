import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import Link from "next/link";
import { Button, Col, Row } from "react-bootstrap";

const CurrentWorksSection = () => {
  return (
    <PageSection
      title="Innovative Venture"
      subtitle="Current Entrepreneurial Pursuit"
      color="info"
      id="works"
    >
      <Row className="justify-content-center">
        <Col md={6}>
          <Typography size={3} className="pb-5" color="info" justify="center">
            <a
              href="https://www.semesteer.com/"
              target="_blank"
              className="text-decoration-none text-inherit"
            >
              <img src="/images/semesteer.png" width="75%" />
            </a>
          </Typography>
        </Col>

        <Col md={12} className="my-5 text-center">
          <Link href="/projects">
            <Button variant="light">Read More</Button>
          </Link>
        </Col>
      </Row>
    </PageSection>
  );
};

export default CurrentWorksSection;
