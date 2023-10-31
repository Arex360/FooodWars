const express = require('express')
const fs = require('fs')
const router = express.Router()
router.get('/Folders',(req,res)=>{
    res.sendFile(__dirname+"/"+'files/folders.txt')
})
module.exports = router