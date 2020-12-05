const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
const path = require('path')

morgan('tiny')

app.get('/',(req,res) => {
	res.sendFile(path.join(__dirname+'/views/index.html'));
})

app.listen(port, () => {
	console.log(`listening http://localhost:${port}`)
})

