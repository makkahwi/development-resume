import { Container } from "react-bootstrap";

import SectionTitle from "./SectionTitle";

interface props {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  color?: string;
  rounded?: boolean;
  card?: boolean;
  NoBg?: boolean;
  id?: string;
}

const PageSection = ({
  title,
  subtitle,
  children,
  color = "white",
  rounded = false,
  card = false,
  NoBg = false,
  id = "",
  ...rest
}: props) => {
  const Content = () => (
    <div
      className={`bg-${color} ${rounded && "rounded"}`}
      style={
        NoBg
          ? {
              padding: "17.5vh 0",
            }
          : {
              padding: "17.5vh 0",
              minHeight: "70vh",
              background: `url('/images/${
                color === "white" || color === "light"
                  ? "BGPattern2C"
                  : "BGPattern2W"
              }.png')`,
              backgroundPositionY: "107.5%",
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
