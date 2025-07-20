import React, { useState } from "react";

function ColorSelection() {
  const [patternType, setPatternType] = useState("single");
  const [innerColor, setInnerColor] = useState("#f30505");
  const [outerColor, setOuterColor] = useState("#054080");

  return (
    <div className="space-y-6">
      {/* Background Color Section */}
      <div className="space-y-2 border border-gray-300 rounded-md p-2">
        <h3 className="text-sm font-medium text-primary dark:text-gray-300 mb-2">
          Background Color
        </h3>
        <div className="flex items-center justify-between gap-4 p-3 rounded-md border border-gray-300 bg-white dark:bg-gray-800">
          <h3 className="text-sm text-gray-500 dark:text-gray-300">
            Background Color
          </h3>
          <div className="flex items-center gap-3">
            <input
              type="color"
              className="w-8 h-8 cursor-pointer rounded-md border border-gray-300"
              value="#ffffff"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Pattern Color Section */}
      <div className="space-y-3 border border-gray-200 p-2 rounded-md">
        <h3 className="text-sm font-medium text-primary dark:text-gray-300">
          Pattern Color
        </h3>

        {/* Circle Selection Buttons with Labels */}
        <div className="flex items-center gap-6 border-b pb-4 border border-gray-200 p-2 rounded-md">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setPatternType("single")}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                patternType === "single"
                  ? "border-primary bg-white"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              {patternType === "single" && (
                <div className="w-4 h-4 rounded-full bg-primary"></div>
              )}
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Single
            </span>
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setPatternType("gradient")}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                patternType === "gradient"
                  ? "border-primary bg-white"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              {patternType === "gradient" && (
                <div className="w-4 h-4 rounded-full bg-primary"></div>
              )}
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Gradient
            </span>
          </div>
        </div>

        {/* Conditional Display */}
        {patternType === "single" ? (
          <div className="flex items-center justify-between border p-3 rounded-md">
            <span className="text-xs text-gray-500">Color</span>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: "#5e0bf0" }}
              />
              <span className="text-xs">#5e0bf0</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between border p-3 rounded-md">
              <span className="text-xs text-gray-500">Start Color</span>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: "#5e0bf0" }}
                />
                <span className="text-xs">#5e0bf0</span>
              </div>
            </div>
            <div className="flex items-center justify-between border p-3 rounded-md">
              <span className="text-xs text-gray-500">End Color</span>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: "#f30505" }}
                />
                <span className="text-xs">#f30505</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 border border-gray-300 rounded-md p-4">
        <h3 className="text-sm font-medium text-primary dark:text-gray-300 mb-2">
          Eye Color
        </h3>

        {/* Inner Color Section */}
        <div className="flex items-center justify-between gap-4 border border-gray-200 rounded-md px-3 py-2">
          <label className="text-xs text-gray-500">Inner Color</label>
          <div className="flex items-center gap-2 bg-gray-200">
            <span className="text-xs font-mono">{innerColor}</span>
            <input
              type="color"
              value={innerColor}
              onChange={(e) => setInnerColor(e.target.value)}
              className="w-5 h-5 cursor-pointer border-none"
            />
          </div>
        </div>

        {/* Outer Color Section */}
        <div className="flex items-center justify-between gap-4 border border-gray-200 rounded-md px-3 py-2">
          <label className="text-xs text-gray-500">Outer Color</label>
          <div className="flex items-center gap-2 bg-gray-200">
            <span className="text-xs font-mono">{outerColor}</span>
            <input
              type="color"
              value={outerColor}
              onChange={(e) => setOuterColor(e.target.value)}
              className="w-5 h-5 cursor-pointer border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorSelection;
