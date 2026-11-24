const fs = require('fs');
const content = fs.readFileSync('src/lib/data-service.ts', 'utf8');
const lines = content.split('\n');
lines.forEach(l => {
  if (l.includes('slug: "') && (l.includes('rotala') || l.includes('anubias'))) {
    console.log(l.trim());
  }
});
