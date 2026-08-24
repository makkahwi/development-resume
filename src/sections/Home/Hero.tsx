import Image from "next/image";
import Link from "next/link";

const HomeHeroSection = async ({ t }: { t: (key: string) => string }) => {
  return (
    <section className="py-5 mb-4" id="hero">
      <div className="container">
        <div className="row align-items-center g-4 mb-5">
          <div className="col-12 col-md-6 text-center">
            <div className="position-relative d-inline-block">
              <a
                href="https://committers.top/jordan_private#makkahwi"
                target="_blank"
                rel="noreferrer"
                className="badge bg-primary text-white text-decoration-none position-absolute top-0 mt-5 end-0 m-2"
                style={{ zIndex: 10 }}
              >
                <i className="fa-brands fa-github me-1"></i>
                {t("Badge")}
              </a>

              <Image
                src={
                  process.env.NEXT_PUBLIC_STORAGE_URL +
                  "profile.png" +
                  "?alt=media"
                }
                alt="Logo"
                width={350}
                height={350}
                className="mb-3"
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <h2 className="text-muted mb-3">{t("Subtitle")}</h2>

            <h5 className="my-4" style={{ color: "#999" }}>
              {t("Description")}
            </h5>

            <div className="mb-3">
              <a
                href="https://personal.suhaib.dev"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#ff0000", fontSize: "0.75rem" }}
              >
                {t("Note")}
              </a>
            </div>

            <div>
              <Link
                href={`#clients`}
                className="btn btn-primary px-5 border-0 corners shadow-sm"
              >
                {t("CTA.LearnMore")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
