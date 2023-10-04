import { Schema, model, Types } from "mongoose";

const schema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  valueWithoutFee: {
    type: Number,
    required: true,
  },
  valueWithFee: {
    type: Number,
    required: true,
  },
});

export default model("Transaction", schema);
