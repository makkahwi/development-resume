import CarouselComp from "@/components/carousel";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { Fragment } from "react";
import { CarouselCaption, Col, Row } from "react-bootstrap";

const WelcomeSection = () => {
  const texts = [
    "Senior Full-Stack Developer",
    "Innovating & Shaping Education Digital Solutions",
    "Entrepreneuring to Overcome Educational Challenges",
    "Entrepreneuring to Revolutionize Education Sector",
    "Investing Rechnology Passion & Experience Into Education Solutions",
  ];

  return (
    <PageSection color="dark" NoBg id="home">
      <Row
        style={{ minHeight: "70vh" }}
        className="text-white justify-content-between"
      >
        <Col lg={6} style={{ margin: "auto 0" }} className="py-5">
          <Typography
            size={1}
            className="pb-4"
            color="white"
            style={{ fontSize: "3.5vw" }}
          >
            Suhaib Ahmad
          </Typography>

          <Typography size={4} color="white">
            {texts[0]}
          </Typography>

          {/* <CarouselComp
            items={texts.map((text, i) => (
              <Fragment key={i}>
                <img src="/images/empty.png" />

                <CarouselCaption>
                  <Typography size={4} color="white">
                    {text}
                  </Typography>
                </CarouselCaption>
              </Fragment>
            ))}
          /> */}
        </Col>

        <Col lg={4} style={{ margin: "auto 0" }} className="text-center">
          <img src="/images/profile.jpg" width="100%" className="rounded-5" />
        </Col>
      </Row>
    </PageSection>
  );
};

export default WelcomeSection;
