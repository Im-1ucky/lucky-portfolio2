import { useRef, useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";

import Scene from "./Scene";
import BottomNav from "./Components/BottomNav/BottomNav";
import Loader from "./Components/Loader/Loader";
import { usePortfolioScroll } from "./ScrollContext";

export default function App() {
  const containerRef = useRef(null);

  const { currentSection, setCurrentSection } = usePortfolioScroll();
  const { active, progress } = useProgress();
  const [fadeLoader, setFadeLoader] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

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

  return (
    <div ref={containerRef} style={{ width: "100vw", height: "100vh" }}>
      {showLoader && (
          <Loader
              progress={progress}
              fade={fadeLoader}
          />
      )}

      <Scene
        eventSource={containerRef}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      <BottomNav />
    </div>
  );
}
