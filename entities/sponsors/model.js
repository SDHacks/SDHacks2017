var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var timestamps = require('mongoose-timestamp');
var softDelete = require('mongoose-softdelete');

require('dotenv').config();

var Schema = mongoose.Schema;
var db = mongoose.createConnection(process.env.MONGODB_URI);

var SponsorSchema = new Schema({
  companyName: {
    type: String,
    trim: true,
    required: [true, 'You must have a company name']
  },
  login: {
    username: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, 'You must have a username']
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'You must have a password']
    }
  },
  downloads: [{
    download_id: {
      type: String,
      trim: true,
      required: [true, 'You must have an associated ID']
    },
    url: {
      type: String,
      trim: true,
      required: false
    },
    error: {
      type: Boolean,
      required: false
    }
  }]
});

SponsorSchema.plugin(require('mongoose-sanitizer'));

SponsorSchema.plugin(timestamps);
SponsorSchema.plugin(softDelete);

module.exports = db.model('Sponsor', SponsorSchema);
