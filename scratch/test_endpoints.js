const http = require('http');

const endpoints = [
  '/',
  '/about',
  '/aquarium-plants',
  '/aquarium-plants/tissue-culture',
  '/aquarium-plants/garden-pond-plants',
  '/aquarium-plants/plants-bunch',
  '/aquarium-plants/potted-plants',
  '/aquarium-plants/terrarium-plants',
  '/aquarium-plants/other-products',
  '/gallery',
  '/video',
  '/contact',
  '/privacy-policy',
  '/terms-and-conditions',
  '/plants/alternanthera-reineckii-mini',
  '/plants/water-mimosa-neptunia-oleracea',
  '/plants/rotala-rotundifolia',
  '/plants/anubias-barteri-var-nana',
  '/plants/aglaonema-silver-queen-terrarium',
  '/admin/login'
];

function checkEndpoint(path) {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3000' + path, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({ path, status: res.statusCode, length: body.length });
      });
    });
    req.on('error', (err) => {
      resolve({ path, status: 'ERROR', error: err.message });
    });
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({ path, status: 'TIMEOUT' });
    });
  });
}

async function run() {
  console.log('Testing ' + endpoints.length + ' endpoints against http://localhost:3000 ...');
  let failures = 0;
  for (const ep of endpoints) {
    const res = await checkEndpoint(ep);
    if (res.status === 200) {
      console.log(`[PASS] ${res.path} -> ${res.status} (${res.length} bytes)`);
    } else {
      console.log(`[FAIL] ${res.path} -> ${res.status} ${res.error || ''}`);
      failures++;
    }
  }
  console.log(`\nCompleted with ${failures} failure(s).`);
  process.exit(failures > 0 ? 1 : 0);
}

run();
