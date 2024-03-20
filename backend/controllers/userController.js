import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../model/User.js";
import generateToken from "../utils/createToken.js";
import bcrypt from "bcryptjs";

const createUser = asyncHandler(async (req, res) => {
  console.log("create user called");
  console.log(req.body);
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    console.log("empty credentials");
    throw new Error("Please fill all the feilds");
  }
  console.log("create user called");

  const userExist = await User.findOne({ email });
  if (userExist) res.status(400).send("User already exists");

  const salt = await bcrypt.genSalt(10);
  console.log("create user called");

  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });
  console.log("create user called");

  try {
    await newUser.save();
    let jwt = await generateToken(res, newUser._id);
    res.status(201).json({
      jwt,
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (e) {
    res.status(400);
    throw new Error(e.message);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordValid) {
      let jwt = await generateToken(res, existingUser._id);

      res.status(201).json({
        jwt,
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
    } else {
      res.status(401).json({ message: "invalid password" });
    }
  } else {
    res.status(401).json({ message: "user not found" });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(rew.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.getSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


export {
  createUser,
  logoutUser,
  loginUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  
};
