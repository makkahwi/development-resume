const NonProfitHeroSection = async ({ t }: { t: Function }) => {
  return (
    <section className="py-5 mb-4">
      <div className="container">
        <div className="text-center">
          <span className="badge bg-primary bg-opacity-10 text-primary mb-3">
            {t("Intro.Badge")}
          </span>
          <h1 className="display-5 fw-bold mb-4">{t("Intro.Title")}</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            {t("Intro.Subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default NonProfitHeroSection;
