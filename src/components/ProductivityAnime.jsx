export default function ProductivityAnime() {
  return (
    <svg
      width="260"
      height="260"
      viewBox="0 0 260 260"
      className="anime-svg"
    >
      {/* Glow */}
      <circle cx="130" cy="130" r="120" className="glow" />

      {/* Head */}
      <circle cx="130" cy="110" r="45" className="head" />

      {/* Eyes */}
      <circle cx="115" cy="105" r="5" className="eye" />
      <circle cx="145" cy="105" r="5" className="eye" />

      {/* Smile */}
      <path
        d="M115 125 Q130 135 145 125"
        className="smile"
      />

      {/* Body */}
      <rect x="105" y="155" width="50" height="60" rx="25" className="body" />

      {/* Floating dots (productivity vibes) */}
      <circle cx="60" cy="80" r="6" className="dot" />
      <circle cx="200" cy="60" r="8" className="dot delay1" />
      <circle cx="210" cy="180" r="5" className="dot delay2" />
    </svg>
  );
}
