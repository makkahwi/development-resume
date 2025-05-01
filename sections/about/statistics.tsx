import { getJobProjects, getJobs } from "@/api/data";
import Typography from "@/components/typography";
import { Col, Row } from "react-bootstrap";

import { ProjectProps } from "../works/moreWorks";

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

const StatisticsSection = async ({ page }: props) => {
  const careers: JobProps[] = await getJobs();
  const projects: ProjectProps[] = await getJobProjects();

  const stats = [
    {
      title: "Months in Jobs",
      desc: "Below are only web development jobs, but I had a career as a graphic designer before.",
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
      title: "Built Products",
      desc: "You could view samples of those in 'Works' section.",
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
      title: "Designed Solutions",
      desc: "Meaning that I've been part of defining client needs, drawing a fitting solution, designing user journey and experience and so on.",
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
            className="py-3"
          >
            {count}
          </Typography>

          <Typography justify="center" color="info" size={4}>
            {title}
          </Typography>

          <Typography size={6} justify="center" className="p-5 lh-lg">
            {desc}
          </Typography>
        </Col>
      ))}
    </Row>
  );
};

export default StatisticsSection;
