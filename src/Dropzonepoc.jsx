import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import closeIcon from "./assets/close-icon.svg";
import PropertiesPanel from "./PropertiesPanel";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSectionId } from "./redux/sectionsSlice";
import Dropdown from "./Dropdown";


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
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);

  const currentSectionId = useSelector((state) => state.sections.currentSectionId);
  const sections = useSelector((state) => state.sections.sections) || [];

  const sectionIds = sections.map((section) => section.id);
  const currentIndex = sectionIds.indexOf(currentSectionId);

  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex === sectionIds.length - 1;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FORM_ELEMENT",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  console.log("droppedItems------------->",droppedItems)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete" && droppedItems.length > 0) {
        onDelete(droppedItems[droppedItems.length - 1].id);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [droppedItems, onDelete]);

  const goToNext = () => {
    if (!isLastPage) {
      dispatch(setCurrentSectionId(sectionIds[currentIndex + 1]));
    }
  };

  const goToPrevious = () => {
    if (!isFirstPage) {
      dispatch(setCurrentSectionId(sectionIds[currentIndex - 1]));
    }
  };
console.log(selectedItem,"SelectedItem===")
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
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
                onClick={() => setIsPublished(false)}
              />
            </div>
            <div className="text-sm flex justify-center w-full mb-2">
              <h3 className="font-bold">Form Title</h3>
            </div>
            <div className="text-base flex justify-center w-full mb-2">
              <span className="text-cyan-600">
                Section: {currentSectionId}
              </span>
            </div>
          </>
        )}

        {droppedItems.length === 0 && (
          <p className="text-gray-500 mt-4">DRAG ELEMENT AND DROP...</p>
        )}

        <div className="w-full flex flex-col items-center">
          {droppedItems.map((item, index) => {
            
            const fieldName = item.fieldName || `Field ${index + 1}`;
            let fieldType=item.type;


            return (
              <div
                key={item.id}
                className="flex items-center my-2 w-full max-w-xl"
                onClick={() => setSelectedItem(item)}
                
              >
                {console.log(item,"Item==")}
                <label className="mr-2 font-bold w-1/4">{fieldName}:</label>
                <div className="flex-1">
                  {fieldType === "dropdown" ? (
                    <Dropdown
                      data={item}
                      handleChange={onChange}
                    />
                  ) : fieldType === "radio" ? (
                    <div className="flex gap-4">
                      {item?.options?.options?.map((option, idx) => (
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
                        isPublished ? "border border-black" : "border border-gray-300"
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
                        isPublished ? "border border-black" : "border border-gray-300"
                      }`}
                    />
                  )}
                </div>

                {!isPublished && (
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopy(index);
                      }}
                      className="bg-yellow-300 text-green-700 px-2 py-1 rounded text-sm"
                    >
                      COPY
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
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

          {isPublished &&  (
            <div className="flex w-full justify-around mt-4">
              {!isFirstPage && (
                <button
                  onClick={goToPrevious}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Back
                </button>
              )}
              {!isLastPage ? (
                <button
                  onClick={goToNext}
                  className="bg-yellow-300 text-white px-4 py-2 rounded hover:bg-green-400"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleSubmit();
                    setIsPublished(false);
                  }}
                  className="bg-cyan-400 text-green-800 px-4 py-2 rounded hover:bg-cyan-500"
                >
                  Submit
                </button>
              )}
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
