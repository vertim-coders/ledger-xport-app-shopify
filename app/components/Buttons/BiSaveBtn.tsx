import React, { useState } from "react";
import LoadingGray from "../Icons/LoadingGray";
import BiSaveIcon from "../Icons/BiSaveIcon";

export const BiSaveBtn = ({ isLoading, title, style }: { isLoading?: boolean; title?: string; style?: React.CSSProperties }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
      margin: '0 auto',
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Offset yellow background */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background: '#0066FF',
          borderRadius: 8,
          zIndex: 0,
          transform: hovered ? 'translate(0,0)' : 'translate(6px,6px)',
          transition: 'transform 0.18s cubic-bezier(.4,0,.2,1)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
      <button
        type="submit"
        disabled={isLoading}
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: 40,
          background: 'transparent',
          border: '2px solid #111',
          borderRadius: 8,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 2,
          fontSize: 12,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          boxSizing: 'border-box',
          transition: 'background 0.18s cubic-bezier(.4,0,.2,1)',
        }}
      >
        {isLoading ? <LoadingGray /> : <BiSaveIcon />}
        {title || 'Save'}
      </button>
    </div>
  );
};