const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());

app.post('/upload', function(req, res) {
	if (req.body != null) {
    	console.log(req.body);
        return res.status(200).send('{"status":"ok"}');
    }
    if (req.files != null) {
        if (Object.keys(req.files).length == 0) {
            return res.status(400).send('No files were uploaded.');
        }
        let sampleFile = req.files.file;
	    var filename = sampleFile.name;

		result = new Promise((resolve, reject) => {
	        sampleFile.mv('./dist/static/' + filename, function (err) {
	          if (err) reject(err);
			  else resolve();
		    });
	      });
	    }
	    result
	      .then(() => res.send('{"status":"ok"}'))
	      .catch((err) => res.status(500).send(err));

});

app.use(express.static('dist/create'));
app.use(express.static('dist'));


app.get('/', function (req, res) {
    res.send('index.html');
});

app.listen(3002, function () {
    console.log('Example app listening on port 3000!');
});



