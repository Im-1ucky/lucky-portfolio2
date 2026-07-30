import { useGLTF, useAnimations, useScroll } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect } from "react";

export default function Model() {
  const { scene, animations } = useGLTF("/3dmodels/f2.glb");
  const { actions, mixer } = useAnimations(animations, scene);
  const { set } = useThree();
  const scroll = useScroll();

  useEffect(() => {
    const blenderCamera = scene.getObjectByName("CameraMiain");
    const github = scene.getObjectByName("GithubHitbox");
    const linkedin = scene.getObjectByName("LinkedinHitbox");
    const email = scene.getObjectByName("MailHitbox");

    [github, linkedin, email].forEach((obj) => {
      obj.material = obj.material.clone();
      obj.material.transparent = true;
      obj.material.opacity = 0;
    });

    github.userData.url = "https://github.com/Im-1ucky";
    linkedin.userData.url =
      "https://www.linkedin.com/in/lucky-reddy-535811391";
    email.userData.url = "mailto:luckymi11lite@gmail.com";

    if (blenderCamera) {
      set({ camera: blenderCamera });
    }

    Object.entries(actions).forEach(([name, action]) => {
      action.play();

      if (name === "Computer Chair_High Heels 2_0Action") {
        action.timeScale = 0.25;
      } else {
        action.paused = true;
      }
    });
  }, [scene, actions, set]);

  useFrame((state, delta) => {
    mixer.update(delta);

    const progress = scroll.offset;

    Object.entries(actions).forEach(([name, action]) => {
      if (!action) return;

      if (name !== "Computer Chair_High Heels 2_0Action") {
        action.time = progress * action.getClip().duration;
      }
    });
  });

  const handleClick = (e) => {
    e.stopPropagation();

    const url = e.object.userData.url;
    if (!url) return;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return <primitive object={scene} onClick={handleClick} />;
}

useGLTF.preload("/3dmodels/f2.glb");
