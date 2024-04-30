"use client";

import {
  faBriefcase,
  faGraduationCap,
  faHome,
  faImages,
  faMobile,
  faNewspaper,
  faPaintBrush,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "react-bootstrap";
import { Link } from "react-scroll";

const NavbarComp = () => {
  const links = [
    {
      title: "Home",
      link: "home",
      icon: faHome,
    },
    {
      title: "About",
      link: "about",
      icon: faPerson,
    },
    {
      title: "Experiences",
      link: "experiences",
      icon: faBriefcase,
    },
    { title: "Works", link: "works", icon: faImages },
    { title: "Skills", link: "skills", icon: faPaintBrush },
    { title: "Education", link: "education", icon: faGraduationCap },
    { title: "Blog", link: "blog", icon: faNewspaper },
    { title: "Contact", link: "contact", icon: faMobile },
  ];

  return (
    <Navbar
      expand="lg"
      className="py-0 px-5 mx-3 mt-3 border-bottom border-info rounded-5 fixed-top m-0"
      bg="info"
    >
      <NavbarBrand className="fw-bold" role="button">
        <Link to="home" className="text-decoration-none">
          <img src="/images/LogoW.png" width="65px" />{" "}
          <span className="text-white">Suhaib</span>{" "}
          <span className="text-white d-none d-md-inline">Ahmad</span>
        </Link>
      </NavbarBrand>

      <NavbarToggle
        aria-controls="navbarScroll"
        className="text-white border-white bg-white"
      />

      <NavbarCollapse className="justify-content-end">
        <Nav>
          {links.map(({ title, link, icon }, i) => (
            <NavItem key={i}>
              <Link
                to={link}
                className="text-white fw-bold text-decoration-none"
              >
                <NavLink>
                  <FontAwesomeIcon
                    icon={icon}
                    className="me-1 text-white fw-bold"
                  />
                  <span className="text-white fw-bold d-inline d-lg-none d-xl-inline">
                    {title}
                  </span>
                </NavLink>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavbarComp;
