import Papa from 'papaparse';
import * as XLSX from 'xlsx';

// Flatten extracted data for export
const flattenData = (documents) => {
  return documents
    .filter(doc => doc.status === 'completed' && doc.extractedData)
    .map(doc => {
      const data = doc.extractedData;

      // Handle string responses (custom prompt)
      if (typeof data === 'string') {
        return {
          filename: doc.filename,
          response: data,
        };
      }

      // Handle object responses (structured data)
      return {
        filename: doc.filename,
        ...data,
      };
    });
};

export const exportToCSV = (batch) => {
  const data = flattenData(batch.documents);

  if (data.length === 0) {
    alert('No completed documents to export');
    return;
  }

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${batch.name.replace(/\s+/g, '_')}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToExcel = (batch) => {
  const data = flattenData(batch.documents);

  if (data.length === 0) {
    alert('No completed documents to export');
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Documents');

  XLSX.writeFile(workbook, `${batch.name.replace(/\s+/g, '_')}.xlsx`);
};

export const exportSingleDocument = (doc, batchName) => {
  if (!doc.extractedData) {
    alert('No data to export');
    return;
  }

  const data = typeof doc.extractedData === 'string'
    ? [{ filename: doc.filename, response: doc.extractedData }]
    : [{ filename: doc.filename, ...doc.extractedData }];

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${batchName}_${doc.filename.split('.')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
