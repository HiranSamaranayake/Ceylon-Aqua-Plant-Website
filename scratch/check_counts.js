const fs = require('fs');
const content = fs.readFileSync('src/lib/data-service.ts', 'utf8');

// Count plants per category
const catMatch = content.match(/const initialCategories: PlantCategory\[\] = (\[[\s\S]*?\]);/);
const plantMatch = content.match(/const initialPlants: Plant\[\] = (\[[\s\S]*?\]);/);

if (catMatch && plantMatch) {
  const categories = eval(catMatch[1]);
  const plants = eval(plantMatch[1]);
  console.log('Categories count:', categories.length);
  console.log('Total plants:', plants.length);
  categories.forEach(c => {
    const count = plants.filter(p => p.category_id === c.id).length;
    console.log(`- ${c.name} (${c.slug}): ${count} plants, image: ${c.image_url}`);
  });
}
