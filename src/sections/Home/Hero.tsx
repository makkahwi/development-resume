import {
  clientsList,
  jobsList,
  projectsList,
  traineesList,
} from "@/api/hardCodedData";

const HomeHeroSection = async ({ t }: { t: Function }) => {
  const stats: { count: number; label: string }[] = [
    {
      count: jobsList.reduce((total, job) => total + (job.monthsCount || 0), 0),
      label: "Months in Web Dev",
    },
    {
      count: projectsList.filter(({ category }) => category === "Web App")
        ?.length,
      label: "Software Built",
    },
    { count: clientsList.length, label: "Happy Clients" },
    { count: traineesList.length, label: "Individuals Trained" },
    {
      count: projectsList.filter(({ category }) => category === "Consulting")
        ?.length,
      label: "Projects Consulted",
    },
    {
      count: projectsList.filter(({ designed }) => designed)?.length,
      label: "Solutions Architected",
    },
  ];

  return (
    <div>
      <header className="mb-5">
        <h1>{t("Title")}</h1>
        <p className="lead">{t("subtitle")}</p>
      </header>

      <section>
        <div className="row">
          {stats.map(({ count, label }, index) => (
            <div
              key={index}
              className="col-6 col-md-4 col-lg-2 mb-4 text-center"
            >
              <h2 className="display-6">{count}+</h2>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeHeroSection;
