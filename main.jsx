// index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

// Get root element
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("❌ Root element #root not found in index.html");
}

// Render the App
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);