import PageHeroSection from "@/components/PageSection/PageHeroSection";

const HandsOffHeroSection = async ({ t }: { t: Function }) => {
  return (
    <>
      <PageHeroSection
        badge={t("Intro.Badge")}
        title={t("Intro.Title")}
        subtitle={t("Intro.Subtitle")}
      />
      <section className="pb-4">
        <div className="container">
          <div className="row g-3">
            {["Decisions", "Patterns", "Advisory"].map((key) => (
              <div key={key} className="col-md-4">
                <div className="card border-0 corners">
                  <div className="card-body">
                    <h3 className="h6 fw-bold mb-1">{t(`${key}.Title`)}</h3>
                    <p className="text-muted small mb-0">{t(`${key}.Intro`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HandsOffHeroSection;
