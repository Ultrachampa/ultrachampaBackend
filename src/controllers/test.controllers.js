// import fetch from "node-fetch";
const fetch = require("node-fetch");

// function getDataExternService() {
//     const datos = {
//         email : "Veroalas@gmail.com",
//         firstName: "Veronica",
//         lastName: "Alas",
//         dob: "1978-08-21"
//     }
//     const url = `https://api.utmb.world/registration/checkActiveStatus?email=${datos.email}&lastName=${datos.lastName}firstName=${datos.firstName}&dob=${datos.dob}`

//     return fetch(url, {method: 'POST'})
//     .then((res) => res.json())
//     .then((response) => {
//       const data = response;
//       console.log(response)
//       return data;
//     })
//   }

//   getDataExternService()

export const test = async (req, res) => {
  const { email, firstName, lastName, dob, Auth } = req.body;
  const datos = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    dob: dob,
  };

  const url = `https://api.utmb.world/registration/checkActiveStatus`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(datos),
    headers: { 
      "Content-Type": "application/json",
      "Authorization" : "Bearer " + Auth
     },
  });

  res.send(response);
  console.log(response)
};
