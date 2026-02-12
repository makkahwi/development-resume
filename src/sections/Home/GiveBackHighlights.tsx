import PageSection from "@/components/PageSection";
import Link from "next/link";

const GiveBackHighlights = ({ t, locale }: { t: Function; locale: string }) => {
  const items = [
    {
      title: t("GiveBackHighlights.Items.Mentoring.Title"),
      body: t("GiveBackHighlights.Items.Mentoring.Body"),
      icon: "fa-solid fa-heart",
    },
    {
      title: t("GiveBackHighlights.Items.OpenSource.Title"),
      body: t("GiveBackHighlights.Items.OpenSource.Body"),
      icon: "fa-brands fa-github",
    },
    {
      title: t("GiveBackHighlights.Items.Tools.Title"),
      body: t("GiveBackHighlights.Items.Tools.Body"),
      icon: "fa-solid fa-screwdriver-wrench",
    },
  ];

  return (
    <PageSection
      title={t("GiveBackHighlights.Title")}
      subtitle={t("GiveBackHighlights.Subtitle")}
      id="give-back"
      color="light"
    >
      <div className="row g-4">
        {items.map((item) => (
          <div className="col-12 col-md-4" key={item.title}>
            <div className="card bg-white h-100 border-0 p-3 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-start gap-3 mb-3">
                  <div
                    className="bg-light border rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: "44px", height: "44px" }}
                  >
                    <i className={`${item.icon} text-primary fs-5`} />
                  </div>
                  <div>
                    <h3 className="h5 fw-bold mb-1">{item.title}</h3>
                    <span className="badge text-bg-primary-subtle text-primary fw-semibold">
                      {t("GiveBackHighlights.Badge")}
                    </span>
                  </div>
                </div>
                <p className="text-muted mb-0">{item.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link
          href={`/${locale}/non-profit`}
          className="btn btn-primary px-4 border-0 corners"
        >
          {t("GiveBackHighlights.Cta")}
        </Link>
      </div>
    </PageSection>
  );
};

export default GiveBackHighlights;
