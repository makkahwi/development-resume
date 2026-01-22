import SkillCard from "@/components/Pages/SkillCard";
import PageSection from "@/components/PageSection";
import { skillsList } from "@/lib/data";

const SkillsSection = async ({
  t,
  short,
}: {
  t: Function;
  short?: boolean;
}) => {
  return (
    <PageSection
      title={t("Skills.Title")}
      subtitle={t("Skills.Subtitle")}
      id="skills"
      color="light"
    >
      <div className="row g-4">
        {skillsList.map((skill, index) => (
          <SkillCard key={index} short={short} {...skill} />
        ))}
      </div>
    </PageSection>
  );
};

export default SkillsSection;
