import { getContacts } from "@/api/data";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { iconMap } from "@/consts/functions";
import { ContactProps } from "@/layout/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "react-bootstrap";

import ContactForm from "./contactForm";

const CtaSection = async () => {
  const contacts: ContactProps[] = await getContacts();

  return (
    <PageSection
      title="Get in Touch"
      subtitle="Let's collaborate on something great"
      color="light"
      card
      id="contact"
      BigPadding
    >
      <Row>
        {contacts.map(({ name, icon, link, color, label }, i) => (
          <Col md={3} key={i}>
            <Button
              style={{ backgroundColor: color }}
              className="w-100 p-3 my-3 border-0 corners"
              href={link}
              target="_blank"
            >
              <Typography size={5} justify="center" color="white">
                <FontAwesomeIcon icon={iconMap[icon]} /> {label}
              </Typography>
            </Button>
          </Col>
        ))}

        <Col md={12} className="text-center">
          <Typography
            size={3}
            justify="center"
            className="my-5 font"
            color="dark"
          >
            Or Book A Discovery Call
          </Typography>

          <Button
            className="w-50 p-3 mb-3 border-0 corners bg-info text-white "
            href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ11WXpxIUv7ZmQSrHHpc5EhskFJ6_ROebTBChnDRYsMHfimOX40-KTTadUm2qH4DtYyO1957aIj"
            target="_blank"
          >
            Up To 1 Hour Discussion
          </Button>
        </Col>

        <Col md={12}>
          <Typography
            size={3}
            justify="center"
            className="my-5 font"
            color="dark"
          >
            Or Fill Up A Form
          </Typography>

          <ContactForm />
        </Col>
      </Row>
    </PageSection>
  );
};

export default CtaSection;
