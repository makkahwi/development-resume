"use client";

import { sendContacts } from "@/api";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { socialLinksList } from "@/consts/data";
import {
  Alert,
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  Row,
} from "react-bootstrap";

const CtaSection = () => {
  const [sent, setSent] = useState("");

  const formInputs = [
    { name: "name", title: "Name", required: true },
    { name: "org", title: "Organization", required: false },
    { name: "email", title: "Email", required: true },
    { name: "phone", title: "Phone", required: false },
    {
      name: "message",
      title: "Message",
      required: true,
      fullWidth: true,
      type: "textarea",
    },
  ];

  const onSubmit = (e: any) => {
    e.preventDefault();
    const data = formInputs.reduce((final, current) => {
      const value = e.target[current.name]["value"];
      return {
        ...final,
        [current.name]: value,
      };
    }, {});

    sendContacts({ ...data, timestamp: new Date() }).then(() =>
      setSent("done")
    );
  };

  return (
    <PageSection
      title="Get in Touch"
      subtitle="Connect with Me"
      color="primary"
      card
      id="contact"
      NoBg
    >
      <Row>
        {socialLinksList.map(({ name, icon, link, color, label }, i) => (
          <Col md={3} key={i}>
            <a href={link} target="_blank">
              <Button
                style={{ backgroundColor: color }}
                className="w-100 p-3 my-3 border-0"
              >
                <Typography size={5} justify="center" color="white">
                  <FontAwesomeIcon icon={icon} /> {label}
                </Typography>
              </Button>
            </a>
          </Col>
        ))}

        <Col md={12}>
          <Typography size={3} justify="center" className="my-5" color="dark">
            Or Reach Me Here
          </Typography>

          <Form onSubmit={onSubmit}>
            <Row>
              {formInputs.map(
                ({ title, name, required, fullWidth, type }, i) => (
                  <Col md={fullWidth ? 12 : 3} className="my-1" key={i}>
                    <FormLabel>{title + (required ? " *" : "")}</FormLabel>

                    <FormControl
                      name={name}
                      placeholder={title}
                      type={type}
                      className="py-3"
                      required={required}
                    />
                  </Col>
                )
              )}

              <Col md={12} className="text-end">
                <Button variant="info" className="mt-3" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {sent === "done" ? (
        <Alert variant="success" className="mt-5">
          Message has been sent successfully.
        </Alert>
      ) : sent === "error" ? (
        <Alert variant="danger" className="mt-5">
          Message has not been sent successfully. Sorry for inconvenience and
          you may try again.
        </Alert>
      ) : (
        ""
      )}
    </PageSection>
  );
};

export default CtaSection;
