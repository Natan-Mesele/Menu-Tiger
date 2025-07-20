import React from "react";

function FrameSelection({ selectedFrame, setSelectedFrame }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Frame Style
      </label>
      <div className="grid grid-cols-2 gap-3">
        {["None", "Simple", "Rounded", "Ornamental"].map((frame) => (
          <div
            key={frame}
            className="flex flex-col items-center gap-1"
            onClick={() => setSelectedFrame(frame)}
          >
            <div
              className={`w-full aspect-square rounded flex items-center justify-center cursor-pointer ${
                selectedFrame === frame
                  ? "border-2 border-blue-400"
                  : "border border-gray-300"
              }`}
            >
              {frame !== "None" && (
                <div className="w-3/4 h-3/4 border-2 border-gray-400"></div>
              )}
            </div>
            <span className="text-xs text-gray-600">{frame}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FrameSelection;