import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Model from "./Model";

export default function Scene({ darkMode }) {
  return (
    <Canvas>
      <ambientLight intensity={darkMode ? 0.1 : 2} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={darkMode ? 0.7 : 1}
      />

      <ScrollControls pages={20}> //Less than 100 try
        <Model />
      </ScrollControls>
    </Canvas>
  );
}
