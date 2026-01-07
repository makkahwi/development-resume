import { testimonialsList } from "@/api/hardCodedData";
import TestimonialCard from "@/components/Pages/TestimonialCard";
import PageSection from "@/components/PageSection";

const TestimonialsSection = async ({ t }: { t: Function }) => {
  return (
    <PageSection
      title={t("testimonials.title")}
      subtitle={t("testimonials.subtitle")}
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
