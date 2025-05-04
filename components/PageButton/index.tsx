import { Button, Col } from "react-bootstrap";

interface props {
  light?: boolean;
  text?: string;
  link: string;
}

const PageButton = ({ text, link, light }: props) => {
  return (
    <Col md={12} className="mt-4 text-center">
      <Button
        href={link}
        variant={light ? "light" : "info"}
        className="corners px-4"
      >
        {text || "Show More"}
      </Button>
    </Col>
  );
};

export default PageButton;
