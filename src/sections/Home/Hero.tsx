import { brandConfig } from "@/brand/config";
import StatisticCard from "@/components/Pages/StatisticCard";
import * as api from "@/lib/api";
import {
  buildStatisticsList,
  clientsList,
  jobsList,
  projectsList,
  traineesList,
} from "@/lib/data";
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
const getStatisticsList = async (
  tStats: (key: string) => string,
): Promise<StatisticProps[]> => {
  try {
    // Fetch from API endpoint
    const jobsList = await api.getAll("/developer/jobs");
    const clientsList = await api.getAll("/developer/clients");
    const projectsList = await api.getAll("/developer/projects");
    const traineesList = await api.getAll("/developer/trainees");

    return buildStatisticsList(tStats, {
      jobs: jobsList,
      clients: clientsList,
      projects: projectsList,
      trainees: traineesList,
    });
  } catch (error) {
    // Fallback to hardcoded data on error
    return buildStatisticsList(tStats, {
      jobs: jobsList,
      clients: clientsList,
      projects: projectsList,
      trainees: traineesList,
    });
  }
};

const HomeHeroSection = async ({
  t,
  locale,
  tStats,
}: {
  t: Function;
  locale: string;
  tStats: (key: string) => string;
}) => {
  const statistics = await getStatisticsList(tStats);

  return (
    <section className="py-5" id="hero">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-6 text-center">
            <Image
              src={
                process.env.NEXT_PUBLIC_STORAGE_URL +
                "profile.png" +
                "?alt=media"
              }
              alt="Logo"
              width={250}
              height={250}
              className="mb-3"
            />
            <h1 className="h2 fw-normal mb-0">{t("Title")}</h1>
          </div>

          <div className="col-12 col-md-6">
            <p className="text-muted mb-3" style={{ fontSize: "1rem" }}>
              {t("Subtitle")}
            </p>

            <p className="mb-4" style={{ fontSize: "0.875rem", color: "#999" }}>
              {t("Description")}
            </p>

            <div className="row g-3 mb-4">
              {statistics.map((statistic, index) => (
                <StatisticCard key={index} short {...statistic} />
              ))}
            </div>

            <div>
              <Link
                href={`/${locale}#contact`}
                className="btn btn-primary px-5 border-0 corners shadow-sm"
              >
                {t("CTA.Main")}
              </Link>
              <a
                className="btn btn-secondary ms-2 px-4 border-0 corners"
                href={brandConfig.cvUrl}
                target="_blank"
                rel="noreferrer"
              >
                {t("CTA.Secondary")}
              </a>
              <Link
                href={`/${locale}/hands-on`}
                className="btn btn-secondary ms-2 px-4 border-0 corners"
              >
                {t("CTA.More")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
