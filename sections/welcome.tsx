import CarouselComp from "@/components/carousel";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { Fragment } from "react";
import { CarouselCaption, Col, Row } from "react-bootstrap";

import StatisticsSection from "./about/statistics";

const WelcomeSection = () => {
  const texts = [
    "End-to-End Software Development",
    "Technical Consultation",
    "Coding Mentorship",
    "Innovating & Shaping Education Digital Solutions",
    "Entrepreneuring to Overcome Educational Challenges",
    "Entrepreneuring to Revolutionize Education Sector",
    "Investing Rechnology Passion & Experience Into Education Solutions",
  ];

  return (
    <PageSection color="white" BigPadding id="home">
      <Row
        style={{ minHeight: "70vh" }}
        className="text-info justify-content-center align-middle"
      >
        <Col xs={8} lg={4} className="text-center my-auto mx-auto">
          <img src="/images/ProfilePhoto.jpg" width="100%" />
        </Col>

        <Col xs={8} lg={6} style={{ margin: "auto" }} className="py-2 my-auto">
          <Typography
            size={1}
            className="text-uppercase text-start font display-5 mt-5 pt-3"
            color="info"
          >
            Suhaib Ahmad
          </Typography>

          <Typography size={6} color="info" className="my-4 font lh-lg">
            {
              "I help bring software ideas to life — from architecture and design to code and deployment. Whether you're building a product, seeking technical guidance, or just getting started on your coding journey, I offer help tailored to your needs."
            }
          </Typography>

          <StatisticsSection home />

          {/* <Typography size="sm" color="info" className="mt-5 lh-lg">
            Specialized in building scalable & user-focused web apps with
            javascript & typescript. Based in Jordan, but open to remote
            opportunities.
          </Typography> */}

          {/* <CarouselComp
            items={texts.map((text, i) => (
              <Fragment key={i}>
                <img src="/images/empty.png" />

                <CarouselCaption>
                  <Typography size={4} color="info">
                    {text}
                  </Typography>
                </CarouselCaption>
              </Fragment>
            ))}
          /> */}
        </Col>
      </Row>
    </PageSection>
  );
};

export default WelcomeSection;
