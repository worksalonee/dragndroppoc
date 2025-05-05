import React, { useState } from "react";

const Header = ({ isPublished, setIsPublished, formData }) => {
  const [showJson, setShowJson] = useState(false);

  return (
    <header className="bg-gradient-to-b from-cyan-50 to-cyan-300 text-white text-center p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-black font-semibold">ACEHOURS</h2>
        <div className="flex gap-2">
          <button
            className="rounded-[10px] px-4 py-1 bg-white text-green-600 hover:bg-green-100"
            onClick={() => setShowJson(true)}
          >
            JSON
          </button>
          <button
            className="rounded-[10px] px-4 py-1 bg-white text-green-600 hover:bg-green-100"
            onClick={() => setIsPublished(!isPublished)}
          >
            Preview
          </button>
        </div>
      </div>

      {showJson && (
        <div className="fixed top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-lime-500 to-cyan-300 p-5 rounded-[10px] shadow-xl z-[1000]">
          <h3 className="text-lg font-semibold mb-2">Form Data (JSON)</h3>
          <textarea
            readOnly
            value={JSON.stringify(formData, null, 2)}
            className="w-full h-[75%] p-2 border rounded resize-none"
          />
          <div className="mt-2 text-right">
            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
                alert("JSON copied!");
              }}
              className="mr-2 px-3 py-1 bg-lime-200 text-white rounded hover:bg-green-700"
            >
              COPY✅
            </button>
            <button
              onClick={() => setShowJson(false)}
              className="px-3 py-1 bg-fuchsia-400 text-white rounded hover:bg-fuchsia-700"
            >
              CLOSE❌
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
 
