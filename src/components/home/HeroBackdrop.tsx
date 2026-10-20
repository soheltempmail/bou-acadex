export function HeroBackdrop() {
  return (
    <div className="hero-academic-backdrop">
      <svg
        className="bou-network-grid"
        width="100%"
        height="100%"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="networkLineGradReact" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glowGreenReact" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Canopy Network Arch Lines */}
        <path
          d="M 80 150 L 220 85 L 380 55 L 560 38 L 720 28 L 880 38 L 1060 55 L 1220 85 L 1360 150"
          stroke="url(#networkLineGradReact)"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
        <path
          d="M 80 150 L 140 280 L 280 390"
          stroke="rgba(16,185,129,0.2)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <path
          d="M 1360 150 L 1300 280 L 1160 390"
          stroke="rgba(56,189,248,0.2)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <path d="M 220 85 L 340 180" stroke="rgba(249,115,22,0.18)" strokeWidth="1" />
        <path d="M 1220 85 L 1100 180" stroke="rgba(168,85,247,0.18)" strokeWidth="1" />

        {/* Center Horizon Beacon: Gazipur Main Campus */}
        <g filter="url(#glowGreenReact)">
          <circle cx="720" cy="28" r="6" fill="#10b981" />
          <circle
            cx="720"
            cy="28"
            r="14"
            stroke="#10b981"
            strokeWidth="1"
            opacity={0.45}
            className="node-pulse"
          />
        </g>

        {/* Regional Hub Nodes */}
        <circle cx="560" cy="38" r="4.5" fill="#34d399" />
        <circle cx="380" cy="55" r="4.5" fill="#38bdf8" />
        <circle cx="220" cy="85" r="4" fill="#fb923c" />
        <circle cx="80" cy="150" r="3.5" fill="#facc15" />
        <circle cx="140" cy="280" r="4" fill="#38bdf8" />
        <circle cx="280" cy="390" r="3.5" fill="#34d399" />
        <circle cx="880" cy="38" r="4.5" fill="#fb923c" />
        <circle cx="1060" cy="55" r="4.5" fill="#c084fc" />
        <circle cx="1220" cy="85" r="4" fill="#fb7185" />
        <circle cx="1360" cy="150" r="3.5" fill="#f43f5e" />
        <circle cx="1300" cy="280" r="4" fill="#fb923c" />
        <circle cx="1160" cy="390" r="3.5" fill="#38bdf8" />
      </svg>

      <div className="academic-backdrop-left">
        <svg
          className="knowledge-symbol-svg"
          width="110"
          height="85"
          viewBox="0 0 120 90"
          fill="none"
          opacity={0.22}
        >
          <path
            d="M 60 20 Q 30 10 5 18 L 5 72 Q 30 64 60 74 Q 90 64 115 72 L 115 18 Q 90 10 60 20 Z"
            stroke="#10b981"
            strokeWidth="2"
          />
          <line x1="60" y1="20" x2="60" y2="74" stroke="#10b981" strokeWidth="2" />
          <line
            x1="15"
            y1="32"
            x2="50"
            y2="29"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <line
            x1="15"
            y1="44"
            x2="50"
            y2="41"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <line
            x1="70"
            y1="29"
            x2="105"
            y2="32"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <line
            x1="70"
            y1="41"
            x2="105"
            y2="44"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="academic-backdrop-right">
        <svg
          className="knowledge-symbol-svg"
          width="110"
          height="85"
          viewBox="0 0 110 90"
          fill="none"
          opacity={0.22}
        >
          <ellipse
            cx="55"
            cy="45"
            rx="46"
            ry="16"
            stroke="#38bdf8"
            strokeWidth="1.5"
            transform="rotate(-25 55 45)"
          />
          <ellipse
            cx="55"
            cy="45"
            rx="46"
            ry="16"
            stroke="#c084fc"
            strokeWidth="1.5"
            transform="rotate(25 55 45)"
          />
          <circle cx="55" cy="45" r="5" fill="#facc15" />
        </svg>
      </div>
    </div>
  );
}
