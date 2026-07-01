// lib/crew-data.ts
//
// Single source of truth for the STS-51-L crew.
// Add a new crew member by pushing an object onto CREW below —
// the /crew/[slug] route and the hero grid both read from here,
// so nothing else needs to change.

export interface MediaItem {
  type: "image" | "video";
  url: string;
  caption?: string;
  /** For type: "video" — if the url isn't already a YouTube/Vimeo embed link, set this to true and we'll try to embed it as-is. */
  embed?: boolean;
}

export interface BioSection {
  heading: string;
  content: string;
}

export interface CrewMember {
  slug: string; // used for /crew/[slug]
  name: string; // short display name, e.g. "Francis R. Scobee"
  fullTitle: string; // formal NASA title, e.g. "FRANCIS R. (DICK) SCOBEE (LT. COL., U.S. AIR FORCE, RET.)"
  role: string; // "Commander", "Pilot", etc.
  id: string; // "CDR", "PLT", "MS1"...
  seat: string; // "01".."07"
  img: string; // portrait, from /public
  shortBio: string; // one-liner used in the hero grid hover card
  /** Raw NASA-style biography text (PERSONAL DATA: ... EDUCATION: ... etc). Leave "" until you have it — the page will just skip the biography block. */
  rawBiography: string;
  media: MediaItem[];
}

// ---------------------------------------------------------------------------
// NASA biographies are consistently formatted as a run of ALL-CAPS headers
// ("PERSONAL DATA:", "EDUCATION:", "NASA EXPERIENCE:"...) each followed by
// normal-case prose. This splits that raw text into clean sections so the
// UI can render them as cards instead of one giant wall of text.
// ---------------------------------------------------------------------------
export function parseBiography(raw: string): BioSection[] {
  if (!raw?.trim()) return [];

const headerRegex =
  /(?:^|\s)([A-Z][A-Z0-9/&().,\- ]{3,60}):\s/g;
  const matches: { heading: string; index: number; end: number }[] = [];

  let m: RegExpExecArray | null;
  while ((m = headerRegex.exec(raw)) !== null) {
    matches.push({
      heading: m[1].trim(),
      index: m.index,
      end: m.index + m[0].length,
    });
  }

  if (matches.length === 0) {
    return [{ heading: "Biography", content: raw.trim() }];
  }

  const sections: BioSection[] = [];
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].end;
    const stop = i + 1 < matches.length ? matches[i + 1].index : raw.length;
    const content = raw.slice(start, stop).trim();
    if (content) {
      sections.push({ heading: titleCase(matches[i].heading), content });
    }
  }
  return sections;
}

function titleCase(s: string) {
  return s
    .toLowerCase()
    .split(" ")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

