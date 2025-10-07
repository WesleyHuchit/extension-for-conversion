import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Popup } from "./chrome-extension/popup/index";
import "./chrome-extension/global.css";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-white w-[200px] h-[200px]">
      <Popup />
       <Toaster />
    </div>
  </StrictMode>
);
