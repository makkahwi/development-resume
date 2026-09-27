import { AskBox } from "@/components/ask-box";
import { ThemeToggle } from "@/components/theme-toggle";
import { getDeveloperExperienceMonths } from "@/lib/experience-months";

export const dynamic = "force-dynamic";

const profileSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://ai.suhaib.dev/#website",
      url: "https://ai.suhaib.dev/",
      name: "Makkahwi AI",
      description:
        "A conversational guide to public information about Suhaib Ahmad.",
    },
    {
      "@type": "Person",
      "@id": "https://ai.suhaib.dev/#suhaib-ahmad",
      name: "Suhaib Ahmad",
      jobTitle: "Full-stack developer",
      homeLocation: { "@type": "Place", name: "Jordan" },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "International Islamic University Malaysia",
      },
      knowsAbout: ["React", "Next.js", "NestJS", "TypeScript", "Node.js"],
      sameAs: [
        "https://suhaib.dev/",
        "https://personal.suhaib.dev/",
        "https://linkedin.com/in/SuhaibAhmadAi/",
        "https://github.com/makkahwi",
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://ai.suhaib.dev/#webpage",
      url: "https://ai.suhaib.dev/",
      name: "Makkahwi AI | Explore Suhaib Ahmad’s Work and Projects",
      isPartOf: { "@id": "https://ai.suhaib.dev/#website" },
      about: { "@id": "https://ai.suhaib.dev/#suhaib-ahmad" },
      mainEntity: { "@id": "https://ai.suhaib.dev/#suhaib-ahmad" },
    },
  ],
};

function Brand({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return <div className={`brandTile ${className}`}>{children}</div>;
}

export default function Home() {
  const experienceMonths = getDeveloperExperienceMonths();
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profileSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="shell">
        <header className="header">
          <span className="brand">
            Makkahwi<span className="brandAccent"> AI</span>
            <span className="betaTag">BETA</span>
          </span>

          <span className="eyebrow">
            A conversational interface to Suhaib&apos;s{" "}
            <a
              href="https://suhaib.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              work
            </a>{" "}
            &{" "}
            <a
              href="https://personal.suhaib.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              life
            </a>
          </span>
          <ThemeToggle />
        </header>

        <div className="collage" aria-hidden="true">
          <div className="collageColumn leftColumn">
            <div className="experienceTile">
              <span className="tileLabel">DEVELOPER EXPERIENCE</span>
              <strong>{experienceMonths}</strong>
              <span>calendar months</span>
            </div>

            <div className="logoGroup">
              <Brand className="deloitteLogo">Deloitte</Brand>
              <Brand className="sbLogo">Several Brands</Brand>
              <Brand className="modeeLogo">MoDEE Jordan</Brand>
            </div>

            <div className="photoTile hobbyChess">
              <span>CHESS</span>
            </div>

            <div className="movieStack">
              <div className="movieTile knivesOut">
                <span>KNIVES OUT</span>
              </div>

              <div className="movieTile shawshank">
                <span>THE SHAWSHANK REDEMPTION</span>
              </div>
            </div>
          </div>

          <div className="collageColumn rightColumn">
            <div className="techGroup">
              <Brand className="reactLogo">
                <span className="reactMark">⚛</span>React.js
              </Brand>

              <Brand className="nextLogo">
                <span className="nextMark">N</span>Next.js
              </Brand>

              <Brand className="nestLogo">
                <span className="nestMark">⬡</span>NestJS
              </Brand>
            </div>

            <div className="projectTile sanadTile">
              <div className="projectTop">
                <span>PROJECT / SANAD</span>
                <span>↗</span>
              </div>

              <div className="projectScreen sanadScreen" />
            </div>

            <div className="photoRow">
              <div className="photoTile hobbyCooking">
                <span>COOKING</span>
              </div>

              <div className="photoTile hobbyMotorcycle">
                <span>MOTORCYCLES</span>
              </div>
            </div>

            <div className="projectTile mustaheqTile">
              <div className="projectTop">
                <span>PROJECT / MUSTAHEQ</span>
                <span>↗</span>
              </div>

              <div className="projectScreen mustaheqScreen" />
            </div>
          </div>
        </div>

        <AskBox
          intro={
            <>
              <p className="kicker">The person behind the projects.</p>
              <h1 id="hero-title">
                Meet <em></em>
              </h1>
              <p className="lead">
                Explore Suhaib’s work, experience, and ideas through a grounded
                conversation.
              </p>
            </>
          }
        />

        <footer className="footer">
          <span>Built around real work and cited knowledge.</span>
          <span>ai.suhaib.dev</span>
        </footer>
      </div>
    </main>
  );
}
