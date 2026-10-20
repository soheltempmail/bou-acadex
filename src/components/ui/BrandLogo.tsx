import type { SVGProps } from "react";

interface BrandLogoProps extends SVGProps<SVGSVGElement> {
  className?: string;
  idPrefix?: string;
}

export function BrandLogo({ className = "brand-logo-img", idPrefix = "bl", ...props }: BrandLogoProps) {
  const greenGradId = `${idPrefix}-tmsGreenGrad`;
  const amberGradId = `${idPrefix}-tmsAmberGrad`;
  const redGradId = `${idPrefix}-tmsRedGrad`;
  const shadowId = `${idPrefix}-logoShadow`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 120"
      className={className}
      aria-label="BOU Acadex Logo"
      role="img"
      {...props}
    >
      <defs>
        {/* 10 Minute School Emerald Green Gradient */}
        <linearGradient id={greenGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1cab55" />
          <stop offset="60%" stopColor="#149353" />
          <stop offset="100%" stopColor="#0e6e3c" />
        </linearGradient>

        {/* Warm Amber Accent Gradient */}
        <linearGradient id={amberGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffbd01" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>

        {/* 10MS Red Accent Gradient */}
        <linearGradient id={redGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fe2601" />
          <stop offset="100%" stopColor="#ea4335" />
        </linearGradient>

        <filter id={shadowId} x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#149353" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* LOGO EMBLEM ICON (Left) */}
      <g transform="translate(15, 10)" filter={`url(#${shadowId})`}>
        {/* Outer Shield with Smooth Rounded Corners */}
        <rect x="0" y="0" width="100" height="100" rx="26" fill={`url(#${greenGradId})`} />

        {/* Dynamic Orbit Ring (Academic Connectivity) */}
        <ellipse
          cx="50"
          cy="50"
          rx="42"
          ry="22"
          fill="none"
          stroke={`url(#${amberGradId})`}
          strokeWidth="2.5"
          strokeDasharray="4 2"
          opacity="0.75"
          transform="rotate(-25 50 50)"
        />

        {/* Open Book Pages (White Crisp Base) */}
        <path
          d="M 22 72 Q 50 63 50 78 Q 50 63 78 72 L 78 54 Q 50 45 50 60 Q 50 45 22 54 Z"
          fill="#FFFFFF"
          opacity="0.98"
        />
        <path d="M 50 60 L 50 78" stroke="#149353" strokeWidth="2.5" strokeLinecap="round" />

        {/* Book Highlight Accents */}
        <path
          d="M 24 74 Q 50 66 50 78"
          stroke={`url(#${amberGradId})`}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 76 74 Q 50 66 50 78"
          stroke={`url(#${amberGradId})`}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Mortarboard Graduation Cap */}
        <polygon points="50,22 80,34 50,46 20,34" fill="#FFFFFF" />
        <polygon points="50,25 74,34 50,43 26,34" fill={`url(#${amberGradId})`} />

        {/* Cap Skullcap Base */}
        <path d="M 32 39 L 32 49 Q 50 58 68 49 L 68 39 Q 50 48 32 39 Z" fill={`url(#${redGradId})`} />

        {/* Tassel and button */}
        <circle cx="50" cy="34" r="3" fill="#FFFFFF" />
        <path
          d="M 50 34 C 65 37 72 45 74 54"
          fill="none"
          stroke={`url(#${amberGradId})`}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="74" cy="55" r="2.5" fill="#fe2601" />

        {/* Top Right Sparkle / Live Beacon */}
        <circle cx="84" cy="18" r="4" fill={`url(#${redGradId})`} />
        <circle cx="84" cy="18" r="6" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
      </g>

      {/* LOGO TEXT (Right) */}
      <g transform="translate(132, 22)">
        {/* BOU Monogram - Adapts to Theme (Dark Slate in Light Mode, White in Dark Mode) */}
        <text
          x="0"
          y="44"
          fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
          fontWeight="900"
          fontSize="44"
          className="brand-logo-bou"
          letterSpacing="0.5"
        >
          BOU
        </text>

        {/* Acadex Modern Wordmark in TMS Emerald Green with Red EX */}
        <text
          x="110"
          y="44"
          fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
          fontWeight="800"
          fontSize="44"
          fill="#149353"
          letterSpacing="0.5"
        >
          ACAD<tspan fill="#fe2601">EX</tspan>
        </text>

        {/* 10MS Accent Star */}
        <path
          d="M 294 18 Q 298 25 305 25 Q 298 25 294 32 Q 294 25 287 25 Q 294 25 294 18 Z"
          fill={`url(#${amberGradId})`}
        />

        {/* Badge / Subtitle Container */}
        <rect
          x="0"
          y="56"
          width="366"
          height="24"
          rx="12"
          fill="#ecfdf5"
          stroke="#a7f3d0"
          strokeWidth="1"
          className="brand-logo-badge-bg"
        />

        {/* 10MS Red Live Accent Dot */}
        <circle cx="12" cy="68" r="3.5" fill="#fe2601" />

        {/* Bengali Subtitle + Descriptor */}
        <text
          x="24"
          y="72.5"
          fontFamily="'Hind Siliguri', 'Outfit', sans-serif"
          fontWeight="700"
          fontSize="11"
          fill="#0f766e"
          letterSpacing="0.15"
          textLength="316"
          lengthAdjust="spacing"
          className="brand-logo-badge-text"
        >
          বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় • STUDENT ACADEMIC HUB
        </text>
      </g>
    </svg>
  );
}
