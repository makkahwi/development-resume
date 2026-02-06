import PageSection from "@/components/PageSection";
import PageCtaSection from "@/components/PageSection/PageCtaSection";

const NonProfitCTA = ({ t }: { t: any }) => {
  return (
    <PageCtaSection
      title={t("Cta.Title")}
      subtitle={t("Cta.Body")}
      id="giveback-cta"
      actions={[
        {
          label: t("Cta.ForDevelopers"),
          url: "#contact",
        },
        {
          label: t("Cta.ForOrganizations"),
          url: "#contact",
          outline: true,
        },
      ]}
    />
  );
};

export default NonProfitCTA;
