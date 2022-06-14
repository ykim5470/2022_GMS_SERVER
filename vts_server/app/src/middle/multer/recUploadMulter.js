const multer = require('multer')
const path = require('path')


const resourcesDir = path.join(
  __dirname, '../uploads/GUIDE/streaming/rec/resources'
)

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
     callback(null, resourcesDir)
  },
  filename: (req, file, callback) => {
    callback(
      null,
      req.params.sid +'_'+ Date.now() + '.' + file.mimetype.split('/')[1],
    )

  },
})

var upload = multer({storage: storage})
var recordResources = upload.fields([{name: 'thumbnail'}, {name: 'media'}])
module.exports = recordResources