import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    slug: { type: String, unique: true }
  },
  { timestamps: true, strict: true, strictQuery: true }
);
export default mongoose.model("Semesters", schema, "semester");