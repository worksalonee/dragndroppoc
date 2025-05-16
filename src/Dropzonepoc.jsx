import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import closeIcon from "./assets/close-icon.svg";
import PropertiesPanel from "./PropertiesPanel";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addSection, setCurrentSectionId } from "./redux/sectionsSlice";

const Dropzonepoc = ({
  isPublished,
  setIsPublished,
  setDroppedItems,
  droppedItems,
  onDrop,
  onCopy,
  onDelete,
  onChange,
  handleSubmit,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FORM_ELEMENT",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete" && droppedItems.length > 0) {
        onDelete(droppedItems[droppedItems.length - 1].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [droppedItems, onDelete]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <div
        ref={drop}
        className={`w-full h-full flex flex-col items-center p-5 ${
          isOver ? "bg-black/10" : "bg-transparent"
        }`}
      >
        {isPublished && (
          <>
            <div className="w-full flex justify-end">
              <img
                src={closeIcon}
                alt="Close"
                className="w-4 flex cursor-pointer"
                onClick={() => setIsPublished(!isPublished)}
              />
            </div>
            <div className=" text-sm flex justify-center w-full mb-2">
              <h3 className="font-bold">Form Title</h3>
            </div>
            <div className=" text-base flex justify-center w-full mb-2">
              <h5 className="font-semibold">Section</h5>
            </div>
          </>
        )}

        {droppedItems.length === 0 && (
          <p className="text-gray-500 mt-4">DRAG ELEMENT AND DROP...</p>
        )}

        <div className="w-full flex flex-col items-center">
          {droppedItems.map((item, index) => {
            const fieldName = item.fieldName || `Field ${index + 1}`;
            const fieldType =
              fieldName.toLowerCase() === "phone" ||
              fieldName.toLowerCase() === "number"
                ? "number"
                : fieldName.toLowerCase() === "date"
                ? "date"
                : fieldName.toLowerCase() === "time"
                ? "time"
                : fieldName.toLowerCase() === "email"
                ? "email"
                : fieldName.toLowerCase() === "url"
                ? "url"
                : fieldName.toLowerCase() === "address"
                ? "text"
                : fieldName.toLowerCase() === "upload file"
                ? "file"
                : fieldName.toLowerCase() === "image"
                ? "file"
                : fieldName.toLowerCase() === "video"
                ? "file"
                : fieldName.toLowerCase() === "radio"
                ? "radio"
                : fieldName.toLowerCase() === "multiline"
                ? "textarea"
                : fieldName.toLowerCase() === "singleline"
                ? "text"
                : fieldName.toLowerCase() === "dropdown"
                ? "dropdown"
                : "text";

            return (
              <div
                key={item.id}
                className="flex items-center my-2 w-full max-w-xl"
                onClick={() => setSelectedItem(item)}
              >
                <label className="mr-2 font-bold w-1/4">{fieldName}:</label>
                <div className="flex-1">
                  {fieldType === "dropdown" || fieldName === "DropDown" ? (
                    <select className="border border-gray-300 px-2 py-1 min-w-max w-full rounded">
                      {item.options.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : fieldType === "radio" || item.fieldName === "Radio" ? (
                    <div className="flex gap-4">
                      {item.options.map((option, idx) => (
                        <label key={idx} className="flex items-center gap-1">
                          <input
                            type="radio"
                            name={`radio-${item.id}`}
                            value={option}
                            checked={item.value === option}
                            disabled={!isPublished}
                            onChange={(e) => onChange(item.id, e.target.value)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  ) : fieldType === "textarea" ? (
                    <textarea
                      name={fieldName}
                      disabled={!isPublished}
                      placeholder={item.placeHolder}
                      value={item.value || ""}
                      onChange={(e) => onChange(item.id, e.target.value)}
                      className={`px-2 py-1 rounded w-full ${
                        isPublished
                          ? "border border-black"
                          : "border border-gray-300"
                      }`}
                    />
                  ) : (
                    <input
                      name={fieldName}
                      type={fieldType}
                      disabled={!isPublished}
                      placeholder={item.placeHolder}
                      value={item.value || ""}
                      onChange={(e) => onChange(item.id, e.target.value)}
                      className={`px-2 py-1 mr-2 rounded w-full ${
                        isPublished
                          ? "border border-black"
                          : "border border-gray-300"
                      }`}
                    />
                  )}
                </div>
                {!isPublished && (
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevents PropertiesPanel from opening
                        onCopy(index);
                      }}
                      className="bg-yellow-300 text-green-700 px-2 py-1 rounded text-sm"
                    >
                      COPY
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevents PropertiesPanel from opening
                        onDelete(item.id);
                      }}
                      className="bg-pink-300 text-red-700 px-2 py-1 rounded text-sm"
                    >
                      DELETE
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {isPublished && droppedItems.length > 0 && (
            <div className="flex w-full justify-around mt-4">
              <button className="bg-cyan-800 text-white px-4 py-2 rounded hover:bg-green-400">
                Next
              </button>
              <button
                onClick={() => {
                  handleSubmit();
                  setIsPublished(!isPublished);
                }}
                className="bg-cyan-400 text-green-800 px-4 py-2 rounded hover:bg-cyan-500"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>

      {!isPublished && (
        <PropertiesPanel
          setDroppedItems={setDroppedItems}
          setSelectedItem={setSelectedItem}
          droppedItems={droppedItems}
          itemId={selectedItem?.id}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Dropzonepoc;
