import PageSection from "@/components/PageSection";
import { educationsList } from "@/lib/data";

const HighlightsSection = async ({ t }: { t: Function }) => {
  const contents = [
    t("Highlights.Content1"),
    t("Highlights.Content2"),
    t("Highlights.Content3"),
    t("Highlights.Content4"),
    t("Highlights.Content5"),
    t("Highlights.Content6"),
  ];
  return (
    <PageSection
      title={t("Highlights.Title")}
      subtitle={t("Highlights.Subtitle")}
      id="highlights"
    >
      {contents.map((content, index) => (
        <div key={index} className="col-6 col-md-4 col-lg-2 mb-4 text-center">
          <h4 className="display-6">{content}</h4>
        </div>
      ))}
    </PageSection>
  );
};

export default HighlightsSection;
