import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MdDelete } from "react-icons/md";
import { MdOutlineDragHandle } from "react-icons/md";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
const Cloze = () => {

  const [content, setContent] = useState('');
  const [underlinedWords, setUnderlinedWords] = useState([]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline',  ],
      
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline',
    
  ];

  const handleContentChange = (value) => {
    setContent(value);

    // Extract underlined words from HTML content
    const extractedWords = value.match(/<u>(.*?)<\/u>/g) || [];
    const cleanedWords = extractedWords.map(word => word.replace(/<\/?u>/g, ''));
    setUnderlinedWords(cleanedWords);
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
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {

      return;
    }
    let temp;
    let temp2 ={} ;
    let categories = underlinedWords;
   
    if (
      source.droppableId == "category" &&
      destination.droppableId == "category"
    ) {
      temp = categories[source.index];
      categories[source.index] = categories[destination.index];
      categories[destination.index] = temp;
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
        <h1 className="my-3">Sentence</h1>

        <ReactQuill
        value={content}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
      />

        
        <h1>Options</h1>
        
        <Droppable droppableId="category">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col gap-2 w-[100%] md:w-[80%] lg:w-[35%]  "
            >
              {underlinedWords?.map((value, index) => (
                <Draggable draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <div
                      className="flex items-center gap-3"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <MdOutlineDragHandle />
                      {/* <input
                        key={index}
                        type="text"
                        value={value}
                        className="h-10 border ps-3"
                        
                      /> */}
                      <div  className="h-20 w-[140px] border ps-3">
                        {value }
                      </div>
                      
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        
      </main>
    </DragDropContext>
  );
};

export default Cloze;
