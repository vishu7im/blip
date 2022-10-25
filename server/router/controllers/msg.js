import { CHAT } from "../../database/chat.js";

export const send = async (req, res) => {
  const { sender, conversation, msg } = req.body;
  const data = new CHAT({
    sender,
    conversation,
    msg,
  });
  try {
    const result = await data.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const recive = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await CHAT.find({ conversation: id }).populate("sender");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
