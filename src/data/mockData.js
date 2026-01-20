// Mock email addresses for login
export const mockEmails = [
  'john.doe@company.com',
  'jane.smith@company.com',
  'alex.wong@company.com',
  'sarah.johnson@company.com',
  'mike.chen@company.com',
];

// Document type options
export const documentTypes = [
  'Passport',
  'Identity Card',
  'Driver\'s License',
  'Birth Certificate',
  'Tax Document',
  'Bank Statement',
  'Invoice',
  'Receipt',
  'Utility Bill',
  'Medical Record',
];

// Data type options for custom document fields
export const dataTypes = [
  'Auto Detect',
  'String',
  'Number',
  'Date',
  'Boolean',
  'Currency',
  'Email',
  'Phone',
  'Address',
  'Percentage',
];

// Generate mock passport data
const generatePassportData = (index) => ({
  documentNumber: `P${10000000 + index}`,
  givenNames: ['John Michael', 'Jane Elizabeth', 'Alex Wei', 'Sarah Marie', 'Michael James', 'Emma Grace', 'David Lee', 'Lisa Ann', 'Robert Chen', 'Maria Santos'][index % 10],
  surname: ['Doe', 'Smith', 'Wong', 'Johnson', 'Chen', 'Williams', 'Lee', 'Taylor', 'Wang', 'Garcia'][index % 10],
  dateOfBirth: `${1980 + (index % 20)}-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}`,
  placeOfBirth: ['New York, USA', 'London, UK', 'Singapore', 'Sydney, Australia', 'Toronto, Canada'][index % 5],
  dateOfIssue: '2020-03-20',
  dateOfExpiry: '2030-03-20',
  nationality: ['United States of America', 'United Kingdom', 'Singapore', 'Australia', 'Canada'][index % 5],
  sex: index % 2 === 0 ? 'M' : 'F',
});

// Generate mock ID card data
const generateIdCardData = (index) => ({
  idNumber: `S${1000000 + index}${String.fromCharCode(65 + (index % 26))}`,
  fullName: ['Jane Smith', 'John Doe', 'Alex Wong', 'Sarah Johnson', 'Mike Chen', 'Emma Williams', 'David Lee', 'Lisa Taylor', 'Robert Wang', 'Maria Garcia', 'James Brown', 'Jennifer Davis', 'William Miller', 'Patricia Wilson', 'Richard Moore'][index % 15],
  dateOfBirth: `${1985 + (index % 15)}-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}`,
  address: `${100 + index} Main Street, Unit ${String(index).padStart(2, '0')}-${String((index % 20) + 1).padStart(2, '0')}, Singapore ${100000 + index}`,
  dateOfIssue: '2019-07-10',
  dateOfExpiry: '2029-07-10',
  sex: index % 2 === 0 ? 'F' : 'M',
});

// Generate mock tax document data
const generateTaxDocumentData = (index) => ({
  taxYear: '2023',
  taxpayerName: ['Michael Johnson', 'Emily Davis', 'Christopher Brown', 'Amanda Wilson', 'Matthew Taylor', 'Jessica Anderson'][index % 6],
  ssn: `***-**-${5000 + index}`,
  filingStatus: ['Single', 'Married Filing Jointly', 'Head of Household'][index % 3],
  totalIncome: `$${(75000 + index * 5000).toLocaleString()}`,
  taxableIncome: `$${(62000 + index * 4000).toLocaleString()}`,
  totalTax: `$${(11000 + index * 800).toLocaleString()}`,
  refundAmount: `$${(1000 + index * 100).toLocaleString()}`,
});

// Generate mock receipt data (custom data structure)
const generateReceiptData = (index) => ({
  receiptNumber: `RCP-2024-${String(index + 1).padStart(4, '0')}`,
  merchantName: ['Best Electronics', 'Office Supplies Co', 'Tech World', 'Grocery Mart', 'Fashion Hub', 'Home Depot', 'Staples', 'Target', 'Walmart', 'Costco', 'Amazon Fresh', 'Whole Foods'][index % 12],
  totalAmount: `$${(50 + index * 35).toFixed(2)}`,
  receiptDate: `2024-01-${String((index % 28) + 1).padStart(2, '0')}`,
  paymentMethod: ['Credit Card', 'Debit Card', 'Cash', 'Mobile Pay'][index % 4],
});

// Generate long receipt data with many line items
const generateLongReceiptData = (index) => {
  const merchants = ['Costco Wholesale', 'Trader Joe\'s', 'Whole Foods Market', 'Sam\'s Club', 'BJ\'s Wholesale'];
  const itemCategories = [
    { name: 'Organic Bananas 2lb', price: 2.99 },
    { name: 'Whole Milk Gallon', price: 4.49 },
    { name: 'Sourdough Bread', price: 5.99 },
    { name: 'Free Range Eggs Dz', price: 6.99 },
    { name: 'Avocado Hass 4pk', price: 5.49 },
    { name: 'Greek Yogurt 32oz', price: 7.99 },
    { name: 'Chicken Breast 3lb', price: 14.99 },
    { name: 'Atlantic Salmon 1lb', price: 12.99 },
    { name: 'Broccoli Crowns 2lb', price: 4.99 },
    { name: 'Baby Spinach 16oz', price: 5.49 },
    { name: 'Almond Butter 16oz', price: 9.99 },
    { name: 'Olive Oil Extra Vir', price: 11.99 },
    { name: 'Quinoa Organic 2lb', price: 8.99 },
    { name: 'Brown Rice 5lb', price: 6.99 },
    { name: 'Pasta Penne 16oz', price: 2.49 },
    { name: 'Marinara Sauce 24oz', price: 4.99 },
    { name: 'Cheddar Cheese 1lb', price: 7.49 },
    { name: 'Mozzarella Fresh', price: 6.99 },
    { name: 'Orange Juice 64oz', price: 5.99 },
    { name: 'Sparkling Water 12pk', price: 6.99 },
    { name: 'Coffee Beans 2lb', price: 14.99 },
    { name: 'Green Tea 100ct', price: 8.99 },
    { name: 'Honey Raw 16oz', price: 9.99 },
    { name: 'Maple Syrup 12oz', price: 11.99 },
    { name: 'Peanut Butter 28oz', price: 6.99 },
    { name: 'Strawberries 2lb', price: 7.99 },
    { name: 'Blueberries 18oz', price: 8.49 },
    { name: 'Apple Gala 3lb', price: 5.99 },
    { name: 'Lemon Organic 2lb', price: 4.49 },
    { name: 'Garlic Head 3pk', price: 2.99 },
    { name: 'Onion Yellow 3lb', price: 3.49 },
    { name: 'Potato Russet 5lb', price: 4.99 },
    { name: 'Carrots Baby 2lb', price: 3.99 },
    { name: 'Celery Bunch', price: 2.99 },
    { name: 'Tomatoes Roma 2lb', price: 4.49 },
    { name: 'Cucumber English', price: 1.99 },
    { name: 'Bell Pepper Red', price: 2.49 },
    { name: 'Mushroom Cremini', price: 4.99 },
    { name: 'Zucchini Green 2lb', price: 3.99 },
    { name: 'Ground Beef 2lb', price: 12.99 },
  ];

  // Generate between 15-35 items per receipt based on index
  const itemCount = 15 + (index % 21);
  const items = [];
  let subtotal = 0;

  for (let i = 0; i < itemCount; i++) {
    const item = itemCategories[(index + i) % itemCategories.length];
    const qty = 1 + (i % 3);
    const lineTotal = item.price * qty;
    subtotal += lineTotal;
    items.push({
      name: item.name,
      qty,
      price: item.price,
      total: lineTotal,
    });
  }

  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  return {
    receiptNumber: `LR-2024-${String(index + 1).padStart(4, '0')}`,
    merchantName: merchants[index % merchants.length],
    merchantAddress: ['123 Market St', '456 Commerce Blvd', '789 Shopping Way', '321 Retail Ave', '654 Bulk Rd'][index % 5],
    merchantPhone: ['(555) 123-4567', '(555) 234-5678', '(555) 345-6789', '(555) 456-7890', '(555) 567-8901'][index % 5],
    receiptDate: `2024-01-${String((index % 28) + 1).padStart(2, '0')}`,
    receiptTime: `${String(9 + (index % 10)).padStart(2, '0')}:${String((index * 7) % 60).padStart(2, '0')} AM`,
    items,
    subtotal: subtotal.toFixed(2),
    taxRate: '8.25%',
    taxAmount: tax.toFixed(2),
    totalAmount: `$${total.toFixed(2)}`,
    paymentMethod: ['Visa ****1234', 'Mastercard ****5678', 'Amex ****9012', 'Discover ****3456', 'Debit ****7890'][index % 5],
    cashier: ['John D.', 'Sarah M.', 'Mike T.', 'Lisa K.', 'David W.'][index % 5],
    transactionId: `TXN${Date.now() + index}`,
  };
};

// Generate mock invoice data (custom prompt response)
const generateInvoicePromptResponse = (index) => {
  const invoiceNum = `INV-2024-${String(index + 1).padStart(3, '0')}`;
  const companies = ['ABC Corporation', 'XYZ Industries', 'Global Tech Solutions', 'Premier Services Inc', 'Innovative Systems LLC', 'Acme Corp', 'Delta Solutions', 'Omega Enterprises'];
  const company = companies[index % companies.length];
  const amount = (800 + index * 150).toFixed(2);
  const day = String((index % 28) + 1).padStart(2, '0');

  return `This invoice numbered ${invoiceNum} from ${company} shows a total amount of $${amount} dated January ${day}, 2024. The invoice includes line items for consulting services ($${(parseFloat(amount) * 0.65).toFixed(2)}) and software licensing ($${(parseFloat(amount) * 0.35).toFixed(2)}). Payment is due by February ${day}, 2024 with payment terms of Net 30 days.`;
};

// Generate documents for a batch
const generateDocuments = (batchType, documentType, count, processingCount = 0) => {
  const documents = [];

  for (let i = 0; i < count; i++) {
    // First document (index 0) is always completed, processing starts from index 1
    const isProcessing = i > 0 && i <= processingCount;
    let extractedData = null;
    let filename = '';

    if (!isProcessing) {
      switch (documentType) {
        case 'Passport':
          extractedData = generatePassportData(i);
          filename = `passport_${extractedData.surname.toLowerCase()}_${extractedData.givenNames.split(' ')[0].toLowerCase()}.pdf`;
          break;
        case 'Identity Card':
          extractedData = generateIdCardData(i);
          filename = `id_card_${extractedData.fullName.toLowerCase().replace(' ', '_')}.jpg`;
          break;
        case 'Tax Document':
          extractedData = generateTaxDocumentData(i);
          filename = `tax_return_2023_${extractedData.taxpayerName.toLowerCase().replace(' ', '_')}.pdf`;
          break;
        case 'Receipt':
          extractedData = generateReceiptData(i);
          filename = `receipt_${extractedData.merchantName.toLowerCase().replace(/\s+/g, '_')}_${extractedData.receiptDate.replace(/-/g, '')}.jpg`;
          break;
        case 'Long Receipt':
          extractedData = generateLongReceiptData(i);
          filename = `long_receipt_${extractedData.merchantName.toLowerCase().replace(/\s+/g, '_')}_${extractedData.receiptDate.replace(/-/g, '')}.jpg`;
          break;
        case 'Invoice':
          extractedData = generateInvoicePromptResponse(i);
          filename = `invoice_${String(i + 1).padStart(3, '0')}_jan2024.pdf`;
          break;
        default:
          extractedData = { note: 'Sample extracted data' };
          filename = `document_${i + 1}.pdf`;
      }
    } else {
      filename = `${documentType.toLowerCase().replace(/\s+/g, '_')}_${String(i + 1).padStart(3, '0')}.pdf`;
    }

    documents.push({
      id: `doc-${Date.now()}-${i}`,
      filename,
      fileType: filename.endsWith('.pdf') ? 'pdf' : 'jpg',
      fileSize: Math.floor(Math.random() * 5000000) + 500000,
      status: isProcessing ? 'processing' : 'completed',
      uploadDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      processedDate: isProcessing ? null : new Date(),
      extractedData,
      documentType,
    });
  }

  return documents;
};

// Initial mock batches
export const initialBatches = [
  {
    id: 'batch-1',
    name: 'International Travel Documents',
    type: 'pretrained',
    documentType: 'Passport',
    model: 'flagship',
    documents: generateDocuments('pretrained', 'Passport', 10, 0),
    modifiedDate: new Date(),
    createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'batch-2',
    name: 'Q1 2024 Invoices',
    type: 'custom',
    documentType: 'Invoice',
    processingMethod: 'prompt',
    customPrompt: 'Extract the following information from each invoice: Invoice number, Vendor name, Total amount, Due date, Line items with descriptions and amounts.',
    model: 'local',
    documents: generateDocuments('custom', 'Invoice', 8, 3),
    modifiedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'batch-3',
    name: 'Employee Verification',
    type: 'pretrained',
    documentType: 'Identity Card',
    model: 'flagship',
    documents: generateDocuments('pretrained', 'Identity Card', 15, 0),
    modifiedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    createdDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'batch-4',
    name: '2023 Tax Returns',
    type: 'pretrained',
    documentType: 'Tax Document',
    model: 'flagship',
    documents: generateDocuments('pretrained', 'Tax Document', 6, 0),
    modifiedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    createdDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'batch-5',
    name: 'Expense Receipts',
    type: 'custom',
    documentType: 'Receipt',
    processingMethod: 'structure',
    customFields: [
      { name: 'Receipt Number', type: 'String' },
      { name: 'Merchant Name', type: 'String' },
      { name: 'Total Amount', type: 'Currency' },
      { name: 'Receipt Date', type: 'Date' },
      { name: 'Payment Method', type: 'String' },
    ],
    model: 'local',
    documents: generateDocuments('custom', 'Receipt', 12, 2),
    modifiedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'batch-6',
    name: 'Long Receipts',
    type: 'custom',
    documentType: 'Long Receipt',
    processingMethod: 'structure',
    customFields: [
      { name: 'Receipt Number', type: 'String' },
      { name: 'Merchant Name', type: 'String' },
      { name: 'Merchant Address', type: 'String' },
      { name: 'Receipt Date', type: 'Date' },
      { name: 'Receipt Time', type: 'String' },
      { name: 'Items', type: 'String' },
      { name: 'Subtotal', type: 'Currency' },
      { name: 'Tax Rate', type: 'Percentage' },
      { name: 'Tax Amount', type: 'Currency' },
      { name: 'Total Amount', type: 'Currency' },
      { name: 'Payment Method', type: 'String' },
      { name: 'Cashier', type: 'String' },
      { name: 'Transaction ID', type: 'String' },
    ],
    model: 'flagship',
    documents: generateDocuments('custom', 'Long Receipt', 8, 0),
    modifiedDate: new Date(),
    createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];

// Helper to get batch stats
export const getBatchStats = (batch) => {
  const total = batch.documents.length;
  const processing = batch.documents.filter(d => d.status === 'processing').length;
  const completed = batch.documents.filter(d => d.status === 'completed').length;
  return { total, processing, completed };
};
