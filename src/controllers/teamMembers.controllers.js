import TeamMembers from "../models/TeamMembers";

//Obtiene el listado de los miembros, ya sea por filtros o el listado en general.
export const getTeamMembers = async (req, res) => {
  let body = req.body;
  const { userID, teamID } = body;

  //Si los parámetros están vacíos, devuelve todo el listado sin filtrar
  if (userID === "" && teamID === "") {
    try {
      const teamMembers = await TeamMembers.find();
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }

    //Filtra solamente por usuario
  } else if (userID !== "" && teamID === "") {
    try {
      const teamMembers = await TeamMembers.find({ user: userID });
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }

    //Filtra solamente por Equipo
  } else if (userID === "" && teamID !== "") {
    try {
      const teamMembers = await TeamMembers.find({ team: teamID });
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  //Filtra por ambos parámetros
  else if (userID !== "" && teamID !== "") {
    try {
      const teamMembers = await TeamMembers.find({
        team: teamID,
        user: userID,
      });
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};
