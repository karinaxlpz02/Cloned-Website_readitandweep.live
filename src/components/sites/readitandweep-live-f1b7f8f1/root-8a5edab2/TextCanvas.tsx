"use client";

import { useEffect, useState } from "react";
import corpus from "@/data/corpus.json";

type Entry = { text: string; date: string; link?: string };
type Kind = "trash" | "links" | "notes";
type Snippet = Entry & { id: number; kind: Kind; writtenText: string; size: number; maxWidth: number; left: number; top: number; pinkIndex: number };

const source = corpus as Record<Kind, Entry[]>;
const kinds: Kind[] = ["trash", "links", "notes"];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

function typeRange(width: number): [number, number] {
  if (width >= 4000) return [48, 108];
  if (width > 2000) return [24, 64];
  if (width > 820) return [14, 48];
  return [12, 24];
}

export default function TextCanvas() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  useEffect(() => {
    let remaining: Record<Kind, Entry[]> = { trash: [...source.trash], links: [...source.links], notes: [...source.notes] };
    let current: Snippet | null = null;
    let characterIndex = 0;
    let nextId = 0;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    const [sizeMin, sizeMax] = typeRange(viewportWidth);

    const onResize = () => { viewportWidth = window.innerWidth; viewportHeight = window.innerHeight; };
    window.addEventListener("resize", onResize);

    const timer = window.setInterval(() => {
      if (current && characterIndex <= current.text.length) {
        current.writtenText += current.text.charAt(characterIndex);
        characterIndex += 1;
        const updated = { ...current };
        setSnippets((all) => all.map((item) => item.id === updated.id ? updated : item));
        if (characterIndex <= current.text.length) return;
      }

      if (kinds.some((kind) => remaining[kind].length <= 1)) {
        remaining = { trash: [...source.trash], links: [...source.links], notes: [...source.notes] };
        setSnippets([]);
      }

      const kind = kinds[randomInt(0, 2)];
      const index = randomInt(0, remaining[kind].length - 1);
      const [entry] = remaining[kind].splice(index, 1);
      const size = randomInt(sizeMin, sizeMax);
      const maxWidth = randomInt(size * 13, size * 22);
      const left = randomInt(maxWidth / 2, viewportWidth - maxWidth / 2) - maxWidth / 2;

      const measure = document.createElement("div");
      measure.textContent = entry.text;
      measure.style.cssText = `width:${maxWidth}px;font-size:${size}px;visibility:hidden`;
      document.querySelector(".text-canvas")?.appendChild(measure);
      const top = randomInt(0, viewportHeight - measure.clientHeight);
      measure.remove();

      const pinkIndex = nextId % 8;
      current = { ...entry, id: nextId++, kind, writtenText: "", size, maxWidth, left, top, pinkIndex };
      characterIndex = 0;
      setSnippets((all) => [...all, current as Snippet]);
    }, 44.4);

    return () => { window.clearInterval(timer); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <main className="text-canvas" aria-label="Read it and Weep text canvas">
      {snippets.map((snippet) => (
        <div className={`text-snippet text-pink-${snippet.pinkIndex}`} key={snippet.id} style={{ top: snippet.top, left: snippet.left, fontSize: snippet.size, maxWidth: snippet.maxWidth }}>
          {snippet.kind === "links" ? (
            <mark><a href={snippet.link} target="_blank" rel="noopener noreferrer">{snippet.writtenText}</a></mark>
          ) : snippet.kind === "notes" ? (
            <mark className="diary">{snippet.writtenText}</mark>
          ) : (
            <mark className="trash"><i>{snippet.writtenText}</i></mark>
          )}
        </div>
      ))}
    </main>
  );
}
