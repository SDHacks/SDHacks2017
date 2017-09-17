var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var timestamps = require('mongoose-timestamp');
var mongooseDelete = require('mongoose-delete');

require('dotenv').config();

var Schema = mongoose.Schema;
var db = mongoose.createConnection(process.env.MONGODB_URI);

var DownloadSchema = new Schema({
  // Declares how many files were included in the download
  fileCount: {
    type: Number,
    required: [true, 'You must specify how many files are being downloaded']
  },
  // Declares which administrator called for the download
  adminId: {
    type: String,
    required: [true,
      'You must specify which administrator started the download']
  },
  // The URL where the download can be accessed
  accessUrl: {
    type: String
  },
  // Declares whether an error occurred with the download
  error: {
    type: Boolean,
    default: false
  },
  // Declares whether the download has been fulfilled
  fulfilled: {
    type: Boolean,
    default: false,
    required: [true, 'You must specify whether the download has been fulfilled']
  }
});

DownloadSchema.plugin(findOrCreate);
DownloadSchema.plugin(timestamps);
DownloadSchema.plugin(mongooseDelete);

module.exports = db.model('Download', DownloadSchema);
