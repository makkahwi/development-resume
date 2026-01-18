import StatisticCard from "@/components/Pages/StatisticCard";
import { statisticsList } from "@/lib/data";

const AboutHeroSection = async ({
  t,
  short,
}: {
  t: Function;
  short?: boolean;
}) => {
  return (
    <div>
      <header className="mb-5">
        {short ? (
          t("About")
        ) : (
          <>
            {statisticsList.map((statistic, index) => (
              <StatisticCard key={index} {...statistic} />
            ))}

            {t("About")}
          </>
        )}
      </header>
    </div>
  );
};

export default AboutHeroSection;
