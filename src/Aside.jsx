import React from "react";
import Dragitempoc from "./Dragitempoc";
import sectionSlice from "./redux/sectionsSlice";
import { useSelector } from "react-redux";
import { addSection } from "./redux/sectionsSlice";
const Aside = () => {
const items = useSelector((state) => state.sections.items);
console.log("items==>",items)
 
  // Split items into groups of 2
  const groupedItems = [];
  for (let i = 0; i < items.length; i += 2) {
    groupedItems.push(items.slice(i, i + 2));
  }

  return (
    <aside className="w-80 max-h-full bg-gradient-to-b from-cyan-300 to-blue-200 p-4 m-5 rounded-lg">
     
        {/* <button className="ml-3 p-3 font-semibold text-gray-600 border-2 rounded-lg ">Elements</button> */}
        
    
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
                  options={item.options}
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