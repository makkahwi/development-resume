import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function HomeLocalePage() {
  const t = await getTranslations("Home");

  return (
    <main className="container py-5">
      <header className="mb-5">
        <p className="text-muted small text-uppercase mb-1">
          {t("badge")}
        </p>
        <h1 className="display-4 fw-bold mb-3">
          {t("headline")}
        </h1>
        <p className="lead">
          {t("subtitle")}
        </p>
        <div className="d-flex gap-2 mt-3">
          <Link href="#work-with-me" className="btn btn-primary">
            {t("workWithMe")}
          </Link>
          <Link href="#download-cv" className="btn btn-outline-secondary">
            {t("downloadCv")}
          </Link>
        </div>
      </header>

      <section className="mb-5">
        <h2 className="h4 mb-3">
          {t("nextStepsTitle")}
        </h2>
        <ul>
          <li>{t("nextStep1")}</li>
          <li>{t("nextStep2")}</li>
          <li>{t("nextStep3")}</li>
        </ul>
      </section>

      <section id="work-with-me" className="mb-5">
        <h2 className="h4 mb-3">
          {t("workWithMeTitle")}
        </h2>
        <p>{t("workWithMeBody")}</p>
      </section>

      <section id="download-cv">
        <h2 className="h4 mb-3">
          {t("downloadCvTitle")}
        </h2>
        <p>{t("downloadCvBody")}</p>
      </section>
    </main>
  );
}
