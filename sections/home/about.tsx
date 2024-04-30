"use client";

import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ReactPlayer from "react-player";

const AboutSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setShowVideo(false);
  }, []);

  return (
    <PageSection id="about">
      <Row>
        <Col md={6} className="text-center">
          {showVideo ? (
            <ReactPlayer
              url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
              light="/images/profile.jpg"
              className="rounded-5"
              width="100%"
            />
          ) : (
            <img src="/images/profile.jpg" width="70%" className="rounded-5" />
          )}
        </Col>

        <Col md={6} className="my-auto">
          <Typography size={5} justify="center" className="p-5 lh-lg">
            Passionate entrepreneur with a vision to revolutionize the edtech
            industry. Founder of Semesteer, dedicated to creating cutting-edge
            solutions to digitize schools education. Bringing 8 years of
            experience in IT jobs, corporate world and proven track record in
            bringing new products to market.
          </Typography>
        </Col>
      </Row>
    </PageSection>
  );
};

export default AboutSection;
