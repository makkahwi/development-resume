import { getSkills } from "@/api/data";
import PageButton from "@/components/PageButton";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import * as brands from "@fortawesome/free-brands-svg-icons";
import * as solid from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

interface props {
  home?: boolean;
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

const SkillsSection = async ({ home }: props) => {
  const skills: SkillProps[] = await getSkills();

  const iconMap: Record<string, any> = {
    ...solid,
    ...brands,
  };

  const renderGroupedSkills = (group = "", icon = "") => (
    <Fragment>
      <Typography
        size={4}
        className={
          (home ? "bg-light" : "bg-info") + " mt-5 mb-3 py-2 px-4 corners font"
        }
        color={home ? "info" : "white"}
      >
        <FontAwesomeIcon icon={iconMap[icon] || solid.faCode} /> {group}
      </Typography>

      {skills
        ?.filter((skill) => skill.groups.includes(group))
        .map(({ icon, name, color, website, subskills, rate }, i) => (
          <div className="my-2" key={i}>
            <a
              href={website}
              target="_blank"
              className="h4 ps-4"
              style={{ color: "#" + color }}
            >
              {subskills && !home ? (
                <OverlayTrigger
                  overlay={<Tooltip>{subskills.join(", ")}</Tooltip>}
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
            </a>

            {!home && (
              <span className="text-warning float-end">
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
              </span>
            )}
          </div>
        ))}
    </Fragment>
  );

  return (
    <PageSection
      title="Technical Skills"
      subtitle="Earned By Jobs & For Jobs"
      color="white"
      id="skills"
    >
      <Row className="my-5">
        <Col md={6} xl={4} className="my-2 text-info">
          {renderGroupedSkills("Frontend", "faRocket")}
        </Col>

        <Col md={6} xl={4} className="my-2 text-info">
          {renderGroupedSkills("Backend", "faBrain")}
        </Col>

        <Col md={6} xl={4} className="my-2 text-info">
          {renderGroupedSkills("Databases", "faDatabase")}

          {renderGroupedSkills("DevOps & Tools", "faGears")}

          {renderGroupedSkills("Methodologies", "faRuler")}
        </Col>
      </Row>

      {home && <PageButton link="/works#skills" text="Rated Skills" light />}
    </PageSection>
  );
};

export default SkillsSection;
