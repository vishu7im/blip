import { CONVERSATION } from "../../database/conversation.js";
import { USER } from "../../database/usermodal.js";

export const conversation = async (req, res) => {
  const { user1, user2 } = req.body;
  const data = new CONVERSATION({
    members: [user1, user2],
  });
  try {
    const result = await data.save();
    res.status(200);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getconversation = async (req, res) => {
  const { user } = req.params;
  try {
    const data = await CONVERSATION.find({ members: { $in: [user] } });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const conversationdata = async (req, res) => {
  const { user } = req.params;
  try {
    const data = await USER.findOne({ _id: user });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
