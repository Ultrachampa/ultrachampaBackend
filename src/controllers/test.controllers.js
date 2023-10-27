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

export const test = (req, res) => {
  var respuesta = "";
  const { email, firstName, lastName, dob, Auth } = req.body;
  // const datos = {
  //   email: email,
  //   firstName: firstName,
  //   lastName: lastName,
  //   dob: dob,
  // };

  const url = "https://api.utmb.world/users/dashboard/member/simple";

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: Auth,
    },
  })
    .then((response) => (respuesta = res.json(response)))
    .then((response) => {
      const data = response;
      console.log("data", data);
    });
};

// export const test = async (req, res) => {
//   const { email, firstName, lastName, dob, Auth } = req.body;
//   const datos = {
//     email: email,
//     firstName: firstName,
//     lastName: lastName,
//     dob: dob,
//   };

//   const url = `https://api.utmb.world/users/dashboard/member/simple`;

//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       Authorization: Auth,
//     },
//   });

//   res.send(response);
//   console.log(response);
// };
