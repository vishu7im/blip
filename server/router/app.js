import express from "express";
import { login, signup } from "./controllers/auth.js";
import {
  conversation,
  conversationdata,
  getconversation,
} from "./controllers/conversation.js";
import { recive, send } from "./controllers/msg.js";

const router = express.Router();

//routes for auth
router.post("/signup", signup);
router.post("/login", login);

//conversation route

router.post("/conversation", conversation);
router.get("/conversation/:user", getconversation);
router.get("/conversiondata/:user", conversationdata);

//chat route
router.post("/msg", send);
router.get("/msg/:id", recive);

export default router;
