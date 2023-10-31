const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function calculateMD5(filePath) {
  const data = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5');
  hash.update(data);
  return hash.digest('hex');
}

function listFiles(rootFolder, currentFolder, depth, maxDepth, outputPath) {
  const folderPath = path.join(rootFolder, currentFolder);
  const items = fs.readdirSync(folderPath);

  for (const item of items) {
    const itemPath = path.join(folderPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory() && depth < maxDepth) {
      // Recursively list files in subdirectories
      listFiles(rootFolder, path.join(currentFolder, item), depth + 1, maxDepth, outputPath);
    } else if (stats.isFile()) {
      // Calculate MD5 hash for files
      const relativePath = path.relative(rootFolder, itemPath);
      const md5 = calculateMD5(itemPath);
      const fileInfo = { path: relativePath, md5 };
      outputPath.push(fileInfo);
    }
  }
}

function main() {
  const rootFolder = "../game"
  const maxDepth =  Infinity;
  if (!rootFolder) {
    console.log('Usage: node listFiles.js <rootFolder> [maxDepth]');
    return;
  }

  const outputFile = 'file_list.json';
  const outputData = [];

  listFiles(rootFolder, '', 0, maxDepth, outputData);

  fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2));
  console.log(`File list with MD5 hashes saved to ${outputFile}`);
  console.log(`JSON array length: ${outputData.length}`);
}

main();
