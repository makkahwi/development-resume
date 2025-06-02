"use client";

import {
  faCode,
  faDownload,
  faHeart,
  faHome,
  faMobile,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "react-bootstrap";

const NavbarComp = () => {
  const links = [
    {
      title: "Home",
      link: "/",
      icon: faHome,
    },
    {
      title: "About",
      link: "/about",
      icon: faPerson,
    },
    { title: "Works", link: "/works", icon: faCode },
    { title: "Helps", link: "/helps", icon: faHeart },
    { title: "Contact", link: "contact", scroll: true, icon: faMobile },
  ];

  return (
    <Navbar
      expand="lg"
      className="py-0 px-5 mx-3 mt-3 border-bottom border-top border-dark fixed-top m-0 corners"
      bg="info"
    >
      <NavbarBrand role="button">
        <a href="/" className="text-decoration-none text-uppercase font">
          <img src="/images/LogoW.png" width="65px" />{" "}
          <span className="text-white">Suhaib</span>{" "}
          <span className="text-white d-none d-md-inline">Ahmad</span>
        </a>
      </NavbarBrand>

      <NavbarToggle
        aria-controls="navbarScroll"
        className="text-white border-white bg-white"
      />

      <NavbarCollapse className="justify-content-end">
        <Nav>
          {links.map(({ title, link, scroll, icon }, i) => (
            <NavItem key={i}>
              <NavLink
                href={(scroll ? "#" : "") + link}
                className="text-white text-decoration-none"
              >
                <FontAwesomeIcon
                  icon={icon}
                  className="me-1 text-white fw-bold"
                />
                <span className="text-white d-inline d-lg-none d-xl-inline font">
                  {title}
                </span>
              </NavLink>
            </NavItem>
          ))}

          <NavItem>
            <Button
              variant="light"
              className="text-info ms-1 corners px-4"
              href="https://firebasestorage.googleapis.com/v0/b/resume-data-8215f.appspot.com/o/Suhaib-Ahmad-ATS-Resume-Sheet.pdf?alt=media"
              target="_blank"
            >
              <FontAwesomeIcon icon={faDownload} className="me-1 fw-bold" />
              <span className="d-inline d-lg-none d-xl-inline font">CV</span>
            </Button>
          </NavItem>
        </Nav>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavbarComp;
