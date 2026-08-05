import { useState } from "react";
import "./Experience.css";
import { experiences } from "../../../data/experiences";
import "../../BottomNav/BottomNav.css";

export default function Experience() {
  const [current, setCurrent] = useState(0);

  const experience = experiences[current];

  const previous = () => {
    setCurrent((prev) =>
      prev === 0 ? experiences.length - 1 : prev - 1
    );
  };

  const next = () => {
    setCurrent((prev) =>
      prev === experiences.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="experience-page">

      <div className="experience-intro">
        <h1>Experience</h1>

        <p>
          My professional journey through internships and industry projects,
          where gained real world software development experience while collaborating with teams and building
          production ready solutions.
        </p>
      </div>

      <div className="experience-content">

        {/* LEFT SIDE */}
        <div className="experience-left">

          <div className="certificate-frame">
            <img
              src={experience.image}
              alt={experience.title}
            />
          </div>

          <div className="experience-navigation">
            <button
              className="nav-arrow"
              onClick={previous}
            >
              ❮
            </button>

            <span className="experience-counter">
              {current + 1} / {experiences.length}
            </span>

            <button
              className="nav-arrow"
              onClick={next}
            >
              ❯
            </button>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="experience-right">

          <h1>{experience.title}</h1>

          <h2>{experience.company}</h2>

          <div className="experience-about">
              <h3>About</h3>
              <p>{experience.about}</p>
          </div>

          <p className="experience-duration">
              <strong>Duration:</strong> {experience.duration}
          </p>

          <div className="experience-skills">
              <h3>Skills</h3>

              <div className="skill-list">
                {experience.skills.map((skill) => (
                  <span
                    key={skill}
                    className="experience-skill"
                  >
                    {skill}
                  </span>
                ))}
              </div>
          </div>

          <a
            href={experience.credential}
            target="_blank"
            rel="noreferrer"
            className="credential-button"
          >
            View Credential
          </a>

        </div>

      </div>
    </div>
  );
}
