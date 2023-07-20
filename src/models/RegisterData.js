import mongoose from "mongoose";

const RegisterDataSchema = new mongoose.Schema({
  registeredUsers: {
    type: Number,
    default: 0,
  },
  registeredPayments: {
    type: Map,
    of: Number,
    default: {},
  },
});

const RegisterData = mongoose.model("RegisterData", RegisterDataSchema);

export default RegisterData;
