const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'documents');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Minimal valid single-page PDF binary
function createMinimalPdf(title) {
  const content = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 120 >>
stream
BT
/F1 18 Tf
50 720 Td
(Ceylon Aquatic Plants - ${title}) Tj
/F1 12 Tf
0 -30 Td
(Official Documentation - Colombo, Sri Lanka) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000323 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
495
%%EOF
`;
  return content;
}

const files = [
  { name: 'ceylon-aquatic-plants-catalog-2026.pdf', title: 'Product Catalogue 2026' },
  { name: 'aquatic-plant-care-guide.pdf', title: 'Plant Care Guidelines' },
  { name: 'sample.pdf', title: 'Sample Documentation' },
];

files.forEach(f => {
  const p = path.join(dir, f.name);
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, createMinimalPdf(f.title));
    console.log('Created:', f.name);
  }
});
