"use client";

import Typography from "@/components/typography";
import { faLink, faMaximize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Modal, ModalBody, Row, Table } from "react-bootstrap";

import { getClients, getSkills } from "@/api/data";
import { Fragment, useEffect, useState } from "react";
import { ClientProps } from "../clients";
import { ProjectProps } from "./works";
import { SkillProps } from "../skills";
import { iconMap } from "@/consts/functions";

interface Props extends ProjectProps {
  open?: boolean;
}

const ProjectDetailsModal = ({ project }: { project: ProjectProps }) => {
  const [open, setOpen] = useState<Props>(project);
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [skills, setSkills] = useState<SkillProps[]>([]);

  useEffect(() => {
    getClients().then((res) => setClients(res));
    getSkills().then((res) => setSkills(res));
  }, []);

  const onClose = () => setOpen(project);

  const owner = clients.find(({ name }) => name === project.company);

  const links = [
    {
      url: open.url,
      label: "Checkout Project",
    },
    {
      url: owner?.link,
      label: "Checkout Owner",
    },
  ];

  return (
    <Fragment>
      <Typography size={5} justify="center" color="info" className="font">
        <FontAwesomeIcon
          className="text-info"
          role="button"
          icon={faMaximize}
          onClick={() => setOpen({ ...project, open: true })}
        />
      </Typography>

      <Modal show={!!open.open} fullscreen>
        <ModalBody>
          <Row>
            <Col
              lg={6}
              className="justify-content-center overflow-y-hidden"
              style={{ maxHeight: "95vh" }}
            >
              <img src={open.image} width="100%" />
            </Col>

            <Col lg={6}>
              <Table borderless>
                <tbody>
                  <tr className="align-middle">
                    <td>Category</td>

                    <td>
                      <Typography size={6}>{open.category}</Typography>
                    </td>
                  </tr>

                  <tr className="align-middle">
                    <td>Title</td>

                    <td>
                      <Typography size={2}>{open.title}</Typography>
                    </td>
                  </tr>

                  <tr className="align-middle">
                    <td>Sector / Type</td>

                    <td>
                      <Typography size={5}>{open.type}</Typography>
                    </td>
                  </tr>

                  <tr className="align-middle">
                    <td>My Role</td>

                    <td>
                      <Typography size={5}>{open.role}</Typography>
                    </td>
                  </tr>

                  <tr className="align-middle">
                    <td>Techs</td>

                    <td>
                      <Typography size="sm" className="me-1">
                        {open.technologies.map((tech, i) => {
                          const skill = skills.find(
                            ({ name }) => name === tech
                          );

                          return (
                            <span
                              className="h6 me-3"
                              style={{ color: "#" + skill?.color }}
                              key={i}
                            >
                              <FontAwesomeIcon icon={iconMap[skill?.icon]} />{" "}
                              {tech}
                            </span>
                          );
                        })}
                      </Typography>
                    </td>
                  </tr>

                  <tr className="align-middle">
                    <td>Description</td>

                    <td>
                      <Typography size={6} className="lh-lg">
                        {open.description}
                      </Typography>
                    </td>
                  </tr>

                  <tr className="align-middle">
                    <td>Owner</td>

                    <td>
                      <Typography size={6}>
                        {owner?.img ? (
                          <img
                            src={`https://firebasestorage.googleapis.com/v0/b/resume-data-8215f.appspot.com/o/${owner?.img}?alt=media`}
                            height="75px"
                          />
                        ) : (
                          open.company
                        )}
                      </Typography>
                    </td>
                  </tr>

                  <tr className="align-middle">
                    <td>Links</td>

                    <td>
                      {links
                        .filter(({ url }) => url)
                        .map(({ url, label }, i) => (
                          <div key={i}>
                            <a href={url} target="_blank">
                              <FontAwesomeIcon icon={faLink} /> {label}
                            </a>
                          </div>
                        ))}
                    </td>
                  </tr>

                  <tr className="align-middle">
                    <td colSpan={2}>
                      <Button variant="outline-secondary" onClick={onClose}>
                        Close
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ProjectDetailsModal;
