//Import mongoose
const mongoose = require("mongoose");

//Import bcrypt
const bcrypt = require("bcrypt");

//Define our schema
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
    email: {
    type: String,
    required: true,
    unique: true
  },
    password: {
    type: String,
    required: true,
  },
});


UserSchema.pre("save", async function(next){
if(!this.isModified("password")) return next()
  this.password= await bcrypt.hash(this.password, 10)
next()
})

// Define Model
const UserModel = mongoose.model("User", UserSchema);


// Export Model
module.exports = UserModel;