import mongoose from "../database.js";

const UserSchema = mongoose.Schema({
  user: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  role: {
    type: String,
    default: "USER",
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
