import { useRef, useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";

import Scene from "./Scene";
import BottomNav from "./Components/BottomNav/BottomNav";
import Loader from "./Components/Loader/Loader";
import { usePortfolioScroll } from "./ScrollContext";


export default function App() {
  const containerRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const { currentSection, setCurrentSection } = usePortfolioScroll();
  const { active, progress } = useProgress();
  const [fadeLoader, setFadeLoader] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [showContactHint, setShowContactHint] = useState(false);

  useEffect(() => {
    if (!active && progress === 100) {

      const fadeTimer = setTimeout(() => {
        setFadeLoader(true);
      }, 500);

      const hideTimer = setTimeout(() => {
        setShowLoader(false);
      }, 800);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }

    if (active) {
      setShowLoader(true);
      setFadeLoader(false);
    }

  }, [active, progress]);

  useEffect(() => {
    if (currentSection === 6) {
      setShowContactHint(true);

      const timer = setTimeout(() => {
        setShowContactHint(false);
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      setShowContactHint(false);
    }
  }, [currentSection]);

  return (
    <div ref={containerRef} style={{ width: "100vw", height: "100vh" }}>
      {showLoader && (
          <Loader
              progress={progress}
              fade={fadeLoader}
          />
      )}

      <Scene
          darkMode={darkMode}
          eventSource={containerRef}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
      />

      <BottomNav
          darkMode={darkMode}
          setDarkMode={setDarkMode}
      />

      {showContactHint && (
        <div className="contact-hint">
          Click a link to visit its page ↗
        </div>
      )}
    </div>
  );
}
