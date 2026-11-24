const http = require('http');

http.get('http://localhost:3000/gallery', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode, 'Length:', body.length);
    const matches = body.match(/role="button"/g);
    console.log('Gallery photo buttons count:', matches ? matches.length : 0);
  });
}).on('error', (e) => console.log('Err:', e.message));
