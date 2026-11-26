const http = require('http');

function checkPage(urlPath, expectedStrings) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000' + urlPath, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`Testing ${urlPath} (Status: ${res.statusCode})`);
        for (const str of expectedStrings) {
          const found = body.includes(str);
          console.log(`  Includes "${str}": ${found ? 'PASS' : 'FAIL'}`);
        }
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  const expected = [
    'No: 36/24, Sampath Pedesa, Lionel Jayasinghe Mawatha, Godagama, Homagama, Colombo , Srilanka',
    '+94 77 704 2100'
  ];

  await checkPage('/', expected);
  await checkPage('/contact', expected);
  await checkPage('/privacy-policy', expected);
  console.log('Verification completed successfully!');
}

run();
