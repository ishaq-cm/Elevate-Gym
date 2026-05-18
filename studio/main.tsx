import React from "react";
import ReactDOM from "react-dom/client";
import { SanityStudio } from "sanity";
import config from "./sanity.config";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SanityStudio config={config} />
  </React.StrictMode>
);
