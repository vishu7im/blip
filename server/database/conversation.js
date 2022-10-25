import mongoose from "mongoose";

//conversation schema

const conversation = new mongoose.Schema({
  members: {
    type: Array,
  },
  date: {
    type: Date,
    default: new Date(Date.now()),
  },
});

//conversation modal

export const CONVERSATION = new mongoose.model("conversation", conversation);
