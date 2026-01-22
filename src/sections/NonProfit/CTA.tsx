import PageSection from "@/components/PageSection";

const NonProfitCTA = ({ t }: { t: any }) => {
  return (
    <PageSection color="light" noBg>
      <div className="container">
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <h2 className="h3 fw-bold mb-3">{t("Cta.Title")}</h2>
            <p className="text-muted mb-4">{t("Cta.Body")}</p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <a href="#contact" className="btn btn-primary btn-lg px-4">
                {t("Cta.ForDevelopers")}
              </a>
              <a
                href="#contact"
                className="btn btn-outline-primary btn-lg px-4"
              >
                {t("Cta.ForOrganizations")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
};

export default NonProfitCTA;
