import React, { useState } from "react";
import Dragitempoc from "./Dragitempoc";
// import { FaFont, FaAlignLeft, FaPhone, FaEnvelope, FaHashtag, FaCalendar, FaClock, FaList, FaCheckSquare, FaDotCircle, FaUpload, FaImage, FaVideo, FaLink } from "react-icons/fa";

const Aside = ({items}) => {
  const [activeTab, setActiveTab] = useState("elements");

  const layoutData = [
    { type: "1", layout: [100] },
    { type: "1/2", layout: [50, 50] },
    { type: "1/3", layout: [33.33, 33.33, 33.33] },
    { type: "1/4", layout: [25, 25, 25, 25] },
  ];
  console.log(items, "items in aside");

  // const items = [
  //   { name: "singleLine", fieldName: "Single-line", placeHolder: "" },
  //   { name: "multiLine", fieldName: "Multi-line", placeHolder: ""  },
  //   { name: "phone", fieldName: "Phone", placeHolder: "" },
  //   { name: "email", fieldName: "Email", placeHolder: "" },
  //   { name: "number", fieldName: "Number", placeHolder: "" },
  //   { name: "date", fieldName: "Date", placeHolder: "" },
  //   { name: "time", fieldName: "Time", placeHolder: ""},
  //   { name: "dropdown", fieldName: "DropDown", placeHolder: "" },
  //   { name: "checkbox", fieldName: "CheckBox", placeHolder: "" },
  //   { name: "radio", fieldName: "Radio", placeHolder: ""},
  //   { name: "uploadFile", fieldName: "Upload File", placeHolder: ""},
  //   { name: "dateTime", fieldName: "Date Time", placeHolder: "" },
  // ];

  return (
    <aside className="w-80 bg-gradient-to-b from-cyan-300 to-blue-200 p-4 m-5 rounded-lg overflow-y-auto">
      {/* Tabs */}
      <div className="flex border-b border-white mb-4">
        <button
          className={`flex-1 p-2 font-semibold ${
            activeTab === "elements"
              ? "bg-white text-cyan-700 rounded-t-md"
              : "text-white"
          }`}
          onClick={() => setActiveTab("elements")}
        >
          Elements
        </button>
        <button
          className={`flex-1 p-2 font-semibold ${
            activeTab === "layouts"
              ? "bg-white text-cyan-700 rounded-t-md"
              : "text-white"
          }`}
          onClick={() => setActiveTab("layouts")}
        >
          Layouts
        </button>
      </div>

      {/* Elements View */}
      {activeTab === "elements" && (
        <div className="grid grid-cols-2 gap-2">
          {items.map((item) => (
            <div key={item.name}>
              <Dragitempoc
                name={item.name}
                fieldName={item.fieldName}
                placeHolder={item.placeholder}
                icon={item.icon}
              />
              {/* <p>{item.name}</p> */}
            </div>
          ))}
        </div>
      )}

      {/* Layouts View */}
      {activeTab === "layouts" && (
        <div className="space-y-2">
          {layoutData.map((layout, index) => (
            <div key={index}>
              <Dragitempoc
                name={`layout-${layout.type}`}
                fieldName={`${layout.type} Layout`}
                layout={layout.layout}
                type="layout"
              />
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default Aside;
