"use client";

import { sendContacts } from "@/api";
import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  Row,
} from "react-bootstrap";

const ContactForm = () => {
  const [sent, setSent] = useState("");

  const formInputs = [
    { name: "name", title: "Name", required: true },
    { name: "org", title: "Organization", required: false },
    { name: "email", title: "Email", required: true, type: "email" },
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
    <Form onSubmit={onSubmit}>
      <Row>
        {formInputs.map(({ title, name, required, fullWidth, type }, i) => (
          <Col md={fullWidth ? 12 : 3} className="my-3" key={i}>
            <FormLabel>{title + (required ? " *" : "")}</FormLabel>

            <FormControl
              name={name}
              placeholder={title}
              type={type}
              className="py-3 corners px-4"
              required={required}
            />
          </Col>
        ))}

        <Col md={12} className="text-end">
          <Button variant="info" className="mt-3 corners px-4" type="submit">
            Submit
          </Button>
        </Col>

        <Col xs={12} className="text-end">
          {sent === "done" ? (
            <Alert variant="success" className="mt-5">
              Message has been sent successfully.
            </Alert>
          ) : sent === "error" ? (
            <Alert variant="danger" className="mt-5">
              Message has not been sent successfully. Sorry for inconvenience
              and you may try again.
            </Alert>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default ContactForm;
