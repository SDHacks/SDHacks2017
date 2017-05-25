var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var timestamps = require('mongoose-timestamp');
var softDelete = require('mongoose-softdelete');

var bcrypt = require('bcrypt-nodejs');
var roles = require('./helper').roles;

require('dotenv').config();
var Schema = mongoose.Schema;
var db = mongoose.createConnection(process.env.MONGODB_URI);

var AdminSchema = new Schema({
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
  role: {
    type: String,
    enum: [roles.ROLE_ADMIN, roles.ROLE_DEVELOPER,
      roles.ROLE_SPONSER, roles.ROLE_MEMBER],
    default: roles.ROLE_MEMBER
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
});

AdminSchema.pre('save', function(next) {
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

AdminSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

AdminSchema.set('toJSON', {
  transform: function(doc, ret) {
    return {
      _id: ret._id,
      username: ret.username,
      role: ret.role,
      createdAt: ret.createdAt,
      deleted: ret.deleted,
      deletedAt: ret.deletedAt
    };
  }
});

AdminSchema.plugin(require('mongoose-sanitizer'));

AdminSchema.plugin(timestamps);
AdminSchema.plugin(softDelete);

module.exports = db.model('Admin', AdminSchema);
