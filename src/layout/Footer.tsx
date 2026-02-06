import ContactForm from "@/components/ContactForm";
import { contactsList } from "@/lib/data";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

const Footer = async () => {
  const t = await getTranslations("Layout.Footer");
  const locale = await getLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-5 pt-4 border-top bg-transparent">
      <ContactForm />

      <div className="container text-center">
        <hr className="px-5 mx-5" />

        <img src="/images/LogoC.png" width={200} className="mt-5" alt="Logo" />

        <h2 className="text-dark my-3 text-uppercase">{t("Title")}</h2>

        <p className="text-muted mt-4 mb-2">
          {t("AllRightsReserved")} © 2018 - {year}
        </p>

        <div className="d-flex justify-content-center gap-3 my-3">
          <Link href={`/${locale}/privacy`} className="text-muted small">
            {t("Privacy")}
          </Link>
          <Link href={`/${locale}/terms`} className="text-muted small">
            {t("Terms")}
          </Link>
          <Link href={`/${locale}/cookies`} className="text-muted small">
            {t("Cookies")}
          </Link>
        </div>

        <div className="d-flex justify-content-center gap-3 my-3">
          {contactsList.map(({ color, icon, label, url, name }, i) => (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{ color }}
              key={i}
            >
              <i className={`fa-solid ${icon}`} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
