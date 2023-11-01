const express = require('express')
const cors = require('cors')
const timeout = require('connect-timeout');
const { GetFolders, GetFiles, DownloadFiles } = require('./routes/routes')
const app = express()
app.use(cors())
app.use(timeout('900s'));
app.use(GetFolders)
app.use(GetFiles)
app.use(DownloadFiles)
app.get('/',(req,res)=>console.log('welcome'))
app.listen(2200,()=>{
    console.log("server started")
})