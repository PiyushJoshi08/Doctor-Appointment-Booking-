import multer from "multer";
//multer used for?
const storage=multer.diskStorage({ //config for diskstorage
    filename: function(req,file,callback){
        callback(null,file.originalname)
    }
})


const upload=multer({storage}); //we create instance of multer using diskstorage


export default upload;

