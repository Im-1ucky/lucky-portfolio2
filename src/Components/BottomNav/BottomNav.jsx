import { useState } from "react";
import "./BottomNav.css";
import { usePortfolioScroll } from "../../ScrollContext";
import { FileText } from "lucide-react";

const sections = [
  "HOME",
  "ABOUT ME",
  "SKILLS",
  "PROJECTS",
  "EXPERIENCE",
  "ACTIVITIES",
  "CONTACT ME",
];

export default function BottomNav() {
  const [expanded, setExpanded] = useState(false);

  const {
    currentSection,
    scrollElement,
    sectionPositions,
  } = usePortfolioScroll();

  function goToSection(index) {

    if (!scrollElement) return;

    scrollElement.scrollTo({
      top:
        sectionPositions[index] *
        (scrollElement.scrollHeight - scrollElement.clientHeight),
      behavior: "smooth",
    });

    setExpanded(false);
  }

  return (
    <>
      <a
        className="resume-btn"
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="resume-text">Resume</span>
        <FileText size={20} className="resume-icon" />
      </a>

    <div className={`bottom-nav ${expanded ? "expanded" : ""}`}>
      <button
        className="nav-arrow"
        onClick={() => {
          const nextIndex =
            currentSection === 0
              ? sections.length - 1
              : currentSection - 1;
          goToSection(nextIndex);
        }}
      >
        {'❮'}
      </button>

      {expanded ? (
        <div className="nav-items">
          {sections.map((section, index) => (
            <button
              key={section}
              className={
                currentSection === index ? "nav-item active" : "nav-item"
              }
              onClick={() => goToSection(index)}
            >
              {section}
            </button>
          ))}
        </div>
      ) : (
        <button
          className="nav-center"
          onClick={() => setExpanded(true)}
        >
          {sections[currentSection]}
        </button>
      )}

      <button
        className="nav-arrow"
        onClick={() => {
          const nextIndex =
            currentSection === sections.length - 1
              ? 0
              : currentSection + 1;

          goToSection(nextIndex);
        }}
      >
        {'❯'}
      </button>
    </div>
    </>
  )
}
