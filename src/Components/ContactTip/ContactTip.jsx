import "./ContactTip.css";

export default function ContactTip({
  visible,
}) {
  if (!visible) return null;

  return (
    <div className="contact-hint glass">
      Click link to visit its page ↗
    </div>
  );
}
