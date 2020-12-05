const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs')

morgan('tiny')

app.set('view engine', 'ejs');

app.get('/',(req,res) => {
	res.render('index', {
		file_1: 'Alicia en el pais de las maravillas',
		file_2: 'En el corazom de las tinieblas'
	});
})

app.get('/download',(req,res) => {
	fs.promises.readdir(path.join(__dirname,'share/'))
	.then(data => {
		const file = path.join(__dirname,'./share/'+data[0])
		res.download(file)
	})
})

app.listen(port, () => {
	console.log(`listening http://localhost:${port}`)
})

