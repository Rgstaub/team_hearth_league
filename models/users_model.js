
const mongoose = require("mongoose"),
Schema = mongoose.Schema,
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10,
uuid = require('uuid/v4');


const UserSchema = new Schema({
username: {
  type: String,
  trim: true,
  minlength: 7,
  maxlength: 100,
  unique: true,
  lowercase: true,
  match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
},
password: {
  type: String,
  trim: true,
  minlength: 6,
  maxlength: 75,
  required: true
},
//#############################################################################################################################
//#################### Change fullname to first and last ##############################################################
fullName: {
  type: String,
  trim: true,
  minlength: 2,
  maxlength: 75,
  required: true
},
photoUrl: {
  type: String,
  required: true,
  default: 'static/files/userPhotos/default_avatar.png',
  expose: true
},
email: {
  type: String,
  trim: true,
  minlength: 7,
  maxlength: 100,
  unique: true,
  required: true,
  match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
},
missions: [{type: String}],
reset_token: {
  type: String,
  required: false
},
token_expires: {
  type: Number,
  required: false
},
social_logins: {
  facebook: {
    type: String,
    maxlength: 100,
    required: false
  },
  google: {
      type: String,
      maxlength: 100,
      required: false
    }
  }
}, 
{ timestamps: true, runSettersOnQuery:true }
);


// Hashing is done before saving the password to Mongo
UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

UserSchema.set('toJSON', {
  transform: function(doc, ret, options) {
      var retJson = {
        id: ret._id,
        username: ret.username,
        fullName: ret.fullName,
        email: ret.email,
        modified: ret.updatedAt,
        photoUrl: ret.photoUrl
      };
      return retJson;
  }
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

UserSchema.methods.createToken = function(cb) {
let user = this;

// return a guid
cb(uuid());
}



var User = mongoose.model("User", UserSchema);



module.exports = User;
