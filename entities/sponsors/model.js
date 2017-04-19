import mongoose from 'mongoose';
mongoose.Promise = require('q').Promise;
import timestamps from 'mongoose-timestamp';
import softDelete from 'mongoose-softdelete';

require('dotenv').config();
let { Schema } = mongoose;
let db = mongoose.createConnection(process.env.MONGODB_URI);

let SponsorsSchema = new Schema({
  companyName: {
    type: String,
    trim: true,
    required: [true, "You must have a company name"]
  },
  login: {
    username: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, "You must have a username"]
    },
    password: {
      type: String,
      trim: true,
      required: [true, "You must have a password"]
    }
  },
  downloads: [{
    download_id: {
      type: String,
      trim: true,
      required: [true, "You must have an associated ID"]
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

SponsorsSchema.plugin(require('mongoose-sanitizer'));
SponsorsSchema.plugin(timestamps);
SponsorsSchema.plugin(softDelete);

export default db.model('Sponsor', SponsorsSchema);