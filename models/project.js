const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: { type: String },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  lead:{
    type:Schema.Types.ObjectId,
    ref:"users"
  },
  start:{
    type:Date
  }
  ,
  end:{
    type:Date
  }
});

module.exports = mongoose.model("projects", ProjectSchema);
