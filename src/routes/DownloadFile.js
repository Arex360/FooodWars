const express = require('express')
const fileData = require('./files/file_list.json')
const path = require('path')
const router = express.Router()
router.get('/download/:md5', (req, res) => {
    const md5 = req.params.md5;
  
    // Find the file with the matching MD5 hash in the JSON
    const fileInfo = fileData.find((file) => file.md5 === md5);
  
    if (fileInfo) {
      const filePath = __dirname + "/files/game/"+ fileInfo.path // Update with your file directory
      res.download(filePath); // Initiate the file download
    } else {
      res.status(404).send('File not found');
    }
  });
  module.exports = router