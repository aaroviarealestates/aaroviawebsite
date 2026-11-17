"use client";

import { useState } from "react";
import type { FeaturedProject } from "@/lib/featured-projects";

const projectFilters = [
  { label: "All", value: "*" },
  { label: "Luxury Apartments", value: "luxury-apartments" },
  { label: "Villa Plots", value: "villa-plots" },
  { label: "Premium Villas", value: "luxury-villas" },
  { label: "Farm Lands", value: "farm-lands" },
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Villaments", value: "villaments" },
];

export default function FeaturedProjectGrid({ projects }: { projects: FeaturedProject[] }) {
  const [activeFilter, setActiveFilter] = useState("*");
  const visibleProjects = projects.filter(
    (project) => activeFilter === "*" || project.filter === activeFilter
  );

  return (
    <section className="our-project" aria-labelledby="featured-projects-title">
      <div className="container">
        <div className="row section-row align-items-center">
          <div className="col-lg-6">
            <div className="section-title">
              <h3 className="wow fadeInUp">featured projects</h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque" id="featured-projects-title">
                Explore premium real estate opportunities in <span>Bangalore&apos;s fastest-growing locations</span>
              </h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="section-title-content wow fadeInUp">
              <p>
                Discover handpicked luxury apartments, villa plots, farm lands, premium villas, residential properties,
                and commercial investments designed for modern living and long-term property growth.
              </p>
            </div>
          </div>
        </div>

        <nav className="our-Project-nav" aria-label="Filter featured projects">
          <ul>
            {projectFilters.map((filter) => (
              <li key={filter.value}>
                <a
                  href="#"
                  className={activeFilter === filter.value ? "active-btn" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    setActiveFilter(filter.value);
                  }}
                >
                  {filter.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="row">
          {visibleProjects.map((project, index) => (
            <div className={`col-md-6 project-item-box ${project.filter}`} key={`${project.name}-${project.href}`}>
              <article className="project-item wow fadeInUp" data-wow-delay={`${0.2 * index}s`}>
                <div className="project-featured-image">
                  <figure className="image-anime">
                    <img src={project.image} alt={`${project.name} development`} loading="lazy" />
                  </figure>
                  <div className="project-btn">
                    <a
                      href={project.href}
                      target={project.external === false ? undefined : "_blank"}
                      rel={project.external === false ? undefined : "noopener noreferrer"}
                      aria-label={`Visit ${project.name} details`}
                    >
                      <img src="/images/arrow-white.svg" alt="" loading="lazy" decoding="async" />
                    </a>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.category}</h3>
                  <h2>
                    <a
                      href={project.href}
                      target={project.external === false ? undefined : "_blank"}
                      rel={project.external === false ? undefined : "noopener noreferrer"}
                    >
                      {project.name}
                    </a>
                  </h2>
                  <p>{project.location}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
