import PageSection from "@/components/PageSection";

const HandsOffRoles = async ({ t }: { t: any }) => {
  const roles = [
    {
      title: t("Roles.ProductTranslator.Title"),
      body: t("Roles.ProductTranslator.Body"),
    },
    {
      title: t("Roles.ArchitectureSteward.Title"),
      body: t("Roles.ArchitectureSteward.Body"),
    },
    {
      title: t("Roles.DeveloperMentor.Title"),
      body: t("Roles.DeveloperMentor.Body"),
    },
  ];
  return (
    <PageSection title={t("Roles.Title")} color="light" id="roles">
      <div className="row g-4">
        {roles.map(({ title, body }, i) => (
          <div className="col-md-4" key={i}>
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="h5 fw-bold mb-3">{title}</h3>
                <p className="text-muted mb-0">{body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default HandsOffRoles;
