import React from "react";
import Dragitempoc from "./Dragitempoc";

const Aside = () => {
  const items = [
    { name: "singleLine", fieldName: "Single-line", placeHolder: "Enter the single line" },
    { name: "multiLine", fieldName: "Multi-line", placeHolder: "Enter the multiline line" },
    { name: "phone", fieldName: "Phone", placeHolder: "Enter the phone number" },
    { name: "email", fieldName: "Email", placeHolder: "Enter the email" },
    { name: "address", fieldName: "Address",placeHolder: "Enter Address" },
    { name: "date", fieldName: "Date", placeHolder: "Enter the date" },
    { name: "time", fieldName: "Time", placeHolder: "Enter Time" },
    { name: "dropdown", fieldName: "DropDown", placeHolder: "Enter dropdown" },
    { name: "checkbox", fieldName: "CheckBox",placeHolder: "Enter checkbox need to be add" },
    { name: "radio", fieldName: "Radio",placeHolder: "radio buttons to be add" },
    { name: "uploadFile", fieldName: "Upload File",placeHolder: "Please Upload File" },
    { name: "image", fieldName: "Image",placeHolder: "Please Upload Image" },
    { name: "video", fieldName: "Video",placeHolder: "Please Upload Video" },
    { name: "url", fieldName: "URL",placeHolder: "Enter url" },
  ];

  // Split items into groups of 2
  const groupedItems = [];
  for (let i = 0; i < items.length; i += 2) {
    groupedItems.push(items.slice(i, i + 2));
  }

  return (
    <aside className="w-80 max-h-full bg-gradient-to-b from-cyan-300 to-blue-200 p-4 m-5 rounded-lg">
      {/* <div className="mb-4">
        <button className="ml-3 p-3 font-semibold text-gray-600 border-2 rounded-lg ">Elements</button>
        <button className="ml-3 p-3 font-semibold text-gray-600 border-2 rounded-lg ">Elements</button>
      </div> */}
      <div className="space-y-5 p-2 ">
        {groupedItems.map((pair, index) => (
          <div key={index} className="flex space-x-2">
            {pair.map((item) => (
              <div key={item.name} className="flex-1">
                <Dragitempoc
                  name={item.name}
                  fieldName={item.fieldName}
                  color={item.color}
                  placeHolder={item.placeHolder}
                />
              </div>
            ))}
            {/* Add empty div if odd number of items to maintain layout */}
            {pair.length === 1 && <div className="flex-1"></div>}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Aside;