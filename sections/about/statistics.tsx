import { getJobs } from "@/api/data";
import Typography from "@/components/typography";
import { Col, Row } from "react-bootstrap";

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
      title: "Built Products",
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
    { title: "Designed Solutions", count: 9 },
  ];

  return (
    <Row className="my-5">
      {stats.map(({ title, count }, i) => (
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
        </Col>
      ))}
    </Row>
  );
};

export default StatisticsSection;
