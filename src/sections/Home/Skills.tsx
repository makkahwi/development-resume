import SkillCard, { SkillsProps } from "@/components/Pages/SkillCard";
import PageSection from "@/components/PageSection";

const SkillsSection = async ({
  t,
  short,
}: {
  t: Function;
  short?: boolean;
}) => {
  const skills: SkillsProps[] = [
    {
      title: "Project Alpha",
      icon: "/images/projects/alpha.png",
      url: "https://example.com/project-alpha",
      level: 90,
      groups: ["Web Development", "UI/UX"],
    },
  ];

  return (
    <PageSection title={t("title")} subtitle={t("subtitle")} id="skills">
      <div className="row">
        {skills.map((skill, index) => (
          <SkillCard key={index} short={short} {...skill} />
        ))}
      </div>
    </PageSection>
  );
};

export default SkillsSection;
