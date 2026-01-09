const multer = require('multer');
const path = require("path"); //also a node package
const crypto = require("crypto");   //its a node js package you can use it without installing it

 
// crypto.randomBytes(12, function(err, bytes)  {     //making some random names with crypto(and this 12 is number of bytes)
//             console.log(bytes);    //bytes are in hexadecimal format so we can convert it
//             console.log(bytes.toString("hex"));  //now this byte is converted to hexadecimal string
//           })



//diskstorge steup
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/uploads')    //its the folder where file uploads
    },

    //now we will give a unique name to our file
    filename: function(req, file, cb){ 
        crypto.randomBytes(12, function(err, bytes){     //making some random names with crypto
            console.log(bytes);    //bytes are in hexadecimal format so we can convert it
            console.log(bytes.toString("hex"));  //now this byte is converted to hexadecimal string
            const fn = bytes.toString("hex") + path.extname(file.originalname)
            //the file in the perameter contains all the info about the file, so here we are extracting the files exstention from there.(this extname gets the extension from the original name)
            cb(null, fn)           //cb function helps to set filename  
            //the first perameter in cb is error and second is the name of the file
          })
        
    }
})
//upload variable
const upload = multer({ storage: storage})

//export upload variable
module.exports = upload;

