import { Fragment } from "react";

interface props {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  color?: string;
  card?: boolean;
  noBg?: boolean;
  bigPadding?: boolean;
  bg2?: boolean;
  id?: string;
}

const SectionTitle = ({ title = "", subtitle = "", color = "" }) => {
  const textColor = () => {
    switch (color) {
      case "primary":
        return "white";
      case "secondary":
        return "white";
      case "info":
        return "white";
      case "light":
        return "info";
      case "info":
        return "light";
      case "dark":
        return "white";
      default:
        return "info";
    }
  };

  return (
    <Fragment>
      <h6 color={textColor()} className="font text-center">
        {subtitle}
      </h6>

      <h2 className="py-3 mb-5 font text-center" color={textColor()}>
        {title}
      </h2>
    </Fragment>
  );
};

const PageSection = ({
  title,
  subtitle,
  children,
  color = "white",
  bg2 = false,
  card = false,
  noBg = false,
  bigPadding = false,
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
        noBg
          ? {
              padding: "7.5vh 0",
            }
          : bigPadding
            ? {
                padding: "17.5vh 0",
              }
            : {
                padding: "17.5vh 0",
                minHeight: "70vh",
                background: `url('/images/${BgPicker()}.png')`,
                backgroundPositionY: "102.5%",
                backgroundPositionX: "7.55%",
                backgroundSize: "350px auto",
                backgroundRepeat: "no-repeat",
              }
      }
      id={id}
      {...rest}
    >
      <div className="container">
        {title && (
          <SectionTitle title={title} subtitle={subtitle} color={color} />
        )}

        {children}
      </div>
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
