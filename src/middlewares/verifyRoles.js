import { ROLES } from "../models/Role";

export const checkExistingRoles = (req, res, next) => {
  if (req.body.roles) {
    if (!ROLES.includes(req.body.roles[0])) {
      return res
        .status(404)
        .json({ message: `Role ${req.body.roles[0]} does not exist` });
    }
  }
  next();
};
