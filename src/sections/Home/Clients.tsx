import PageSection from "@/components/PageSection";
import { clientsList } from "@/lib/data";

const ClientsSection = async ({ t, home }: { t: Function; home?: boolean }) => {
  return (
    <PageSection
      title={home ? t("Clients.Title") : undefined}
      subtitle={home ? t("Clients.Subtitle") : undefined}
      id="clients"
      color={home ? "light" : "white"}
    >
      <div className="row g-4 justify-content-center align-items-center">
        {clientsList
          .filter(
            ({ prominent, image }) => prominent && image && image.length > 0,
          )
          .map(({ url, image, label }, index) => (
            <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center justify-content-center p-3 client-logo-link"
                style={{ minHeight: "100px" }}
              >
                <img
                  src={
                    process.env.NEXT_PUBLIC_STORAGE_URL + image + "?alt=media"
                  }
                  alt={label}
                  className="img-fluid client-logo"
                />
              </a>
            </div>
          ))}
      </div>
    </PageSection>
  );
};

export default ClientsSection;
