import "./Projects.css";
import ProjectCarousel from "./ProjectsCarousel";
import "../../BottomNav/BottomNav.css";

export default function ProjectShowcase({
  project,
  current,
  total,
  previous,
  next,
  onClose,
}) {
  if (!project) return null;

  return (
    <div className="project-showcase">

      <div className="project-showcase-left">

          <div className="project-showcase-carousel">

              <ProjectCarousel
                  images={project.images}
          />

          <div className="experience-navigation">

            <button
              className="nav-arrow"
              onClick={previous}
            >
              ❮
            </button>

            <span className="experience-counter">
              {current + 1} / {total}
            </span>

            <button
              className="nav-arrow"
              onClick={next}
            >
              ❯
            </button>

          </div>

        </div>

      </div>

      {/* RIGHT */}
      <div className="project-showcase-right">

        <h1>{project.title}</h1>

        <h2>Overview</h2>

        <p>{project.overview}</p>

        <h2>Technologies</h2>

        <div className="project-tech">
          {project.technologies.map((technology) => (
            <span key={technology}>
              {technology}
            </span>
          ))}
        </div>

        <h2>Features</h2>

        <ul className="project-features">
          {project.features.map((feature) => (
            <li key={feature}>
              {feature}
            </li>
          ))}
        </ul>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="project-button"
          >
            Read more →
          </a>
        )}

      </div>

    </div>
  );
}
