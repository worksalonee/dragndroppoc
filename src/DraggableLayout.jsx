import React from 'react'

const DraggableLayout = ({ width }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("layout", width);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-gray-200 text-center text-sm font-medium py-2 px-1 rounded-md cursor-move"
      style={{ flex: "1" }}
    >
      {width}
    </div>
  );
};

export default DraggableLayout
