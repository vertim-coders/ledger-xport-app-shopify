import React from 'react';
import { format } from 'date-fns';
import BaseTemplate, { InvoiceData } from './BaseTemplate';
import InvoiceHeader from './InvoiceHeader';
import { formatCurrency } from '../../utils/formatCurrency';

interface Template9Props {
  data: InvoiceData;
}

const Template9: React.FC<Template9Props> = ({ data }) => {
  const { billTo, shipTo, items, taxPercentage, taxAmount, subTotal, grandTotal, notes, selectedCurrency } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <InvoiceHeader data={data} title="Invoice" />

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-orange-50 p-4 rounded">
            <h3 className="text-lg font-semibold text-orange-600 mb-2">
              Billed by
            </h3>
            <p>{data.yourCompany.name || "Your Company Name"}</p>
            <p>{data.yourCompany.address || "Your Company Address"}</p>
            <p>{data.yourCompany.phone || "Your Company Phone"}</p>
            {data.yourCompany.email && (
              <p>{data.yourCompany.email}</p>
            )}
          </div>
          <div className="bg-orange-50 p-4 rounded">
            <h3 className="text-lg font-semibold text-orange-600 mb-2">
              Billed to
            </h3>
            <p>{billTo.name || "Client Name"}</p>
            <p>{billTo.address || "Client Address"}</p>
            <p>{billTo.phone || "Client Phone"}</p>
          </div>
        </div>

        <div className="w-full mb-8 overflow-hidden rounded-lg border border-orange-50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-orange-600 text-white">
                <tr>
                  <th className="p-2 text-left">Item #/Item description</th>
                  <th className="p-2 text-right">Qty.</th>
                  <th className="p-2 text-right">Rate</th>
                  <th className="p-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="bg-orange-50">
                    <td className="p-2">{item.name || "Item Name"}</td>
                    <td className="p-2 text-right">{item.quantity || 0}</td>
                    <td className="p-2 text-right">
                      {formatCurrency(item.amount || 0, selectedCurrency)}
                    </td>
                    <td className="p-2 text-right">
                      {formatCurrency(item.total || 0, selectedCurrency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="w-1/3">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Subtotal:</span>
              <span>{formatCurrency(subTotal, selectedCurrency)}</span>
            </div>
            {taxPercentage > 0 && (
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Tax ({taxPercentage}%):</span>
                <span>{formatCurrency(taxAmount, selectedCurrency)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg border-t-2 border-orange-600 pt-2">
              <span>Total:</span>
              <span>{formatCurrency(grandTotal, selectedCurrency)}</span>
            </div>
          </div>
        </div>

        {notes && (
          <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded">
            <h3 className="font-semibold mb-2 text-orange-600">Notes:</h3>
            <p className="text-sm">{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template9;
