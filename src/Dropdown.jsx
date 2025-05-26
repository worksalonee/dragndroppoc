import React from 'react';

const Dropdown = ({ data, handleChange }) => {
  const options = Array.isArray(data.options.options) ? data.options.options : [];
  console.log(data.options.options,"dataa")

  return (
    <div className="flex flex-col gap-2">
      <select
        className="border border-gray-300 px-2 py-1 min-w-max w-full rounded"
        value={data.value}
        onChange={(e) => handleChange(data.id, e.target.value)}
      >
        <option value="" disabled>
          {data.placeHolder || 'Select an option'}
        </option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
