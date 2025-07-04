import React, { useState } from "react";
import { PlusIcon } from "@shopify/polaris-icons";

export const BiSimpleBtn = ({ title, onClick, style }: { title: string; onClick?: () => void; style?: React.CSSProperties }) => {
    const [hovered, setHovered] = useState(false);
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
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    transition: 'background 0.18s cubic-bezier(.4,0,.2,1)',
                }}
            >
                <PlusIcon width={18} height={18} color="#111" />
                {title}
            </button>
        </div>
    );
} 