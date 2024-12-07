import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "AssignmentModel" },
    description: String,
  },
  { collection: "assignments" }
);
export default schema;