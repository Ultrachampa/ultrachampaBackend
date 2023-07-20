import Race from "../models/Race";

export const getRaces = async (req, res) => {
  try {
    const races = await Race.find();
    res.json(races);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteRaceById = async (req, res) => {
  const raceId = req.params.id; // se pasa el ID de la carrera como parámetro en la URL
  try {
    const raceDeleted = await Race.findOneAndDelete({ _id: raceId });
    res.json(raceDeleted);
  } catch (error) {
    // Manejo del error
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const editRaceData = async (req, res) => {
  const raceId = req.params.id; // se pasa el ID de la carrera como parámetro en la URL
  const { info, name, description } = req.body;

  try {
    const race = await Race.findOneAndUpdate(
      { _id: raceId },
      { info, name, description },
      { new: true }
    );

    if (!race) {
      return res.status(404).json({ message: "Carrera no encontrada" });
    }

    return res.json(race);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createRace = async (req, res) => {
  const { name, description, info } = req.body; // Se obtienen los datos de la carrera del cuerpo de la solicitud

  try {
    const newRace = new Race({
      name,
      description,
      info,
    });

    const savedRace = await newRace.save();
    res.status(201).json(savedRace);
  } catch (error) {
    // Manejo del error
    res.status(400).json({ message: error.message });
  }
};

export const editRaceDiscount = async (req, res) => {
  const raceId = req.params.id; // se pasa el ID de la carrera como parámetro en la URL
  const { discount } = req.body;

  try {
    const race = await Race.findById(raceId);

    if (!race) {
      return res.status(404).json({ message: "Carrera no encontrada" });
    }

    // Si el descuento es mayor que cero, calculamos el nuevo precio con el descuento aplicado
    if (discount > 0) {
      const price = race.info.price;
      const discountedPrice = calculateDiscountedPrice(price, discount);
      race.info.price = discountedPrice;
    }

    race.discount = discount;
    const updatedRace = await race.save();

    return res.json(updatedRace);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Función auxiliar para calcular el nuevo precio con descuento
const calculateDiscountedPrice = (price, discount) => {
  const discountAmount = (price * discount) / 100;
  const discountedPrice = price - discountAmount;
  return discountedPrice;
};

export const updateRaceAvailability = async (req, res) => {
  const raceId = req.params.id; // se pasa el ID de la carrera como parámetro en la URL
  const { available } = req.body;

  try {
    const race = await Race.findById(raceId);

    if (!race) {
      return res.status(404).json({ message: "Carrera no encontrada" });
    }

    race.info.available = available;
    const updatedRace = await race.save();

    return res.json(updatedRace);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
