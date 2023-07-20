import Users from "../models/Users";
import jwt from "jsonwebtoken";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: "No token provided." });

    let decoded;
    try {
      // Verificar si el token es un token de acceso válido
      decoded = jwt.verify(token, process.env.SECRET);
      req.userId = decoded.id;
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        const refreshToken = req.headers["x-refresh-token"];
        if (!refreshToken)
          return res
            .status(401)
            .json({ message: "No refresh token provided." });

        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.REFRESH_SECRET
        );
        const user = await Users.findById(decodedRefresh.id);
        if (!user) return res.status(404).json({ message: "User not found." });

        if (user.refreshToken !== refreshToken)
          return res.status(401).json({ message: "Invalid refresh token." });

        const now = Date.now();
        const refreshTokenExp = new Date(user.refreshTokenExp).getTime();
        if (now > refreshTokenExp)
          return res.status(401).json({ message: "Refresh token expired." });

        const newToken = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: "12h",
        });
        req.userId = decodedRefresh.id;

        // Actualizar el token en la base de datos
        await user.updateOne({
          refreshToken: refreshToken,
          refreshTokenExp: user.refreshTokenExp,
        });

        res.setHeader("x-access-token", newToken);
      } else {
        return res.status(401).json({ message: "Unauthorized access." });
      }
    }

    const user = await Users.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "Not user found." });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access." });
  }
};

export const isAdmin = async (req, res, next) => {
  const user = await Users.findById(req.userId);
  const roles = await Role.findOne({ _id: { $in: user?.role } });
  if (roles?.name === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Required admin role." });
  }
};
