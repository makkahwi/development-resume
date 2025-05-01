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
      <div className="w-100 p-2 row mx-2">
        <div className="col-md-9">
          <Typography size={5} className="me-2" color="white">
            If you find my open-source work helpful, consider sponsoring me on
            the trusted platform of Github to fuel more projects like these!
          </Typography>
        </div>

        <div className="col-md-3">
          <iframe
            src="https://github.com/sponsors/makkahwi/button"
            title="Sponsor makkahwi"
            height="32"
            width="114"
          />
        </div>
      </div>
    </PageSection>
  );
};

export default SponsorSection;
