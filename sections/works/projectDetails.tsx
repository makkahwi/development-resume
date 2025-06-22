"use client";

import Typography from "@/components/typography";
import { faLink, faMaximize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Modal, ModalBody, Row, Table } from "react-bootstrap";

import { Fragment, useState } from "react";
import { ProjectProps } from "./works";
import { ClientProps } from "../clients";
import { getClients } from "@/api/data";

interface Props extends ProjectProps {
  open?: boolean;
}

const ProjectDetailsModal = async ({ project }: { project: ProjectProps }) => {
  // const clients: ClientProps[] = await getClients();

  const [open, setOpen] = useState<Props>(project);

  const onClose = () => setOpen(project);

  const links = [
    {
      url: open.url,
      label: "Checkout Project",
    },
    // {
    //   url: clients.find(({ name }) => name === project.company)?.link,
    //   label: "Checkout Owner",
    // },
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
                  <tr>
                    <td>Category</td>

                    <td>
                      <Typography size={6}>{open.category}</Typography>
                    </td>
                  </tr>

                  <tr>
                    <td>Title</td>

                    <td>
                      <Typography size={2}>{open.title}</Typography>
                    </td>
                  </tr>

                  <tr>
                    <td>Sector / Type</td>

                    <td>
                      <Typography size={5}>{open.type}</Typography>
                    </td>
                  </tr>

                  <tr>
                    <td>My Role</td>

                    <td>
                      <Typography size={5}>{open.role}</Typography>
                    </td>
                  </tr>

                  <tr>
                    <td>Techs</td>

                    <td>
                      <Typography size="sm" className="me-1">
                        {open.technologies.join(", ")}
                      </Typography>
                    </td>
                  </tr>

                  <tr>
                    <td>Description</td>

                    <td>
                      <Typography size="sm">{open.description}</Typography>
                    </td>
                  </tr>

                  <tr>
                    <td>Owner</td>

                    <td>
                      <Typography size={6}>{open.company}</Typography>
                    </td>
                  </tr>

                  <tr>
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

                  <tr>
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
