import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MdDelete } from "react-icons/md";
import { MdOutlineDragHandle } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

const Comprehension = () => {
  const [allCategoriesInputValues, setAllCategoriesInputValues] = useState([
    "",
  ]);
  const [allQuestions, setAllQuestions] = useState([
    { que: uuidv4(), allCategoriesInputValues: [""], content: "" },
  ]);
  const [allItems, setAllItems] = useState([{ id: 100 }]);
  const handleInputChange = (index, value, indexOfQuestion) => {
    // console.log(value);
    const allNewQuestion = [...allQuestions];
    const newQuestion = allNewQuestion[indexOfQuestion];
    const newInputValues = [...newQuestion.allCategoriesInputValues];
    newInputValues[index] = value;
    newQuestion.allCategoriesInputValues = newInputValues;
    allNewQuestion[indexOfQuestion] = newQuestion;
    setAllQuestions(allNewQuestion);
  };
  const onDeleteOption = (index,indexOfQuestion) => {
    let newAllQuestion = [...allQuestions];
    newAllQuestion[indexOfQuestion].allCategoriesInputValues.splice(index, 1);
    setAllCategoriesInputValues(newAllQuestion);
  };
  const onAddNewQuestion = () => {
     setAllQuestions([...allQuestions,{ que: uuidv4(), allCategoriesInputValues: [""], content: "" }])
    
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log("arjun", source, destination);
    if (!destination || !source || destination == null) {
      return;
    }
    if (destination.droppableId != source.droppableId) {
      return;
    }
    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ) {
    //   console.log('arjun')

    //   return;
    // }
    let temp;
    let temp2 = {};
    let allNewQuestions = allQuestions;
   
    if (source.droppableId == destination.droppableId) {
        return
    }
    
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="border-l-blue-500 border-l ps-4">
        <select name="" id="">
          <option value="">Select Category</option>
          <option value=""></option>
        </select>
        <h1>Paragraph</h1>
        <textarea className="border w-[60%] h-32 ps-3"></textarea>
        <button
          onClick={onAddNewQuestion}
          className="block border bg-blue-400 text-white px-2 py-1 rounded-lg mb-3 hover:bg-blue-500">
          Add More Question
        </button>
        {allQuestions.map((question, indexOfQuestion) => (
          <div className="border px-3 py-2">
            <h1>Question 1</h1>
            <textarea className="border w-[60%] h-24 ps-3"></textarea>
            <h1>Options</h1>
            <button
              onClick={() => {
                const newQuestion = {
                  ...question,
                  allCategoriesInputValues: [
                    ...question.allCategoriesInputValues,
                    "",
                  ],
                };
                const newAllQuestion = [...allQuestions];
                newAllQuestion[indexOfQuestion] = newQuestion;
                setAllQuestions(newAllQuestion);
              }}
              className="block border bg-blue-400 text-white px-2 py-1 rounded-lg mb-3 hover:bg-blue-500"
            >
              Add More
            </button>
            <Droppable droppableId={question.que}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col gap-2 w-[100%] md:w-[80%] lg:w-[35%]  "
                >
                  {question.allCategoriesInputValues?.map((value, index) => (
                    <Draggable draggableId={question.que+index.toString()} index={index}>
                      {(provided) => (
                        <div
                          className="flex items-center gap-3"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <MdOutlineDragHandle />
                          <input
                            key={index}
                            type="text"
                            value={value}
                            className="h-10 border ps-3"
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                e.target.value,
                                indexOfQuestion
                              )
                            }
                          />
                          <MdDelete
                            className="text-red-500 text-[1.2rem]"
                            onClick={() => onDeleteOption(index,indexOfQuestion)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </main>
    </DragDropContext>
  );
};

export default Comprehension;
