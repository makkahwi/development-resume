import { getSkills } from "@/api/data";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import * as brands from "@fortawesome/free-brands-svg-icons";
import * as solid from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

interface props {
  page?: boolean;
}

interface SkillProps {
  groups: string[];
  icon: any;
  name: string;
  color: string;
  rate: number;
  website?: string;
  subskills?: string[];
}

const SkillsSection = async ({ page }: props) => {
  const skills: SkillProps[] = await getSkills();

  const iconMap: Record<string, any> = {
    ...solid,
    ...brands,
  };

  const renderGroupedSkills = (group = "", icon = "") => (
    <Fragment>
      <Typography
        size={4}
        className="mt-5 mb-3 bg-info py-2 px-4 corners font"
        color="white"
      >
        <FontAwesomeIcon icon={iconMap[icon] || solid.faCode} /> {group}
      </Typography>

      {skills
        ?.filter((skill) => skill.groups.includes(group))
        .map(({ icon, name, color, website, subskills, rate }, i) => (
          <a href={website} target="_blank" key={i}>
            <h4 className="ps-5" style={{ color: "#" + color }}>
              {subskills ? (
                <OverlayTrigger
                  overlay={<Tooltip>{subskills.join(",")}</Tooltip>}
                >
                  <span>
                    <FontAwesomeIcon icon={iconMap[icon]} /> {name}
                  </span>
                </OverlayTrigger>
              ) : (
                <span>
                  <FontAwesomeIcon icon={iconMap[icon]} /> {name}
                </span>
              )}

              <small className="text-warning float-end text-xs">
                {Array(rate)
                  .join(".")
                  .split(".")
                  .map((_, y) => (
                    <FontAwesomeIcon
                      icon={solid.faStar}
                      className="ms-1"
                      key={y}
                    />
                  ))}
              </small>
            </h4>
          </a>
        ))}
    </Fragment>
  );

  return (
    <PageSection
      title="Technical Skills"
      subtitle="Earned By Jobs & For Jobs"
      color="light"
      id="skills"
    >
      <Row className="my-5">
        <Col md={6} xl={4} className="my-2 text-white">
          {renderGroupedSkills("Frontend", "faRocket")}
        </Col>

        <Col md={6} xl={4} className="my-2 text-white">
          {renderGroupedSkills("Backend", "faBrain")}
        </Col>

        <Col md={6} xl={4} className="my-2 text-white">
          {renderGroupedSkills("Databases", "faDatabase")}

          {renderGroupedSkills("DevOps & Tools", "faGears")}

          {renderGroupedSkills("Methodologies", "faRuler")}
        </Col>
      </Row>
    </PageSection>
  );
};

export default SkillsSection;
