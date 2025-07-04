import React from "react";
import { Checkbox, CheckboxProps } from "@shopify/polaris";

export function BluePolarisCheckbox(props: CheckboxProps) {
  return (
    <span style={{ display: 'inline-block', position: 'relative' }}>
      <style>{`
        .Polaris-Checkbox__Input:checked + .Polaris-Checkbox__Backdrop .Polaris-Checkbox__Icon {
          color: #2196F3 !important;
          fill: #2196F3 !important;
        }
        .Polaris-Checkbox__Backdrop {
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          border-radius: 4px;
          transition: background-color 0.3s;
        }
        .Polaris-Checkbox__Input:checked + .Polaris-Checkbox__Backdrop {
          box-shadow: 0 3px 7px rgba(33,150,243,0.3);
          background: #2196F3 !important;
        }
      `}</style>
      <Checkbox {...props} />
    </span>
  );
} 