import PageSection from "@/components/PageSection";

type LegalSection = {
  title: string;
  body: string;
};

const LegalContent = ({
  sections,
  lastUpdatedLabel,
  lastUpdatedDate,
}: {
  sections: LegalSection[];
  lastUpdatedLabel: string;
  lastUpdatedDate: string;
}) => {
  return (
    <PageSection noBg>
      <div className="mx-auto" style={{ maxWidth: "900px" }}>
        <p className="text-muted small">
          {lastUpdatedLabel}: {lastUpdatedDate}
        </p>

        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            <h2 className="h5 fw-bold mb-2">{section.title}</h2>
            <p className="text-muted mb-0">{section.body}</p>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default LegalContent;
