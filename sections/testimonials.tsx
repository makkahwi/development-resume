import { getTestimonials } from "@/api/data";
import CarouselComp from "@/components/carousel";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { colsCount } from "@/consts/functions";
import { Col, Row } from "react-bootstrap";

export interface TestimonialProps {
  link: string;
  img: string;
  author: string;
  content: string;
}

const TestimonialsSection = async () => {
  const testimonials: TestimonialProps[][] = await getTestimonials();

  return (
    <PageSection
      title="Testimonials"
      color="white"
      BigPadding
      id="testimonials"
    >
      <CarouselComp
        items={testimonials.map((group, i) => (
          <Row className="gx-4 gy-4" key={i}>
            {group.map(({ content, author, link, img }, y) => (
              <Col md={colsCount(group.length)} className="d-flex" key={y}>
                <div className="card bg-white border-info text-white w-100 d-flex flex-column p-4">
                  <div className="mb-4">
                    <Typography size={6} color="info" className="lh-lg">
                      {content}
                    </Typography>
                  </div>

                  {/* Bottom-anchored author block */}
                  <div className="mt-auto pt-3">
                    <a
                      href={link}
                      target="_blank"
                      className="text-decoration-none d-flex align-items-center text-info"
                    >
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/resume-data-8215f.appspot.com/o/${img}?alt=media`}
                        alt="Profile"
                        height="50"
                        className="me-2 rounded-circle"
                      />
                      {author}
                    </a>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ))}
      />
    </PageSection>
  );
};

export default TestimonialsSection;
