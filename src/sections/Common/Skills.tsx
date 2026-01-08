import { skillsList } from "@/api/hardCodedData";
import SkillCard from "@/components/Pages/SkillCard";
import PageSection from "@/components/PageSection";

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
    >
      <div className="row">
        {skillsList.map((skill, index) => (
          <SkillCard key={index} short={short} {...skill} />
        ))}
      </div>
    </PageSection>
  );
};

export default SkillsSection;
