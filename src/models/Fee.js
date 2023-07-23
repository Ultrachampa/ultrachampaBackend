import { Schema, model } from "mongoose";

const FeeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  sale: [{ ref: "Sale", type: Schema.Types.ObjectId, required: true }],
  feePrice: { type: Number, required: true, default: 0 },
  expireDate: { type: Date, required: true, default: null },
  linkGeneratedDate: { type: Date, required: false, default: null },
  isActive: { type: Boolean, default: false },
  isPayed: { type: Boolean, default: false },
  numFee: { type: Number, required: true },
});

export default model("Fee", FeeSchema);
