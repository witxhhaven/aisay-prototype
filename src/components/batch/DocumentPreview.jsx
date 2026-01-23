import { Loader2 } from 'lucide-react';

// CSS-styled mock document previews
export function DocumentPreview({ document }) {
  if (document.status === 'processing') {
    return (
      <div className="h-full flex items-start justify-center pt-24 bg-slate-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-slate-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-500 italic">Processing document...</p>
        </div>
      </div>
    );
  }

  // Render different mock documents based on type
  switch (document.documentType) {
    case 'Passport':
      return <PassportPreview data={document.extractedData} />;
    case 'Identity Card':
      return <IdCardPreview data={document.extractedData} />;
    case 'Tax Document':
      return <TaxDocumentPreview data={document.extractedData} />;
    case 'Invoice':
      return <InvoicePreview data={document.extractedData} />;
    case 'Receipt':
      return <ReceiptPreview data={document.extractedData} />;
    case 'Long Receipt':
      return <LongReceiptPreview data={document.extractedData} />;
    default:
      return <GenericDocumentPreview data={document.extractedData} type={document.documentType} />;
  }
}

function PassportPreview({ data }) {
  return (
    <div className="h-full bg-slate-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-lg bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg shadow-2xl overflow-hidden">
        {/* Passport Header */}
        <div className="bg-blue-950 px-6 py-4 text-center">
          <p className="text-yellow-400 text-xs tracking-widest mb-1">PASSPORT</p>
          <p className="text-white text-lg font-semibold">{data?.nationality || 'UNITED STATES OF AMERICA'}</p>
        </div>

        {/* Passport Content */}
        <div className="p-6 text-white">
          <div className="flex gap-6">
            {/* Photo placeholder */}
            <div className="w-28 h-36 bg-slate-300 rounded flex items-center justify-center flex-shrink-0">
              <div className="text-center text-slate-500">
                <div className="w-12 h-12 bg-slate-400 rounded-full mx-auto mb-1" />
                <p className="text-xs">PHOTO</p>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 text-sm space-y-2">
              <div>
                <p className="text-blue-300 text-xs">Type</p>
                <p className="font-mono">P</p>
              </div>
              <div>
                <p className="text-blue-300 text-xs">Surname</p>
                <p className="font-semibold uppercase">{data?.surname || 'DOE'}</p>
              </div>
              <div>
                <p className="text-blue-300 text-xs">Given Names</p>
                <p className="font-semibold uppercase">{data?.givenNames || 'JOHN MICHAEL'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-blue-300 text-xs">Nationality</p>
                  <p>{data?.nationality?.substring(0, 3).toUpperCase() || 'USA'}</p>
                </div>
                <div>
                  <p className="text-blue-300 text-xs">Sex</p>
                  <p>{data?.sex || 'M'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-blue-300 text-xs">Date of Birth</p>
              <p className="font-mono">{data?.dateOfBirth || '1990-01-15'}</p>
            </div>
            <div>
              <p className="text-blue-300 text-xs">Date of Issue</p>
              <p className="font-mono">{data?.dateOfIssue || '2020-03-20'}</p>
            </div>
            <div>
              <p className="text-blue-300 text-xs">Date of Expiry</p>
              <p className="font-mono">{data?.dateOfExpiry || '2030-03-20'}</p>
            </div>
          </div>

          {/* MRZ Zone */}
          <div className="mt-6 bg-blue-950/50 rounded p-3 font-mono text-xs tracking-wider">
            <p className="text-blue-200">P&lt;{data?.nationality?.substring(0, 3) || 'USA'}{data?.surname?.toUpperCase() || 'DOE'}&lt;&lt;{data?.givenNames?.toUpperCase().replace(' ', '&lt;') || 'JOHN&lt;MICHAEL'}</p>
            <p className="text-blue-200">{data?.documentNumber || 'P12345678'}&lt;{data?.nationality?.substring(0, 3) || 'USA'}{data?.dateOfBirth?.replace(/-/g, '').slice(2) || '900115'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IdCardPreview({ data }) {
  return (
    <div className="h-full bg-slate-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-xs tracking-wider">REPUBLIC OF SINGAPORE</p>
              <p className="text-white font-semibold">IDENTITY CARD</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">SG</span>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="flex gap-4">
            {/* Photo */}
            <div className="w-24 h-28 bg-slate-200 rounded flex items-center justify-center flex-shrink-0">
              <div className="text-center text-slate-400">
                <div className="w-10 h-10 bg-slate-300 rounded-full mx-auto mb-1" />
                <p className="text-xs">PHOTO</p>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-2 text-sm">
              <div>
                <p className="text-slate-400 text-xs uppercase">Name</p>
                <p className="font-semibold text-slate-900">{data?.fullName || 'JANE SMITH'}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase">NRIC</p>
                <p className="font-mono text-slate-900">{data?.idNumber || 'S1234567A'}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-slate-400 text-xs uppercase">DOB</p>
                  <p className="text-slate-900">{data?.dateOfBirth || '1988-05-22'}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase">Sex</p>
                  <p className="text-slate-900">{data?.sex || 'F'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-slate-400 text-xs uppercase">Address</p>
            <p className="text-sm text-slate-900">{data?.address || '123 Main Street, Unit 05-01, Singapore 123456'}</p>
          </div>

          {/* Dates */}
          <div className="mt-4 flex justify-between text-xs text-slate-400">
            <span>Issued: {data?.dateOfIssue || '2019-07-10'}</span>
            <span>Expires: {data?.dateOfExpiry || '2029-07-10'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaxDocumentPreview({ data }) {
  return (
    <div className="h-full bg-slate-100 p-8 flex items-center justify-center overflow-auto">
      <div className="w-full max-w-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-slate-800 text-white px-8 py-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xl font-bold">Form 1040</p>
              <p className="text-slate-400 text-sm">U.S. Individual Income Tax Return</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{data?.taxYear || '2023'}</p>
              <p className="text-slate-400 text-xs">Tax Year</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Personal Info */}
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">Taxpayer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400">Name</p>
                <p className="font-semibold">{data?.taxpayerName || 'Michael Johnson'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">SSN</p>
                <p className="font-mono">{data?.ssn || '***-**-5678'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-slate-400">Filing Status</p>
                <p>{data?.filingStatus || 'Single'}</p>
              </div>
            </div>
          </div>

          {/* Income */}
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">Income Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Income</span>
                <span className="font-mono font-semibold">{data?.totalIncome || '$85,450'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Taxable Income</span>
                <span className="font-mono">{data?.taxableIncome || '$72,300'}</span>
              </div>
            </div>
          </div>

          {/* Tax */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">Tax Calculation</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Tax</span>
                <span className="font-mono">{data?.totalTax || '$12,680'}</span>
              </div>
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Refund Amount</span>
                <span className="font-mono">{data?.refundAmount || '$1,234'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-8 py-3 text-xs text-slate-400 border-t">
          Internal Revenue Service • Department of the Treasury
        </div>
      </div>
    </div>
  );
}

function InvoicePreview({ data }) {
  // For invoice, data is a string (prompt response)
  const isPromptResponse = typeof data === 'string';

  return (
    <div className="h-full bg-slate-100 p-8 flex items-center justify-center overflow-auto">
      <div className="w-full max-w-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-purple-600 text-white px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-2xl font-bold">INVOICE</p>
              <p className="text-purple-200 text-sm">ABC Corporation</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-lg">INV-2024-001</p>
              <p className="text-purple-200 text-sm">January 15, 2024</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Bill To */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Bill To</p>
            <p className="font-semibold">Customer Name</p>
            <p className="text-slate-600 text-sm">123 Business Ave, Suite 100</p>
            <p className="text-slate-600 text-sm">New York, NY 10001</p>
          </div>

          {/* Items Table */}
          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase">Description</th>
                <th className="text-right py-2 text-xs font-semibold text-slate-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3">Consulting Services</td>
                <td className="py-3 text-right font-mono">$800.00</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3">Software Licensing</td>
                <td className="py-3 text-right font-mono">$434.56</td>
              </tr>
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-48">
              <div className="flex justify-between py-2 border-t-2 border-slate-900">
                <span className="font-semibold">Total</span>
                <span className="font-mono font-bold">$1,234.56</span>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="mt-8 p-4 bg-slate-50 rounded-lg">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Payment Terms</p>
            <p className="text-sm text-slate-600">Net 30 days • Due by February 14, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReceiptPreview({ data }) {
  return (
    <div className="h-full bg-slate-100 p-8 flex items-center justify-center">
      <div className="w-80 bg-white shadow-lg" style={{ fontFamily: 'monospace' }}>
        {/* Receipt Header */}
        <div className="text-center py-6 border-b-2 border-dashed border-slate-300">
          <p className="text-lg font-bold">{data?.merchantName || 'BEST ELECTRONICS'}</p>
          <p className="text-xs text-slate-500">123 Main Street</p>
          <p className="text-xs text-slate-500">Tel: (555) 123-4567</p>
        </div>

        {/* Receipt Body */}
        <div className="px-4 py-4">
          <div className="flex justify-between text-xs mb-4">
            <span>Receipt #: {data?.receiptNumber || 'RCP-2024-0045'}</span>
            <span>{data?.receiptDate || '2024-01-18'}</span>
          </div>

          <div className="border-t border-b border-slate-200 py-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Item 1</span>
              <span>$299.99</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Item 2</span>
              <span>$129.99</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>$30.01</span>
            </div>
          </div>

          <div className="py-4 border-b border-slate-200">
            <div className="flex justify-between font-bold">
              <span>TOTAL</span>
              <span>{data?.totalAmount || '$459.99'}</span>
            </div>
          </div>

          <div className="py-4 text-xs space-y-1">
            <div className="flex justify-between">
              <span>Payment:</span>
              <span>{data?.paymentMethod || 'Credit Card'}</span>
            </div>
            <div className="flex justify-between">
              <span>Card:</span>
              <span>**** **** **** 1234</span>
            </div>
          </div>
        </div>

        {/* Receipt Footer */}
        <div className="text-center py-4 border-t-2 border-dashed border-slate-300">
          <p className="text-xs text-slate-500">Thank you for shopping!</p>
          <p className="text-xs text-slate-500">Please keep this receipt</p>
          <div className="mt-4 h-12 bg-slate-100 mx-8 flex items-center justify-center">
            <p className="text-xs text-slate-400">|||||||||||||||||||||||</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LongReceiptPreview({ data }) {
  const items = data?.items || [];

  return (
    <div className="h-full bg-slate-100 p-4 flex justify-center">
      <div className="w-80 bg-white shadow-lg" style={{ fontFamily: 'monospace' }}>
        {/* Receipt Header */}
        <div className="text-center py-6 border-b-2 border-dashed border-slate-300">
          <p className="text-xl font-bold">{data?.merchantName || 'COSTCO WHOLESALE'}</p>
          <p className="text-xs text-slate-500">{data?.merchantAddress || '123 Market St'}</p>
          <p className="text-xs text-slate-500">Tel: {data?.merchantPhone || '(555) 123-4567'}</p>
          <p className="text-xs text-slate-400 mt-2">Member #: ****5678</p>
        </div>

        {/* Transaction Info */}
        <div className="px-4 py-3 border-b border-slate-200">
          <div className="flex justify-between text-xs">
            <span>Receipt #: {data?.receiptNumber || 'LR-2024-0001'}</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>{data?.receiptDate || '2024-01-18'}</span>
            <span>{data?.receiptTime || '10:30 AM'}</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>Cashier: {data?.cashier || 'John D.'}</span>
            <span>Lane: {(parseInt(data?.receiptNumber?.slice(-4) || '1') % 20) + 1}</span>
          </div>
        </div>

        {/* Items List - The tall part */}
        <div className="px-4 py-2">
          <div className="text-xs font-bold border-b border-slate-300 pb-1 mb-2 grid grid-cols-12">
            <span className="col-span-6">ITEM</span>
            <span className="col-span-2 text-center">QTY</span>
            <span className="col-span-2 text-right">PRICE</span>
            <span className="col-span-2 text-right">TOTAL</span>
          </div>

          <div className="space-y-1">
            {items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 text-xs py-0.5 border-b border-slate-100">
                <span className="col-span-6 truncate pr-1">{item.name}</span>
                <span className="col-span-2 text-center">{item.qty}</span>
                <span className="col-span-2 text-right">${item.price.toFixed(2)}</span>
                <span className="col-span-2 text-right">${item.total.toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Item Count */}
          <div className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-200">
            Total Items: {items.length}
          </div>
        </div>

        {/* Totals Section */}
        <div className="px-4 py-4 border-t-2 border-dashed border-slate-300">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${data?.subtotal || '0.00'}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Tax ({data?.taxRate || '8.25%'}):</span>
              <span>${data?.taxAmount || '0.00'}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-slate-300">
              <span>TOTAL:</span>
              <span>{data?.totalAmount || '$0.00'}</span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="px-4 py-3 border-t border-slate-200 text-xs">
          <div className="flex justify-between">
            <span>Payment:</span>
            <span>{data?.paymentMethod || 'Visa ****1234'}</span>
          </div>
          <div className="flex justify-between mt-1 text-slate-500">
            <span>Trans ID:</span>
            <span className="font-mono">{data?.transactionId?.slice(-12) || 'TXN123456789'}</span>
          </div>
        </div>

        {/* Receipt Footer */}
        <div className="text-center py-4 border-t-2 border-dashed border-slate-300">
          <p className="text-xs text-slate-600 font-bold">MEMBER SAVINGS: $12.47</p>
          <p className="text-xs text-slate-500 mt-2">Thank you for shopping!</p>
          <p className="text-xs text-slate-500">Please keep this receipt</p>
          <p className="text-xs text-slate-400 mt-1">Returns within 90 days</p>

          {/* Barcode */}
          <div className="mt-4 h-16 bg-slate-100 mx-8 flex flex-col items-center justify-center">
            <div className="flex space-x-0.5">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-800"
                  style={{
                    width: i % 3 === 0 ? '2px' : '1px',
                    height: `${20 + (i % 4) * 5}px`,
                  }}
                />
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-1">{data?.receiptNumber || 'LR-2024-0001'}</p>
          </div>

          {/* Survey */}
          <div className="mt-4 px-4 py-2 bg-slate-50 mx-4 rounded">
            <p className="text-[10px] text-slate-500">Tell us about your visit!</p>
            <p className="text-[10px] text-slate-500">www.costco.com/survey</p>
            <p className="text-[10px] text-slate-400">Code: {Math.random().toString(36).slice(2, 10).toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GenericDocumentPreview({ data, type }) {
  return (
    <div className="h-full bg-slate-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-2xl p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📄</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">{type || 'Document'}</h2>
        </div>

        <div className="space-y-4">
          {typeof data === 'string' ? (
            <p className="text-slate-600 leading-relaxed">{data}</p>
          ) : data ? (
            Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="font-medium text-slate-900">{String(value)}</span>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-center">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Thumbnail versions for document picker
export function DocumentThumbnail({ document, isSelected, onClick }) {
  const isProcessing = document.status === 'processing';

  return (
    <button
      onClick={onClick}
      className={`
        relative w-full aspect-[3/4] rounded-lg overflow-hidden transition-all
        ${isSelected ? 'ring-2 ring-purple-600 shadow-lg scale-[1.02]' : 'ring-1 ring-slate-200 hover:ring-slate-300 hover:shadow-md'}
      `}
    >
      {isProcessing ? (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
        </div>
      ) : (
        <ThumbnailContent document={document} />
      )}
    </button>
  );
}

function ThumbnailContent({ document }) {
  const type = document.documentType;

  switch (type) {
    case 'Passport':
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-900 p-2">
          <div className="text-white text-[6px] text-center">
            <p className="text-yellow-300">PASSPORT</p>
            <div className="mt-2 w-6 h-8 bg-slate-300 mx-auto rounded-sm" />
            <p className="mt-1 truncate">{document.extractedData?.surname || 'DOE'}</p>
          </div>
        </div>
      );
    case 'Identity Card':
      return (
        <div className="absolute inset-0 bg-white p-2">
          <div className="bg-red-600 text-white text-[5px] p-1 rounded-sm mb-1">ID CARD</div>
          <div className="flex gap-1">
            <div className="w-4 h-5 bg-slate-200 rounded-sm" />
            <div className="flex-1 space-y-0.5">
              <div className="h-1 bg-slate-200 rounded" />
              <div className="h-1 bg-slate-200 rounded w-3/4" />
            </div>
          </div>
        </div>
      );
    case 'Tax Document':
      return (
        <div className="absolute inset-0 bg-white p-2">
          <div className="bg-slate-800 text-white text-[5px] p-1 mb-1">Form 1040</div>
          <div className="space-y-1">
            <div className="h-1 bg-slate-200 rounded" />
            <div className="h-1 bg-slate-200 rounded" />
            <div className="h-1 bg-slate-200 rounded w-1/2" />
          </div>
        </div>
      );
    case 'Invoice':
      return (
        <div className="absolute inset-0 bg-white p-2">
          <div className="bg-purple-600 text-white text-[5px] p-1 mb-1">INVOICE</div>
          <div className="space-y-1">
            <div className="h-1 bg-slate-200 rounded" />
            <div className="h-1 bg-slate-200 rounded" />
            <div className="h-1 bg-slate-200 rounded w-2/3" />
          </div>
        </div>
      );
    case 'Receipt':
      return (
        <div className="absolute inset-0 bg-white p-2 flex flex-col items-center">
          <div className="text-[5px] font-bold mb-1">RECEIPT</div>
          <div className="w-full space-y-0.5">
            <div className="h-0.5 bg-slate-200 rounded" />
            <div className="h-0.5 bg-slate-200 rounded" />
            <div className="h-0.5 bg-slate-200 rounded" />
          </div>
          <div className="mt-auto h-2 w-full bg-slate-100" />
        </div>
      );
    case 'Long Receipt':
      return (
        <div className="absolute inset-0 bg-white p-1 flex flex-col items-center overflow-hidden">
          <div className="text-[4px] font-bold mb-0.5">LONG RECEIPT</div>
          <div className="w-full space-y-[1px] flex-1 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-[2px] bg-slate-200 rounded" />
            ))}
          </div>
          <div className="mt-0.5 h-1.5 w-full bg-slate-100 flex items-center justify-center">
            <div className="flex space-x-[0.5px]">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-[1px] h-1 bg-slate-400" />
              ))}
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl mb-1">📄</div>
            <p className="text-[6px] text-slate-400">Document</p>
          </div>
        </div>
      );
  }
}
