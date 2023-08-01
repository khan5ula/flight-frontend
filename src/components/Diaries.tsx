import { useEffect, useState } from "react";
import { DiaryEntry } from "../types";
import DiaryService from "../services/diaries";
import Diary from "./Diary";

const Diaries = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    DiaryService.getAll().then((response) => setDiaries(response));
  }, []);

  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary, index) => (
        <div key={index}>
          <Diary diary={diary} />
          <br />
        </div>
      ))}
    </div>
  );
};

export default Diaries;
