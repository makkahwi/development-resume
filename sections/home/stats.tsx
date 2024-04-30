import CardComp from "@/components/Card";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { Col, Row } from "react-bootstrap";

const StatsSection = () => {
  const stats = [
    { text: "Experience Years", count: 8 },
    { text: "Solutions Designed", count: 15 },
    { text: "Products Built", count: 25 },
    { text: "Open-Source Contributions", count: 100 },
  ];

  return (
    <PageSection>
      <Row>
        {stats.map(({ text, count }, i) => (
          <Col md={3} key={i}>
            <CardComp color="transparent">
              <Typography size={2} justify="center" style={{ fontSize: "3vw" }}>
                {count}
              </Typography>

              <Typography size={3} justify="center">
                {text}
              </Typography>
            </CardComp>
          </Col>
        ))}
      </Row>
    </PageSection>
  );
};

export default StatsSection;
