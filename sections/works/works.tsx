import { getJobProjects } from "@/api/data";
import PageSection from "@/components/pageSection";
import { Col, Row } from "react-bootstrap";

import MoreWorks from "./moreWorks";
import WorkView from "./WorkView";

interface Props {
  category: string;
  comingSoon?: boolean;
  description: string;
  image: string;
  title: string;
  url?: string;
  hide?: boolean;
  openSource?: boolean;
}

const WorksSection = async () => {
  const works: Props[] = await getJobProjects();

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
            ({ image, title, description, category, url, openSource }, i) => (
              <Col xl={3} lg={3} md={4} sm={6} className="p-2 d-flex" key={i}>
                <WorkView
                  image={image}
                  title={title}
                  description={description}
                  category={category}
                  url={url}
                  openSource={openSource}
                />
              </Col>
            )
          )}

        <MoreWorks works={works} />
      </Row>
    </PageSection>
  );
};

export default WorksSection;
