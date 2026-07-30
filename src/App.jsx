import { useRef } from "react";
import Scene from "./Scene";

export default function App() {
  const containerRef = useRef(null);
  return (
    <div ref={containerRef} style={{ width: "100vw", height: "100vh" }}>
      <Scene eventSource={containerRef} />
    </div>
  );
}
