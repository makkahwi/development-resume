import { getJobProjects } from "@/api/data";
import PageSection from "@/components/pageSection";
import { Col, Row } from "react-bootstrap";

import WorkView from "./WorkView";

export interface ProjectProps {
  category: string;
  comingSoon?: boolean;
  designed?: boolean;
  description: string;
  type: string;
  image: string;
  title: string;
  url?: string;
  technologies?: string[];
  role?: string;
  hide?: boolean;
  openSource?: boolean;
}

const WorksSection = async () => {
  const works: ProjectProps[] = await getJobProjects();

  return (
    <PageSection
      title="Works"
      subtitle="Most Significant"
      color="white"
      id="works"
      bg2
    >
      <Row>
        {works
          ?.filter(({ hide }) => !hide)
          ?.filter(
            ({ category }) =>
              category === "Web Apps" || category === "Landing Pages"
          )
          ?.map(
            (
              {
                image,
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
              <Col xl={3} lg={3} md={4} sm={6} className="p-2 d-flex" key={i}>
                <WorkView
                  image={image}
                  title={title}
                  description={description}
                  category={category}
                  url={url}
                  technologies={technologies}
                  role={role}
                  type={type}
                  openSource={openSource}
                />
              </Col>
            )
          )}
      </Row>
    </PageSection>
  );
};

export default WorksSection;
