"use client";

import CardComp from "@/components/Card";
import PageSection from "@/components/pageSection";
import { useState } from "react";
import { Button, CardSubtitle, CardTitle, Col, Row } from "react-bootstrap";

import BlogFilter from "./blogFilter";
import BlogPostViewer from "./blogPost";

export interface post {
  category: string;
  date: string;
  image: string;
  title: string;
  body: object[];
}

export const defaultPost = {
  category: "",
  date: "",
  image: "",
  title: "",
  body: [{}],
};

interface props {
  posts: post[];
}

const BlogSection = ({ posts }: props) => {
  const [pickedCategory, setPickedCategory] = useState("");
  const [pickedArticle, setPickedArticle] = useState<post>(defaultPost);
  const [pageSize, setPageSize] = useState(4);

  return (
    <PageSection
      title={"Insights Corner"}
      subtitle={"Exploring Ideas, Trends, and Perspectives"}
      id="blog"
    >
      <BlogFilter
        pickedCategory={pickedCategory}
        setPickedCategory={setPickedCategory}
      />

      <Row className="justify-content-center">
        {posts
          ?.filter(
            ({ category }, i) =>
              (pickedCategory ? category === pickedCategory : true) &&
              i < pageSize
          )
          ?.map(({ category, date, image, title, body }, i) => (
            <Col md={3} className="mb-4 d-flex" key={i}>
              <CardComp
                onClick={() =>
                  setPickedArticle({ category, date, image, title, body })
                }
                color="dark"
                image={image}
              >
                <CardTitle as="h6" className="text-dark">
                  {title}
                </CardTitle>

                <CardSubtitle className="text-muted" as="small">
                  {date}
                </CardSubtitle>

                {/* <CardText tag="p" className="text-justify my-3">
                    {body[0]?.content.slice(0, 70)}
                  </CardText> */}
              </CardComp>
            </Col>
          ))}

        {posts?.filter(({ category }) =>
          pickedCategory ? category === pickedCategory : true
        ).length >= pageSize ? (
          <Col md={12} className="mb-4 text-center">
            <Button
              onClick={() => setPageSize((current) => current + 4)}
              variant="info"
            >
              Show More
            </Button>
          </Col>
        ) : (
          ""
        )}
      </Row>

      <BlogPostViewer
        pickedArticle={pickedArticle}
        setPickedArticle={setPickedArticle}
      />
    </PageSection>
  );
};

export default BlogSection;
