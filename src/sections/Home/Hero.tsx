import { brandConfig } from "@/brand/config";
import StatisticCard from "@/components/Pages/StatisticCard";
import * as api from "@/lib/api";
import { statisticsList } from "@/lib/data";
import { StatisticProps } from "@/types/data";
import Image from "next/image";
import Link from "next/link";

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

const HomeHeroSection = async ({
  t,
  home,
  locale,
}: {
  t: Function;
  home?: boolean;
  locale: string;
}) => {
  const statistics = await getStatisticsList();

  return (
    <section className={home ? "py-5 mb-4" : "py-3"} id="hero">
      <div className="container">
        <header className={home ? "text-center mb-5" : "mb-4"}>
          <div className={home ? "mb-4" : "mb-3"}>
            <Image
              src={
                process.env.NEXT_PUBLIC_STORAGE_URL +
                "profile.jpg" +
                "?alt=media"
              }
              alt="Logo"
              width={home ? 180 : 150}
              height={home ? 180 : 150}
              className="rounded-circle shadow"
            />
          </div>
          <h1 className={home ? "display-4 fw-bold mb-3" : "mb-3"}>
            {t("Title")}
          </h1>
          <p
            className={home ? "lead fs-4 text-muted mx-auto" : "lead"}
            style={home ? { maxWidth: "700px" } : {}}
          >
            {t("Subtitle")}
          </p>
        </header>

        <div className={home ? "mb-5" : "mb-4"}>
          <p
            className={home ? "lead text-center mx-auto mb-5" : "lead mb-4"}
            style={home ? { maxWidth: "800px" } : {}}
          >
            {t("Description")}
          </p>

          <div className="row g-4">
            {statistics.map((statistic, index) => (
              <StatisticCard key={index} short {...statistic} />
            ))}
          </div>
        </div>

        <div className={home ? "text-center" : ""}>
          <Link
            href={`/${locale}#contact`}
            className="btn btn-primary btn-lg px-4 border-0 corners"
          >
            {t("CTA.Main")}
          </Link>
          <a
            className="btn btn-secondary btn-lg ms-2 px-4 border-0 corners"
            href={brandConfig.cvUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t("CTA.Secondary")}
          </a>
          <Link
            href={`/${locale}/hands-on`}
            className="btn btn-secondary btn-lg ms-2 px-4 border-0 corners"
          >
            {t("CTA.More")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
