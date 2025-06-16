import PageSection from "@/components/pageSection";
import { Col, Row } from "react-bootstrap";

const HappyClientsSection = () => {
  const clients = [
    {
      link: "https://www.modee.gov.jo/",
      img: "modee.png",
    },
    {
      link: "https://www.startupsjo.com/en/Pages/CustomPages/Startup/409",
      img: "agile.png",
    },
    {
      link: "https://www.arabwork.com/",
      img: "arabwork.png",
    },
    {
      link: "https://capitalcloud.sa/",
      img: "capitalcloud.png",
    },
    {
      link: "https://www.dls.gov.jo/",
      img: "dls.png",
    },
    {
      link: "https://www.shai.sa/ar",
      img: "shai.png",
    },
    {
      link: "https://nutrifatima.com/",
      img: "fatima.png",
    },
    {
      link: "https://www.logatta.com/",
      img: "logatta.png",
    },
    {
      link: "https://www.luxtag.io/",
      img: "luxtag.png",
    },
    {
      link: "http://rasmiandkiwan.com/",
      img: "r&k.png",
    },
  ];

  return (
    <PageSection title="Happy Clients" color="light" NoBg id="clients">
      <Row className="justify-content-center">
        {clients.map(({ img, link }, i) => (
          <Col md={2} className="text-center p-5" key={i}>
            <a href={link} target="_blank" className="text-decoration-none">
              <img
                src={`https://firebasestorage.googleapis.com/v0/b/resume-data-8215f.appspot.com/o/${img}?alt=media`}
                className="w-100"
              />
            </a>
          </Col>
        ))}
      </Row>
    </PageSection>
  );
};

export default HappyClientsSection;
