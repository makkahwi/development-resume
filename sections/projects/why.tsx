import CardComp from "@/components/Card";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";

const WhySection = () => {
  return (
    <PageSection title="Why EdTech" subtitle="Education As Passion">
      <CardComp color="info" className="p-4">
        <Typography size={4} color="info">
          {
            "Naturally, I do believe in the importance of education, and as I went through my foundation and high educational pursuit in 2 overseas nations, I am passionate about contributing to the sector in our nation of Jordan & the region. But that was not the trigger."
          }
        </Typography>

        <Typography size={4} color="info" className="my-5">
          {
            "Along my 8 years of IT careers, I worked with several schools, and I noticed the issues they are facing due to the lack of tech tools to help them educate our kids better. And in 2 of those experiences, I did apply some of the solutions I had in mind, and noticed the big leap they experienced after that."
          }
        </Typography>

        <Typography size={4} color="info">
          {
            "As a matter of fact, my solution (Semesteer) MVP was developed and tested within the most recent experience of working with a school. So that convinced me of the tech impact over education, and the initial success of my first experience is what made me start this journey."
          }
        </Typography>
      </CardComp>
    </PageSection>
  );
};

export default WhySection;
