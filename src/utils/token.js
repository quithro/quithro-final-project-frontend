const TOKEN_KEY = "jwt";

export const setToken = (token) => {
  localStorage.setItem("jwt", token);
};

export const getToken = () => {
  return localStorage.getItem("jwt");
};
