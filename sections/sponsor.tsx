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
      <div className="w-100 bg-white p-2 row mx-2">
        <div className="col-md-9">
          <Typography size={4} className="me-2" color="dark">
            Sponsor Me On The Trusted Platform Of Github
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
