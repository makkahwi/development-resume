import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";

const SponsorSection = () => {
  return (
    <PageSection
      title={"Sponsor Me"}
      subtitle={"Noticed How Many Open-Source Projects?"}
      id="sponsor"
      color="dark"
    >
      <Typography size={5} className="me-2" color="white">
        If you find my open-source work helpful, consider to{" "}
        <u>
          <a href="https://github.com/sponsors/makkahwi/" target="_blank">
            Sponsor Me
          </a>
        </u>{" "}
        on the trusted platform of Github to fuel more projects like these!
      </Typography>
    </PageSection>
  );
};

export default SponsorSection;
