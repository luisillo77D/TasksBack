import jwt from "jsonwebtoken";
import { secret } from "../config.js";
export const authRequired = (req, res, next) => {
  //obtener el token del header
  const token = req.cookies.token;
  console.log(token);

  if (!token) return res.status(401).json({ message: "no token auth" });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: "invalid token " });

    req.user=user
    next();
  });
};