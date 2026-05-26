const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Missing Authorization header" });
    }

    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ message: "Invalid Authorization header" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach authenticated user info
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

exports.requireRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    return next();
  };
};

