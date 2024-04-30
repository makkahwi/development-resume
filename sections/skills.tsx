import { getJobs } from "@/api/data";
import PageSection from "@/components/pageSection";
import {
  faBootstrap,
  faCss3Alt,
  faDocker,
  faGithub,
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
  faBroadcastTower,
  faCloud,
  faDatabase,
  faHashtag,
  faRing,
  faShapes,
  faSyncAlt,
  faV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

interface props {
  page?: boolean;
}

export interface JobProps {
  desc: string[];
  icon: string;
  title: string;
  jobs: {
    company: string;
    description: string;
    monthsCount: number;
    period: string;
    projectsCount: number;
    title: string;
    type: string;
    website: string;
  }[];
}

const SkillsSection = async ({ page }: props) => {
  const careers: JobProps[] = await getJobs();

  const skills = [
    {
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
      icon: faReact,
      name: "Next.Js",
      color: "000000",
      website: "https://nextjs.org/",
      subskills: ["Same as React.Js"],
    },
    {
      icon: faV,
      name: "Vite",
      color: "B63DFE",
      website: "https://vitejs.dev/",
      subskills: ["Same as React.Js"],
    },
    {
      icon: faShapes,
      name: "Three.Js",
      color: "000000",
      website: "https://threejs.org/",
    },
    {
      icon: faVuejs,
      name: "Vue.Js",
      color: "00bd83",
      website: "https://vuejs.org/",
      subskills: ["VueX", "Vuetify", "Axios", "Webpack", "i18next"],
    },
    {
      icon: faVuejs,
      name: "Nuxt.Js",
      color: "00DC82",
      website: "https://nuxt.com/",
      subskills: ["Same as Vue.Js"],
    },
    {
      icon: faNode,
      name: "Node.Js",
      color: "8bc500",
      website: "https://nodejs.org/",
      subskills: ["npm", "yarn", "strapi.io"],
    },
    {
      icon: faNodeJs,
      name: "Express.Js",
      color: "000000",
      website: "https://expressjs.com/",
      subskills: [""],
    },
    {
      icon: faNodeJs,
      name: "Nest.Js",
      color: "E0234E",
      website: "https://nestjs.com/",
      subskills: ["Typeorm"],
    },
    {
      icon: faLaravel,
      name: "Laravel",
      color: "ff2d20",
      website: "https://laravel.com/",
    },
    {
      icon: faHashtag,
      name: "Django",
      color: "092d1f",
      website: "https://www.djangoproject.com/",
      subskills: ["DJ REST API", "DJ Simple JWT", "DJ Environ"],
    },
    {
      icon: faWordpress,
      name: "Wordpress",
      color: "21759b",
      website: "https://wordpress.com/",
      subskills: ["Elementor", "Contact Form 7"],
    },
    {
      icon: faDatabase,
      name: "PostgreSQL",
      color: "2f6091",
      website: "https://www.postgresql.org/",
    },
    {
      icon: faDatabase,
      name: "MySQL",
      color: "ffa518",
      website: "https://www.mysql.com/",
    },
    {
      icon: faGithub,
      name: "Github",
      color: "000000",
      website: "https://www.github.com/",
    },
    {
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
      icon: faJs,
      name: "JavaScript",
      color: "f7e018",
      website: "https://www.javascript.com/",
      subskills: ["ES6", "ES5", "Embedded JS"],
    },
    {
      icon: faJs,
      name: "TypeScript",
      color: "3178C6",
      website: "https://www.typescriptlang.org/",
    },
    {
      icon: faBroadcastTower,
      name: "jQuery",
      color: "0868ac",
      website: "https://jquery.com/",
    },
    {
      icon: faRing,
      name: "JSON",
      color: "0f0f0f",
      website: "https://www.json.org/",
    },
    {
      icon: faPython,
      name: "Python",
      color: "3771a1",
      website: "https://www.python.org/",
      subskills: ["Numpy", "Pandas", "Matplotlib"],
    },
    {
      icon: faPhp,
      name: "PhP",
      color: "4f5c93",
      website: "https://www.php.net/",
    },
    {
      icon: faHtml5,
      name: "HTML",
      color: "e44d26",
      website: "https://html.spec.whatwg.org/",
    },
    {
      icon: faCss3Alt,
      name: "CSS",
      color: "379ad6",
      website: "https://www.w3.org/TR/CSS/#css",
    },
    {
      icon: faBootstrap,
      name: "Bootstrap",
      color: "7952b3",
      website: "https://getbootstrap.com/",
    },
    {
      icon: faSyncAlt,
      name: "Agile",
      color: "00a99d",
      website: "https://www.scrum.org/",
      subskills: ["SCRUM", "Kanban"],
    },
    {
      icon: faSyncAlt,
      name: "SCRUM",
      color: "1f93b8",
      website: "https://www.scrum.org/",
      subskills: ["Jira", "ClickUp", "YouTrack"],
    },
    { icon: faCloud, name: "REST API", color: "176985" },
  ];

  return (
    <PageSection
      title="Technical Skills"
      subtitle="Earned By Jobs & For Jobs"
      color="light"
    >
      <Row className="my-5">
        {skills.map(({ icon, name, color, website, subskills }, i) => (
          <Col md={4} className="my-2 text-white" key={i}>
            <a href={website} target="_blank">
              <h4 style={{ color: "#" + color }}>
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
          </Col>
        ))}
      </Row>
    </PageSection>
  );
};

export default SkillsSection;
