import mongoose from "mongoose";
import bcrypt from "mongoose-bcrypt";

const meetingSchema = new mongoose.Schema(
  {
    semester: String,
    advisor: String,
    body: String,
    date: Date,
    count: Boolean
  },
  { timestamps: true, strict: true, strictQuery: true }
);

const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, bcrypt: true },
    firstName: String,
    lastName: String,
    phone: String,
    role: String,
    meetings: [meetingSchema] 
  },
  { timestamps: true, strict: true, strictQuery: true }
);
schema.plugin(bcrypt);
export default mongoose.model("Users", schema, "users");