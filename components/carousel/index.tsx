"use client";

import { Carousel } from "react-bootstrap";

interface props {
  items: React.ReactNode[];
  controls?: boolean;
  indicators?: boolean;
  dark?: boolean;
}

function CarouselComp({
  items,
  controls = false,
  indicators = false,
  dark = false,
  ...rest
}: props) {
  return (
    <Carousel
      controls={controls}
      indicators={indicators}
      variant={dark ? "dark" : "light"}
      pause="hover"
      interval={7000}
      {...rest}
    >
      {items.map((slide, i) => (
        <Carousel.Item key={i}>{slide}</Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselComp;
