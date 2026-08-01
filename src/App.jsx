import { useRef } from "react";
import Scene from "./Scene";
import BottomNav from "./Components/BottomNav/BottomNav";
import { usePortfolioScroll } from "./ScrollContext";

export default function App() {
  const containerRef = useRef(null);
  const { currentSection, setCurrentSection } = usePortfolioScroll();

  return (
    <div ref={containerRef} style={{ width: "100vw", height: "100vh" }}>
      <Scene
        eventSource={containerRef}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      <BottomNav />
    </div>
  );
}
