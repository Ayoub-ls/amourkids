import React, { useEffect } from "react";
import { useReadAlong } from "./ReadAlongContext";
import { splitWords } from "./wordSplit";

/*
  Wraps one block of narrated text so it highlights word-by-word during
  playback. `order` just needs to increase in reading order (1, 2, 3, ...) —
  exact spacing doesn't matter, only the relative order across the page.
*/
export default function ReadAlongText({ order, text, as: Tag = "span" }) {
  const { registerBlock, offsets, currentWordIndex } = useReadAlong();
  const words = splitWords(text);

  useEffect(() => {
    registerBlock(order, text);
  }, [order, text, registerBlock]);

  const base = offsets[order] ?? 0;

  return (
    <Tag>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className={base + i === currentWordIndex ? "ra-word ra-active" : "ra-word"}>{w}</span>
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </Tag>
  );
}
