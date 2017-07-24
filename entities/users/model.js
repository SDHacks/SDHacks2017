var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var timestamps = require('mongoose-timestamp');
var crate = require('mongoose-crate');
var S3 = require('mongoose-crate-s3');
var jwt = require('jsonwebtoken');
var softDelete = require('mongoose-softdelete');
var bcrypt = require('bcrypt-nodejs');

require('dotenv').config();

var Schema = mongoose.Schema;
var db = mongoose.createConnection(process.env.MONGODB_URI);

var UserSchema = new Schema({
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
  },
  firstName: {
    type: String,
    trim: true,
    required: [true, 'You must have a first name']
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'You must have a last name']
  },
  birthdate: {
    type: Date,
    required: [true, 'You must have a birthdate']
  },
  gender: {
    type: String,
    required: [true, 'You must have a gender']
  },
  email: {
    type: String,
    required: [true, 'You must have an email'],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'You must use a valid email']
  },
  phone: {
    type: Number,
    required: [true, 'You must have a phone number']
  },
  university: {
    type: String,
    trim: true,
    required: [true, 'You must have a university']
  },
  majors: [{type: String, trim: true}],
  categories: [{type: String, trim: true}],
  year: {
    type: Number,
    required: [true, 'You must have a graduation year'],
    min: [2017, 'You would have already graduated'],
    max: [2030, 'You are graduating too late']
  },
  github: {
    type: String,
    trim: true,
    required: false,
  },
  website: {
    type: String,
    trim: true,
    required: false,
  },
  shareResume: {
    type: Boolean,
    default: false
  },
  food: {
    type: String,
    trim: true,
  },
  diet: {
    type: String,
    trim: true,
  },
  shirtFit: {
    type: String,
    required: [true, 'You must have a shirt fit']
  },
  shirtSize: {
    type: String,
    required: [true, 'You must have a shirt size']
  },
  travel: {
    outOfState: {
      type: Boolean,
      default: false
    },
    city: {
      type: String
    }
  },
  availableBus: {
    type: String,
    trim: true
  },
  bussing: {
    type: Boolean,
    default: false
  },
  firstHackathon: Boolean,
  outcomeStmt: String, //What they hope their outcome of the hackathon will be
  teammates: [{type: String, match:
  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    'You must use a valid email']}],
  confirmed: {
    type: Boolean,
    default: false
  },
  //Rejected, Unconfirmed, Confirmed, Declined, Late, and Waitlisted
  status: {
    type: String,
    trim: true,
  },
  checkedIn: {
    type: Boolean,
    default: false
  }
});

UserSchema.pre('save', function(next) {
  const user = this;
  const SALT_FACTOR = 5;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null,
    function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

UserSchema.plugin(require('mongoose-sanitizer'));

UserSchema.plugin(findOrCreate);
UserSchema.plugin(timestamps);
UserSchema.plugin(softDelete);
UserSchema.plugin(crate, {
  storage: new S3({
    key: process.env.S3_KEY,
    secret: process.env.S3_SECRET,
    bucket: process.env.S3_BUCKET,
    acl: 'public-read',
    region: 'us-west-1',
    path(attachment) {
      return `resumes/${attachment.name}`;
    }
  }),
  fields: {
    resume: {}
  }
});

module.exports = db.model('User', UserSchema);
