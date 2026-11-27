const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function getHash(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(buf).digest('hex');
  } catch (e) {
    return null;
  }
}

const userUploadedDir = 'C:/Users/hiran/.gemini/antigravity/brain/07cbcddd-e37d-480b-ae34-5fc7b1fef134/.user_uploaded';
const files = fs.readdirSync(userUploadedDir).map(f => {
  const p = path.join(userUploadedDir, f);
  return { name: f, path: p, hash: getHash(p), time: fs.statSync(p).mtime };
}).sort((a,b) => b.time - a.time);

console.log('Total uploaded in .user_uploaded:', files.length);

const pottedDir = path.join(__dirname, '../public/images/potted-plants');
const pottedFiles = fs.readdirSync(pottedDir).map(f => {
  const p = path.join(pottedDir, f);
  return { name: f, path: p, hash: getHash(p) };
});

console.log('\nPotted plants in public/images/potted-plants:');
for (const pf of pottedFiles) {
  const match = files.find(u => u.hash === pf.hash);
  console.log(`  ${pf.name} -> matches uploaded: ${match ? match.name : 'no'}`);
}
