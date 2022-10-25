import mongoose, { Schema } from "mongoose";

//chat schema

const chat = new mongoose.Schema({
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "conversation",
    require: true,
  },
  sender: { type: Schema.Types.ObjectId, ref: "user", require: true },
  msg: { type: String, require: true },
  date: {
    type: Date,
    default: new Date(Date.now()),
  },
});

//chat modal

export const CHAT = new mongoose.model("chat", chat);
