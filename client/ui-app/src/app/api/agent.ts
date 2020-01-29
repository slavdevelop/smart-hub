import axios, { AxiosResponse } from "axios";
import { IIdea } from "../models/idea";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(1000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(1000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(1000))
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url)
      .then(sleep(1000))
      .then(responseBody)
};

const Ideas = {
  list: (): Promise<IIdea[]> => requests.get("/ideas"),
  details: (id: string) => requests.get(`/ideas/${id}`),
  create: (idea: IIdea) => requests.post("/ideas", idea),
  update: (idea: IIdea) => requests.put(`/ideas/${idea.id}`, idea),
  delete: (id: string) => requests.del(`/ideas/${id}`)
};

export default {
  Ideas
};
