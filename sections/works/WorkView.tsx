import CardComp from "@/components/Card";
import Typography from "@/components/typography";
import {
  faBuilding,
  faCode,
  faInfo,
  faInfoCircle,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

const WorkView = ({
  image = "",
  title = "",
  description = "",
  url = "",
  category = "",
  role = "",
  technologies = [""],
  type = "",
  company = "",
  openSource = false,
}) => {
  return (
    <CardComp
      image={image}
      color="info"
      tag={
        openSource
          ? "Open-Source" + " " + category
          : category
          ? category
          : undefined
      }
    >
      <Typography size={4} justify="center" color="info" className="font">
        {title}
      </Typography>

      <Row>
        <Col xs={12}>
          <Typography size="sm" className="my-1" color="info">
            Project
          </Typography>
        </Col>

        <Col xs={url ? 9 : 10}>
          <Typography size={6} className="my-3" color="info" justify="start">
            {type}
          </Typography>
        </Col>

        <Col xs={url ? 3 : 2}>
          <Typography size={6} className="my-3" color="info" justify="end">
            {url !== "" ? (
              <OverlayTrigger overlay={<Tooltip>View</Tooltip>}>
                <a href={url} target="_blank">
                  <FontAwesomeIcon icon={faLink} />
                </a>
              </OverlayTrigger>
            ) : (
              ""
            )}

            <OverlayTrigger overlay={<Tooltip>{company}</Tooltip>}>
              <a href={"#" + company}>
                <FontAwesomeIcon icon={faBuilding} className="ms-2" />
              </a>
            </OverlayTrigger>
          </Typography>
        </Col>

        <Col xs={12}>
          <Typography size="sm" className="my-1" color="info">
            Role
          </Typography>
        </Col>

        <Col xs={9}>
          <Typography size={6} className="my-2" color="info" justify="start">
            {role}
          </Typography>
        </Col>

        <Col xs={3}>
          <Typography size={6} className="my-2" color="info" justify="end">
            <OverlayTrigger
              overlay={<Tooltip>{technologies.join(", ")}</Tooltip>}
            >
              <FontAwesomeIcon icon={faCode} />
            </OverlayTrigger>

            <OverlayTrigger
              overlay={
                <Tooltip>
                  <Typography size="sm" className="my-2" color="light">
                    {description}
                  </Typography>
                </Tooltip>
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} className="ms-2" />
            </OverlayTrigger>
          </Typography>
        </Col>
      </Row>

      {/* <Typography size={6} className="my-3" color="info">
                  {roles}
                </Typography> */}
    </CardComp>
  );
};

export default WorkView;
