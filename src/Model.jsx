import { useGLTF, useAnimations, useScroll } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { usePortfolioScroll } from "./ScrollContext";

export default function Model({
  setTooltip,
}) {
  const { scene, animations } = useGLTF("/3dmodels/f2.glb");
  const { actions, mixer } = useAnimations(animations, scene);
  const { set } = useThree();
  const scroll = useScroll();
  const {
    currentSection,
    setCurrentSection,
    setScrollElement,
  } = usePortfolioScroll();

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

  useEffect(() => {
    setScrollElement(scroll.el);
  }, [scroll, setScrollElement]);

  useFrame((state, delta) => {
    mixer.update(delta);

    const progress = scroll.offset;
    console.log(progress.toFixed(3));

    //console.log(progress);

    let section = 0;

    if (progress < 0.09) section = 0;
    else if (progress < 0.19) section = 1;
    else if (progress < 0.32) section = 2;
    else if (progress < 0.61) section = 3;
    else if (progress < 0.79) section = 4;
    else if (progress < 0.92) section = 5;
    else section = 6;

    if (section !== currentSection) {
      console.log("Section:", section, "Progress:", progress.toFixed(3));
      setCurrentSection(section);
    }

    Object.entries(actions).forEach(([name, action]) => {
      if (!action) return;

      if (name !== "Computer Chair_High Heels 2_0Action") {
        action.time = progress * action.getClip().duration;
      }
    });
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();

    let text = "";

    switch (e.object.name) {
      case "GithubHitbox":
        text = "Open GitHub ↗";
        break;

      case "LinkedinHitbox":
        text = "Open LinkedIn ↗";
        break;

      case "MailHitbox":
        text = "Send Email ✉";
        break;

      default:
        return;
    }

    setTooltip({
      visible: true,
      text,
      x: e.clientX + 18,
      y: e.clientY + 18,
    });

    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();

    setTooltip((prev) => ({
      ...prev,
      visible: false,
    }));

    document.body.style.cursor = "default";
  };

  const handleClick = (e) => {
    e.stopPropagation();

    const url = e.object.userData.url;
    if (!url) return;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <primitive
      object={scene}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}

useGLTF.preload("/3dmodels/f2.glb");
