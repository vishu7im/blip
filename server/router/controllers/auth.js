import { USER } from "../../database/usermodal.js";
import passwordHash from "password-hash";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { email, name, pwd } = req.body;
  const data = await USER.findOne({ email: email });
  if (data) {
    res.status(400).json("user exist");
  } else {
    var hashedPassword = passwordHash.generate(pwd);
    const user = new USER({ email, name, pwd: hashedPassword });

    try {
      const result = await user.save();
      const { email, name, avatar, _id } = result;

      let token = jwt.sign({ email, name, avatar, _id }, "vishalmunday");
      res.status(200).json(token);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
};

export const login = async (req, res) => {
  const { email, pwd } = req.body;

  try {
    const data = await USER.findOne({ email: email });
    const hashpwd = data.pwd;
    console.log(hashpwd);
    const pwdstatus = passwordHash.verify(pwd, hashpwd);
    console.log(pwdstatus);
    if (data.email === email && pwdstatus === true) {
      const { email, name, avatar, _id } = data;

      let token = jwt.sign({ email, name, avatar, _id }, "vishalmunday");

      res.status(200).json(token);
    } else {
      res.status(404).json(" Invalid credentials");
    }
  } catch (error) {
    res.status(404).json(" Invalid credentials");
  }
};
