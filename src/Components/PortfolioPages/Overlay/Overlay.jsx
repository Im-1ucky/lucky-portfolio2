import "./Overlay.css";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function Overlay({
  open,
  onClose,
  children,
}) {

  useEffect(() => {
      if (open) {
          document.body.style.overflow = "hidden";
      } else {
          document.body.style.overflow = "";
      }

      return () => {
          document.body.style.overflow = "";
      };
  }, [open]);

  if (!open) return null;

  return (
    <div className="overlay">

      <button
          className="overlay-close glass"
          onClick={onClose}
      >
          <X size={24}/>
      </button>

      <div className="overlay-content">
        {children}
      </div>

    </div>
  );
}
