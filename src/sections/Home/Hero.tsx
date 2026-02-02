import StatisticCard from "@/components/Pages/StatisticCard";
import * as api from "@/lib/api";
import { statisticsList } from "@/lib/data";
import { StatisticProps } from "@/types/data";
import Image from "next/image";

/**
 * Fetches statistics list from API or returns hardcoded data
 *
 * Note: Statistics are computed from multiple collections (jobs, projects, clients, trainees).
 * When any of these collections are updated via API, the mutation handler should call:
 *   revalidatePath("/") - to refresh home page with updated stats
 *   revalidatePath("/[locale]") - to refresh localized home pages
 */
const getStatisticsList = async (): Promise<StatisticProps[]> => {
  try {
    // Fetch from API endpoint
    const jobsList = await api.getAll("/developer/jobs");
    const clientsList = await api.getAll("/developer/clients");
    const projectsList = await api.getAll("/developer/projects");
    const traineesList = await api.getAll("/developer/trainees");

    return [
      {
        count: jobsList.reduce(
          (total, job) => total + (job.monthsCount || 0),
          0,
        ),
        label: "Months in Web Dev",
        description:
          "Spanning multiple roles since 2015, excluding earlier years as a graphic designer.",
      },
      {
        count: projectsList.filter(({ category }) => category === "Web App")
          ?.length,
        label: "Software Built",
        description:
          "From client portals to internal tools — samples are showcased in the Works section.",
      },
      {
        count: clientsList.length,
        label: "Happy Clients",
        description:
          "Happy employers & direct clients, whom accepted & used the end results.",
      },
      {
        count: traineesList.length,
        label: "Individuals Trained",
        description:
          "Mentored aspiring developers through real-world projects, self-paced learning paths, and code quality reviews.",
      },
      {
        count: projectsList.filter(({ category }) => category === "Consulting")
          ?.length,
        label: "Projects Consulted",
        description:
          "Provided strategic guidance to founders and product owners, regarding roadmapping, architecture and product direction.",
      },
      {
        count: projectsList.filter(({ designed }) => designed)?.length,
        label: "Solutions Architected",
        description:
          "Led end-to-end solution design: from client needs analysis to user journeys and UX flows.",
      },
    ];
  } catch (error) {
    // Fallback to hardcoded data on error
    return statisticsList;
  }
};

const HomeHeroSection = async ({ t }: { t: Function }) => {
  const statistics = await getStatisticsList();

  return (
    <div>
      <header className="mb-5">
        <Image
          src={
            process.env.NEXT_PUBLIC_STORAGE_URL + "profile.jpg" + "?alt=media"
          }
          alt="Logo"
          width={150}
          height={150}
        />
        <h1>{t("Title")}</h1>
        <p className="lead">{t("Subtitle")}</p>
      </header>

      <section>
        <p className="lead">{t("Description")}</p>

        <div className="row">
          {statistics.map((statistic, index) => (
            <StatisticCard key={index} {...statistic} />
          ))}
        </div>

        <button className="btn btn-primary">{t("CTA.Main")}</button>

        <button className="btn btn-outline-primary ms-2">
          {t("CTA.Secondary")}
        </button>

        <button className="btn btn-outline-secondary ms-2">
          {t("CTA.More")}
        </button>
      </section>
    </div>
  );
};

export default HomeHeroSection;
