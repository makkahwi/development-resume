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
    <PageSection title={t("Roles.Title")}>
      <div className="row g-3">
        {roles.map(({ title, body }, i) => (
          <div className="col-md-4" key={i}>
            <div className="border rounded-3 p-3 h-100">
              <h3 className="h6 fw-bold mb-2">{title}</h3>
              <p className="small mb-0 text-muted">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default HandsOffRoles;
