import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Model from "./Model";

export default function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} />
        <ScrollControls pages={10}>
          <Model />
        </ScrollControls>
    </Canvas>
  );
}
