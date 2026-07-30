import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Model from "./Model";

export default function Scene({ eventSource }) {
  return (
    <Canvas eventSource={eventSource?.current} eventPrefix="client">
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} />
      <mesh
        position={[0, 0, 0]}
        onClick={() => console.log("Cube clicked")}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <ScrollControls pages={15}>
        <Model />
      </ScrollControls>
    </Canvas>
  );
}
