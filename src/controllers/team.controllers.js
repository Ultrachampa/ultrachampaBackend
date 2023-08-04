import Team from "../models/Team";

export const getTeams = async (req, res) => {
  //Obtiene el listado de equipos, ya sea por código de descuento o el listado en general.
  let body = req.body;
  const { discountCode } = body;

  if (discountCode === "") {
    try {
      const teams = await Team.find();
      res.json(teams);
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  } else if (discountCode !== "") {
    try {
      const teams = await Team.find({ discountCode: discountCode });
      res.json(teams);
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};

export const verifyTeam = async (req, res) => {
  let body = req.body;
  const { teamName } = body;
  try {
    const team = await Team.find({ name: { $regex: teamName, $options: "i" } });

    if (!team) {
      res.status(202).json({ message: "Team no encontrado o mal escrito" });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
