import PageCtaSection from "@/components/PageSection/PageCtaSection";

const HandsOffCta = async ({ t }: { t: (key: string) => string }) => {
  return (
    <PageCtaSection
      title={""}
      subtitle={t("Advisory.CtaText")}
      id="hands-off-cta"
      actions={[
        {
          label: t("Advisory.CtaPrimary"),
          url: "#contact",
        },
        {
          label: t("Advisory.CtaSecondary"),
          url: "#download-cv",
          color: "secondary",
        },
      ]}
    />
  );
};

export default HandsOffCta;
