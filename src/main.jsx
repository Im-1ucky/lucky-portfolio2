import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { ScrollProvider } from "./Context/ScrollContext";
import App from "./App";
import "./styles/glass.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ScrollProvider>
      <App />
    </ScrollProvider>
  </React.StrictMode>
);
