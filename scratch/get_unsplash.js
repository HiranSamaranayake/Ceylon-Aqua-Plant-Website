const https = require('https');

function fetchUrl(targetUrl) {
  const urlObj = new URL(targetUrl);
  https.get(urlObj, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  }, (res) => {
    console.log('Status:', res.statusCode, 'for', targetUrl);
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      const next = new URL(res.headers.location, targetUrl).toString();
      console.log('Redirecting to:', next);
      fetchUrl(next);
      return;
    }
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const match = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9_\-]+/g);
      console.log('Matches:', match ? [...new Set(match)] : 'none');
    });
  }).on('error', console.error);
}

fetchUrl('https://unsplash.com/photos/a-lush-green-aquascape-with-dense-aquatic-plants-and-moss-2e7d501f71cf');
