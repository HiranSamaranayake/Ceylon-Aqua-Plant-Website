const fs = require('fs');
const readline = require('readline');

async function getUserInputs() {
  const rl = readline.createInterface({
    input: fs.createReadStream('C:/Users/hiran/.gemini/antigravity/brain/07cbcddd-e37d-480b-ae34-5fc7b1fef134/.system_generated/logs/transcript_full.jsonl'),
    crlfDelay: Infinity
  });

  const inputs = [];
  for await (const line of rl) {
    try {
      const p = JSON.parse(line);
      if (p.source === 'USER_EXPLICIT' || p.type === 'USER_INPUT') {
        inputs.push(p);
      }
    } catch (e) {}
  }
  console.log('Total user inputs:', inputs.length);
  const last5 = inputs.slice(-5);
  for (const item of last5) {
    console.log(`\n=== STEP ${item.step_index} (${item.created_at}) ===`);
    console.log('Content:\n', item.content);
    if (item.attachments) console.log('Attachments:', item.attachments);
    if (item.files) console.log('Files:', item.files);
    if (item.images) console.log('Images:', item.images);
    const otherKeys = Object.keys(item).filter(k => !['step_index','created_at','content','source','type','status'].includes(k));
    console.log('Other keys:', otherKeys);
    for (const k of otherKeys) console.log(`  ${k}:`, JSON.stringify(item[k]).slice(0, 150));
  }
}
getUserInputs().catch(console.error);
