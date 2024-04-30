import { getJobs } from "@/api/data";
import CardComp from "@/components/Card";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { iconsRendered } from "@/consts/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Fragment } from "react";
import { Button, CardText, Col, Row } from "react-bootstrap";

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

const BackgroundSection = async ({ page }: props) => {
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
            <Typography justify="center" color="white" size={1}>
              {count}
            </Typography>
            <Typography justify="center" color="white" size={4}>
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
                    color="white"
                  >
                    <FontAwesomeIcon icon={iconsRendered(icon)} />
                  </Typography>

                  <Typography size={3} justify="center" color="white">
                    {title}
                  </Typography>
                </Fragment>
              }
            >
              {page && (
                <CardText className="w-100">
                  {desc.map((par, y) => (
                    <Typography
                      size={6}
                      className="lh-lg"
                      color="white"
                      key={y}
                    >
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
