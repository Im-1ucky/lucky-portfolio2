import "./Overlay.css";

export default function Overlay({
  open,
  onClose,
  children,
}) {
  if (!open) return null;

  return (
    <div className="overlay">

      <button
        className="overlay-close"
        onClick={onClose}
      >
        ✕
      </button>

      <div className="overlay-content">
        {children}
      </div>

    </div>
  );
}
