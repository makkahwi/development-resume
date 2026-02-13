import StatisticCard from "@/components/Pages/StatisticCard";
import PageSection from "@/components/PageSection";
import { buildStatisticsList } from "@/lib/data";

const AboutHeroSection = async ({
  t,
  tStats,
  short,
}: {
  t: (key: string) => string;
  tStats: (key: string) => string;
  short?: boolean;
}) => {
  const atGlance = [
    { label: t("AtGlance.Experience"), icon: "fa-solid fa-chart-line" },
    { label: t("AtGlance.Specialization"), icon: "fa-solid fa-microchip" },
    { label: t("AtGlance.Sectors"), icon: "fa-solid fa-building" },
    { label: t("AtGlance.Environments"), icon: "fa-solid fa-diagram-project" },
    { label: t("AtGlance.Locations"), icon: "fa-solid fa-location-dot" },
    { label: t("AtGlance.Languages"), icon: "fa-solid fa-code" },
  ];

  return (
    <PageSection color={short ? "light" : undefined} noBg id="hero">
      <div className="container">
        {short ? (
          ""
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
          </>
        )}

        <div className="row g-4 mb-5">
          {buildStatisticsList(tStats).map((statistic, index) => (
            <StatisticCard key={index} short={short} {...statistic} />
          ))}
        </div>

        <div
          className={`card ${short ? "bg-white" : "bg-light"} border-0 shadow-sm`}
        >
          <div className="card-body p-4">
            <h3 className="h5 fw-bold mb-4">{t("AtGlanceTitle")}</h3>
            <div className="row g-3">
              {atGlance.map(({ label, icon }, index) => (
                <div key={index} className="col-12 col-md-6">
                  <div className="d-flex align-items-start">
                    <div
                      className="bg-light border rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                      style={{ width: "36px", height: "36px" }}
                    >
                      <i className={`${icon} text-primary`} />
                    </div>
                    <div>
                      <p className="mb-0 fw-semibold">{label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
};

export default AboutHeroSection;
