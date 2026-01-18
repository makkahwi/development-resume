import TestimonialCard from "@/components/Pages/TestimonialCard";
import PageSection from "@/components/PageSection";
import { testimonialsList } from "@/lib/data";

const TestimonialsSection = async ({ t }: { t: Function }) => {
  return (
    <PageSection
      title={t("Testimonials.Title")}
      subtitle={t("Testimonials.Subtitle")}
      id="testimonials"
    >
      <div className="row">
        {testimonialsList.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </PageSection>
  );
};

export default TestimonialsSection;
