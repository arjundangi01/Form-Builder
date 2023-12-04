import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MdDelete } from "react-icons/md";
import { MdOutlineDragHandle } from "react-icons/md";
const Categorize = () => {
  const [allCategoriesInputValues, setAllCategoriesInputValues] = useState([
    "",
  ]);
  const [allItems, setAllItems] = useState([{id:100}]);
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
    console.log('arjun',source,destination)
    if (!destination || !source || destination==null ) {
     
      return;
    }
    if (destination.droppableId != source.droppableId) {
     

      return
    }
    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ) {
    //   console.log('arjun')

    //   return;
    // }
    let temp;
    let temp2 ={} ;
    let categories = allCategoriesInputValues;
    let items = [...allItems];
    if (
      source.droppableId == "category" &&
      destination.droppableId == "category"
    ) {
      temp = categories[source.index];
      categories[source.index] = categories[destination.index];
      categories[destination.index] = temp;
    }
    if (source.droppableId == "item" && destination.droppableId == "item") {
     
      temp2 = items[source.index];
      console.log('arjun 2',items[source.index],items[destination.index])
      items[source.index] = items[destination.index];
      items[destination.index] = temp2;
      setAllItems(items)
      // console.log( 'arjun 2', items);
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
                setAllItems([...allItems, { itemValue: "", belongTo: "" ,id:Date.now()}])
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
                className=""
              >
                {allItems.map((item, index) => (
                  <Draggable index={index} draggableId={item.id.toString()}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="flex gap-3 mt-2 mb-1 items-center"
                      >
                        <MdOutlineDragHandle />
                        <input
                          type="text"
                          value={item.itemValue}
                          onChange={(e) =>
                            onItemValueChange(
                              index,
                              e.target.value,
                              "itemValue"
                            )
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
                              onItemValueChange(
                                index,
                                e.target.value,
                                "belongTo"
                              )
                            }
                          >
                            <option value="">Choose Category</option>
                            {allCategoriesInputValues.map(
                              (value) =>
                                value && (
                                  <option value={value}> {value} </option>
                                )
                            )}
                          </select>
                          <MdDelete
                            onClick={() => onDeleteItem(index)}
                            className="text-red-500 text-lg "
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
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
