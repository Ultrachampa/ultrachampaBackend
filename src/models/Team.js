import { Schema, model } from "mongoose";

const TeamSchemas = new Schema({
  name: {type: String, required: true, unique: true},
});

export default model("Team", TeamSchemas);
