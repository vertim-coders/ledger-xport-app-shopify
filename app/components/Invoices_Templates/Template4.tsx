import React from 'react';
import { format } from 'date-fns';
import BaseTemplate, { InvoiceData } from './BaseTemplate';
import InvoiceHeader from './InvoiceHeader';
import { formatCurrency } from '../../utils/formatCurrency';

interface Template4Props {
  data: InvoiceData;
}

const Template4: React.FC<Template4Props> = ({ data }) => {
  const { billTo, shipTo, items, taxPercentage, taxAmount, subTotal, grandTotal, notes, selectedCurrency } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <InvoiceHeader data={data} title="Invoice" />

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold text-purple-600 mb-2">
              Billed by
            </h3>
            <p>
              <strong>{data.yourCompany.name || "Company Name"}</strong>
            </p>
            <p>{data.yourCompany.address || "Company Address"}</p>
            <p>{data.yourCompany.phone || "Company Phone"}</p>
            {data.yourCompany.email && (
              <p>{data.yourCompany.email}</p>
            )}
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold text-purple-600 mb-2">
              Billed to
            </h3>
            <p>
              <strong>{billTo.name || "Client Name"}</strong>
            </p>
            <p>{billTo.address || "Client Address"}</p>
            <p>{billTo.phone || "Client Phone"}</p>
          </div>
        </div>

        <table className="w-full mb-8 border border-gray-300">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-2 text-left border border-gray-300">
                Item #/Item Description
              </th>
              <th className="p-2 text-right border border-gray-300">Qty.</th>
              <th className="p-2 text-right border border-gray-300">Rate</th>
              <th className="p-2 text-right border border-gray-300">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="bg-gray-100">
                <td className="p-2 border border-gray-300">
                  {`${index + 1}. ${item.name || "Item Name"}`}
                  <br />
                  <span className="text-sm text-gray-600">
                    {item.description || "Item Description"}
                  </span>
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
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>{formatCurrency(grandTotal, selectedCurrency)}</span>
            </div>
          </div>
        </div>

        {notes && (
          <div className="mt-8 p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2 text-purple-600">Notes:</h3>
            <p className="text-sm">{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template4;
