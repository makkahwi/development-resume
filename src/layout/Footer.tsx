import ContactForm from "@/components/ContactForm";
import { contactsList } from "@/lib/data";
import { normalizeFaIcon } from "@/lib/icons";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

const Footer = async ({ locale }: { locale: string }) => {
  const t = await getTranslations({ locale, namespace: "Layout.Footer" });
  const year = new Date().getFullYear();

  return (
    <footer className="mt-5 pt-4 border-top bg-transparent">
      <ContactForm />

      <div className="container text-center">
        <hr className="px-5 mx-5" />

        <Image
          src="/images/LogoC.png"
          width={200}
          height={200}
          alt="Logo"
          className="mt-5"
        />

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
          {contactsList.map(({ color, icon, url }, i) => (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{ color }}
              key={i}
            >
              <i className={normalizeFaIcon(icon)} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
