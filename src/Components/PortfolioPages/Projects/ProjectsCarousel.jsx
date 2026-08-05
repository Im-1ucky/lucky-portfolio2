import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import "./Projects.css";

export default function ProjectCarousel({ images = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="project-embla" ref={emblaRef}>
      <div className="project-embla-container">

        {images.map((image, index) => (
          <div
            className="project-embla-slide"
            key={index}
          >
            <img
              src={image}
              alt=""
              className="project-preview-image"
            />
          </div>
        ))}

      </div>
    </div>
  );
}
