import { Schema, model } from "mongoose";

const TeamSchemas = new Schema({
  name: { type: String, required: true, unique: true },
  discountCode: [
    { ref: "DiscountCode", type: Schema.Types.ObjectId, required: false },
  ],
});

export default model("Team", TeamSchemas);
