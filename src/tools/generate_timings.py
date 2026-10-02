"""
Turn a ReadAlong recording into word-level timings.

Setup (once, on your own machine — this needs internet access to download
a speech model, so it can't run inside this chat):
    pip install faster-whisper

Usage:
    python generate_timings.py man-baf.mp3 man-baf.json

This transcribes the audio itself — it does NOT read your script file, it
only listens. Since ReadAlongText matches words by POSITION, not by exact
spelling, small transcription mistakes (a mis-heard word) don't matter.
What DOES matter is the WORD COUNT and ORDER: if Whisper hears an extra
word, or misses one, every highlight after that point will drift by one
word for the rest of the page.

After running this:
  1. Compare "Wrote N words" below to your script's word count
     (docs/man-baf-script.md tells you the expected count per block).
  2. If they match (or you're within 1-2), you're good to wire it in.
  3. If they're far off, the most common cause is a skipped/added word,
     a long pause read as silence, or background noise — re-record that
     block and try again rather than hand-editing the JSON.
"""
import sys
import json
from faster_whisper import WhisperModel


def main():
    if len(sys.argv) != 3:
        print("Usage: python generate_timings.py <audio-file> <output.json>")
        sys.exit(1)

    audio_path, out_path = sys.argv[1], sys.argv[2]

    # "medium" is a good balance of accuracy/speed on CPU for Darija.
    # If the transcript looks noticeably wrong, try "large-v3" instead
    # (slower, more accurate) — remember, only the COUNT needs to be right,
    # not the spelling, so don't chase a perfect transcript.
    model = WhisperModel("medium", device="cpu", compute_type="int8")

    segments, _info = model.transcribe(
        audio_path,
        language="ar",
        word_timestamps=True,
        vad_filter=True,  # trims leading/trailing silence
    )

    words = []
    for seg in segments:
        for w in seg.words:
            words.append({
                "word": w.word.strip(),
                "start": round(w.start, 3),
                "end": round(w.end, 3),
            })

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(words, f, ensure_ascii=False, indent=1)

    print(f"Wrote {len(words)} words to {out_path}")
    print("Compare this to your script's expected word count before using it.")


if __name__ == "__main__":
    main()
