/*
  Creates a JWT token for the user.
  The token stores the user's id and role.
*/

import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // token expires in 7 days
  );
};

export default generateToken;