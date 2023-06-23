const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()
const {mergdpdfs}=require('./merge')
const upload=multer({dest:"uploads/"}) 


app.use('/static',express.static('Public'))

const port = 3000

app.get('/', (req, res) => {  
  
  res.sendFile(path.join(__dirname,'../Templates/index.html'))
  // app.use(express.static("Templates"))
  // res.sendFile(path.join(__dirname,'../Templates/index.css'))
})
app.post('/merge',upload.array('pdfs',2),async(req,res,next)=>{
  console.log(req.files)
 let d= await mergdpdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
  res.redirect(`http://localhost:3000/static/${d}.pdf`)
  // res.send({data:req.files})
})
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})