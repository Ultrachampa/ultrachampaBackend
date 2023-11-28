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
