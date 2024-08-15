// import { baseUrl } from "./api";
// import processResponse from "./utils";

// const register = ({ name, email, password }) => {
//   return fetch(`${baseUrl}/signup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name,
//       email,
//       password,
//     }),
//   }).then(processResponse);
// };

// const login = ({ email, password }) => {
//   return fetch(`${baseUrl}/signin`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//   }).then(processResponse);
// };

// const getCurrentUser = (token) => {
//   return fetch(`${baseUrl}/users/me`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//   }).then(processResponse);
// };

// const getToken = (token) => {
//   return fetch(`${baseUrl}/users/me`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//   }).then(processServerResponse);
// };

// const auth = {
//   register,
//   login,
//   getCurrentUser,
//   getToken,
// };

// export default auth;

// stub out

export const authorize = (email, password) => {
    // Pretend we did a fetch request that gave us back a token
    return new Promise((resolve, reject) => {
      resolve({ token: "a fake token" });
    });
  };
  
  export const checkToken = (token) => {
    // Pretend we did a fetch request that gave us back a user
    return new Promise((resolve, reject) => {
      resolve({
        data: { name: "", email: "", id: "" },
      });
    });
  };