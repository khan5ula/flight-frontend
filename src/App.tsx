import { useEffect, useState } from "react";
import DiaryService from "./services/diaries";
import { DiaryEntry } from "./types";
import Diaries from "./components/Diaries";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    DiaryService.getAll().then((response) => setDiaries(response));
  }, []);

  return (
    <div>
      <DiaryForm diaries={diaries} setDiaries={setDiaries} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
