import { statisticsList } from "@/api/hardCodedData";
import StatisticCard from "@/components/Pages/StatisticCard";

const AboutHeroSection = async () => {
  return (
    <div>
      <header className="mb-5">
        {statisticsList.map((statistic, index) => (
          <StatisticCard key={index} {...statistic} />
        ))}

        {
          "With nearly a decade of experience in  web development, I specialize in building performant, scalable, and user-centric web applications. I’ve grown from  front-end foundations into full-stack leadership — balancing clean code, intuitive UX, and product thinking. My focus since 2020 has been on  JavaScript,  TypeScript, and modern frameworks like  React.Js,  Next.Js and  Nest.Js, backed by hands-on work in both  client and  backend environments. Been part of startups for most of the time, but also tested working with small firms & big cooperations. I've led development efforts, contributed to open-source, and overseen product deliverables — always aiming to turn ideas into impactful software. I'm driven by curiosity, quality, and collaborative problem-solving."
        }
      </header>
    </div>
  );
};

export default AboutHeroSection;
