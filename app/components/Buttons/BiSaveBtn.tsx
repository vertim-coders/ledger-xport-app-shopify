import React, { useState } from "react";
import LoadingGray from "../Icons/LoadingGray";
import BiSaveIcon from "../Icons/BiSaveIcon";

export const BiSaveBtn = ({ isLoading, title, style }: { isLoading?: boolean; title?: string; style?: React.CSSProperties }) => {
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
          minHeight: 40,
          width: '100%',
          background: '#0066FF',
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