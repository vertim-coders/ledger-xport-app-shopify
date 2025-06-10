import { Box, Button, ButtonProps, InlineStack } from "@shopify/polaris";
import LoadingGray from "../Icons/LoadingGray";
import BiSaveIcon from "../Icons/BiSaveIcon";

export const BiSaveBtn = ({ isLoading, title }: { isLoading?: boolean;  title?:string}) => {
    return ( <button disabled={isLoading} className="next-large-btn" type="submit" style={{ 
      backgroundColor: 'rgb(6, 96, 250)', 
      border: 'none', 
      borderRadius: '12px',
      padding: '5px 4px',
      fontSize: '16px',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      display: 'block',
      cursor: 'pointer'
    }}>
    <Box paddingInline="1000">
      <InlineStack gap="300">
      {isLoading?<LoadingGray/> : <BiSaveIcon />}
        <span style={{ color: "white", fontWeight: "bold" }}>
          {title||'Save'}
        </span>
      </InlineStack>
    </Box>
  </button>);
}