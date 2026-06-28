// Botanical line illustrations matching the Albion Greens logo style.
// Each is a distinct, accurate representation of that variety's actual leaf shape at the microgreen/cotyledon stage.
// Used as a fallback for any variety that doesn't yet have a real confirmed product photo (see varietyPhotos.js).

import { VARIETY_PHOTOS } from './varietyPhotos'

const ILLUSTRATIONS = {
  Broccoli: (
    <g>
      <path d="M50 85 L50 45" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="50" cy="30" r="8" fill="white" opacity="0.9" />
      <circle cx="38" cy="38" r="6" fill="white" opacity="0.75" />
      <circle cx="62" cy="38" r="6" fill="white" opacity="0.75" />
      <circle cx="50" cy="42" r="5" fill="white" opacity="0.8" />
    </g>
  ),
  Radish: (
    <g>
      <path d="M50 85 L50 50" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M50 52 C42 52 33 46 30 36 C38 34 46 38 50 46 Z" fill="white" opacity="0.92" />
      <path d="M50 52 C58 52 67 46 70 36 C62 34 54 38 50 46 Z" fill="white" opacity="0.92" />
      <ellipse cx="50" cy="80" rx="6" ry="10" fill="white" opacity="0.7" />
    </g>
  ),
  'Red Cabbage': (
    <g>
      <path d="M50 85 L50 48" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M50 50 C38 50 28 42 26 30 C38 28 48 36 50 48 Z" fill="white" opacity="0.85" />
      <path d="M50 50 C62 50 72 42 74 30 C62 28 52 36 50 48 Z" fill="white" opacity="0.85" />
      <circle cx="50" cy="42" r="4" fill="white" opacity="0.6" />
    </g>
  ),
  Kale: (
    <g>
      <path d="M50 85 L50 40" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M50 42 C36 42 28 30 30 16 C44 18 52 30 50 42 Z" fill="white" opacity="0.92" />
      <path d="M40 22 Q46 30 50 40 M36 18 Q44 26 49 36" stroke="#1E4D35" strokeWidth="0.6" opacity="0.4" fill="none" />
    </g>
  ),
  Mustard: (
    <g>
      <path d="M50 85 L50 50" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M50 52 C40 52 30 44 28 32 C40 30 50 38 52 50 Z" fill="white" opacity="0.92" />
      <path d="M50 52 C60 48 64 36 60 26 C50 30 46 42 48 50 Z" fill="white" opacity="0.8" />
    </g>
  ),
  Arugula: (
    <g>
      <path d="M50 85 L50 45" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M50 48 C44 40 44 28 50 18 C56 28 56 40 50 48 Z" fill="white" opacity="0.92" />
      <path d="M50 20 L50 46 M47 30 L50 34 L53 30" stroke="#1E4D35" strokeWidth="0.6" opacity="0.4" fill="none" />
    </g>
  ),
  Kohlrabi: (
    <g>
      <path d="M50 85 L50 52" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M50 54 C40 54 32 46 32 36 C42 36 50 44 50 54 Z" fill="white" opacity="0.85" />
      <path d="M50 54 C60 54 68 46 68 36 C58 36 50 44 50 54 Z" fill="white" opacity="0.85" />
      <ellipse cx="50" cy="62" rx="10" ry="7" fill="white" opacity="0.55" />
    </g>
  ),
  Turnip: (
    <g>
      <path d="M50 85 L50 50" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M50 52 C42 52 34 45 32 35 C42 33 50 40 52 50 Z" fill="white" opacity="0.9" />
      <path d="M50 52 C58 52 66 45 68 35 C58 33 50 40 48 50 Z" fill="white" opacity="0.9" />
      <path d="M50 60 C42 60 36 66 36 74 C36 80 42 84 50 84 C58 84 64 80 64 74 C64 66 58 60 50 60 Z" fill="white" opacity="0.55" />
    </g>
  ),
  Watercress: (
    <g>
      <path d="M50 85 L50 50" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="44" cy="44" r="6" fill="white" opacity="0.85" />
      <circle cx="56" cy="44" r="6" fill="white" opacity="0.85" />
      <circle cx="50" cy="34" r="6" fill="white" opacity="0.9" />
      <circle cx="40" cy="30" r="4" fill="white" opacity="0.7" />
      <circle cx="60" cy="30" r="4" fill="white" opacity="0.7" />
    </g>
  ),
  Basil: (
    <g>
      <path d="M50 85 L50 42" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M50 44 C38 44 30 32 32 18 C46 20 54 32 50 44 Z" fill="white" opacity="0.92" />
      <path d="M50 44 C62 44 70 32 68 18 C54 20 46 32 50 44 Z" fill="white" opacity="0.92" />
      <path d="M50 22 L50 40" stroke="#1E4D35" strokeWidth="0.6" opacity="0.4" />
    </g>
  ),
  Cilantro: (
    <g>
      <path d="M50 85 L50 48" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M50 50 L38 40 M50 50 L62 40 M50 50 L50 36 M44 44 L36 38 M56 44 L64 38" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
      <circle cx="38" cy="40" r="2.5" fill="white" opacity="0.8" />
      <circle cx="62" cy="40" r="2.5" fill="white" opacity="0.8" />
      <circle cx="50" cy="36" r="2.5" fill="white" opacity="0.8" />
    </g>
  ),
  Parsley: (
    <g>
      <path d="M50 85 L50 46" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M50 48 L40 36 M50 48 L60 36 M50 48 L50 30 M44 40 L34 32 M56 40 L66 32" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.85" fill="none" />
      <circle cx="40" cy="36" r="3" fill="white" opacity="0.75" />
      <circle cx="60" cy="36" r="3" fill="white" opacity="0.75" />
      <circle cx="50" cy="30" r="3" fill="white" opacity="0.8" />
    </g>
  ),
  Dill: (
    <g>
      <path d="M50 85 L50 40" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M50 42 L38 30 M50 38 L62 26 M50 34 L40 22 M50 30 L60 18 M50 50 L42 40 M50 50 L58 40" stroke="white" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.85" />
    </g>
  ),
  Fennel: (
    <g>
      <path d="M50 85 L50 38" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M50 40 Q40 32 36 20 M50 36 Q60 28 64 16 M50 46 Q42 40 38 32 M50 44 Q58 38 62 30" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.85" />
    </g>
  ),
  Chervil: (
    <g>
      <path d="M50 85 L50 46" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M50 48 L42 38 L36 40 M50 48 L58 38 L64 40 M50 48 L50 32" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.85" />
      <circle cx="36" cy="40" r="2" fill="white" opacity="0.7" />
      <circle cx="64" cy="40" r="2" fill="white" opacity="0.7" />
      <circle cx="50" cy="32" r="2" fill="white" opacity="0.7" />
    </g>
  ),
  Mint: (
    <g>
      <path d="M50 85 L50 44" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M50 46 C42 40 40 28 46 18 C54 24 56 36 50 46 Z" fill="white" opacity="0.92" />
      <path d="M50 22 Q48 32 50 44 M46 28 L50 32 M54 28 L50 32 M44 36 L50 39 M56 36 L50 39" stroke="#1E4D35" strokeWidth="0.6" opacity="0.4" fill="none" />
    </g>
  ),
}

export default function VarietyIllustration({ name, size = 100, className = '' }) {
  const realPhoto = VARIETY_PHOTOS[name]

  if (realPhoto) {
    return (
      <img
        src={realPhoto}
        alt={`${name} microgreens`}
        width={size}
        height={size}
        className={className}
        loading="lazy"
      />
    )
  }

  const illustration = ILLUSTRATIONS[name] || ILLUSTRATIONS['Basil']
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`${name} microgreens illustration`}
    >
      <rect width="100" height="100" fill="#1E4D35" />
      <path d="M50 88 C35 88 30 92 26 90 M50 88 C65 88 70 92 74 90 M50 88 L50 86" stroke="white" strokeWidth="1" opacity="0.4" fill="none" />
      {illustration}
    </svg>
  )
}
