import { Box, InlineStack } from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import React from "react";

export const BiSimpleBtn = ({ title, onClick, style }: { title: string; onClick?: () => void; style?: React.CSSProperties }) => {
    return (
        <button 
            onClick={onClick}
            className="next-large-btn" 
            type="button" 
            style={{ 
                backgroundColor: 'rgb(6, 96, 250)', 
                border: 'none', 
                borderRadius: '8px',
                padding: '4px 8px',
                fontSize: '14px',
                width: 'auto',
                margin: '0 auto',
                display: 'inline-block',
                cursor: 'pointer',
                ...style
            }}
        >
            <Box paddingInline="400">
                <InlineStack gap="200" align="center">
                    <PlusIcon width={16} height={16} color="white" />
                    <span style={{ color: "white", fontWeight: "bold" }}>
                        {title}
                    </span>
                </InlineStack>
            </Box>
        </button>
    );
} 