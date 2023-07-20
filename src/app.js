import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import raceRoutes from "./routes/race.routes";
import discountRoutes from "./routes/discounts.routes"
import bodyParser from "body-parser";
import { createRoles } from "./libs/initialSetup";
import cors from "cors";

const app = express();
createRoles();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("port", process.env.PORT || 3000);

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "APP PRODUCTIVA" });
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/races", raceRoutes);
app.use("/api/discounts", discountRoutes);

export default app;
