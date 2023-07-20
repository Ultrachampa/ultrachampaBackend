import mongoose from "mongoose";

const RaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  info: {
    distance: {
      type: String,
      enum: ["10", "22", "33", "50", "80", "125"],
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
    available: {
      type: Boolean,
      default: false,
    }
  },
});

export default mongoose.model("Race", RaceSchema);
