const NonProfitCTA = ({ t }: { t: any }) => {
  return (
    <section className="mb-5 text-center">
      <h2 className="h5 fw-semibold mb-3">{t("Cta.Title")}</h2>
      <p className="small text-muted mb-3">{t("Cta.Body")}</p>
      <div className="d-flex justify-content-center gap-2">
        <a href="#contact" className="btn btn-primary">
          {t("Cta.ForDevelopers")}
        </a>
        <a href="#contact" className="btn btn-outline-secondary">
          {t("Cta.ForOrganizations")}
        </a>
      </div>
    </section>
  );
};

export default NonProfitCTA;
