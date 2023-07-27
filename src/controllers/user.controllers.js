import Race from "../models/Race";
import RegisterData from "../models/RegisterData";
import User from "../models/Users";
import nodemailer from "nodemailer";

export const getUsers = async (req, res) => {
  const { userID } = req.body;

  if (userID === "") {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    try {
      const users = await User.find({ _id: userID });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
};

export const getRegistrationCount = async (req, res) => {
  try {
    const registerData = await RegisterData.findOne({});
    res.json({
      count: registerData.registeredUsers,
      payments: registerData.registeredPayments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addUserToRace = async (req, res) => {
  const userId = req.params.userId; // se pasa el ID del usuario como parámetro en la URL
  const raceId = req.params.raceId; // se pasa el ID de la carrera como parámetro en la URL

  try {
    const user = await User.findById(userId);
    const race = await Race.findById(raceId);

    if (!user || !race) {
      return res
        .status(404)
        .json({ message: "Usuario o carrera no encontrados" });
    }

    user.raceData.race = race;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "puntotrail.noreply@gmail.com",
        pass: "lqbfqanpanmbglby",
      },
    });

    const mailOptions = {
      from: "puntotrail.noreply@gmail.com",
      to: user.email,
      subject: `Te has registrado a ${race.name}`,
      text: `Gracias por confiar en nosotros, prometemos que la vas a pasar increíble participando de esta carrera!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        console.log("Correo electrónico enviado: " + info.response);
        return res.json({ message: "Email sent successfully" });
      }
    });

    return res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const removeUserRace = async (req, res) => {
  const userId = req.params.userId; // se pasa el ID del usuario como parámetro en la URL

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.raceData = null; // Vaciar el campo "race" del usuario
    await user.save();

    return res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getUserRaceData = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).populate("raceData.race");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const raceData = {
      discountCode: user.raceData.discountCode || null,
      discountedPrice: user.raceData.discountedPrice || null,
      race: user.raceData.race || null,
    };

    return res.status(200).json({ raceData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const payingUsersTest = async (req, res) => {
  const { distance } = req.body;
  try {
    await RegisterData.updateOne(
      {},
      { $inc: { [`registeredPayments.${distance}`]: 1 } }
    );
    console.log(`Pagos registrados actualizados para la distancia ${distance}`);
    res.send(200);
  } catch (error) {
    console.error("Error al actualizar los pagos registrados:", error);
    throw error;
  }
};
