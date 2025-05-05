import React from "react";

const PropertiesPanel = ({setDroppedItems, droppedItems,itemId, onClose }) => {
    const item = droppedItems.find((el) => el.id === itemId);
    if (!item) return null;

  
  const handleChange = (key, value) => {

    const updatedDroppedItems = droppedItems.map((droppedItem) => {
        // console.log("Checking item:", droppedItem.id);
    
        if (droppedItem.id === item.id) {
          const updatedItem = { ...droppedItem, [key]: value };
        //   console.log("✅ Updating item:", updatedItem);
          return updatedItem;
        } else {
          return droppedItem;
        }
      });
    
    //   console.log("🆕 Updated droppedItems array:", updatedDroppedItems);
      setDroppedItems(updatedDroppedItems);
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
      className={`fixed top-0 right-0 h-full w-96 bg-gradient-to-b from-cyan-100  to-blue-400 shadow-lg z-50 transition-transform duration-[1500ms] ease-in-out transform ${
        item ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Properties</h2>
        <button onClick={onClose} className="text-xl">×</button>
      </div>

      <div className="p-4">
        <label className="block mb-2 font-medium">Label</label>
        <input
          className="border p-2 w-full rounded"
          value={item.fieldName||""}
          onChange={(e)=>handleChange("fieldName",e.target.value)}
          
        />
        <label className="block mt-4 mb-2 font-medium">Placeholder</label>
        <input
          className="border p-2 w-full rounded"
          value={item.placeHolder||""}
          onChange={(e)=>handleChange("placeHolder",e.target.value)}
          
        />
      </div>
    </div>
    </>
  );
};

export default PropertiesPanel;
