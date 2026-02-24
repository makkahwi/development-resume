import SkillCard from "@/components/Pages/SkillCard";
import PageSection from "@/components/PageSection";
import { getSkillsList } from "@/lib/data";

const SkillsSection = async ({
  t,
  short,
}: {
  t: (key: string) => string;
  short?: boolean;
}) => {
  const skillsList = await getSkillsList();

  return (
    <PageSection
      title={t("Skills.Title")}
      subtitle={t("Skills.Subtitle")}
      id="skills"
      noBg={short}
      color={short ? "white" : "light"}
    >
      <div className="row g-4">
        {skillsList
          .filter((skill) =>
            short
              ? !["ElasticSearch", "MicroServices"].includes(skill.label)
              : true,
          )
          .map((skill, index) => (
            <SkillCard key={index} short={short} {...skill} />
          ))}
      </div>
    </PageSection>
  );
};

export default SkillsSection;
