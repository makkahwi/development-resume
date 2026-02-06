import StatisticCard from "@/components/Pages/StatisticCard";
import { buildStatisticsList } from "@/lib/data";

const AboutHeroSection = async ({
  t,
  tStats,
  short,
}: {
  t: Function;
  tStats: (key: string) => string;
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
  const atGlanceIcons = [
    "fa-solid fa-chart-line",
    "fa-solid fa-microchip",
    "fa-solid fa-building",
    "fa-solid fa-diagram-project",
    "fa-solid fa-location-dot",
    "fa-solid fa-language",
  ];

  return (
    <section className="py-5 mb-4" id="hero">
      <div className="container">
        {short ? (
          <div className="text-center">
            <p className="lead text-muted">{t("About")}</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-5">
              <h1 className="display-5 fw-bold mb-4">{t("Headline")}</h1>
              <p
                className="lead text-muted mx-auto"
                style={{ maxWidth: "800px" }}
              >
                {t("About")}
              </p>
            </div>

            <div className="row g-4 mb-5">
              {buildStatisticsList(tStats).map((statistic, index) => (
                <StatisticCard key={index} {...statistic} />
              ))}
            </div>

            <div className="card bg-light border-0 shadow-sm">
              <div className="card-body p-4">
                <h3 className="h5 fw-bold mb-4">{t("AtGlanceTitle")}</h3>
                <div className="row g-3">
                  {atGlance.map((item, index) => (
                    <div key={index} className="col-12 col-md-6">
                      <div className="d-flex align-items-start">
                        <div
                          className="bg-white border rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                          style={{ width: "36px", height: "36px" }}
                        >
                          <i
                            className={`${atGlanceIcons[index % atGlanceIcons.length]} text-primary`}
                          />
                        </div>
                        <div>
                          <p className="mb-0 fw-semibold">{item}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AboutHeroSection;
