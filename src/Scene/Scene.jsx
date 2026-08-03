import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Model from "./Model";

export default function Scene({
  darkMode,
  setOverlayPage,
}) {
  return (
    <Canvas>
      <ambientLight intensity={darkMode ? 0.1 : 2} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={darkMode ? 0.7 : 1}
      />

      <ScrollControls pages={10}> //Less than 100 try
        <Model setOverlayPage={setOverlayPage} />
      </ScrollControls>
    </Canvas>
  );
}
