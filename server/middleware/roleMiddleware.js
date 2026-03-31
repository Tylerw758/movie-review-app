/*
  Checks users role
  Example: admin-only routes
*/

const roleMiddleware = (role) => {
  return (req, res, next) => {
    // Allow access only if user exists and has the correct role
    if (req.user && req.user.role === role) {
      next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  };
};

export default roleMiddleware;