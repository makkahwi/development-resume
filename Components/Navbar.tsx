"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaHome,
  FaIndustry,
  FaPhone,
  FaPortrait,
  FaScroll,
} from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();

  const navLinks = [
    { text: "Home", link: "/", Icon: FaHome },
    { text: "About", link: "/about", Icon: FaPortrait },
    { text: "Resume", link: "/resume", Icon: FaScroll },
    { text: "Portfolio", link: "/portfolio", Icon: FaIndustry },
    { text: "Contacts", link: "/contacts", Icon: FaPhone },
  ];

  return (
    <div className="row g-0 h-100 shadow">
      <Link
        className="col-md-12 col-2 text-center text-decoration-none py-3 border-0 text-dark bg-theme"
        href={""}
      >
        <img src="/images/logo.png" width="50%" alt="logo" />
      </Link>

      {navLinks.map(({ text, link, Icon }, i) => (
        <Link
          className={`col-md-12 col-2 text-center text-decoration-none py-4 border border-1 border-dark
                        ${
                          router === link
                            ? "text-dark bg-white shadow-lg"
                            : "text-white bg-dark"
                        }`}
          href={link}
          key={i}
        >
          <Icon className="h3" />
          {/* {text} */}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
