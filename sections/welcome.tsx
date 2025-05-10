import CarouselComp from "@/components/carousel";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { Fragment } from "react";
import { CarouselCaption, Col, Row } from "react-bootstrap";

const WelcomeSection = () => {
  const texts = [
    "Senior Full-Stack Developer",
    "Technical & Product Development Consultant",
    "Career Starting Assistant",
    "Innovating & Shaping Education Digital Solutions",
    "Entrepreneuring to Overcome Educational Challenges",
    "Entrepreneuring to Revolutionize Education Sector",
    "Investing Rechnology Passion & Experience Into Education Solutions",
  ];

  return (
    <PageSection color="dark" NoBg id="home">
      <Row
        style={{ minHeight: "70vh" }}
        className="text-white justify-content-center"
      >
        <Col xs={8} lg={4} style={{ margin: "auto" }} className="text-center">
          <img src="/images/ProfilePhoto.jpg" width="100%" />
        </Col>

        <Col xs={8} lg={6} style={{ margin: "auto" }} className="py-5">
          <Typography
            size={1}
            className="pb-4 text-uppercase text-start font"
            color="white"
            style={{ fontSize: "3.5vw" }}
          >
            Suhaib Ahmad
          </Typography>

          <Typography size={4} color="white" className="mb-5 font">
            {texts[0]}
            <br /> <br />
            {texts[1]}
            <br /> <br />
            {texts[2]}
          </Typography>

          <Typography size="sm" color="white" className="mt-5 lh-lg">
            Specialized in building scalable & user-focused web apps with
            javascript & typescript. Based in Jordan, but open to remote
            opportunities.
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
      </Row>
    </PageSection>
  );
};

export default WelcomeSection;
