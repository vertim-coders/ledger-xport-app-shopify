import React from "react";

export const BiBtn = ({ title, onClick, style }: { title: string; onClick?: () => void; style?: React.CSSProperties }) => {
    return (
        <div
            style={{
                position: 'relative',
                display: 'inline-block',
                minWidth: 200,
                maxWidth: 320,
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
                    width: '100%',
                    minHeight: 40,
                    background: 'transparent',
                    border: '2px solid #111',
                    borderRadius: 8,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                    fontSize: 12,
                    color: '#111',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    transition: 'background 0.18s cubic-bezier(.4,0,.2,1)',
                }}
            >
                {title}
            </button>
        </div>
    );
} 