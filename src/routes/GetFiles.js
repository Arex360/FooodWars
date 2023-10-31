const express = require('express')
const files = require('./files/file_list.json')
const router = express.Router()
router.get('/files',(req,res)=>{
    res.send(files)
})
module.exports = router