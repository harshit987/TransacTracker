const mongoose = require('mongoose');
const crypto = require('crypto');
const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    default: ''
  },
  Roll_no: {
    type: Number,
    default: ''
  },
  hash : String,
  salt : String,
  Amount : Number,
  isDeleted:{
      type: Boolean,
      default: false
  }
});

UserSchema.methods.generateHash = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt,  
        1000, 64, `sha512`).toString(`hex`); 
}
    // return bcrypt.hashSync(password,bcrypt.getSaltSync(8),null); 
UserSchema.methods.validPassword = function(password) { 
        var hash = crypto.pbkdf2Sync(password,  
        this.salt, 1000, 64, `sha512`).toString(`hex`); 
        return this.hash === hash; 
}; 
const User = module.exports = mongoose.model('User', UserSchema); 