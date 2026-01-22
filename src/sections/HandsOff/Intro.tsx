const HandsOffIntro = async ({ t }: { t: any }) => {
  return (
    <section className="mb-5 text-center">
      <span className="badge bg-light text-secondary mb-2">
        {t("Intro.Badge")}
      </span>
      <h1 className="h3 fw-bold mb-3">{t("Intro.Title")}</h1>
      <p className="text-muted mb-0">{t("Intro.Subtitle")}</p>
    </section>
  );
};

export default HandsOffIntro;
