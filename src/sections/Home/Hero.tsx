import { TransitionFunction } from "react";

const HomeHeroSection = async ({ t }: { t: Function }) => {
  const stats = [
    { count: 151, label: "Months in Web Dev" },
    { count: 61, label: "Software Built" },
    { count: 30, label: "Happy Clients" },
    { count: 15, label: "Individuals Trained" },
    { count: 14, label: "Projects Consulted" },
    { count: 13, label: "Solutions Architected" },
  ];

  return (
    <div>
      <header className="mb-5">
        <h1>{t("title")}</h1>
        <p className="lead">{t("subtitle")}</p>
      </header>

      <section>
        <div className="row">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="col-6 col-md-4 col-lg-2 mb-4 text-center"
            >
              <h2 className="display-6">{stat.count}+</h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeHeroSection;
