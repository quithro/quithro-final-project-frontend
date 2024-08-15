import processResponse from "./utils";

const currentDate = new Date();
const getCurrentDate = () => {
  return currentDate.toString();
};

const priorDate = new Date();
const getPriorDate = () => {
  priorDate.setDate(currentDate.getDate() - 7);
  return priorDate.toString();
};

const APIkey = "a78af387cd484b5bbfe378c7b98e81d7";

export const getSearchResults = (keyword) => {
  const newsApi =
    fetch(`https://newsapi.org/v2/everything?q=${keyword}&from=${getPriorDate()}&to=${getCurrentDate(
      new Date()
    )}&pageSize=100&sortBy=popularity&apiKey=${APIkey}
    `).then(processResponse);

  return newsApi;
};

// const currentDate = new Date().toLocaleString("default", {
//   month: "long",
//   day: "numeric",
// });
