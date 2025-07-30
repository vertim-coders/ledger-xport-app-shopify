import React from 'react';
import BaseTemplate, { InvoiceData } from './BaseTemplate';
import InvoiceHeader from './InvoiceHeader';
import { formatCurrency } from '../../utils/formatCurrency';

interface Template2Props {
  data: InvoiceData;
}

const Template2: React.FC<Template2Props> = ({ data }) => {
  const { billTo, shipTo, items, taxPercentage, taxAmount, subTotal, grandTotal, notes, selectedCurrency } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <InvoiceHeader data={data} title="Tax invoice" />

        <div className="flex justify-between mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-cyan-700">Bill To</h3>
            <p>{billTo.name}</p>
            <p>{billTo.address}</p>
            <p>{billTo.phone}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-cyan-700">Ship To</h3>
            <p>{shipTo.name}</p>
            <p>{shipTo.address}</p>
            <p>{shipTo.phone}</p>
          </div>
        </div>

        <div className="mb-8">
          <table className="w-full border border-gray-300">
            <thead>
              <tr>
                <th className="p-2 text-left border border-gray-300">ID</th>
                <th className="p-2 text-left border border-gray-300">
                  Description
                </th>
                <th className="p-2 text-right border border-gray-300">
                  Quantity
                </th>
                <th className="p-2 text-right border border-gray-300">Rate</th>
                <th className="p-2 text-right border border-gray-300">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 border border-gray-300">{index + 1}</td>
                  <td className="p-2 border border-gray-300">
                    {item.name}
                    <div className="text-sm text-gray-500">
                      {item.description}
                    </div>
                  </td>
                  <td className="p-2 text-right border border-gray-300">
                    {item.quantity}
                  </td>
                  <td className="p-2 text-right border border-gray-300">
                    {formatCurrency(item.amount, selectedCurrency)}
                  </td>
                  <td className="p-2 text-right border border-gray-300">
                    {formatCurrency(item.total, selectedCurrency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="w-1/3">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>{formatCurrency(subTotal, selectedCurrency)}</span>
            </div>
            {taxPercentage > 0 && (
              <div className="flex justify-between mb-2">
                <span>Tax ({taxPercentage}%):</span>
                <span>{formatCurrency(taxAmount, selectedCurrency)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{formatCurrency(grandTotal, selectedCurrency)}</span>
            </div>
          </div>
        </div>

        {notes && (
          <div className="mt-8 text-sm">
            <h3 className="font-semibold mb-2">Notes:</h3>
            <p>{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template2;
