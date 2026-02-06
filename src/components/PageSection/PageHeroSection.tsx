const PageHeroSection = async ({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle: string;
}) => {
  return (
    <section className="py-5 mb-4" id="hero">
      <div className="container">
        <div className="text-center">
          <span className="badge bg-primary bg-opacity-10 text-primary mb-3">
            {badge}
          </span>

          <h1 className="display-5 fw-bold mb-4">{title}</h1>

          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHeroSection;
