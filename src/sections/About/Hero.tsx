import StatisticCard from "@/components/Pages/StatisticCard";
import { statisticsList } from "@/lib/data";

const AboutHeroSection = async ({
  t,
  short,
}: {
  t: Function;
  short?: boolean;
}) => {
  const atGlance = [
    t("AtGlance.Experience"),
    t("AtGlance.Specialization"),
    t("AtGlance.Sectors"),
    t("AtGlance.Environments"),
    t("AtGlance.Locations"),
    t("AtGlance.Languages"),
  ];

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

            <div className="row">
              {atGlance.map((item, index) => (
                <div key={index} className="col-12 col-md-6 mb-3">
                  <div className="d-flex align-items-start">
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </header>
    </div>
  );
};

export default AboutHeroSection;
