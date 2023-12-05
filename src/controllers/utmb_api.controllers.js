import Fee from "../models/Fee";
import Sale from "../models/Sale";
import Race from "../models/Race";
import Users from "../models/Users";
import fetch from "node-fetch";

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

export const getTokenApi = async () => {
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
  }).then((res) => (respuesta = res.json()));

  return respuesta;
};

export const registerRaceApi = async (token, body, raceID) => {
  const url = `https://api.utmb.world/registration/single/${raceID} `;

  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      body: JSON.stringify(body),
    },
  })
    .then((res) => (respuesta = res.json()))
  return respuesta;
};

export const Testeo = async (req, res) => {
  const { feeID, status } = req.body;
  const now = new Date();
  // const feeID = "64bc574dba8edd1300a219c7";

  //Obtengo toda la info de la cuota ingresada
  const feeInfo = await Fee.findById(feeID).exec();
  const feeSaleID = feeInfo.sale;

  //INFO VENTAS
  const saleInfo = await Sale.findById(feeSaleID).exec();
  const salePrice = saleInfo.price;
  const userIdSale = saleInfo.user;
  const raceIdSale = saleInfo.race;

  //INFO RACES
  const raceInfo = await Race.findById(raceIdSale).exec();
  // const utmbRaceId = raceInfo[0].utmbRaceId;

  //USER INFO
  const userInfo = await Users.findById(userIdSale).exec();
  const userFirstname = userInfo.name;
  const userLastname = userInfo.lastname;
  const userBirthdate = userInfo.birthdate;
  const userEmail = userInfo.email;
  const userNationality = userInfo.nationality;
  const userGender = userInfo.gender;
  const userTeam = userInfo.team;

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
    status: status, // CANCELLED
    fileNumber: feeSaleID,
    grp: userTeam,
  };

  var tokenApi = await getTokenApi();
  const access_token = tokenApi.access_token;
  const refresh_token = tokenApi.refresh_token;
  var respuesta = registerRaceApi(access_token, body, utmbRaceId);

  return respuesta
};
