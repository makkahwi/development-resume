import PageSection from "@/components/PageSection";
import Link from "next/link";

const HandsOffHighlights = ({ t, locale }: { t: Function; locale: string }) => {
  const items = [
    {
      title: t("HandsOffHighlights.Items.Decisions.Title"),
      body: t("HandsOffHighlights.Items.Decisions.Body"),
    },
    {
      title: t("HandsOffHighlights.Items.Advisory.Title"),
      body: t("HandsOffHighlights.Items.Advisory.Body"),
    },
    {
      title: t("HandsOffHighlights.Items.Mentoring.Title"),
      body: t("HandsOffHighlights.Items.Mentoring.Body"),
    },
  ];

  return (
    <PageSection
      title={t("HandsOffHighlights.Title")}
      subtitle={t("HandsOffHighlights.Subtitle")}
      id="hands-off"
    >
      <div className="row g-4">
        {items.map((item) => (
          <div className="col-12 col-md-4" key={item.title}>
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="h5 fw-bold">{item.title}</h3>
                <p className="text-muted mb-0">{item.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link href={`/${locale}/hands-off`} className="btn btn-outline-primary">
          {t("HandsOffHighlights.Cta")}
        </Link>
      </div>
    </PageSection>
  );
};

export default HandsOffHighlights;
