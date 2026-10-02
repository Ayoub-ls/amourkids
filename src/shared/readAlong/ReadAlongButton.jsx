import React from "react";
import { useReadAlong } from "./ReadAlongContext";

export default function ReadAlongButton({ label = "🔊 استمع للنص", pauseLabel = "⏸ وقف" }) {
  const { toggle, playing } = useReadAlong();
  return (
    <button type="button" className="ra-btn" onClick={toggle}>
      {playing ? pauseLabel : label}
    </button>
  );
}
