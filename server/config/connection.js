const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const DB_URL =
  process.env.MONGO_URL || 'mongodb://localhost:27017/meal-planning-app';

function connectToDatabase() {
  return mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

function fetchImageById(imageId) {
  const conn = mongoose.connection;
  const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
    chunkSizeBytes: 262144,
    bucketName: 'uploads',
  });

  if (!ObjectId.isValid(imageId)) {
    imageId = new ObjectId(imageId);
  }

  return new Promise((resolve, reject) => {
    const chunks = [];
    const readStream = bucket.openDownloadStream(imageId);

    readStream.on('data', (chunk) => {
      chunks.push(chunk);
    });

    readStream.on('end', () => {
      const imageBuffer = Buffer.concat(chunks);
      resolve(imageBuffer);
    });

    readStream.on('error', (error) => {
      reject(error);
    });
  });
}

module.exports = {
  connectToDatabase,
  fetchImageById,
};
