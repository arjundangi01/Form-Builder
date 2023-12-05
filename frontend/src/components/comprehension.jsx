import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MdDelete } from "react-icons/md";
import { MdOutlineDragHandle } from "react-icons/md";
const Comprehension = () => {
  const [allCategoriesInputValues, setAllCategoriesInputValues] = useState([
    "",
  ]);
  const [allQuestions, setAllQuestions] = useState(["q1"]);
  const [allItems, setAllItems] = useState([{ id: 100 }]);
  const handleInputChange = (index, value) => {
    // console.log(value);
    const newInputValues = [...allCategoriesInputValues];
    newInputValues[index] = value;
    setAllCategoriesInputValues(newInputValues);
  };
  const deleteCategory = (index) => {
    let newAllCategory = [...allCategoriesInputValues];
    newAllCategory.splice(index, 1);
    setAllCategoriesInputValues(newAllCategory);
  };
  const onDeleteItem = (index) => {
    // console.log(index);
    let newAllItems = [...allItems];
    newAllItems.splice(index, 1);
    console.log(newAllItems);
    setAllItems(newAllItems);
  };
  const onItemValueChange = (index, value, role) => {
    if (role === "itemValue") {
      let newAllItems = [...allItems];
      newAllItems[index].itemValue = value;
      setAllItems(newAllItems);
    } else {
      let newAllItems = [...allItems];
      newAllItems[index].belongTo = value;
      setAllItems(newAllItems);
    }
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
    let categories = allCategoriesInputValues;
    let items = [...allItems];
    if (
      source.droppableId ==  destination.droppableId 
    ) {
      temp = categories[source.index];
      categories[source.index] = categories[destination.index];
      categories[destination.index] = temp;
    }
    if (source.droppableId == "item" && destination.droppableId == "item") {
      temp2 = items[source.index];
      console.log("arjun 2", items[source.index], items[destination.index]);
      items[source.index] = items[destination.index];
      items[destination.index] = temp2;
      setAllItems(items);
      // console.log( 'arjun 2', items);
      // console.log( 'arjun 2', items);
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
        {allQuestions.map((question) => (
          <div className="border px-3 py-2">
            <h1>Question 1</h1>
            <textarea className="border w-[60%] h-24 ps-3"></textarea>
            <h1>Options</h1>
            <button
              onClick={() =>
                setAllCategoriesInputValues([...allCategoriesInputValues, ""])
              }
              className="block border bg-blue-400 text-white px-2 py-1 rounded-lg mb-3 hover:bg-blue-500"
            >
              Add More
            </button>
            <Droppable droppableId={question}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col gap-2 w-[100%] md:w-[80%] lg:w-[35%]  "
                >
                  {allCategoriesInputValues?.map((value, index) => (
                    <Draggable draggableId={index.toString()} index={index}>
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
                              handleInputChange(index, e.target.value)
                            }
                          />
                          <MdDelete
                            className="text-red-500 text-[1.2rem]"
                            onClick={() => deleteCategory(index)}
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
