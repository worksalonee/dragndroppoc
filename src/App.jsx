import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import Aside from "./Aside";
import Dropzonepoc from "./Dropzonepoc";
import { useSelector, useDispatch } from "react-redux";
import { addSection, setCurrentSectionId } from "./redux/sectionsSlice";

function App() {
  const [isPublished, setIsPublished] = useState(false);
  const sections = useSelector((state) => state.sections.sections);
  const currentSectionId = useSelector((state) => state.sections.currentSectionId);
  const dispatch = useDispatch();

  const activeSection = sections.find((sec) => sec.id === currentSectionId);

  const [droppedItems, setDroppedItems] = useState([]);

  const [items, setItems] = useState([
    { id: 1, fieldName: "Single-line", name: "singleLine", value: "", placeholder: "Enter the single line" },
    { id: 2, fieldName: "MUlti-line", name: "multiLine", value: "", placeholder: "Enter the multiline line" },
    { id: 3, name: "phone", fieldName: "phone", value: "", placeholder: "Enter the phone number" },
    { id: 4, name: "email", fieldName: "email", value: "", placeholder: "Enter the email" },
    { id: 5, name: "Address", fieldName: "Address", value: "", placeholder: "Enter Address" },
    { id: 6, name: "Date", fieldName: "Date", value: "", placeholder: "Enter the date" },
    { id: 7, name: "Time", fieldName: "Time", value: "", placeholder: "Enter Time" },
    { id: 8, name: "Dropdown", fieldName: "DropDown", value: "", placeholder: "Enter dropdown" },
    { id: 9, fieldName: "checkbox", name: "Checkbox", value: "", placeholder: "Enter checkbox need to be add" },
    { id: 10, fieldName: "radio", name: "Radio", value: "", placeholder: "radio buttons to be add" },
    { id: 11, fieldName: "upload file", name: "Upload File", value: "", placeholder: "Please Upload File" },
    { id: 12, name: "Image", fieldName: "image", value: "", placeholder: "Please Upload Image" },
    { id: 13, name: "Video", fieldName: "video", value: "", placeholder: "Please Upload Video" },
    { id: 14, name: "url", fieldName: "url", value: "", placeholder: "Enter url" },
  ]);

  const handleDrop = (item) => {
    const newItem = {
      ...item,
      id: uuidv4(),
      value: "",
      placeholder: item.placeholder,
      sectionId: currentSectionId,
    };
    setDroppedItems((prevItems) => [...prevItems, newItem]);
  };

  const handleCopy = (index) => {
    const copiedItem = { ...droppedItems[index], id: uuidv4() };
    setDroppedItems((prevItems) => [...prevItems, copiedItem]);
  };

  const handleDelete = (id) => {
    setDroppedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleChange = (id, newValue) => {
    setDroppedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, value: newValue } : item
      )
    );
  };

  const handleSubmit = () => {
    console.log(JSON.stringify(droppedItems), "<==== formData");
  };

  const handleAddSection = () => {
    const newSectionId = uuidv4();
    dispatch(addSection({ id: newSectionId }));
    dispatch(setCurrentSectionId(newSectionId));
  };

  return (
    <>
      {!isPublished ? (
        <DndProvider backend={HTML5Backend}>
          <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-b from-cyan-50 to-cyan-300">
            <Header
              isPublished={isPublished}
              setIsPublished={setIsPublished}
              formData={droppedItems}
            />
            <div className="flex h-screen overflow-hidden">
              <Aside items={items} />

              {/* Section List */}
              <div className="flex flex-col items-center gap-2 py-5 px-5 w-[20%]">
                {sections.map((section, index) => (
                  <div key={section.id} className="flex flex-col items-center">
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => dispatch(setCurrentSectionId(section.id))}
                    >
                      <div
                        className={`rounded-full w-8 h-8 flex items-center justify-center font-bold
                          ${
                            section.id === currentSectionId
                              ? "bg-gradient-to-r from-pink-500 to-red-500 text-white"
                              : "bg-gradient-to-r from-cyan-700 to-teal-600 text-white"
                          }
                        `}
                      >
                        {index + 1}
                      </div>
                      <div className="bg-gradient-to-r from-cyan-700 to-teal-600 text-white rounded-r-md px-3 py-1 font-normal">
                        {section.name || `Section ${index + 1}`}
                      </div>
                    </div>
                    {index !== sections.length - 1 && (
                      <div className="h-3 bg-teal-400"></div>
                    )}
                  </div>
                ))}
                <div
                  className="flex flex-col items-center mt-4 cursor-pointer"
                  onClick={handleAddSection}
                >
                  <span className="text-cyan-700 hover:underline">+ Add Section</span>
                </div>
              </div>

              {/* Main Dropzone */}
              <main className="bg-gradient-to-b from-cyan-50 to-cyan-300 w-full flex flex-col justify-center items-center gap-5">
                {!isPublished && (
                  <div className="bg-white h-[10%] w-[90%] text-teal-200 p-4 rounded-xl flex flex-col items-center justify-center">
                    <input
                      type="text"
                      placeholder="Form Title"
                      className="w-full text-cyan-800 font-medium text-lg text-center border-none outline-none bg-transparent"
                    />
                  </div>
                )}

                <div className="bg-white border-dotted h-[85%] w-[90%] min-h-max rounded-[10px]">
                  {activeSection && (
                    <div className="bg-teal-600 w-full text-white text-lg font-normal py-2 px-5 rounded-md ">
                      {activeSection.name || currentSectionId}
                    </div>
                  )}
                  <Dropzonepoc
                    isPublished={isPublished}
                    setIsPublished={setIsPublished}
                    handleSubmit={handleSubmit}
                    onDrop={handleDrop}
                    setDroppedItems={setDroppedItems}
                    droppedItems={droppedItems.filter(
                      (item) => item.sectionId === currentSectionId
                    )}
                    onCopy={handleCopy}
                    onDelete={handleDelete}
                    onChange={handleChange}
                  />
                </div>
              </main>
            </div>
          </div>
        </DndProvider>
      ) : (
        <DndProvider backend={HTML5Backend}>
          <div className="w-full h-screen flex flex-col items-center overflow-hidden bg-gradient-to-b from-cyan-50 to-cyan-300">
            <div className="h-auto overflow-auto w-[70%] flex bg-white text-teal-600 mt-5 rounded-[10px] flex-col justify-between items-center">
              <Dropzonepoc
                isPublished={isPublished}
                setIsPublished={setIsPublished}
                handleSubmit={handleSubmit}
                onDrop={handleDrop}
                setDroppedItems={setDroppedItems}
                droppedItems={droppedItems.filter(
                  (item) => item.sectionId === currentSectionId
                )}
                onCopy={handleCopy}
                onDelete={handleDelete}
                onChange={handleChange}
                activeSection={activeSection}
              />
            </div>
          </div>
        </DndProvider>
      )}
    </>
  );
}

export default App;
