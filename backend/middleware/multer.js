import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads/') // save temporarily in /uploads folder
  },
    filename: function(req,file,callback){
        callback(null,Date.now() + "-"+file.originalname)
    }
})

const upload =multer({storage})

export default upload