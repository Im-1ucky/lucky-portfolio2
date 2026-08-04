import "./Overlay.css";
import { X } from "lucide-react";

export default function Overlay({
  open,
  onClose,
  children,
}) {
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
