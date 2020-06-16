import axios from "axios";
import mockedData from "../mocks/data.json";

// All requests to "https://jsonplaceholder.typicode.com" API are just for PWA purposes and their responses are not used.

export const getAllSentences = async () => {
  try {
    const response = await axios.get("/posts");
    if (response.data) {
      return mockedData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createNewSentence = async (newMockedData) => {
  const mockedPost = {
    id: 101,
    title: "foo",
    body: "bar",
    userId: 1,
  };

  try {
    const response = await axios.post("/posts", mockedPost);
    if (response.data) {
      return newMockedData;
    }
  } catch (error) {
    console.log(error);
  }
};
