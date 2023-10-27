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

   // const url = `https://api.utmb.world/registration/checkActiveStatus?email=${datos.email}&lastName=${datos.lastName}firstName=${datos.firstName}&dob=${datos.dob}`;
  const url = `https://api.utmb.world/users/dashboard/member/simple`;

  const response = await fetch(url, {
    method: "GET",
    // body: JSON.stringify(datos),
    headers: {
      "Content-Type": "application/json",
      'Authorization': Auth
    },
  });

  res.send(response);
  console.log(response[0]);
};

// export const test = async (req, res) => {
//   const { email, firstName, lastName, dob, Auth } = req.body;
// const datos = {
//   email: email,
//   firstName: firstName,
//   lastName: lastName,
//   dob: dob,
// };

//   const url = `https://accounts.utmb.world/auth/realms/utmb-world/protocol/openid-connect/userinfo`;

//   const response = await fetch(url, {
//     method: "POST",
//    // body: JSON.stringify(datos),
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     ,'Authorization': 'Bearer ' + Auth

//      },
//   });

//   res.send(response);
//   console.log(response)
// };

// {
//   "firstName": "Nico",
//   "lastName": "OLIVERA",
//   "email": "oliveran9@gmail.com",
//   "dob": "1995-11-10",
//   "Auth" : "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWN2hiVlV4SlZpMHMxUjNZNERvQjRRTmpsQWFCNVdkMWZQZnRmTzJzcUl3In0.eyJleHAiOjE2OTg0MTg4NzcsImlhdCI6MTY5ODQxNzk3NywiYXV0aF90aW1lIjoxNjk4Mzc3MzkxLCJqdGkiOiIyMzAyZDIzZC1iOTc0LTQ4ZGEtOGVmNC1kMmRjMWI4MTNhZjYiLCJpc3MiOiJodHRwczovL2FjY291bnRzLnV0bWIud29ybGQvYXV0aC9yZWFsbXMvdXRtYi13b3JsZCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNjU1YjYzNC02OGYzLTRlZWMtOWU2Yy00ZTNhODU1MTZmY2IiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ2YWxob2xsIiwibm9uY2UiOiI0NDkzZjM5Yi04MDdkLTQ5OTctYTYyMS1kMjIxNTEzOGI0MGEiLCJzZXNzaW9uX3N0YXRlIjoiNmJiNjAyMmUtODhhMC00OGY0LWFiNTUtODBmMTM2MmJlNzBkIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3V0bWIud29ybGQiLCJodHRwczovL3B1bnRvLXRyYWlsLXRlc3QtcHJpbmNpcGFsLnZlcmNlbC5hcHAiLCJodHRwczovL3B1bnRvLXRyYWlsLnZlcmNlbC5hcHAiLCJodHRwczovL3d3dy5wdW50b3RyYWlsLmNvbSIsImh0dHBzOi8vcnVubmVycy1iYWNrLnZlcmNlbC5hcHAiLCJodHRwczovL3B1bnRvdHJhaWwuY29tIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJiaXJ0aGRhdGUiOiIxOTk1LTExLTEwIiwiZ2VuZGVyIjoibWFsZSIsIm5hbWUiOiJOaWNvIE9MSVZFUkEiLCJjcmVhdGVkX2F0IjoxNjkxOTc0MjM5Njc3LCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJvbGl2ZXJhbjlAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6Ik5pY28iLCJmYW1pbHlfbmFtZSI6Ik9MSVZFUkEiLCJlbWFpbCI6Im9saXZlcmFuOUBnbWFpbC5jb20ifQ.dSlvCERDYKB6SXe17L9bqeRPd8mFron74pWoVhCfv67TvvKNm6nmlu_DYw7KC_uRsmKiD1P998D5i4fOSH3GWjw9ZB6LiDI4Nvh7wGn18OhZurvm8do_C9ZHI3OuzvOtwUw60qTJEaIRNpjVxC4sFaI7cXDa7PhvBSzenMGbgLOHIsPS87kL1fecx_GZwQCVpA4Loz7bz3S-FmSIFemjL07KWeUdjl3h8QULLtpr9Ig8gtoHnznpHiDSyfcmUefHkZWJiapFJ8x3dRISCvPBKOrGhFLMkBBGKjXOvHrDI98heC9Y86KvBeUSeF08DvIserOPv_T2FqhsFjmwlkjXRQ"
// }
