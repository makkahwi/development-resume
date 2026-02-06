import TestimonialCard from "@/components/Pages/TestimonialCard";
import PageSection from "@/components/PageSection";
import { testimonialsList } from "@/lib/data";

const TestimonialsSection = async ({
  t,
  home,
}: {
  t: Function;
  home?: boolean;
}) => {
  return (
    <PageSection
      title={t("Testimonials.Title")}
      subtitle={t("Testimonials.Subtitle")}
      id="testimonials"
      color={home ? "white" : "light"}
    >
      <div className="row g-4">
        {testimonialsList.map((testimonial, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-6">
            <TestimonialCard
              color={home ? "light" : "white"}
              {...testimonial}
            />
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default TestimonialsSection;
