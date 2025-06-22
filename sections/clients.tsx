import { getClients } from "@/api/data";
import PageSection from "@/components/pageSection";
import { Col, Row } from "react-bootstrap";

export interface ClientProps {
  link: string;
  img: string;
  name: string;
  prominent?: boolean;
}

const ProminentClientsSection = async () => {
  const clients: ClientProps[] = await getClients();

  return (
    <PageSection title="Prominent Clients" color="light" NoBg id="clients">
      <Row className="justify-content-center">
        {clients.map(({ img, link }, i) => (
          <Col xs={6} sm={4} md={3} lg={2} className="text-center p-5" key={i}>
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

export default ProminentClientsSection;
