import React, { ReactNode } from 'react';

export interface InvoiceData {
  billTo: {
    name: string;
    address: string;
    phone: string;
  };
  shipTo: {
    name: string;
    address: string;
    phone: string;
  };
  invoice: {
    number: string;
    date: string;
    paymentDate: string;
  };
  yourCompany: {
    name: string;
    address: string;
    phone: string;
    email: string;
    logoUrl?: string;
    logoWidth?: number;
    logoHeight?: number;
  };
  items: Array<{
    name: string;
    description: string;
    quantity: number;
    amount: number;
    total: number;
  }>;
  taxPercentage: number;
  taxAmount: number;
  subTotal: number;
  grandTotal: number;
  notes: string;
  selectedCurrency: string;
}

interface BaseTemplateProps {
  data?: InvoiceData;
  children: ReactNode;
}

const BaseTemplate: React.FC<BaseTemplateProps> = ({ data, children }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg mx-auto"
      style={{ width: "794px", height: "1123px" }}
    >
      {children}
    </div>
  );
};

export default BaseTemplate;