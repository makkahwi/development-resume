import { CarouselCaption, CarouselItem } from "react-bootstrap";

interface props {
  src?: string;
  title?: string;
}

function CarouselSlide({ src, title }: props) {
  return (
    <CarouselItem>
      <img src={src} alt={title} />

      {title && <CarouselCaption>{title}</CarouselCaption>}
    </CarouselItem>
  );
}

export default CarouselSlide;
