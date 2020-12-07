const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs')
var os = require( 'os' );
var opn = require('opn');

var networkInterfaces = os.networkInterfaces();
let myIP;
for ( let net in networkInterfaces ) {
	if (typeof networkInterfaces[net] !== 'object' ) return;
	for (let data  in networkInterfaces[net]) {
		if (networkInterfaces[net][data].family === 'IPv4') {
			if (myIP === undefined) myIP = networkInterfaces[net][data].address;
		}
	}
}

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
				share: "Compartir IP por Whatsapp",
				col1: "Nombre del archivo",
				col2: "Descarga"
			}
			break;
		case 'en' :
			content = {
				title: "Library - Termux",
				share: "Share IP with Whatsapp",
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
			res.status(200).render('index', { files, content, myIP })
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

app.set('trust proxy',true); 

app.get("/ip", (req, res)=>{
   	res.status(200).send(req.ip); 
}); 

app.listen(port, () => {
	console.log(`Opening your Library at http://${myIP}:${port}`)
	opn(`http://${myIP}:${port}`);
})

