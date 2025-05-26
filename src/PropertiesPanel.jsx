import React from "react";
import { useSelector } from "react-redux";

const PropertiesPanel = ({
  setDroppedItems,
  droppedItems,
  itemId,
  onClose,
}) => {
  const item = droppedItems.find((el) => el.id === itemId);
  console.log("Unique Id---", itemId);
  if (!item) return null;

  const handleChange = (key, value) => {
    const updatedDroppedItems = droppedItems.map((droppedItem) =>
      droppedItem.id === item.id
        ? { ...droppedItem, [key]: value }
        : droppedItem
    );
    setDroppedItems(updatedDroppedItems);
  };

  const options = Array.isArray(item.options?.options)
    ? item.options.options
    : Array.isArray(item.options)
    ? item.options
    : [];

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-gray-500/30 z-40 transition-opacity duration-500 ${
          item ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`fixed top-0 right-0 h-full overflow-x-hidden w-96 bg-gradient-to-b from-cyan-100 to-blue-400 shadow-lg z-50 transition-transform duration-500 ease-in-out transform ${
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
          {/* Label */}
          <label className="block mb-2 font-medium">Label</label>
          <input
            className="border p-2 w-full rounded"
            value={item.fieldName || ""}
            onChange={(e) => handleChange("fieldName", e.target.value)}
          />

          {/* Placeholder */}
          <label className="block mt-4 mb-2 font-medium">Placeholder</label>
          <input
            className="border p-2 w-full rounded"
            value={item.placeHolder || ""}
            onChange={(e) => handleChange("placeHolder", e.target.value)}
          />

          {/* Validations */}
          <h3 className="text-md font-semibold mb-2 mt-6">Validations</h3>

          <div className="flex items-center mb-4">
            <label className="mr-4 font-medium">Required</label>
            <input
              type="checkbox"
              checked={item.required || false}
              onChange={(e) => handleChange("required", e.target.checked)}
              className="toggle"
            />
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Min Length</label>
              <input
                type="number"
                className="border p-2 w-full rounded"
                value={item.minLength || 0}
                onChange={(e) =>
                  handleChange("minLength", parseInt(e.target.value, 10))
                }
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Max Length</label>
              <input
                type="number"
                className="border p-2 w-full rounded"
                value={item.maxLength || 0}
                onChange={(e) =>
                  handleChange("maxLength", parseInt(e.target.value, 10))
                }
              />
            </div>
          </div>

          <label className="block mb-1 font-medium">Pattern</label>
          <input
            className="border p-2 w-full rounded mb-4"
            value={item.pattern || ""}
            placeholder="Enter Regular Expression here..."
            onChange={(e) => handleChange("pattern", e.target.value)}
          />

          {/* Options */}
          <h3 className="text-md font-semibold mb-2">Options</h3>

          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  if (item.options && Array.isArray(item.options.options)) {
                    handleChange("options", {
                      ...item.options,
                      options: newOptions,
                    });
                  } else {
                    handleChange("options", newOptions);
                  }
                }}
                className="flex-1 p-2 border rounded mr-2"
              />
              <button
                onClick={() => {
                  const newOptions = options.filter((_, i) => i !== index);
                  if (item.options && Array.isArray(item.options.options)) {
                    handleChange("options", {
                      ...item.options,
                      options: newOptions,
                    });
                  } else {
                    handleChange("options", newOptions);
                  }
                }}
                className="text-red-500 hover:text-red-700 text-xl"
              >
                ×
              </button>
            </div>
          ))}

          <button
            onClick={() => {
              const newOptions = [...options, ""];
              handleChange("options", newOptions);
            }}
            className="text-teal-700 mt-2 text-sm underline"
          >
            + Add Option
          </button>
        </div>
      </div>
    </>
  );
};

export default PropertiesPanel;
