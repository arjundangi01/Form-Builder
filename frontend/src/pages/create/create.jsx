import React from "react";
import Categorize from "../../components/categorize";
import Cloze from "../../components/cloze";
import Comprehension from "../../components/comprehension";
import { DragDropContext } from "react-beautiful-dnd";
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
};
const Create = () => {
  return (
    
      <main className="w-[60%] m-auto mt-20">
        <Categorize />
        {/* <Cloze />
      <Comprehension /> */}
      </main>
   
  );
};

export default Create;
