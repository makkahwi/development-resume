import PageCtaSection from "@/components/PageSection/PageCtaSection";

const HandsOffCta = async ({ t }: { t: any }) => {
  return (
    <PageCtaSection
      title={""}
      subtitle={t("Advisory.CtaText")}
      actions={[
        {
          label: t("Advisory.CtaPrimary"),
          url: "#contact",
        },
        {
          label: t("Advisory.CtaSecondary"),

          url: "#download-cv",
          outline: true,
        },
      ]}
    />
  );
};

export default HandsOffCta;
