import React, { useState } from "react";
import Categorize from "../../components/categorize";
import Cloze from "../../components/cloze";
import Comprehension from "../../components/comprehension";
import { DragDropContext } from "react-beautiful-dnd";
// --
// --
// --
// --
// --
// --
// --
// --
// --
// --
// --

const Create = () => {
  const [allQuestionType, setAllQuestionType] = useState([
    { type: "categorize" },
  ]);
  return (
    <main className="w-[60%] m-auto mt-20 pb-10 flex flex-col gap-14">
      <button
        onClick={() =>
          setAllQuestionType([...allQuestionType, { type: "categorize" }])
        }
        className="block border bg-blue-400 text-white px-2 py-1 rounded-lg mb-3 hover:bg-blue-500"
      >
        Add Question
      </button>
      {allQuestionType.map((question, indexOfQuestionType) => (
        <>
          {question.type == "categorize" && (
            <Categorize indexOfQuestionType={indexOfQuestionType} setAllQuestionType={setAllQuestionType} />
          )}
          {question.type == "cloze" && (
            <Cloze indexOfQuestionType={indexOfQuestionType} setAllQuestionType={setAllQuestionType} />
          )}
          {question.type == "comprehension" && (
            <Comprehension indexOfQuestionType={indexOfQuestionType} setAllQuestionType={setAllQuestionType} />
          )}
        </>
      ))}
    </main>
  );
};

export default Create;
