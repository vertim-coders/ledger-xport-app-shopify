import React from 'react';
import { format } from 'date-fns';
import BaseTemplate, { InvoiceData } from './BaseTemplate';
import InvoiceHeader from './InvoiceHeader';
import { formatCurrency } from '../../utils/formatCurrency';

interface Template6Props {
  data: InvoiceData;
}

const Template6: React.FC<Template6Props> = ({ data }) => {
  const { billTo, shipTo, items, taxPercentage, taxAmount, subTotal, grandTotal, notes, selectedCurrency } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <InvoiceHeader data={data} title="Tax Invoice" />

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Billed by</h3>
            <p>{data.yourCompany.name || "Your Company Name"}</p>
            <p>{data.yourCompany.address || "Your Company Address"}</p>
            <p>{data.yourCompany.phone || "Your Company Phone"}</p>
            {data.yourCompany.email && (
              <p>{data.yourCompany.email}</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Billed to</h3>
            <p>{billTo.name || "Client Name"}</p>
            <p>{billTo.address || "Client Address"}</p>
            <p>{billTo.phone || "Client Phone"}</p>
          </div>
        </div>

        <table className="w-full mb-8 border border-gray-300">
          <thead style={{ backgroundColor: "#14A8DE" }}>
            <tr>
              <th className="p-2 text-left border-b border-gray-300 text-white">
                Item #/Item description
              </th>
              <th className="p-2 text-right border-b border-gray-300 text-white">
                Quantity
              </th>
              <th className="p-2 text-right border-b border-gray-300 text-white">
                Rate
              </th>
              <th className="p-2 text-right border-b border-gray-300 text-white">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border border-gray-300">
                  <p className="font-semibold">{item.name || "Item Name"}</p>
                  <p className="text-sm text-gray-600">
                    {item.description || "Item Description"}
                  </p>
                </td>
                <td className="p-2 text-right border border-gray-300">
                  {item.quantity || 0}
                </td>
                <td className="p-2 text-right border border-gray-300">
                  {formatCurrency(item.amount || 0, selectedCurrency)}
                </td>
                <td className="p-2 text-right border border-gray-300">
                  {formatCurrency(item.total || 0, selectedCurrency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
            <div className="flex justify-between font-bold text-lg border-t-2 border-blue-500 pt-2">
              <span>Total:</span>
              <span>{formatCurrency(grandTotal, selectedCurrency)}</span>
            </div>
          </div>
        </div>

        {notes && (
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
            <h3 className="font-semibold mb-2 text-blue-600">Notes:</h3>
            <p className="text-sm">{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template6;
