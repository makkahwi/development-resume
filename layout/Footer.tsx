import Typography from "@/components/typography";
import { socialLinksList } from "@/consts/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonToolbar, Navbar, NavbarText } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar className="py-2 px-4 my-0" bg="transparent">
      <NavbarText className="text-center w-100">
        <hr className="bg-dark border-dark px-5 mx-5" />

        <img src="/images/LogoC.png" width="300px" className="mt-5 mb-0" />

        <h2 className="text-dark mt-0 mb-5 text-uppercase">Suhaib Ahmad</h2>

        <Typography color="dark" justify="center">
          All Rights Reserved © 2018 - {new Date().getFullYear()}
        </Typography>

        <ButtonToolbar className="justify-content-center my-3">
          {socialLinksList.map(({ icon, link }, i) => (
            <a href={link} target="_blank" key={i}>
              <Button variant="ghost" className="text-dark ms-2" size="sm">
                <FontAwesomeIcon icon={icon} />
              </Button>
            </a>
          ))}
        </ButtonToolbar>
      </NavbarText>
    </Navbar>
  );
};

export default Footer;
