import "./ScrollHint.css";

export default function ScrollHint({ visible }) {
  return (
    <div className={`scroll-hint ${visible ? "show" : ""}`}>
      <div className="scroll-arrow">↓</div>
      <div className="scroll-text">Scroll to explore</div>
    </div>
  );
}
