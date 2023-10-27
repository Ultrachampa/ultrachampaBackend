const fetch = require("node-fetch");

export const test = async (req, res) => {
  const { Auth } = req.body;
  const url = "https://api.utmb.world/users/dashboard/member/simple";

  return await fetch(url, {
    method: "GET",
    headers: {
      Authorization: Auth,
    },
  })
    .then((response) => {
      response.json();
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err));
};
