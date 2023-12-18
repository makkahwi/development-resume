import { Container } from "react-bootstrap";
import SectionTitle from "./SectionTitle";

interface props {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  color?: string;
  rounded?: boolean;
  card?: boolean;
  id?: string;
}

const PageSection = ({
  title,
  subtitle,
  children,
  color = "white",
  rounded = false,
  card = false,
  id = "",
  ...rest
}: props) => {
  const Content = () => (
    <div
      className={`bg-${color} ${rounded && "rounded"}`}
      style={{ padding: "12.5vh 0" }}
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
