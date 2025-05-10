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
      title="I Could Help You"
      subtitle="Wanna Build A Software Product?"
      id="consultation"
    >
      <Typography
        size={4}
        className="me-2 lh-lg"
        color={home ? "light" : "dark"}
      >
        Planning to build a software product, but...
      </Typography>

      <ul className="list-group my-3">
        {topics.map((topic, i) => (
          <li className="list-group-item" key={i}>
            <Typography size={5} className="me-2 lh-lg">
              {topic}
            </Typography>
          </li>
        ))}
      </ul>

      <Typography
        size={4}
        className="me-2 lh-lg"
        color={home ? "light" : "dark"}
      >
        I could help you with free-of-charge online consultation session...
      </Typography>

      <div
        className="calendly-inline-widget w-100 h-100"
        style={{ minHeight: "50vh" }}
        data-url="https://calendly.com/suhaibahmadai/30min"
      />
      <script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      />
    </PageSection>
  );
};

export default ConsultationSection;
