export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required. Please log in.",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `You don't have permission to do this. This action requires one of: ${allowedRoles.join(", ")}.`,
      });
    }

    next();
  };
};