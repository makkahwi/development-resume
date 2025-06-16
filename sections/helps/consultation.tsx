import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";

interface props {
  home?: boolean;
}

const ConsultationSection = async ({ home }: props) => {
  const topics = [
    "Don't know where to start from?",
    "Can't find affordable technical help?",
    "Afraid of investing costs VS risks?",
  ];

  return (
    <PageSection
      title="Product Development Consultation"
      subtitle="Need Help Starting Your Software Product?"
      id="consultation"
      color="light"
    >
      <Typography
        size={4}
        className="me-2 lh-lg"
        color={home ? "light" : "dark"}
      >
        Not sure how to begin? Struggling to find cost-effective technical
        guidance? Concerned about balancing investment with risk?
      </Typography>

      <Typography
        size={4}
        className="me-2 lh-lg"
        color={home ? "light" : "dark"}
      >
        I offer a free online consultation to help you move forward with clarity
        and confidence. Scroll down to get in touch or book a session.
      </Typography>
    </PageSection>
  );
};

export default ConsultationSection;
