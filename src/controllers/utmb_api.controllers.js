import Fee from "../models/Fee";
import Sale from "../models/Sale";
import Race from "../models/Race";

export const memberSimple = async (req, res) => {
  const { authToken } = req.body;
  var respuesta = "";

  const url = "https://api.utmb.world/users/dashboard/member/simple";

  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: authToken,
    },
  })
    .then((res) => (respuesta = res.text()))
    .then((response) => {
      const data = response;
      console.log("data", data);
      res.send(data);
    });

  return respuesta;
};

export const checkActiveStatus = async (req, res) => {
  const { email, firstName, lastName, dob } = req.body;
  var respuesta = "";

  const datos = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    dob: dob,
  };

  const url = `https://api.utmb.world/registration/checkActiveStatus`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((res) => (respuesta = res.text()))
    .then((response) => {
      const data = response;
      console.log("data", data);
      res.send(data);
    });

  return respuesta;
};

export const getTokenApi = async (req, res) => {

  var respuesta = "";
  const querystring = require("querystring");

  const datos = {
    username: "trailpunto@gmail.com",
    password: "Nolivera09!",
    client_id: "valholl",
    grant_type: "password",
  };

  const datosCodificados = querystring.stringify(datos);

  const url = `https://accounts.utmb.world/auth/realms/utmb-world/protocol/openid-connect/token`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: datosCodificados,
  })
    .then((res) => (respuesta = res.text()))
    .then((response) => {
      const data = response;
      console.log("data", data);
      res.send(data);
    });

  return respuesta;
};

export const registerRaceApi = async (token, body, raceID) => {
  const url = `https://api.utmb.world/registration/single/${raceID} `;

  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      body: JSON.stringify(body),
    },
  })
    .then((res) => (respuesta = res.text()))
    .then((response) => {
      const data = response;
      console.log("data", data);
      return data;
    });

  return respuesta;
};

export const testing = async () => {
  const now = new Date();
  const feeID = "64c5c743286051dfe9612067";
  //Obtengo toda la info de la cuota ingresada
  const feeInfo = await Fee.find({ _id: feeID }).exec();
  const feeSaleID = feeInfo[0].sale;

  //INFO VENTAS
  const saleInfo = await Sale.find({ _id: feeSaleID }).exec();
  const salePrice = saleInfo[0].price;
  const userIdSale = saleInfo[0].user;
  const raceIdSale = saleInfo[0].race;

  //INFO RACES
  const raceInfo = await Race.find({ _id: raceIdSale }).exec();
  const utmbRaceId = raceInfo[0].utmbRaceId;

  //USER INFO
  const userInfo = await Users.find({ _id: userIdSale }).exec();
  const userFirstname = userInfo[0].name;
  const userLastname = userInfo[0].lastname;
  const userBirthdate = userInfo[0].birthdate;
  const userEmail = userInfo[0].email;
  const userNationality = userInfo[0].nationality;
  const userGender = userInfo[0].gender;
  const userTeam = userInfo[0].team;

  var body = {
    firstName: userFirstname,
    lastName: userLastname,
    birthdate: userBirthdate,
    gender: userGender,
    email: userEmail,
    nationality: userNationality,
    registrationFee: 0,
    totalPaid: salePrice,
    currency: "ARS",
    urlDashboard: "",
    registrationDate: now,
    status: "CANCELLED", // CANCELLED
    fileNumber: feeSaleID,
    grp: userTeam,
  };

  const {access_token, refresh_token} = getTokenApi();
  registerRaceApi(access_token, body, utmbRaceId);

};
