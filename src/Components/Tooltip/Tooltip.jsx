import "./Tooltip.css";

export default function Tooltip({
  text,
  visible,
  x,
  y,
}) {
  return (
    <div
      className={`tooltip ${visible ? "show" : ""}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      {text}
    </div>
  );
}
