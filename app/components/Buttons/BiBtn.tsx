import React from "react";

export const BiBtn = ({ title, onClick, style }: { title: string; onClick?: () => void; style?: React.CSSProperties }) => {
    return (
        <div
            style={{
                position: 'relative',
                display: 'inline-block',
                margin: '0 8px',
                ...style,
            }}
        >
            <button
                type="button"
                onClick={onClick}
                style={{
                    position: 'relative',
                    zIndex: 1,
                    minHeight: 40,
                    minWidth: 80,
                    display: 'inline-flex',
                    background: 'transparent',
                    border: '2px solid #111',
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 15,
                    color: '#111',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    transition: 'background 0.18s cubic-bezier(.4,0,.2,1)',
                    paddingInline: '1.3em',
                    paddingBlock: '0.8em',
                    whiteSpace: 'nowrap',
                }}
            >
                {title}
            </button>
        </div>
    );
} 