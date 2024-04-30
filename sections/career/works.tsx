import { getJobProjects } from "@/api/data";
import PageSection from "@/components/pageSection";
import { Col, Row } from "react-bootstrap";
import WorkView from "./WorkView";
import MoreWorks from "./moreWorks";

interface Props {
  category: string;
  comingSoon?: boolean;
  description: string;
  image: string;
  title: string;
  url?: string;
  hide?: boolean;
}

const WorksSection = async () => {
  const works: Props[] = await getJobProjects();

  return (
    <PageSection
      title="Works"
      subtitle="Most Significant Projects"
      color="info"
    >
      <Row>
        {works
          ?.filter(({ hide }) => !hide)
          ?.map(({ image, title, description, category, url }, i) => (
            <Col xl={3} lg={3} md={4} sm={6} className="p-2 d-flex" key={i}>
              <WorkView
                image={image}
                title={title}
                description={description}
                category={category}
                url={url}
              />
            </Col>
          ))}

        <MoreWorks works={works} />
      </Row>
    </PageSection>
  );
};

export default WorksSection;
