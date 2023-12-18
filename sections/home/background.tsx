import CardComp from "@/components/Card";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import {
  faBriefcase,
  faCode,
  faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Fragment } from "react";
import { Button, CardText, Col, Row } from "react-bootstrap";

export const careers = [
  {
    title: "Web Development",
    desc: [
      "8 Years of Web Development",
      "Developed solutions, systems, and applications on various scales.",
      "Covered all technical aspects of the development process, from planning and design to infrastructure and delivery.",
      "Acquired soft skills, including team leadership and development planning.",
      "Notable projects include building the web application for Jordan's public services platform (Sanad) and Jordan's Land and Survey Department digital services portal.",
    ],
    icon: faCode,
    jobs: [
      {
        company: "Deloitte Digital",
        website:
          "https://www2.deloitte.com/xe/en/pages/strategy-operations/solutions/deloitte-jordan-digital-center.html",
        description:
          "To develop JS based web apps for online public (government) services.",
        title: "Delivery Consultant",
        type: "Full-Time",
        period: "Jun - Jul 2023",
        monthsCount: 2,
        projectsCount: 0,
      },
      {
        company: "AgileTz",
        website: "https://www.agiletz.com/",
        description:
          "To develop React.Js-Node.Js web apps for online public (government) services.",
        title: "Senior Full-Stack Developer",
        type: "Full-Time",
        period: "Aug 2022 - May 2023",
        monthsCount: 10,
        projectsCount: 2,
      },
      {
        company: "ArabWork",
        website: "https://www.linkedin.com/company/arabwork/",
        description:
          "Full-time job to develop a Vue-Symfony web app for an online service.",
        title: "Frontend Developer",
        period: "Jun 2022 - Aug 2022",
        monthsCount: 2,
        projectsCount: 1,
      },
      {
        company: "LuxTag",
        website: "https://luxtag.io/",
        description:
          "To develop a flagship PERN based web app for an online service.",
        title: "Frontend Developer",
        type: "Full-Time",
        period: "Nov 2020 - Oct 2021",
        monthsCount: 12,
        projectsCount: 1,
      },
      {
        company: "AIS School",
        website: "http://aqsa.edu.my/",
        description:
          "To develop a Laravel based web app of a student information system.",
        title: "Full-Stack Developer",
        type: "Part-Time",
        period: "Sep 2019 - Aug 2020",
        monthsCount: 12,
        projectsCount: 1,
      },
      {
        company: "Individually",
        description:
          "Executed several Laravel based & PERN based web app private & open-source projects.",
        title: "Full-Stack Developer",
        type: "Freelance",
        period: "Sep 2019 - Present",
      },
      {
        company: "Digizyn",
        website: "https://digizyn.com/",
        description:
          "To develop a React.js-Node.js Based Multi-Front Public (Governmental) Service App.",
        title: "Full-Stack Developer",
        type: "Freelance",
        period: "Jul 2022 - Aug 2022",
        monthsCount: 2,
        projectsCount: 1,
      },
      {
        company: "Individually",
        description: "Several code based frontend-only landing-page projects.",
        title: "Frontend Developer",
        type: "Freelance",
        period: "May 2018 - Aug 2019",
      },
      {
        company: "Individually",
        description:
          "Several wordpress based landing-page & simple web app projects.",
        title: "Wordpress Developer",
        type: "Freelance",
        period: "Oct 2015 - Apr 2018",
      },
    ],
  },
  {
    title: "Graphics & UI Design",
    desc: [
      "3 Years as Graphic & UI Designer",

      "Worked as a graphic and UI designer for 3 years.",
      "Gained foundational knowledge and learned design tricks.",
      "Developed an understanding of distinguishing good vs bad designs.",
      "Transitioned to a web development career.",
      "Continued design as a side practice to maintain skills.",
      "Created designs for various web applications.",
      "Executed graphic design projects, including rebuilding foundation brand identities.",
    ],
    icon: faPaintBrush,
    jobs: [
      {
        company: "Speed Wheels",
        website: "https://speedwheels.shop/",
        description:
          "Work about designing and preparing for a social-media promotional campaign.",
        title: "Graphic Designer",
        type: "Part-time",
        certificate: "",
        period: "Jan 2017 - Feb 2017",
        monthsCount: 2,
        projectsCount: 5,
      },
      {
        company: "QFM Malaysia",
        website: "http://qfmalaysia.org/",
        description: "To design serveral booklets & brochures.",
        title: "Graphic Designer",
        type: "Part-time",
        certificate: "",
        period: "Jun - Aug 2016, May & July 2017, Jun 2018",
        monthsCount: 6,
        projectsCount: 8,
      },
      {
        company: "Mercy Mission World",
        website: "https://www.mercymissionworld.org/",
        description: "Work included gaphic designing & events management.",
        title: "PR Executive",
        type: "Part-time",
        certificate: "",
        period: "Dec 2015 - Jun 2016",
        monthsCount: 7,
        projectsCount: 8,
      },
      // {
      //   company: "PSA Malaysia",
      //   website: "https://ppam.org.my/",
      //   description:
      //     "Univeristy club work to prepare the publicity materials of digital and print-out designs.",
      //   title: "Media Bureau",
      //   type: "Volunteering",
      //   certificate: "",
      //   period: "Feb 2013 - Jun 2015",
      // },
      {
        company: "Freelance",
        description: "One experience to edit & produce videos for an event.",
        title: "Video Editor",
        type: "Freelance",
        period: "Oct 2019 - Nov 2019",
      },
      {
        company: "Freelance",
        description:
          "Executed enormous number of graphic designs for both print-out & digital uses.",
        title: "Graphic Designer",
        type: "Freelance",
        period: "Feb 2015 - Apr 2019",
      },
    ],
  },
  {
    title: "Managment Works",
    desc: [
      "3 Years of Management-Related Experience",
      "Worked in management-related roles, including Secretariat and financial management.",
      "Developed skills in work documentation and organization.",
      "Accumulated foundational experience in management roles over the years.",
    ],
    icon: faBriefcase,
    jobs: [
      {
        company: "WAMY",
        // website: "https://speedwheels.shop/",
        description: "Work as managment board member to run the organization",
        title: "Board Member",
        type: "Part-time",
        // certificate: "",
        period: "Feb 2014 - Jan 2015",
        monthsCount: 12,
      },
      {
        company: "WAMY",
        // website: "https://speedwheels.shop/",
        description: "Job about documenting all foundation paper works.",
        title: "Secretariat",
        type: "Part-time",
        // certificate: "",
        period: "Feb 2013 - Jan 2014",
        monthsCount: 12,
      },
      {
        company: "Shamy",
        // website: "https://speedwheels.shop/",
        description:
          "Job about documenting all foundation paper works, and included graphic design tasks.",
        title: "Secretariat",
        type: "Part-time",
        // certificate: "",
        period: "Feb 2013 - Jan 2014",
        monthsCount: 12,
        projectsCount: 8,
      },
      {
        company: "Al-Masar",
        // website: "https://speedwheels.shop/",
        description: "Job about documenting all foundation paper works.",
        title: "Secretariat & Financial Managment",
        type: "Part-time",
        // certificate: "",
        period: "Dec 2008 - May 2011",
        monthsCount: 30,
        projectsCount: 15,
      },
    ],
  },
];

interface props {
  page?: boolean;
}

const BackgroundSection = ({ page }: props) => {
  const stats = [
    {
      title: "Months in Jobs",
      count: careers.reduce(
        (careerFinal, careerCurrent) =>
          (careerFinal += careerCurrent.jobs.reduce(
            (jobFinal, jobCurrent) =>
              jobCurrent.projectsCount
                ? (jobFinal += jobCurrent.monthsCount)
                : jobFinal,
            0
          )),
        0
      ),
    },
    {
      title: "Projects Exectued",
      count: careers.reduce(
        (careerFinal, careerCurrent) =>
          (careerFinal += careerCurrent.jobs.reduce(
            (jobFinal, jobCurrent) =>
              jobCurrent.projectsCount
                ? (jobFinal += jobCurrent.projectsCount)
                : jobFinal,
            0
          )),
        0
      ),
    },
    { title: "Career Shifts", count: 3 },
  ];

  return (
    <PageSection
      title="Professional Journey"
      subtitle="Navigating Careers and Experiences"
      color="secondary"
    >
      <Row className="my-5">
        {stats.map(({ title, count }, i) => (
          <Col md={4} className="my-3 text-white" key={i}>
            <Typography justify="center" size={1}>
              {count}
            </Typography>
            <Typography justify="center" size={4}>
              {title}
            </Typography>
          </Col>
        ))}
      </Row>

      <Row>
        {careers.map(({ title, desc, icon }, i) => (
          <Col md={4} className="d-flex" key={i}>
            <CardComp
              title={
                <Fragment>
                  <Typography
                    size={1}
                    justify="center"
                    style={{ fontSize: "5vw" }}
                    className="my-5"
                  >
                    <FontAwesomeIcon icon={icon} />
                  </Typography>

                  <Typography size={3} justify="center">
                    {title}
                  </Typography>
                </Fragment>
              }
            >
              {page && (
                <CardText className="w-100">
                  {desc.map((par, y) => (
                    <Typography size={6} className="lh-lg" key={y}>
                      - {par}
                    </Typography>
                  ))}
                </CardText>
              )}
            </CardComp>
          </Col>
        ))}

        {!page && (
          <Col md={12} className="my-5 text-center">
            <Link href="/career">
              <Button variant="light">Explore My Career</Button>
            </Link>
          </Col>
        )}
      </Row>
    </PageSection>
  );
};

export default BackgroundSection;