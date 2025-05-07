import AWS from 'aws-sdk';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Setup
const fileSchema = new mongoose.Schema({
  projectId: String,
  filename: String,
  r2Url: String,
  uploadedAt: { type: Date, default: Date.now }
});
const File = mongoose.model('File', fileSchema);

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI);

// R2 Setup
const s3 = new AWS.S3({
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  endpoint: process.env.R2_ENDPOINT,
  signatureVersion: 'v4',
  region: 'auto'
});

// Upload Function
async function uploadFile(localFilePath, projectId) {
  const fileContent = fs.readFileSync(localFilePath);
  const filename = path.basename(localFilePath);

  const uploadParams = {
    Bucket: process.env.R2_BUCKET_NAME,
    Key: `${projectId}/${filename}`,
    Body: fileContent
  };

  const result = await s3.upload(uploadParams).promise();

  const fileDoc = await File.create({
    projectId,
    filename,
    r2Url: result.Location
  });

  console.log('Uploaded and saved:', fileDoc);
}

// Example usage:
await uploadFile('./example-files/index.js', 'my-project-id');
process.exit();
