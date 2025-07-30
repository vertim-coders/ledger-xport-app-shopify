import React, { useState } from "react";
import { PlusIcon } from "@shopify/polaris-icons";

export const BiSimpleBtn = ({ 
  title, 
  onClick, 
  style, 
  icon, 
  type = "button",
  disabled = false,
  ...props
}: { 
  title: string; 
  onClick?: () => void; 
  style?: React.CSSProperties; 
  icon?: React.ReactNode; 
  type?: "button" | "submit";
  disabled?: boolean;
  [key: string]: any;
}) => {
    const [hover, setHover] = useState(false);
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
                type={type}
                onClick={onClick}
                disabled={disabled}
                {...props}
                style={{
                    fontSize: 17,
                    borderRadius: 12,
                    background: disabled ? '#cccccc' : '#0066FF',
                    color: 'rgb(218, 218, 218)',
                    border: 'none',
                    padding: 2,
                    fontWeight: 700,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: 40,
                    minWidth: 80,
                    display: 'inline-flex',
                    transition: 'background 0.18s cubic-bezier(.4,0,.2,1)',
                    opacity: disabled ? 0.6 : 1,
                }}
                onMouseEnter={() => !disabled && setHover(true)}
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
                        backgroundColor: disabled ? '#cccccc' : (hover ? '#0052cc' : '#0066FF'),
                        zIndex: 2,
                        justifyContent: 'center',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {icon}
                {title}
                </span>
            </button>
        </div>
    );
} 