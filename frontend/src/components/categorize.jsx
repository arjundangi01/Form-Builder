import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MdDelete } from "react-icons/md";
import { MdOutlineDragHandle } from "react-icons/md";
const Categorize = () => {
  const [allCategoriesInputValues, setAllCategoriesInputValues] = useState([
    "",
  ]);
  const [allItems, setAllItems] = useState([{}]);
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
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    let temp;
    let categories = [...allCategoriesInputValues];
    if (source.droppableId == destination.droppableId) {
      console.log('in')
      temp = categories[source.index];
      categories[source.index] = categories[destination.index];
      categories[destination.index] = temp;
      setAllCategoriesInputValues(categories);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="border-l-blue-500 border-l ps-4">
        <select name="" id="">
          <option value="">Select Category</option>
          <option value=""></option>
        </select>
        <h1>Question 1</h1>
        <textarea className="border w-[60%] h-24 ps-3"></textarea>
        <h1>Categories</h1>
        <button
          onClick={() =>
            setAllCategoriesInputValues([...allCategoriesInputValues, ""])
          }
          className="block border bg-blue-400 text-white px-2 py-1 rounded-lg mb-3 hover:bg-blue-500"
        >
          Add More
        </button>
        <Droppable droppableId="category">
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

        <div className=" border-t border-t-black mt-3">
          <div>
            <h1>All Items</h1>
            <button
              onClick={() =>
                setAllItems([...allItems, { itemValue: "", belongTo: "" }])
              }
              className="block border bg-blue-400 text-white px-2 py-1 rounded-lg mb-3 hover:bg-blue-500"
            >
              Add More
            </button>
          </div>
          <div className="flex gap-5 justify-between w-[70%] items-center">
            <div>
              <h1 className="">Item</h1>
            </div>
            <div>
              <h1>Belongs To</h1>
            </div>
          </div>
          <Droppable droppableId="item">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid grid-cols-2  gap-3"
              >
                {allItems.map((item, index) => (
                  <>
                    <input
                      type="text"
                      value={item.itemValue}
                      onChange={(e) =>
                        onItemValueChange(index, e.target.value, "itemValue")
                      }
                      className="h-10 border ps-3"
                    />
                    <div className="flex items-center gap-3">
                      <select
                        name=""
                        id=""
                        className="border"
                        value={item.belongTo}
                        onChange={(e) =>
                          onItemValueChange(index, e.target.value, "belongTo")
                        }
                      >
                        <option value="">Choose Category</option>
                        {allCategoriesInputValues.map(
                          (value) =>
                            value && <option value={value}> {value} </option>
                        )}
                      </select>
                      <MdDelete
                        onClick={() => onDeleteItem(index)}
                        className="text-red-500 text-lg "
                      />
                    </div>
                  </>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </main>
    </DragDropContext>
  );
};

export default Categorize;
