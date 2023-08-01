import axios from "axios";
import { DiaryEntry } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = () => {
  const request = axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);
  return request.then((response) => response.data);
};

export default { getAll };
