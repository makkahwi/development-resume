"use client";

import { Fragment, useState } from "react";
import { Button, Col } from "react-bootstrap";
import WorkView from "./WorkView";

interface Props {
  category: string;
  comingSoon?: boolean;
  description: string;
  image: string;
  title: string;
  url?: string;
  hide?: boolean;
}

const MoreWorks = async ({ works }: { works: Props[] }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Fragment>
      {showMore &&
        works
          ?.filter(({ hide }) => hide)
          ?.filter(
            ({ category }) =>
              category === "Web Apps" || category === "Landing Pages"
          )
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

      {showMore ? (
        <Col xs={12} className="text-center">
          <Button
            variant="info"
            onClick={() => setShowMore(false)}
            className="corners px-4"
          >
            Show Less
          </Button>
        </Col>
      ) : (
        <Col xs={12} className="text-center">
          <Button
            variant="info"
            className="text-white corners px-4"
            onClick={() => setShowMore(true)}
          >
            Show More
          </Button>
        </Col>
      )}
    </Fragment>
  );
};

export default MoreWorks;
