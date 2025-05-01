import { getJobs } from "@/api/data";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import {
  faAmazon,
  faBootstrap,
  faCss3Alt,
  faDocker,
  faGithub,
  faGolang,
  faHtml5,
  faJs,
  faLaravel,
  faNode,
  faNodeJs,
  faPhp,
  faPython,
  faReact,
  faVuejs,
  faWordpress,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBrain,
  faBroadcastTower,
  faCloud,
  faDatabase,
  faGears,
  faHashtag,
  faInfo,
  faN,
  faR,
  faRing,
  faRocket,
  faRuler,
  faShapes,
  faSyncAlt,
  faV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

import { JobProps } from "./education";

interface props {
  page?: boolean;
}

interface Skill {
  groups: string[];
  icon: any;
  name: string;
  color: string;
  website?: string;
  subskills?: string[];
}

const SkillsSection = async ({ page }: props) => {
  const careers: JobProps[] = await getJobs();

  const skills = [
    {
      groups: ["Frontend"],
      icon: faReact,
      name: "React.Js",
      color: "61dafb",
      website: "https://reactjs.org/",
      subskills: [
        "Redux",
        "Axios",
        "i18next",
        "Material-UI",
        "Chakra-UI",
        "TailwindCSS",
        "Ant Design",
        "PrimeReact",
        "Styled Components",
        "React Hook Form",
        "Formik",
        "Moment",
        "Charts.Js",
        "Eslint",
        "prettier",
      ],
    },
    {
      groups: ["Frontend"],
      icon: faN,
      name: "Next.Js",
      color: "000000",
      website: "https://nextjs.org/",
      subskills: ["Same as React.Js"],
    },
    {
      groups: ["Frontend"],
      icon: faV,
      name: "Vite",
      color: "B63DFE",
      website: "https://vitejs.dev/",
      subskills: ["Same as React.Js"],
    },
    {
      groups: ["Frontend"],
      icon: faR,
      name: "Remix",
      color: "000000",
      website: "https://remix.run/",
      subskills: ["Same as React.Js"],
    },
    {
      groups: ["Frontend"],
      icon: faShapes,
      name: "Three.Js",
      color: "000000",
      website: "https://threejs.org/",
    },
    {
      groups: ["Frontend"],
      icon: faVuejs,
      name: "Vue.Js",
      color: "00bd83",
      website: "https://vuejs.org/",
      subskills: ["VueX", "Vuetify", "Axios", "Webpack", "i18next"],
    },
    {
      groups: ["Frontend"],
      icon: faVuejs,
      name: "Nuxt.Js",
      color: "00DC82",
      website: "https://nuxt.com/",
      subskills: ["Same as Vue.Js"],
    },
    {
      groups: ["Frontend", "Backend"],
      icon: faNode,
      name: "Node.Js",
      color: "8bc500",
      website: "https://nodejs.org/",
      subskills: ["npm", "yarn", "strapi.io"],
    },
    {
      groups: ["Backend"],
      icon: faNodeJs,
      name: "Express.Js",
      color: "000000",
      website: "https://expressjs.com/",
    },
    {
      groups: ["Backend"],
      icon: faNodeJs,
      name: "Nest.Js",
      color: "E0234E",
      website: "https://nestjs.com/",
      subskills: ["Typeorm"],
    },
    {
      groups: ["Backend"],
      icon: faLaravel,
      name: "Laravel",
      color: "ff2d20",
      website: "https://laravel.com/",
    },
    {
      groups: ["Backend"],
      icon: faHashtag,
      name: "Django",
      color: "092d1f",
      website: "https://www.djangoproject.com/",
      subskills: ["DJ REST API", "DJ Simple JWT", "DJ Environ"],
    },
    {
      groups: ["Backend"],
      icon: faGolang,
      name: "Go / GoLang",
      color: "00A7D0",
      website: "https://go.dev/",
    },
    {
      groups: ["Frontend"],
      icon: faWordpress,
      name: "Wordpress",
      color: "21759b",
      website: "https://wordpress.com/",
      subskills: ["Elementor", "Contact Form 7"],
    },
    {
      groups: ["Databases"],
      icon: faDatabase,
      name: "PostgreSQL",
      color: "2f6091",
      website: "https://www.postgresql.org/",
    },
    {
      groups: ["Databases"],
      icon: faDatabase,
      name: "MySQL",
      color: "ffa518",
      website: "https://www.mysql.com/",
    },
    {
      groups: ["Databases"],
      icon: faDatabase,
      name: "Mongo DB",
      color: "023430",
      website: "https://www.mongodb.com/",
    },
    {
      groups: ["Databases"],
      icon: faDatabase,
      name: "Firebase",
      color: "DD2C00",
      website: "https://firebase.google.com",
    },
    {
      groups: ["Databases"],
      icon: faDatabase,
      name: "SQLite",
      color: "004364",
      website: "https://www.sqlite.org/",
    },
    {
      groups: ["DevOps & Tools"],
      icon: faAmazon,
      name: "AWS",
      color: "ff9900",
      website: "https://aws.amazon.com/",
    },
    {
      groups: ["DevOps & Tools"],
      icon: faGithub,
      name: "Github",
      color: "000000",
      website: "https://www.github.com/",
    },
    {
      groups: ["DevOps & Tools"],
      icon: faDocker,
      name: "Docker",
      color: "2496ed",
      website: "https://www.docker.com/",
    },
    // {
    //   icon: faMicrosoft,
    //   name: "VS Code",
    //   color: "0082cf",
    //   website: "https://code.visualstudio.com/",
    // },
    {
      groups: ["Frontend", "Backend"],
      icon: faJs,
      name: "JavaScript",
      color: "323330",
      website: "https://www.javascript.com/",
      subskills: ["ES6", "ES5", "Embedded JS"],
    },
    {
      groups: ["Frontend", "Backend"],
      icon: faJs,
      name: "TypeScript",
      color: "3178C6",
      website: "https://www.typescriptlang.org/",
    },
    {
      groups: ["Frontend"],
      icon: faBroadcastTower,
      name: "jQuery",
      color: "0868ac",
      website: "https://jquery.com/",
    },
    {
      groups: ["Frontend", "Backend"],
      icon: faRing,
      name: "JSON",
      color: "0f0f0f",
      website: "https://www.json.org/",
    },
    {
      groups: ["Backend"],
      icon: faPython,
      name: "Python",
      color: "3771a1",
      website: "https://www.python.org/",
      subskills: ["Numpy", "Pandas", "Matplotlib"],
    },
    {
      groups: ["Backend"],
      icon: faPhp,
      name: "PhP",
      color: "4f5c93",
      website: "https://www.php.net/",
    },
    {
      groups: ["Frontend"],
      icon: faHtml5,
      name: "HTML",
      color: "e44d26",
      website: "https://html.spec.whatwg.org/",
    },
    {
      groups: ["Frontend"],
      icon: faCss3Alt,
      name: "CSS",
      color: "379ad6",
      website: "https://www.w3.org/TR/CSS/#css",
    },
    {
      groups: ["Frontend"],
      icon: faBootstrap,
      name: "Bootstrap",
      color: "7952b3",
      website: "https://getbootstrap.com/",
    },
    {
      groups: ["Methodologies"],
      icon: faSyncAlt,
      name: "Agile",
      color: "00a99d",
      website: "https://www.scrum.org/",
      subskills: ["SCRUM", "Kanban"],
    },
    {
      groups: ["Methodologies"],
      icon: faSyncAlt,
      name: "SCRUM",
      color: "1f93b8",
      website: "https://www.scrum.org/",
      subskills: ["Jira", "ClickUp", "YouTrack"],
    },
    {
      groups: ["Frontend", "Backend"],
      icon: faCloud,
      name: "REST API",
      color: "176985",
    },
  ];

  const renderGroupedSkills = (group = "", icon = faInfo) => (
    <Fragment>
      <Typography
        size={4}
        className="mt-5 mb-3 bg-info py-2 px-4 corners"
        color="white"
      >
        <FontAwesomeIcon icon={icon} /> {group}
      </Typography>

      {skills
        .filter((skill) => skill.groups.includes(group))
        .map(({ icon, name, color, website, subskills }, i) => (
          <a href={website} target="_blank" key={i}>
            <h4 className="ps-5" style={{ color: "#" + color }}>
              {subskills ? (
                <OverlayTrigger
                  overlay={<Tooltip>{subskills.join(",")}</Tooltip>}
                >
                  <span>
                    <FontAwesomeIcon icon={icon} /> {name}
                  </span>
                </OverlayTrigger>
              ) : (
                <span>
                  <FontAwesomeIcon icon={icon} /> {name}
                </span>
              )}
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
        <Col md={4} className="my-2 text-white">
          {renderGroupedSkills("Frontend", faRocket)}
        </Col>

        <Col md={4} className="my-2 text-white">
          {renderGroupedSkills("Backend", faBrain)}
        </Col>

        <Col md={4} className="my-2 text-white">
          {renderGroupedSkills("Databases", faDatabase)}

          {renderGroupedSkills("DevOps & Tools", faGears)}

          {renderGroupedSkills("Methodologies", faRuler)}
        </Col>
      </Row>
    </PageSection>
  );
};

export default SkillsSection;
