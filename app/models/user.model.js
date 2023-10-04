import { Schema, model, Types } from "mongoose";

const schema = new Schema({
  login: {
    type: String,
    required: true,
  },
  morId: {
    type: String,
    default: "",
  },
  balance: {
    type: Number,
    default: 0,
  },
  isAuthorizedThroughTelegram: {
    type: Boolean,
    default: false,
  },
  telegramToken: {
    type: String,
    default: "",
  },
  chats: [
    {
      type: String,
    },
  ],
  transactions: [
    {
      type: Types.ObjectId,
      ref: "Transaction",
    },
  ],
});

export default model("User", schema);
