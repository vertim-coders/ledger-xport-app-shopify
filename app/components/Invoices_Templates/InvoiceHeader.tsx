import React from 'react';
import { InvoiceData } from './BaseTemplate';

interface InvoiceHeaderProps {
  data: InvoiceData;
  title?: string;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ data, title = "INVOICE" }) => {
  const { yourCompany, invoice } = data;

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center">
        {yourCompany.logoUrl && (
          <img
            src={yourCompany.logoUrl}
            alt="Company Logo"
            style={{
              width: `${yourCompany.logoWidth || 150}px`,
              height: `${yourCompany.logoHeight || 100}px`,
              objectFit: 'contain',
              marginRight: '20px'
            }}
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{yourCompany.name}</h1>
          <p className="text-sm text-gray-600">{yourCompany.address}</p>
          <p className="text-sm text-gray-600">{yourCompany.phone}</p>
          {yourCompany.email && (
            <p className="text-sm text-gray-600">{yourCompany.email}</p>
          )}
        </div>
      </div>
      <div className="text-right">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <div className="mt-4">
          <p className="text-sm">Invoice Number: {invoice.number}</p>
          <p className="text-sm">Invoice Date: {invoice.date}</p>
          <p className="text-sm">Due Date: {invoice.paymentDate}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader; 