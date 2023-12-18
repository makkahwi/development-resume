import Typography from "@/components/typography";
import { faClock, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "react-bootstrap";

import { defaultPost, post } from "./blog";

interface props {
  pickedArticle: post;
  setPickedArticle: (a: post) => void;
}

const BlogPostViewer = ({ pickedArticle, setPickedArticle }: props) => {
  const generateBodySections = (section: any) => {
    const { type, content } = section;

    switch (type) {
      case "text":
        return <h6 className="text-justify lh-lg fw-normal">{content}</h6>;
      case "orderedList":
        return (
          <ol>
            {content.map((text = "", i = 0) => (
              <li key={i}>{text}</li>
            ))}
          </ol>
        );
      case "unorderedList":
        return (
          <ul>
            {content.map((text = "", i = 0) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        );
      case "images":
        return (
          <ul className="wp-block-gallery columns-3">
            {content.map((image = "", i = 0) => (
              <li className="blocks-gallery-item" key={i}>
                <figure>
                  <img src={image} alt="image" />
                </figure>
              </li>
            ))}
          </ul>
        );
      case "sources":
        return (
          <p className="text-justify lh-lg">
            {"Sources"}
            {": "}
            {content.map(({ title = "", link = "" }, i = 0) => (
              <span key={i}>
                <a href={link} target="_blank">
                  {title}
                  {i < content.length - 1 ? ", " : ""}
                </a>
              </span>
            ))}
          </p>
        );
      case "title":
        return <h5 className="text-justify lh-lg">{content}</h5>;
      case "subtitle":
        return <h6 className="text-justify lh-lg">{content}</h6>;
      case "quote":
        return (
          <blockquote className="wp-block-quote">
            <p>{content.body}</p>

            <cite>{content.author}</cite>
          </blockquote>
        );
      default:
        return content;
    }
  };

  return (
    <Modal isOpen={!!pickedArticle.title} size="xl">
      <ModalHeader>
        <Button
          color="ghost"
          onClick={() => setPickedArticle(defaultPost)}
          className="me-2"
        >
          <FontAwesomeIcon icon={faClose} />
        </Button>

        {pickedArticle.title}
      </ModalHeader>

      <ModalBody>
        <Row>
          <Col md={2}>
            <img src={pickedArticle.image} width="100%" />
          </Col>

          <Col md={10}>
            <Typography size={6}>
              <FontAwesomeIcon icon={faClock} className="me-2" />
              {pickedArticle.date}
            </Typography>
            <Typography size={4}>{pickedArticle.title}</Typography>
          </Col>

          <Col md={12} className="my-4">
            {pickedArticle.body?.map((body, i) => (
              <Typography key={i}>{generateBodySections(body)}</Typography>
            ))}
          </Col>
        </Row>
      </ModalBody>

      <ModalFooter>
        <Button color="secondary" onClick={() => setPickedArticle(defaultPost)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BlogPostViewer;