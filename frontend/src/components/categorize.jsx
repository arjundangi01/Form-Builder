import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
const Categorize = () => {
  const [allCategoriesInputValues, setAllCategoriesInputValues] = useState([
    "",
  ]);
  const [allItems, setAllItems] = useState([{  }]);
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
      console.log(newAllItems)
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
  return (
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
      <div className="flex flex-col gap-2 w-[30%] ">
        {allCategoriesInputValues?.map((value, index) => (
          <>
            <div className="flex items-center gap-3">
              <input
                key={index}
                type="text"
                value={value}
                className="h-10 border ps-3"
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <MdDelete
                className="text-red-500 text-lg"
                onClick={() => deleteCategory(index)}
              />
            </div>
          </>
        ))}
      </div>

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
        <div className="grid grid-cols-2    gap-3">
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
                    (value) => value && <option value={value}> {value} </option>
                  )}
                </select>
                <MdDelete
                  onClick={() => onDeleteItem(index)}
                  className="text-red-500 text-lg "
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Categorize;
