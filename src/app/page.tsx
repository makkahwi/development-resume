import Link from "next/link";

export default function Home() {
  return (
    <main className="container py-5">
      <header className="mb-5">
        <h1 className="display-4 fw-bold mb-3">
          Suhaib Ahmad
        </h1>
        <p className="lead">
          Senior Full-Stack Developer, Technical Advisor, and Founder.
        </p>
        <div className="d-flex gap-2 mt-3">
          <Link href="#work-with-me" className="btn btn-primary">
            Work With Me
          </Link>
          <Link href="#download-cv" className="btn btn-outline-secondary">
            Download CV
          </Link>
        </div>
      </header>

      <section className="mb-5">
        <h2 className="h4 mb-3">Getting Started</h2>
        <p className="mb-1">
          This is a placeholder home page. Next steps:
        </p>
        <ul>
          <li>Set up localized routing <code>/[locale]</code>.</li>
          <li>Replace this page with the real Home layout.</li>
          <li>Wire data fetching from your backend via axios.</li>
        </ul>
      </section>

      <section id="work-with-me" className="mb-5">
        <h2 className="h4 mb-3">Work With Me</h2>
        <p>
          This will later become a dedicated CTA section for employment, freelance,
          or collaboration opportunities.
        </p>
      </section>

      <section id="download-cv">
        <h2 className="h4 mb-3">Download CV</h2>
        <p>
          This will later call an API route that generates an ATS-friendly PDF CV.
        </p>
      </section>
    </main>
  );
}
