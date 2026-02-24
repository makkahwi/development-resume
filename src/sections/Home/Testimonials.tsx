import TestimonialCard from "@/components/Pages/TestimonialCard";
import PageSection from "@/components/PageSection";
import { getTestimonialsList } from "@/lib/data";

const TestimonialsSection = async ({ t }: { t: (key: string) => string }) => {
  const testimonialsList = await getTestimonialsList();

  return (
    <PageSection
      title={t("Testimonials.Title")}
      subtitle={t("Testimonials.Subtitle")}
      id="testimonials"
      color="light"
    >
      <div className="row g-4">
        {testimonialsList
          .filter(({ featured }) => featured)
          .map((testimonial, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-6">
              <TestimonialCard color="white" {...testimonial} />
            </div>
          ))}
      </div>
    </PageSection>
  );
};

export default TestimonialsSection;
