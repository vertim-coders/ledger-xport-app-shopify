import React from "react";
import { PlusIcon } from "@shopify/polaris-icons";

export const BiSimpleBtn = ({ title, onClick, style, icon }: { title: string; onClick?: () => void; style?: React.CSSProperties; icon?: React.ReactNode }) => {
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
                    width: '100%',
                    minHeight: 40,
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
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    transition: 'background 0.18s cubic-bezier(.4,0,.2,1)',
                }}
            >
                {icon ? icon : <PlusIcon width={18} height={18} color="#111" />}
                {title}
            </button>
        </div>
    );
} 