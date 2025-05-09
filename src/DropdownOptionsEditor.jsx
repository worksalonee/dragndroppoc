import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDropdownOptions } from '../store/sectionsSlice'; // adjust this import path if needed

const DropdownOptionsEditor = ({ selectedItemId }) => {
  const dispatch = useDispatch();

  const item = useSelector((state) =>
    state.sections.items.find((el) => el.id === selectedItemId && el.name === 'Dropdown')
  );

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (item?.options) setOptions(item.options);
  }, [item]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    dispatch(updateDropdownOptions({ id: item.id, options: newOptions }));
  };

  const handleAddOption = () => {
    const newOptions = [...options, ''];
    setOptions(newOptions);
    dispatch(updateDropdownOptions({ id: item.id, options: newOptions }));
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    dispatch(updateDropdownOptions({ id: item.id, options: newOptions }));
  };

  if (!item) return null;

  return (
    <div className="mt-6">
      <h3 className="text-center text-teal-700 text-md font-semibold border-b pb-1 mb-4">
        Options
      </h3>
      {options.map((option, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="flex-1 px-2 py-1 rounded bg-gray-100 border border-gray-300"
          />
          <button
            onClick={() => handleRemoveOption(index)}
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
  );
};

export default DropdownOptionsEditor;
