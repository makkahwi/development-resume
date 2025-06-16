import { getJobProjects } from "@/api/data";
import PageButton from "@/components/PageButton";
import PageSection from "@/components/pageSection";
import { Col, Row } from "react-bootstrap";

import WorkView from "./WorkView";

interface props {
  openSource?: boolean;
  home?: boolean;
}

export interface ProjectProps {
  category: string;
  comingSoon?: boolean;
  designed?: boolean;
  description: string;
  type: string;
  image: string;
  title: string;
  shortTitle?: string;
  url?: string;
  technologies: string[];
  company?: string;
  role?: string;
  hide?: boolean;
  openSource?: boolean;
}

const WorksSection = async ({ openSource, home }: props) => {
  const works: ProjectProps[] = await getJobProjects();

  return (
    <PageSection
      title={openSource ? "Open-Source Products" : "Works"}
      subtitle={
        openSource
          ? "Free Solutions & Software For Everyone"
          : "Most Significant"
      }
      color={home ? "light" : "light"}
      id="works"
    >
      <Row>
        {works
          ?.filter(({ hide, ...rest }) =>
            openSource ? rest.openSource : home ? !hide : true
          )
          ?.filter(
            ({ category }) =>
              category === "Web Apps" || category === "Landing Pages"
          )
          ?.map(
            (
              {
                image,
                company,
                title,
                description,
                category,
                url,
                openSource,
                technologies,
                role,
                type,
              },
              i
            ) => (
              <Col
                xl={3}
                lg={3}
                md={4}
                sm={6}
                className="p-2 d-flex"
                id={title.replaceAll(" ", "_")}
                key={i}
              >
                <WorkView
                  image={image}
                  title={title}
                  description={description}
                  category={category}
                  url={url}
                  company={company}
                  technologies={technologies}
                  role={role}
                  type={type}
                  openSource={openSource}
                  dark
                  short={home}
                />
              </Col>
            )
          )}
      </Row>

      {home && <PageButton link="/works#works" text="All Works Explained" />}
    </PageSection>
  );
};

export default WorksSection;
