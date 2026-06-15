const fs = require('fs');
const path = require('path');

const TARGET_DIRS = [
  path.join(__dirname, '../Frontend/src'),
  path.join(__dirname, '../Admin-panel/src')
];

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, callback);
    } else if (stat.isFile() && (file.endsWith('.js') || file.endsWith('.jsx'))) {
      callback(fullPath);
    }
  }
}

let modifiedCount = 0;

TARGET_DIRS.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`);
    return;
  }

  console.log(`Scanning directory: ${dir}`);
  walkDir(dir, (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // 1. Replace exact quotes: "https://api.sdtour.online" or 'https://api.sdtour.online'
    content = content.replace(/"https:\/\/api\.sdtour\.online"/g, 'window.API_BASE_URL');
    content = content.replace(/'https:\/\/api\.sdtour\.online'/g, 'window.API_BASE_URL');

    // 2. Replace URL prefixes: "https://api.sdtour.online/..."
    content = content.replace(/"https:\/\/api\.sdtour\.online(\/[^"]*)"/g, 'window.API_BASE_URL + "$1"');
    content = content.replace(/'https:\/\/api\.sdtour\.online(\/[^']*)"/g, "window.API_BASE_URL + '$1'");
    content = content.replace(/'https:\/\/api\.sdtour\.online(\/[^']*)'/g, "window.API_BASE_URL + '$1'");

    // 3. Replace template literals: inside backticks, we replace the raw URL with ${window.API_BASE_URL}
    // Note: only replace if not already replaced by previous rules
    content = content.replace(/https:\/\/api\.sdtour\.online/g, '${window.API_BASE_URL}');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Modified: ${filePath}`);
      modifiedCount++;
    }
  });
});

console.log(`\nFinished! Modified ${modifiedCount} files.`);
