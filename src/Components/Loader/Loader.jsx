import "./Loader.css";

const bootLines = [
  "Booting LuckyOS...",
  "Creating 3D environment...",
  "Preparing Home...",
  "Loading About Me...",
  "Compiling Skills...",
  "Building Projects...",
  "Loading Experience...",
  "Initializing Activities...",
  "Connecting Contact endpoints...",
  "System ready!",
];

const luckyLogo = `
██╗     ██╗   ██╗ ██████╗██╗  ██╗██╗   ██╗
██║     ██║   ██║██╔════╝██║ ██╔╝╚██╗ ██╔╝
██║     ██║   ██║██║     █████╔╝  ╚████╔╝
██║     ██║   ██║██║     ██╔═██╗   ╚██╔╝
███████╗╚██████╔╝╚██████╗██║  ██╗   ██║
╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝   ╚═╝
`;

export default function Loader({ progress, fade }) {
  const currentIndex = Math.min(
    Math.floor((progress / 100) * bootLines.length),
    bootLines.length - 1
  );

  const completedLines = bootLines.slice(0, currentIndex);

  const barWidth = Math.max(
    30,
    Math.floor((window.innerWidth - 80) / 9)
  );

  const filled = Math.round((progress / 100) * barWidth);

  const bar = "█".repeat(filled) + "░".repeat(barWidth - filled);

  return (
    <div className={`loader ${fade ? "fade-out" : ""}`}>
      <div className="loader-top">
        <span>Lucky</span>
        <span>Portfolio</span>
      </div>

      <div className="loader-body">
        <div className="boot-log">
          {completedLines.map((line, index) => (
            <div className="boot-line" key={index}>
              <span className="boot-time">
                [{(index * 0.437).toFixed(6)}]
              </span>
              <span>{line}</span>
            </div>
          ))}

          <div className="boot-line current-line">
            <span className="boot-time">
              [{(progress / 100 * 4.238).toFixed(6)}]
            </span>
            <span>{bootLines[currentIndex]}</span>
            <span className="cursor"></span>
          </div>

          {currentIndex === bootLines.length - 1 && (
            <pre className="lucky-logo">{luckyLogo}</pre>
          )}
        </div>
      </div>

      <div className="loader-bottom">
        <div className="loader-progress">
          <span>Booting</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        <div className="ascii-bar">[{bar}]</div>
      </div>
    </div>
  );
}
