import { getTranslations } from "next-intl/server";

const HomeLocalePage = async({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Home",
  });

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
      </header>      
    </main>
  );
}

export default HomeLocalePage;