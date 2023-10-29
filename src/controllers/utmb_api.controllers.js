
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
        res.send(data)
      });
  
    return respuesta;
  };

  export const checkActiveStatus = async (req, res) => {
  const { email, firstName, lastName, dob} = req.body;
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
      'Content-Type': "application/json",
    },
    body: JSON.stringify(datos)
  })
    .then((res) => (respuesta = res.text()))
    .then((response) => {
      const data = response;
      console.log("data", data);
      res.send(data)
    });

  return respuesta;
};