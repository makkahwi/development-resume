import PageSection from "@/components/PageSection";

const PageCtaSection = ({
  title,
  subtitle,
  actions,
  id,
}: {
  title: string;
  subtitle: string;
  actions: { url: string; label: string; color?: string }[];
  id?: string;
}) => {
  return (
    <PageSection color="light" noBg id={id}>
      <div className="container">
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <h2 className="h3 fw-bold mb-3">{title}</h2>
            <p className="text-muted mb-4">{subtitle}</p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {actions.map(({ url, label, color }, i) => (
                <a
                  key={i}
                  href={url}
                  className={`btn px-4 border-0 corners btn-${color || "primary"}`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
};

export default PageCtaSection;
