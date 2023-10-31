const fs = require('fs');
const path = require('path');

function listDirectories(rootFolder, currentFolder, depth, outputPath) {
  const folderPath = path.join(rootFolder, currentFolder);
  const items = fs.readdirSync(folderPath);

  for (const item of items) {
    const itemPath = path.join(folderPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      // Print the directory name with local path
      const relativePath = path.relative(rootFolder, itemPath);
      const dirInfo = `${''.repeat(depth)}${relativePath}`;
      fs.appendFileSync(outputPath, dirInfo + '\n');

      // Recursively list subdirectories
      listDirectories(rootFolder, path.join(currentFolder, item), depth + 1, outputPath);
    }
  }
}

function main() {
  const rootFolder = "../game";
  if (!rootFolder) {
    console.log('Usage: node listDirectories.js <rootFolder>');
    return;
  }

  const outputPath = 'directory_list.txt';

  // Initialize the output file
  fs.writeFileSync(outputPath, '');

  listDirectories(rootFolder, '', 0, outputPath);

  console.log(`Directory list saved to ${outputPath}`);
}

main();
