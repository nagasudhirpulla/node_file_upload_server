var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');
var fs = require('fs');
var copyFile = require('fs-copy-file');

// configure multer diskStorage
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

// listen to the post request and also use the multer middleware to get the uploaded file info
router.post('/upload', upload.single('file'), (req, res, next) => {
    // copy the uploaded file to the desired destination which is supplied in the request body by dest field
    copyFile(req.file.path, req.body.dest + '\\' + req.file.originalname, err => {
        if (err) {
            console.error(err);
            return res.json({ 'message': 'upload failed', 'error': err });
        }
        res.json({ 'message': 'File uploaded successfully', 'error': err });
    });
});

// for testing purpose
router.get('/', (req, res, next) => {
    return res.json({ 'message': 'Working!'});
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.listen(3002, () => console.log('File upload app listening on port 3002!'))