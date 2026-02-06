import PageSection from "@/components/PageSection";
import Link from "next/link";

const GiveBackHighlights = ({
  t,
  locale,
}: {
  t: Function;
  locale: string;
}) => {
  const items = [
    {
      title: t("GiveBackHighlights.Items.Mentoring.Title"),
      body: t("GiveBackHighlights.Items.Mentoring.Body"),
    },
    {
      title: t("GiveBackHighlights.Items.OpenSource.Title"),
      body: t("GiveBackHighlights.Items.OpenSource.Body"),
    },
    {
      title: t("GiveBackHighlights.Items.Tools.Title"),
      body: t("GiveBackHighlights.Items.Tools.Body"),
    },
  ];

  return (
    <PageSection
      title={t("GiveBackHighlights.Title")}
      subtitle={t("GiveBackHighlights.Subtitle")}
      id="give-back"
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
        <Link
          href={`/${locale}/non-profit`}
          className="btn btn-outline-primary"
        >
          {t("GiveBackHighlights.Cta")}
        </Link>
      </div>
    </PageSection>
  );
};

export default GiveBackHighlights;
