import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { splitWords } from "./wordSplit";

const Ctx = createContext(null);

// Small, scoped stylesheet for the highlight + button. Self-contained on
// purpose, so using ReadAlong doesn't require editing any theme file.
const RA_CSS = `
.ra-btn{display:inline-flex;align-items:center;gap:8px;background:var(--surface,#fff);
  border:2px solid var(--line,#ddd);color:var(--ink,#111);font:inherit;font-weight:700;
  padding:9px 18px;border-radius:999px;cursor:pointer;margin-bottom:16px}
.ra-btn:active{transform:translateY(1px)}
.ra-word{transition:color .15s,background-color .15s;border-radius:4px}
.ra-active{color:var(--accent-ink,#12151C);background:var(--accent,#C8F53B);padding:0 2px}
`;

/*
  <ReadAlongProvider audioSrc="/audio/man-baf.mp3" timingsSrc="/audio/man-baf.json">
    ...page content, using <ReadAlongText order={n} text="..." /> for each
    narrated block, and <ReadAlongButton /> once near the top...
  </ReadAlongProvider>

  Blocks register themselves with an `order` (1, 2, 3, ... in reading order —
  gaps are fine). The provider sums each block's word count, in order, to
  work out where each block starts inside the flat timings array. This means
  editing a block's wording later never requires recomputing offsets by hand;
  only re-recording + re-aligning that one page does.
*/
export function ReadAlongProvider({ audioSrc, timingsSrc, children }) {
  const audioRef = useRef(null);
  const timingsRef = useRef(null);
  const blocksRef = useRef({}); // order -> word count

  const [timings, setTimings] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [tick, setTick] = useState(0); // bumps when a new block registers

  useEffect(() => {
    let active = true;
    fetch(timingsSrc)
      .then((r) => r.json())
      .then((data) => { if (active) setTimings(data); })
      .catch((err) => console.error("ReadAlong: couldn't load", timingsSrc, err));
    return () => { active = false; };
  }, [timingsSrc]);

  useEffect(() => { timingsRef.current = timings; }, [timings]);

  const registerBlock = useCallback((order, text) => {
    const count = splitWords(text).length;
    if (blocksRef.current[order] !== count) {
      blocksRef.current[order] = count;
      setTick((t) => t + 1);
    }
  }, []);

  const offsets = useMemo(() => {
    const orders = Object.keys(blocksRef.current).map(Number).sort((a, b) => a - b);
    const map = {};
    let running = 0;
    for (const o of orders) {
      map[o] = running;
      running += blocksRef.current[o];
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  function ensureAudio() {
    if (audioRef.current) return audioRef.current;
    const a = new Audio(audioSrc);
    a.addEventListener("timeupdate", () => {
      const t = timingsRef.current;
      if (!t) return;
      const now = a.currentTime;
      let idx = -1;
      for (let i = 0; i < t.length; i++) {
        if (t[i].start <= now) idx = i; else break;
      }
      setCurrentWordIndex(idx);
    });
    a.addEventListener("ended", () => { setPlaying(false); setCurrentWordIndex(-1); });
    audioRef.current = a;
    return a;
  }

  function toggle() {
    const a = ensureAudio();
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play(); setPlaying(true); }
  }

  function seekToWord(globalIndex) {
    const t = timingsRef.current;
    const a = ensureAudio();
    const start = t?.[globalIndex]?.start;
    if (start == null) return;
    a.currentTime = start;
    if (!playing) { a.play(); setPlaying(true); }
  }

  const value = { registerBlock, offsets, currentWordIndex, playing, toggle, seekToWord, ready: !!timings };

  return (
    <Ctx.Provider value={value}>
      <style>{RA_CSS}</style>
      {children}
    </Ctx.Provider>
  );
}

export function useReadAlong() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useReadAlong() must be used inside <ReadAlongProvider>");
  return ctx;
}
