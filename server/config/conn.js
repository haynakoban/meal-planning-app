const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const DB_URL = 'mongodb://localhost:27017/meal-planning-app';

// Connect to MongoDB
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;

// initialize gridfs
let gfs;

conn.once('open', () => {
  // init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// create storage
const storage = new GridFsStorage({
  url: DB_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads',
      };

      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

const delete_file = (req, res, next) => {
  try {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });
    gridfsBucket.delete(ObjectId(req.params.id));

    return res.json({ msg: 'success' });
  } catch (error) {
    next(error);
  }
};

module.exports = { upload, delete_file };
