const fs = require('fs');
const path = require('path');

console.log('--- Public Images Folders ---');
const imagesDir = path.join(__dirname, '../public/images');
if (fs.existsSync(imagesDir)) {
  const subdirs = fs.readdirSync(imagesDir);
  for (const sub of subdirs) {
    const full = path.join(imagesDir, sub);
    if (fs.statSync(full).isDirectory()) {
      const files = fs.readdirSync(full);
      console.log(`Folder: ${sub} (${files.length} files)`);
      console.log('   Sample files:', files.slice(0, 5).join(', '));
    } else {
      console.log(`File: ${sub}`);
    }
  }
}

console.log('\n--- Checking user uploaded images details ---');
const uploadedDir = 'C:/Users/hiran/.gemini/antigravity/brain/07cbcddd-e37d-480b-ae34-5fc7b1fef134/.user_uploaded';
if (fs.existsSync(uploadedDir)) {
  const files = fs.readdirSync(uploadedDir).map(f => {
    const stat = fs.statSync(path.join(uploadedDir, f));
    return { name: f, size: stat.size, time: stat.mtime };
  }).sort((a,b) => b.time - a.time);
  console.log(`Total user uploaded files: ${files.length}`);
  console.log('Latest 20 uploaded:');
  files.slice(0, 20).forEach(f => console.log(`  ${f.name} - ${f.time.toISOString()} - ${f.size} bytes`));
}
