import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";

interface props {
  home?: boolean;
}

const SponsorSection = async ({ home }: props) => {
  return (
    <PageSection
      title={"Sponsor Me"}
      subtitle={"You Could Be Part of This"}
      id="sponsor"
      color={home ? "dark" : "light"}
      bg2
    >
      <Typography
        size={4}
        className="me-2 lh-lg"
        color={home ? "light" : "dark"}
      >
        If you find my open-source work, training assistant or consultation
        helpful, consider to{" "}
        <u>
          <a href="https://github.com/sponsors/makkahwi/" target="_blank">
            Sponsor Me
          </a>
        </u>{" "}
        on the trusted platform of Github to fuel more contributions like these!
      </Typography>
    </PageSection>
  );
};

export default SponsorSection;
