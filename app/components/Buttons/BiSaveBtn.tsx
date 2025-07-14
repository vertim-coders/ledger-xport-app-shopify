import React, { useState } from "react";
import LoadingGray from "../Icons/LoadingGray";
import BiSaveIcon from "../Icons/BiSaveIcon";

export const BiSaveBtn = ({ isLoading, title, style }: { isLoading?: boolean; title?: string; style?: React.CSSProperties }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        margin: '0 auto',
        ...style,
      }}
    >
      <button
        type="submit"
        disabled={isLoading}
        style={{
          fontSize: 17,
          borderRadius: 12,
          background: '#0066FF',
          color: 'rgb(218, 218, 218)',
          border: 'none',
          padding: 2,
          fontWeight: 700,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 40,
          minWidth: 80,
          display: 'inline-flex',
          transition: 'background 0.18s cubic-bezier(.4,0,.2,1)',
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'none',
            borderRadius: 12,
            zIndex: 1,
          }}
        />
        <span
          style={{
            borderRadius: 10,
            paddingInline: '1.3em',
            paddingBlock: '0.8em',
            textShadow: '0px 0px 20px #4b4b4b',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: '#fff',
            transition: 'all 0.3s',
            backgroundColor: hover ? '#0052cc' : '#0066FF',
            zIndex: 2,
            justifyContent: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          {isLoading ? <LoadingGray /> : <BiSaveIcon />}
          {title || 'Save'}
        </span>
      </button>
    </div>
  );
};