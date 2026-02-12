import PageSection from "@/components/PageSection";
import { clientsList } from "@/lib/data";

const ClientsSection = async ({ t }: { t: Function }) => {
  return (
    <PageSection id="clients" noPadding>
      <div className="row g-1 g-lg-3 g-xl-1 justify-content-center align-items-center">
        {clientsList
          .filter(
            ({ prominent, image }) => prominent && image && image.length > 0,
          )
          .map(({ url, image, label }, index) => (
            <div key={index} className="col-3 col-md-2 col-xl-1">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center justify-content-center px-3 client-logo-link"
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
