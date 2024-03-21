import { Router, Request, Response } from "express";
import User, { UserDocument, validateUser } from "../Models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// LOGIN
export const login = async (req: Request, res: Response) => {
  // try {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const validated: boolean = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!validated) {
    return res.status(404).json({ message: "Wrong credentials" });
  } else {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", {
      expiresIn: "1d",
    });
    return res.status(200).json({
      message: "Logged in successfully",
      token: token,
    });
  }
  // } catch (error: any) {
  //   return res.status(500).json({ error: error.message });
  // }
};
//SIGNUP
// ===================================================
export const signup = async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(409).json({
      message: "This user already exists",
    });
  }
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedpassword,
  });

  const saveUser = await newUser.save();

  return res.status(201).json({
    user: saveUser,
    message: "User successfully added",
  });
};
