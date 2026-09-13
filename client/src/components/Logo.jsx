import React from "react";
import "./Logo.css";

/**
 * Recreated from the Nivara Design Studio brand mark shown in the
 * approved Figma design. Swap the <svg> below for the studio's actual
 * logo file (e.g. an <img src="/logo.svg" />) whenever it's available
 * for pixel-exact brand reproduction.
 */
export default function Logo({ variant = "full", size = "md", onDark = false }) {
  const color = onDark ? "#ffffff" : "#1b2a41";
  const accent = "#c8924c";

  const mark = (
    <svg
      width={variant === "mark" ? 44 : 52}
      height={variant === "mark" ? 44 : 52}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="32" cy="30" r="22" stroke={accent} strokeWidth="0.75" opacity="0.5" />
      <path
        d="M32 10c1.8 3 1.8 6.5 0 9-1.8-2.5-1.8-6 0-9Z"
        fill={accent}
      />
      <path
        d="M20 46c0-9 5-16 12-16s12 7 12 16"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M24 46V33c0-4.5 3.6-8 8-8s8 3.5 8 8v13"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="32" cy="22" r="3.2" fill={color} />
      <path
        d="M35 20.5c2-2 5-2.2 7-.6"
        stroke={accent}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M18 46h28"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );

  if (variant === "mark") return mark;

  return (
    <div className={`logo logo--${size}`}>
      {mark}
      <div className="logo__text" style={{ color }}>
        <span className="logo__wordmark">NIVARA</span>
        <span className="logo__sub">Design Studio</span>
        {size !== "sm" && (
          <span className="logo__tagline" style={{ color: onDark ? "#b9c0cd" : "#948d80" }}>
            Interior Design &nbsp;|&nbsp; Spaces That Inspire
          </span>
        )}
      </div>
    </div>
  );
}
