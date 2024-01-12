const ExcelJS = require('exceljs');

// Sample data with $4.00 values
const data = [
  { amount: 4 },
  { amount: 4 },
  { amount: 4 },
  // Add more data as needed
];

// Create a new workbook and worksheet
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Sheet1');

// Add data to the worksheet
worksheet.columns = [
  { header: 'Amount', key: 'amount', width: 60 }
];

worksheet.addRows(data);

// Format the 'Amount' column as currency
const amountColumn = worksheet.getColumn('amount');
amountColumn.numFmt = '"$"#,##0.00_);("$"#,##';
amountColumn.eachCell({ includeEmpty: true }, (cell) => {
  if (cell.value && typeof cell.value === 'number') {
    cell.value = Number(cell.value.toFixed(2));
    cell.numFmt = '"$"#,##0.00_);("$"#,##';
  }
});

// Save the workbook
workbook.xlsx.writeFile('output.xlsx')
  .then(() => {
    console.log('Excel file generated successfully!');
  })
  .catch((err) => {
    console.error('Error generating Excel file:', err);
  });