import { useState } from "react";
import "./Experience.css";
import { experiences } from "../../../data/experiences";

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

      <div className="experience-content">

        <div className="experience-left">

          <img
            src={experience.image}
            alt={experience.title}
          />

          <div className="experience-navigation">

            <button onClick={previous}>
              ← Previous
            </button>

            <span>
              {current + 1} / {experiences.length}
            </span>

            <button onClick={next}>
              Next →
            </button>

          </div>

        </div>

        <div className="experience-right">

          <h1>{experience.title}</h1>

          <h2>{experience.company}</h2>

          <p className="experience-duration">
            {experience.duration}
          </p>

          <p className="experience-length">
            {experience.length}
          </p>

          <div className="experience-about">

            <h3>About</h3>

            <p>{experience.about}</p>

          </div>

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
