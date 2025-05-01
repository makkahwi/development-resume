import CardComp from "@/components/Card";
import Typography from "@/components/typography";
import { faCode, faLink } from "@fortawesome/free-solid-svg-icons";
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
      <Typography size={4} justify="center" color="info">
        {title}
      </Typography>

      <Row>
        <Col xs={9}>
          <Typography size="sm" className="my-3" color="info">
            {role}
          </Typography>
        </Col>

        <Col xs={3}>
          <Typography size="sm" className="my-3" color="info" justify="end">
            <OverlayTrigger
              overlay={<Tooltip>{technologies.join(", ")}</Tooltip>}
            >
              <FontAwesomeIcon icon={faCode} />
            </OverlayTrigger>

            {url !== "" ? (
              <OverlayTrigger overlay={<Tooltip>View</Tooltip>}>
                <a href={url} target="_blank" className="mx-1">
                  <FontAwesomeIcon icon={faLink} />
                </a>
              </OverlayTrigger>
            ) : (
              ""
            )}
          </Typography>
        </Col>
      </Row>

      {/* <Typography size={6} className="my-3" color="info">
                  {roles}
                </Typography> */}

      <Typography size={6} className="my-3" color="info">
        {description}
      </Typography>
    </CardComp>
  );
};

export default WorkView;
