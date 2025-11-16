import Link from "next/link";

const HomePage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <main className="container py-5">
      <header className="mb-5">
        <p className="text-muted small text-uppercase mb-1">
          {isAr ? "الموقع قيد التطوير" : "Site under construction"}
        </p>
        <h1 className="display-4 fw-bold mb-3">Suhaib Ahmad</h1>
        <p className="lead">
          Senior Full-Stack Developer, Technical Advisor, and Founder.
        </p>
        <div className="d-flex gap-2 mt-3">
          <Link href="#work-with-me" className="btn btn-primary">
            {isAr ? "لنعمل معًا" : "Work With Me"}
          </Link>
          <Link href="#download-cv" className="btn btn-outline-secondary">
            {isAr ? "تحميل السيرة الذاتية" : "Download CV"}
          </Link>
        </div>
      </header>

      <section className="mb-5">
        <h2 className="h4 mb-3">
          {isAr ? "الخطوات التالية" : "Next steps"}
        </h2>
        <ul>
          <li>Build the real page structure (Home / About / Hands-on / Hands-off / Give Back / Blog).</li>
          <li>Wire backend data via axios.</li>
          <li>Fill in legal pages and analytics events.</li>
        </ul>
      </section>

      <section id="work-with-me" className="mb-5">
        <h2 className="h4 mb-3">
          {isAr ? "لنعمل معًا" : "Work With Me"}
        </h2>
        <p>
          {isAr
            ? "سيتم هنا لاحقًا إضافة نموذج للتعاون أو فرص العمل."
            : "This will later become a dedicated CTA and contact flow for employment, freelance, or collaboration."}
        </p>
      </section>

      <section id="download-cv">
        <h2 className="h4 mb-3">
          {isAr ? "تحميل السيرة الذاتية" : "Download CV"}
        </h2>
        <p>
          {isAr
            ? "سيتم لاحقًا توليد ملف PDF للسيرة الذاتية يمكن قراءته بواسطة أنظمة ATS."
            : "This will later call an API route that generates an ATS-friendly PDF CV."}
        </p>
      </section>
    </main>
  );
}

export default HomePage;