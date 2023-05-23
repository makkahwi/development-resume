import Link from "next/link";

const Navbar = () => {
  const navLinks = [
    { text: "Home", link: "/" },
    { text: "About", link: "/about" },
    { text: "Resume", link: "/resume" },
    { text: "Portfolio", link: "/portfolio" },
    // { text: "Contacts", link: "/contacts" },
    { text: "Lang", link: "#" },
  ];

  return (
    <div className="row g-0 h-100 shadow">
      <Link
        className="col-md-12 col-2 text-center text-decoration-none py-3 border-0 text-dark bg-theme"
        href={"#"}
      >
        <img src="/images/logo.png" width="50%" />
      </Link>

      {navLinks.map(({ text, link }, i) => (
        <Link
          className={`col-md-12 col-2 text-center text-decoration-none py-3 border border-1 border-dark
                        ${
                          i === 0
                            ? "text-dark bg-white shadow-lg"
                            : "text-white bg-dark"
                        }`}
          href={link}
          key={i}
        >
          {text}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
