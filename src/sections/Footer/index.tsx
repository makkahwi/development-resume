import Image from "next/image";
import { Fragment } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socialLinksList } from "../Tail/Contact";
import FooterNav from "./Nav";

const FooterSection = () => {
  return (
    <Fragment>
      <Row className="bg-dark py-5">
        <Col xs={12} className="text-center pb-5">
          <Image
            src="/images/logo/logo-white.png"
            alt="Logo"
            width={143 * 1}
            height={143 * 1}
            priority
            role="button"
          />
        </Col>

        <Col xs={12} className="text-center">
          <FooterNav />
        </Col>

        <Col xs={12} className="text-center">
          <ButtonGroup>
            {socialLinksList.map(({ name, icon, link, label, color }, i) => (
              <Button className="p-3 my-3 text-white" variant="link" key={i}>
                <a href={link} target="_blank" className="text-white">
                  <FontAwesomeIcon icon={icon} />
                </a>
              </Button>
            ))}
          </ButtonGroup>
        </Col>
      </Row>

      <Row className="py-5 bg-white">
        <h6 className="text-center text-dark">
          All Rights Reserved For{" "}
          <span className="text-info">Suhaib Ahmad</span> © 2018 -{" "}
          {new Date().getFullYear()}
        </h6>
      </Row>
    </Fragment>
  );
};

export default FooterSection;
