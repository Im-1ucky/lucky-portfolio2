import "./Projects.css";
import ProjectCarousel from "./ProjectsCarousel";

export default function ProjectCard({
    project,
    left,
    onOpen,
}) {
  return (
    <div className={`project-card-wrapper ${left ? "left" : "right"}`}>

      <div className="timeline-node">
        <div className="timeline-circle" />
      </div>

      <div
        className="project-card"
        onClick={onOpen}
      >

        <ProjectCarousel images={project.images} />

        <div className="project-content">
          <h2>{project.title}</h2>
          <p>{project.description}</p>

          <div className="project-tech">
            {project.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>

          <button
              className="project-button"
              onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
              }}
          >
            Explore Project →
          </button>
        </div>

      </div>

    </div>
  );
}
