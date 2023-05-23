import PageLayout from "@/Components/PageLayout";
import data from "@/resumeData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";

const Resume = () => {
  return (
    <Fragment>
      <PageLayout title={"My Resume"}>
        {data.resume.web.jobsList.map(
          (
            {
              company,
              website,
              description,
              title,
              certificate,
              years,
              projects,
            },
            i
          ) => (
            <div key={i} className="mb-5">
              <a href={certificate} download className="text-decoration-none">
                <h4>{title}</h4>
              </a>

              <a href={website} className="text-decoration-none">
                <h6>{company + " | " + years}</h6>
              </a>

              <h6>{"Projects | " + projects.join(", ")}</h6>

              <p className="text-justify">{description}</p>
            </div>
          )
        )}
      </PageLayout>

      <PageLayout title={"My Skills"}>
        <div className="row justify-content-center">
          {data.resume.web.skillsList.map(
            ({ icon, name, color, website, subskills }, i) => (
              <div className="col-md-2 col-2 text-center" key={i}>
                <a
                  href={website}
                  target="_blank"
                  style={{ color: `#${color}` }}
                  className="text-decoration-none"
                >
                  <FontAwesomeIcon icon={icon} /> {name}
                </a>
              </div>
            )
          )}
        </div>
      </PageLayout>

      <PageLayout title={"My Education"}>
        <div className="row justify-content-center">
          {data.education.map(
            (
              { degree, description, graduated, school, logo, link, projects },
              i
            ) => (
              <div className="col-12 text-center" key={i}>
                <a target="_blank" className="text-decoration-none">
                  {degree}
                </a>
              </div>
            )
          )}

          {data.training.web.map(
            (
              { degree, description, graduated, school, logo, link, projects },
              i
            ) => (
              <div className="col-12 text-center" key={i}>
                <a target="_blank" className="text-decoration-none">
                  {degree}
                </a>
              </div>
            )
          )}
        </div>
      </PageLayout>
    </Fragment>
  );
};

export default Resume;