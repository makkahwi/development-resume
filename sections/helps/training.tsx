import { getTrainees } from "@/api/data";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faHandshake, faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";

interface TraineeProps {
  name: string;
  img: string;
  link: string;
}

const TrainingSection = async () => {
  const trainees: TraineeProps[] = await getTrainees();

  return (
    <PageSection
      title="Training To-Be Developers"
      subtitle="Aspiring to Become a Developer But Unsure Where to Start?"
      id="training"
      color="light"
      bg2
    >
      <Row className="my-5 align-middle gx-5 justify-content-between">
        <Col md={12} className="text-info text-center mb-5">
          <FontAwesomeIcon icon={faRocket} className="display-1 me-3" />
          <FontAwesomeIcon icon={faHandshake} className="display-1 " />
        </Col>

        <Col md={12} className="text-info">
          <Typography size={4} className="text-info lh-lg">
            I offer guided, self-paced training paths through real private &
            open-source projects — designed to help you build skills and land
            your first coding job.
          </Typography>
        </Col>

        <Col md={12} className="text-info">
          <Typography size={4} className="text-info lh-lg">
            It’s a free, win-win collaboration: you gain experience, I support
            your growth and refine my non-technical skills. Scroll down to get
            in touch or book a session.
          </Typography>
        </Col>

        <Col md={12} className="text-info">
          <Typography
            size={3}
            justify="center"
            className="py-3 my-5 font"
            color="info"
          >
            Trainees
          </Typography>
        </Col>

        {trainees.map(({ name, img, link }, i) => (
          <Col md={2} className="text-info" key={i}>
            <img
              src={`https://firebasestorage.googleapis.com/v0/b/resume-data-8215f.appspot.com/o/${img}?alt=media`}
              className="w-100"
            />

            <Typography
              size={5}
              justify="center"
              className="py-3 my-5 font"
              color="info"
            >
              {name}
              <div className="mt-3">
                <a target="_blank" href={link}>
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </Typography>
          </Col>
        ))}
      </Row>
    </PageSection>
  );
};

export default TrainingSection;
