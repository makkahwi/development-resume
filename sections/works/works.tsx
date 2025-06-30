"use client";

import { useEffect, useState } from "react";
import { getJobProjects } from "@/api/data";
import PageButton from "@/components/PageButton";
import PageSection from "@/components/pageSection";
import WorkView from "./WorkView";
import { Col, Row, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";

export interface ProjectProps {
  category: string;
  comingSoon?: boolean;
  designed?: boolean;
  description: string;
  type: string;
  image: string;
  title: string;
  shortTitle?: string;
  url?: string;
  technologies: string[];
  details: string[];
  company?: string;
  role?: string;
  location?: string;
  date: number;
  hide?: boolean;
  timeOrder?: number;
  importanceOrder?: number;
  openSource?: boolean;
  foc?: boolean;
}

interface Props {
  openSource?: boolean;
  foc?: boolean;
  home?: boolean;
}

const WorksSection = ({ openSource, foc, home }: Props) => {
  const [works, setWorks] = useState<ProjectProps[]>([]);
  const [filtered, setFiltered] = useState<ProjectProps[]>([]);
  const [sortBy, setSortBy] = useState<"timeOrder" | "importanceOrder">(
    "importanceOrder"
  );

  const initialFilters = {
    technology: "",
    type: "",
    company: "",
    role: "",
    location: "",
    date: 0,
  };

  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    getJobProjects().then((data) => {
      setWorks(data);
      setFiltered(data);
    });
  }, []);

  useEffect(() => {
    let result = works
      .filter(({ hide, openSource: openSourceProjects, foc: focProjects }) =>
        openSource
          ? openSourceProjects
          : foc
          ? focProjects
          : home
          ? !hide
          : true
      )
      .filter(
        ({ category }) =>
          category === "Web Apps" || category === "Landing Pages"
      )
      .filter((p) =>
        filters.technology ? p.technologies.includes(filters.technology) : true
      )
      .filter((p) => (filters.type ? p.type === filters.type : true))
      .filter((p) => (filters.company ? p.company === filters.company : true))
      .filter((p) => (filters.role ? p.role === filters.role : true))
      .filter((p) =>
        filters.location ? p.location === filters.location : true
      )
      .filter((p) => (filters.date ? p.date === filters.date : true))
      .sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0));

    setFiltered(result);
  }, [filters, sortBy, works, openSource, foc, home]);

  const allTechnologies = Array.from(
    new Set(works.flatMap((w) => w.technologies))
  )
    .filter(Boolean)
    .sort((a = "", b = "") => a.localeCompare(b));
  const allTypes = Array.from(new Set(works.map((w) => w.type)))
    .filter(Boolean)
    .sort((a = "", b = "") => a.localeCompare(b));
  const allCompanies = Array.from(new Set(works.map((w) => w.company)))
    .filter(Boolean)
    .sort((a = "", b = "") => a.localeCompare(b));
  const allRoles = Array.from(new Set(works.map((w) => w.role)))
    .filter(Boolean)
    .sort((a = "", b = "") => a.localeCompare(b));
  const allLocations = Array.from(new Set(works.map((w) => w.location)))
    .filter(Boolean)
    .sort((a = "", b = "") => a.localeCompare(b));
  const allYears = Array.from(new Set(works.map((w) => w.date)))
    .filter(Boolean)
    .sort((a, b) => b - a);

  return (
    <PageSection
      title={
        openSource
          ? "Open-Source Products"
          : foc
          ? "Free-of-Charge Products"
          : "Projects"
      }
      subtitle={
        openSource
          ? "Free Solutions & Software For Everyone"
          : foc
          ? "Private Solutions & For Non-Financial Returns"
          : home
          ? "Most Significant"
          : "Samples"
      }
      color={foc ? "white" : "light"}
      id={foc ? "foc" : "works"}
    >
      {!home && !foc && !openSource && (
        <Row className="mb-4 g-3 justify-content-center">
          <Col md={4}>
            <Form.Select
              onChange={(e) => setSortBy(e.target.value as any)}
              value={sortBy}
            >
              <option value="importanceOrder">Sort by Importance</option>
              <option value="timeOrder">Sort by Time</option>
            </Form.Select>
          </Col>

          <Col md={6}></Col>

          <Col md={2}>
            <Button
              variant="light"
              onClick={() => setFilters(initialFilters)}
              className="bg-white border-white w-100"
            >
              <FontAwesomeIcon icon={faHistory} /> Reset
            </Button>
          </Col>

          <Col md={2}>
            <Form.Select
              value={filters.technology}
              onChange={(e) =>
                setFilters({ ...filters, technology: e.target.value })
              }
            >
              <option value="">All Technologies</option>
              {allTechnologies.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={2}>
            <Form.Select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All Sectors / Types</option>
              {allTypes.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={2}>
            <Form.Select
              value={filters.company}
              onChange={(e) =>
                setFilters({ ...filters, company: e.target.value })
              }
            >
              <option value="">All Companies</option>
              {allCompanies.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={2}>
            <Form.Select
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            >
              <option value="">All Roles</option>
              {allRoles.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={2}>
            <Form.Select
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            >
              <option value="">All Locations</option>
              {allLocations.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={2}>
            <Form.Select
              value={filters.date}
              onChange={(e) =>
                setFilters({ ...filters, date: parseInt(e.target.value) })
              }
            >
              <option value="">All Years</option>
              {allYears.map((y, i) => (
                <option key={i} value={y}>
                  {y}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      )}

      <Row className="justify-content-center">
        {filtered.map(
          (
            {
              image,
              company,
              title,
              description,
              category,
              url,
              openSource,
              technologies,
              details,
              role,
              type,
              location,
              date,
            },
            i
          ) => (
            <Col
              xl={3}
              lg={3}
              md={4}
              sm={6}
              className="p-2 d-flex"
              id={title.replaceAll(" ", "_")}
              key={i}
            >
              <WorkView
                image={image}
                title={title}
                description={description}
                category={category}
                url={url}
                company={company}
                technologies={technologies}
                role={role}
                location={location}
                type={type}
                details={details}
                date={date}
                openSource={openSource}
                dark
                short={home}
              />
            </Col>
          )
        )}
      </Row>

      {home && <PageButton link="/works#works" text="More Details" />}
    </PageSection>
  );
};

export default WorksSection;
