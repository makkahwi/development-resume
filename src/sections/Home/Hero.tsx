import { statisticsList } from "@/api/hardCodedData";
import StatisticCard from "@/components/Pages/StatisticCard";

const HomeHeroSection = async ({ t }: { t: Function }) => {
  return (
    <div>
      <header className="mb-5">
        <h1>{t("Title")}</h1>
        <p className="lead">{t("Subtitle")}</p>
      </header>

      <section>
        <div className="row">
          {statisticsList.map((statistic, index) => (
            <StatisticCard key={index} {...statistic} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeHeroSection;
