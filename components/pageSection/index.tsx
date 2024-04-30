import { Container } from "react-bootstrap";

import SectionTitle from "./SectionTitle";

interface props {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  color?: string;
  card?: boolean;
  NoBg?: boolean;
  bg2?: boolean;
  id?: string;
}

const PageSection = ({
  title,
  subtitle,
  children,
  color = "white",
  bg2 = false,
  card = false,
  NoBg = false,
  id = "",
  ...rest
}: props) => {
  const Bg1Color = () => {
    switch (color) {
      case "light":
      case "white":
        return "BGPattern1C";
      default:
        return "BGPattern1W";
    }
  };

  const Bg2Color = () => {
    switch (color) {
      case "light":
      case "white":
        return "BGPattern2C";
      default:
        return "BGPattern2W";
    }
  };

  const BgPicker = () => {
    switch (bg2) {
      case true:
        return Bg2Color();
      default:
        return Bg1Color();
    }
  };

  const Content = () => (
    <div
      className={`bg-${color}`}
      style={
        NoBg
          ? {
              padding: "17.5vh 0",
            }
          : {
              padding: "17.5vh 0",
              minHeight: "70vh",
              background: `url('/images/${BgPicker()}.png')`,
              backgroundPositionY: "102.5%",
              backgroundPositionX: "-2.5%",
              backgroundSize: "350px auto",
              backgroundRepeat: "no-repeat",
            }
      }
      id={id}
      {...rest}
    >
      <Container>
        {title && (
          <SectionTitle title={title} subtitle={subtitle} color={color} />
        )}

        {children}
      </Container>
    </div>
  );

  return card ? (
    <div className="p-5">
      <Content />
    </div>
  ) : (
    <Content />
  );
};

export default PageSection;
