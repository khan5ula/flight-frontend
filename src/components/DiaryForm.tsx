import { useState } from "react";
import DiaryService from "../services/diaries";
import { DiaryEntry } from "../types";
import { toNewDiaryEntry } from "../utils";
import axios from "axios";

interface DiaryFormProps {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setMessage: (message: string) => void;
}

const DiaryForm = (props: DiaryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const setDiaries = props.setDiaries;
  const setMessage = props.setMessage;

  const createDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const diary = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
      id: 1,
    };

    try {
      const result = await DiaryService.create(toNewDiaryEntry(diary));
      setDiaries((diaries) => diaries.concat(result));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
        const errorMessage = error.response?.data.replace(/'/g, "");
        setMessage(errorMessage);
      } else {
        console.error(error);
      }
    }

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <form onSubmit={createDiary}>
        <input
          value={date}
          placeholder="date"
          onChange={(event) => setDate(event.target.value)}
        />
        <input
          value={visibility}
          placeholder="visibility"
          onChange={(event) => setVisibility(event.target.value)}
        />
        <input
          value={weather}
          placeholder="weather"
          onChange={(event) => setWeather(event.target.value)}
        />
        <input
          value={comment}
          placeholder="comment"
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
