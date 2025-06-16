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
  dark = false,
  short = false,
}) => {
  return (
    <CardComp
      image={image}
      color={dark ? "info" : "light"}
      tag={
        openSource
          ? "Open-Source" + " " + category
          : category
          ? category
          : undefined
      }
    >
      <Typography
        size={4}
        justify="center"
        color={dark ? "info" : "light"}
        className="font"
      >
        {short && url ? (
          <a href={url} target="_blank" className="text-decoration-none">
            {title}
          </a>
        ) : (
          title
        )}
      </Typography>

      {!short && (
        <Row>
          <Col xs={12}>
            <Typography
              size="sm"
              className="my-1"
              color={dark ? "info" : "light"}
            >
              Project
            </Typography>
          </Col>

          <Col xs={url ? 9 : 10}>
            <Typography
              size={6}
              className="my-3"
              color={dark ? "info" : "light"}
              justify="start"
            >
              {type}
            </Typography>
          </Col>

          <Col xs={url ? 3 : 2}>
            <Typography
              size={6}
              className="my-3"
              color={dark ? "info" : "light"}
              justify="end"
            >
              {url !== "" ? (
                <OverlayTrigger overlay={<Tooltip>View</Tooltip>}>
                  <a
                    href={url}
                    target="_blank"
                    className="text-decoration-none"
                  >
                    <FontAwesomeIcon icon={faLink} />
                  </a>
                </OverlayTrigger>
              ) : (
                ""
              )}

              <OverlayTrigger overlay={<Tooltip>{company}</Tooltip>}>
                <a
                  href={"#" + company.replaceAll(" ", "_")}
                  className="text-decoration-none"
                >
                  <FontAwesomeIcon icon={faBuilding} className="ms-2" />
                </a>
              </OverlayTrigger>
            </Typography>
          </Col>

          <Col xs={12}>
            <Typography
              size="sm"
              className="my-1"
              color={dark ? "info" : "light"}
            >
              Role
            </Typography>
          </Col>

          <Col xs={9}>
            <Typography
              size={6}
              className="my-2"
              color={dark ? "info" : "light"}
              justify="start"
            >
              {role}
            </Typography>
          </Col>

          <Col xs={3}>
            <Typography
              size={6}
              className="my-2"
              color={dark ? "info" : "light"}
              justify="end"
            >
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
      )}

      {/* <Typography size={6} className="my-3" color="info">
                  {roles}
                </Typography> */}
    </CardComp>
  );
};

export default WorkView;
