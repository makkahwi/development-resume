import TestimonialCard, {
  TestimonialProps,
} from "@/components/Pages/TestimonialCard";
import PageSection from "@/components/PageSection";

const TestimonialsSection = async ({ t }: { t: Function }) => {
  const testimonials: TestimonialProps[] = [
    {
      name: "Jane Doe",
      content:
        "This service was exceptional! Highly recommend to anyone looking for quality.",
      image: "/images/testimonials/jane-doe.jpg",
      url: "https://janedoe.com",
    },
  ];

  return (
    <PageSection
      title={t("testimonials.title")}
      subtitle={t("testimonials.subtitle")}
      id="testimonials"
    >
      <div className="row">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </PageSection>
  );
};

export default TestimonialsSection;
