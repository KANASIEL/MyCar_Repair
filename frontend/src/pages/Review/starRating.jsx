import React, { useState, useEffect, useRef } from "react";
import "./starRating.css";

export default function StarRating({ value = 0, onChange, max = 5, step = 0.5 }) {
  const [hoverValue, setHoverValue] = useState(null);
  const containerRef = useRef(null);

  const displayValue = hoverValue !== null ? hoverValue : value;

  const handleKeyDown = (e) => {
    e.preventDefault();
    const increment = step;

    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      const next = Math.min(max, value + increment);
      onChange?.(+(next.toFixed(2)));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      const next = Math.max(0, value - increment);
      onChange?.(+(next.toFixed(2)));
    } else if (e.key === "Home") {
      onChange?.(0);
    } else if (e.key === "End") {
      onChange?.(max);
    }
  };

  const calcValueFromEvent = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    const newVal = isHalf ? index + 0.5 : index + 1;
    return Math.min(max, Math.max(0, +newVal.toFixed(2)));
  };

  const stars = [];

  for (let i = 0; i < max; i++) {
    const diff = displayValue - i;
    const fill = diff >= 1 ? 1 : diff >= 0.5 ? 0.5 : 0;

    stars.push(
      <button
        key={i}
        type="button"
        className="sr-star-btn"
        onClick={(e) => onChange(calcValueFromEvent(e, i))}
        onMouseMove={(e) => setHoverValue(calcValueFromEvent(e, i))}
        onMouseLeave={() => setHoverValue(null)}
      >
        <StarSVG index={i} fill={fill} />
      </button>
    );
  }

  return (
    <div className="sr-star-container">
      <div
        className="sr-star-wrapper"
        role="slider"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        ref={containerRef}
        aria-label="별점"
      >
        {stars}
        <div className="sr-value">{value.toFixed(1)}</div>
      </div>
    </div>
  );
}

function StarSVG({ index, fill }) {
  // ⭐ 이 ID는 렌더마다 바뀌지 않음 (고정됨)
  const clipId = `half-clip-${index}`;

  return (
    <svg viewBox="0 0 24 24" className="sr-star">
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width="12" height="24" />
        </clipPath>
      </defs>

      {/* empty outline */}
      <path
        d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z"
        fill="none"
        stroke="#ccc"
        strokeWidth="1"
      />

      {/* full star */}
      {fill === 1 && (
        <path
          d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z"
          fill="gold"
        />
      )}

      {/* half star */}
      {fill === 0.5 && (
        <>
          <g clipPath={`url(#${clipId})`}>
            <path
              d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z"
              fill="gold"
            />
          </g>
        </>
      )}
    </svg>
  );
}
