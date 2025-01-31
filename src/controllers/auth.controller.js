import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken';
import {secret} from '../config.js';

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userFound = await User.findOne({email})
    if(userFound) return res.status(400).json(["The email already exists"])

    const passHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccesToken({ id: userSaved._id  });

    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({email})
    if(!userFound)return res.status(400).json({message:"user not found"});

    const isMatch = await bcrypt.compare(password, userFound.password);
    if(!isMatch) return res.status(400).json({message:"incorrect password"})
    
    const token = await createAccesToken({ id: userFound._id, role: userFound.role });

    res.cookie("token", token, { sameSite: 'none', secure: true });
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

export const logout =  (req, res) =>{
  res.cookie('token',"",{
    expires: new Date(0),
    sameSite: 'none',
    secure: true
  })
  return res.sendStatus(200)
}

export const verifyToken = async (req, res) => {
  const {token} = req.cookies
  if(!token)return res.status(401).json({message:"no autorizado"});

  jwt.verify(token, secret, async (err,user) =>{
    if(err) return res.status(401).json({message:"no autorizado"});

    const userFound = await User.findById(user.id);
    if(!userFound) return res.status(401).json({message:"no autorizado"});

    return res.json({
      id:userFound._id,
      username: userFound.username,
      email: userFound.email,
    })
  })
}

