import { getJobProjects, getJobs } from "@/api/data";
import Typography from "@/components/typography";
import { Col, Row } from "react-bootstrap";

import { ProjectProps } from "../works/works";

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

interface props {
  home?: boolean;
}

const StatisticsSection = async ({ home }: props) => {
  const careers: JobProps[] = await getJobs();
  const projects: ProjectProps[] = await getJobProjects();

  const stats = [
    {
      title: "Months in Web Dev",
      desc: "Spanning multiple roles since 2015, excluding earlier years as a graphic designer.",
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
      title: "Software Built",
      desc: "From client portals to internal tools — samples are showcased in the Works section.",
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
    {
      title: "Solutions Architected",
      desc: "Led end-to-end solution design: from client needs analysis to user journeys and UX flows.",
      count: projects.filter(({ designed }) => designed)?.length,
    },
    {
      title: "Projects Consulted",
      desc: "Provided strategic guidance to founders and product owners, regarding roadmapping, architecture and product direction.",
      count: [
        "AAM",
        "Noor",
        "Fatima",
        "Semesteer",
        "Mustaheq",
        "Lyyyf",
        "QR Menu",
        "AIS Students",
        "R&K",
        "PPAM",
        "Tamarras",
        "Cura",
      ].length,
    },
    {
      title: "Individuals Trained",
      desc: "Mentored aspiring developers through real-world projects, self-paced learning paths, and code quality reviews.",
      count: [
        "Mustafa Hasanat",
        "Zaid Jarra",
        "Mazen Adel",
        "Suhaib Murshed",
        "Raghad Abdulhadi",
        "Emad Majdalawi",
        "Ghaida Momani",
        "Ahmad Kharfan",
        "Mohammed Ba Khadher",
        "Yahya Labeeb",
        "Eleen Feras",
        "Lareen Feras",
        "Osaid Ahmad",
        "Hamed Sulieman",
        "AbdulRahman Othman",
      ].length,
    },
  ];

  return (
    <Row className="my-5 justify-content-between">
      {stats
        .sort((a, b) => b.count - a.count)
        .map(({ title, count, desc }, i) => (
          <Col md={2} className="my-3 text-info" key={i}>
            <Typography
              justify="center"
              color="info"
              size={home ? 4 : 1}
              style={{
                background: 'url("/images/BracketsC.png")',
                backgroundSize: home ? "100%" : "auto 100%",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }}
              className="py-3 font"
            >
              {count}
            </Typography>

            <Typography
              justify="center"
              color="info"
              className="my-4 font"
              size={home ? 6 : 4}
            >
              {title}
            </Typography>

            {!home && (
              <Typography size="sm" className="lh-lg">
                {desc}
              </Typography>
            )}
          </Col>
        ))}
    </Row>
  );
};

export default StatisticsSection;
