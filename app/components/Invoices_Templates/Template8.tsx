import React from 'react';
import BaseTemplate, { InvoiceData } from './BaseTemplate';
import InvoiceHeader from './InvoiceHeader';
import { formatCurrency } from '../../utils/formatCurrency';

interface Template8Props {
  data: InvoiceData;
}

const Template8: React.FC<Template8Props> = ({ data }) => {
  const { billTo, shipTo, items, taxPercentage, taxAmount, subTotal, grandTotal, notes, selectedCurrency } = data;

  return (
    <BaseTemplate data={data}>
      <div
        className="bg-gray-100 w-full h-full flex flex-col"
        style={{ margin: "0", padding: "16px" }}
      >
        <InvoiceHeader data={data} title="Invoice" />

        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Billed by</h3>
            <p className="font-bold">{data.yourCompany.name || "Your Company Name"}</p>
            <p>{data.yourCompany.address || "Your Company Address"}</p>
            <p>{data.yourCompany.phone || "Your Company Phone"}</p>
            {data.yourCompany.email && (
              <p>{data.yourCompany.email}</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Billed to</h3>
            <p className="font-bold">{billTo.name}</p>
            <p>{billTo.address}</p>
            <p>{billTo.phone}</p>
          </div>
        </div>

        <table className="w-full mb-8">
          <thead style={{ backgroundColor: "#3C8BF6", color: "white" }}>
            <tr>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-right">Quantity</th>
              <th className="p-2 text-right">Rate</th>
              <th className="p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-2">{item.name}</td>
                <td className="p-2 text-right">{item.quantity}</td>
                <td className="p-2 text-right">
                  {formatCurrency(item.amount, selectedCurrency)}
                </td>
                <td className="p-2 text-right">
                  {formatCurrency(item.total, selectedCurrency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-1/2">
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
              <span>Total Due:</span>
              <span style={{ color: "#3C8BF6" }}>
                {formatCurrency(grandTotal, selectedCurrency)}
              </span>
            </div>
          </div>
        </div>

        {notes && (
          <div className="mt-8 p-4 bg-white border border-gray-300 rounded">
            <h3 className="font-semibold mb-2 text-blue-600">Notes:</h3>
            <p className="text-sm">{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template8;
