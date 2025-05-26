import React, { useState } from "react";
import { useSelector } from "react-redux";
import Dragitempoc from "./Dragitempoc";
import DraggableLayout from "./DraggableLayout";

const Aside = () => {
  const [activeTab, setActiveTab] = useState("elements"); // "elements" or "layouts"
  const items = useSelector((state) => state.sections.items);

  const layoutPresets = [
    ["50%", "50%"],
    ["25%", "25%", "25%", "25%"],
    ["33.33%", "33.33%", "33.33%"],
    ["25%", "75%"],
  ];

  // Group elements in pairs
  const groupedItems = [];
  for (let i = 0; i < items.length; i += 2) {
    groupedItems.push(items.slice(i, i + 2));
  }

  return (
    <aside className="w-80 min-w-80 max-w-80 h-[80%] bg-gradient-to-b from-cyan-300 to-blue-200 p-4 m-5 rounded-lg overflow-y-auto">
      {/* Tabs */}
      <div className="flex bg-white rounded overflow-hidden mb-4">
        <button
          onClick={() => setActiveTab("elements")}
          className={`flex-1 py-2 font-semibold ${
            activeTab === "elements"
              ? "bg-white text-cyan-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Elements
        </button>
        <button
          onClick={() => setActiveTab("layouts")}
          className={`flex-1 py-2 font-semibold ${
            activeTab === "layouts"
              ? "bg-white text-cyan-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Layouts
        </button>
      </div>

      {/* Tab content */}
      <div className="space-y-4">
        {activeTab === "elements" &&
          groupedItems.map((pair, index) => (
            <div key={index} className="flex space-x-2">
              {pair.map((item) => (
                <div key={item.name} className="flex-1">
                  <Dragitempoc
                    name={item.name}
                    fieldName={item.fieldName}
                    color={item.color}
                    placeHolder={item.placeHolder}
                    options={item.options}
                    type={item?.type}
                  />
                </div>
              ))}
              {pair.length === 1 && <div className="flex-1" />}
            </div>
          ))}

        {activeTab === "layouts" &&
          layoutPresets.map((layout, index) => (
            <div
              key={index}
              className="flex justify-between space-x-2 bg-white rounded-md p-2"
            >
              {layout.map((width, i) => (
                <DraggableLayout key={i} width={width} />
              ))}
            </div>
          ))}
      </div>
    </aside>
  );
};

export default Aside;
  