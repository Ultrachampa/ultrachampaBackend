import Sale from "../models/Sale";
import { createFee } from "./fee.controllers.js";

export const createSale = async (req, res) => {
  let body = req.body;
  // const user = req.params.userId; // se pasa el ID del usuario como parámetro en la URL
  // const race = req.params.raceId; // se pasa el ID de la carrera como parámetro en la URL
  const { name, price, saleDate, feesAmount, description, user, race } = body; // Se obtienen los datos de la carrera del cuerpo de la solicitud

  try {
    const newSale = new Sale({
      name,
      race,
      user,
      price,
      saleDate,
      feesAmount,
    });

    const savedSale = await newSale.save(); //Si todo esta bien, creo el nuevo registro

    const lastInsertSale = await Sale.find({}).sort({ _id: -1 }).limit(1);

    //Obtengo el ultimo id ingresado para enviarselo a la creacion de cuotas
    var lastInsertID = lastInsertSale[0]._id;
    createFee(feesAmount, lastInsertID, price, description, name);

    //Devuelvo la respuesta
    res.status(201).json({ savedSale });
  } catch (error) {
    // Manejo del error
    res.status(400).json({ message: error.message });
  }
};

//Obtengo el listado de compras

export const getSales = async (req, res) => {
  let body = req.body;
  const { userID, raceID } = body;
  if (userID === "" && raceID === "") {
    try {
      const sales = await Sale.find();
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  } else if (userID !== "" && raceID === "") {
    try {
      const sales = await Sale.find({ user: userID });
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  } else if (userID === "" && raceID !== "") {
    try {
      const sales = await Sale.find({ race: raceID });
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  } else if (userID !== "" && raceID !== "") {
    try {
      const sales = await Sale.find({ race: raceID, user: userID });
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};
