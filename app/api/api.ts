import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{
  error: string;
  response: {
    message: string;
    validation: { body: { message: string } };
  };
}>;

export const api = axios.create({
  /* Посилання на бекенд */
  baseURL: "https://",
  withCredentials: true,
});
