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

const StatisticsSection = async () => {
  const careers: JobProps[] = await getJobs();
  const projects: ProjectProps[] = await getJobProjects();

  const stats = [
    {
      title: "Months in Web Development",
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
      title: "Digital Products Built",
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
      title: "Tailored Solutions Designed",
      desc: "Led end-to-end solution design: from client needs analysis to user journeys and UX flows.",
      count: projects.filter(({ designed }) => designed)?.length,
    },
  ];

  return (
    <Row className="my-5">
      {stats.map(({ title, count, desc }, i) => (
        <Col md={4} className="my-3 text-info" key={i}>
          <Typography
            justify="center"
            color="info"
            size={1}
            style={{
              background: 'url("/images/BracketsC.png")',
              backgroundSize: "auto 100%",
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
            size={4}
          >
            {title}
          </Typography>

          <Typography size={6} justify="center" className="px-4 lh-lg">
            {desc}
          </Typography>
        </Col>
      ))}
    </Row>
  );
};

export default StatisticsSection;
