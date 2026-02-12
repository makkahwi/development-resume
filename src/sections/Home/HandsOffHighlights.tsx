import PageSection from "@/components/PageSection";
import Link from "next/link";

const HandsOffHighlights = ({ t, locale }: { t: Function; locale: string }) => {
  const items = [
    {
      title: t("HandsOffHighlights.Items.Decisions.Title"),
      body: t("HandsOffHighlights.Items.Decisions.Body"),
      icon: "fa-solid fa-lightbulb",
    },
    {
      title: t("HandsOffHighlights.Items.Advisory.Title"),
      body: t("HandsOffHighlights.Items.Advisory.Body"),
      icon: "fa-solid fa-diagram-project",
    },
    {
      title: t("HandsOffHighlights.Items.Mentoring.Title"),
      body: t("HandsOffHighlights.Items.Mentoring.Body"),
      icon: "fa-solid fa-people-group",
    },
  ];

  return (
    <PageSection
      title={t("HandsOffHighlights.Title")}
      subtitle={t("HandsOffHighlights.Subtitle")}
      id="hands-off"
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
                      {t("HandsOffHighlights.Badge")}
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
          href={`/${locale}/hands-off`}
          className="btn btn-primary px-3 border-0 corners"
        >
          {t("HandsOffHighlights.Cta")}
        </Link>
      </div>
    </PageSection>
  );
};

export default HandsOffHighlights;
