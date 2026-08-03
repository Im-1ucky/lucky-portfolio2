import { useRef, useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";

import Scene from "./Scene/Scene";
import BottomNav from "./Components/BottomNav/BottomNav";
import Loader from "./Components/Loader/Loader";
import { usePortfolioScroll } from "./Context/ScrollContext";
import ContactTip from "./Components/ContactTip/ContactTip";
import ResumeButton from "./Components/ResumeButton/ResumeButton";
import ScrollHint from "./Components/ScrollHint/ScrollHint";
import Overlay from "./Components/PortfolioPages/Overlay/Overlay";
import Experience from "./Components/PortfolioPages/Experience/Experience";

export default function App() {
  const containerRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const {
    currentSection,
    setCurrentSection,
    scrollElement,
  } = usePortfolioScroll();
  const { active, progress } = useProgress();
  const [fadeLoader, setFadeLoader] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [showContactHint, setShowContactHint] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [overlayPage, setOverlayPage] = useState(null);

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
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  useEffect(() => {
    if (!scrollElement) return;

    if (currentSection === 6) {
      setShowScrollHint(false);
      return;
    }

    let timer;

    if (currentSection !== 6 && !showLoader) {
      const initialTimer = setTimeout(() => {
        setShowScrollHint(true);
      }, 700);

      timer = initialTimer;
    }

    const handleScroll = () => {
      setShowScrollHint(false);

      clearTimeout(timer);

      if (currentSection === 6) return;

      timer = setTimeout(() => {
        setShowScrollHint(true);
      }, 5000);  //Change this to change scrolltip duration
    };

    scrollElement.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [scrollElement, currentSection, showLoader]);


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
        setOverlayPage={setOverlayPage}
      />

      <ResumeButton />

      <BottomNav
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          isMobile={isMobile}
      />

      <ScrollHint
        visible={showScrollHint}
      />

      <ContactTip visible={showContactHint} />

      <button
        style={{
          position: "fixed",
          top: 100,
          left: 20,
          zIndex: 5000,
        }}
        onClick={() => setOverlayPage("experience")}
      >
        Open Experience
      </button>

      <Overlay
        open={overlayPage !== null}
        onClose={() => setOverlayPage(null)}
      >
        {overlayPage === "experience" && <Experience />}
      </Overlay>
    </div>
  );
}
