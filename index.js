const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs')

morgan('tiny')

app.set('view engine', 'ejs');


app.get('/', (req,res) => {
	res.status(200).render('language', {})
})

app.get('/home/:lang',(req,res) => {
	const lang = req.params.lang
	let content;
	switch (lang) {
		case 'es' :
			content = {
				title: "Biblioteca - Termux",
				col1: "Nombre del archivo",
				col2: "Descarga"
			}
			break;
		case 'en' :
			content = {
				title: "Library - Termux",
				col1: "File name",
				col2: "Download"
			}
			break;
	}

	fs.promises.readdir(path.join(__dirname,'share/'))
		.then(data => {
			const files = []	
			data.forEach(fileName => {
				files.push({
					name: fileName,
					link: "/download/" + data.indexOf(fileName)
				})
			})
			res.status(200).render('index', { files, content })
		}).catch(err => {
			res.status(404).send(err)
		})
});


app.get('/download/:num',(req,res) => {
	const num = req.params.num	
	fs.promises.readdir(path.join(__dirname,'share/'))
	.then(data => {
		const file = path.join(__dirname,'./share/'+data[num])
		res.status(200).download(file)
	}).catch(err => {
		res.status(404).send(err)
	})
})

app.listen(port, () => {
	console.log(`listening http://localhost:${port}`)
})

