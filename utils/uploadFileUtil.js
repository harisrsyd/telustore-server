import multer from "multer";
import path from "path";

const FILE_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValidFileType = FILE_TYPE[file.mimetype]
    let uploadError = new Error('Invalid file type')
    if (isValidFileType) {
      uploadError = null
    }
    cb(uploadError, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    cb(null, uniqueSuffix)
  }
})

export const upload = multer({ storage: storage })