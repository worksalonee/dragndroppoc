import React, { useState, useEffect } from "react";

const PropertiesPanel = ({ setDroppedItems, droppedItems, itemId, onClose }) => {
  const item = droppedItems.find((el) => el.id === itemId);
  const [options, setOptions] = useState(item?.options || []);

  useEffect(() => {
    if (item?.type === "dropdown") {
      setOptions(item.options || []);
    }
  }, [item]);

  if (!item) return null;

  const handleChange = (key, value) => {
    const updatedDroppedItems = droppedItems.map((droppedItem) =>
      droppedItem.id === item.id ? { ...droppedItem, [key]: value } : droppedItem
    );
    setDroppedItems(updatedDroppedItems);
  };

  const updateOptions = (newOptions) => {
    setOptions(newOptions);
    const updatedDroppedItems = droppedItems.map((droppedItem) =>
      droppedItem.id === item.id ? { ...droppedItem, options: newOptions } : droppedItem
    );
    setDroppedItems(updatedDroppedItems);
  };

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    updateOptions(updated);
  };

  const handleAddOption = () => {
    const updated = [...options, ""];
    updateOptions(updated);
  };

  const handleRemoveOption = (index) => {
    const updated = options.filter((_, i) => i !== index);
    updateOptions(updated);
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-gray-500/30 z-40 transition-opacity duration-500 ${
          item ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-gradient-to-b from-cyan-100 to-blue-400 shadow-lg z-50 transition-transform duration-[1500ms] ease-in-out transform ${
          item ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Properties</h2>
          <button onClick={onClose} className="text-xl">
            ×
          </button>
        </div>

        <div className="p-4">
          <label className="block mb-2 font-medium">Label</label>
          <input
            className="border p-2 w-full rounded"
            value={item.fieldName || ""}
            onChange={(e) => handleChange("fieldName", e.target.value)}
          />
          <label className="block mt-4 mb-2 font-medium">Placeholder</label>
          <input
            className="border p-2 w-full rounded"
            value={item.placeHolder || ""}
            onChange={(e) => handleChange("placeHolder", e.target.value)}
          />

          {/* Only show options editor if it's a dropdown */}
          {item.name === "Dropdown" && (
            <div className="mt-6">
              <h3 className="text-md font-semibold text-center text-teal-700 border-b pb-1 mb-4">Options</h3>
              {options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    className="flex-1 px-2 py-1 rounded bg-gray-100 border border-gray-300"
                  />
                  <button
                    onClick={() => handleRemoveOption(idx)}
                    className="text-white bg-red-500 hover:bg-red-600 rounded-full px-2 py-1 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddOption}
                className="flex items-center text-teal-600 font-medium mt-2"
              >
                <span className="text-xl mr-1">＋</span> Add Option
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PropertiesPanel;
