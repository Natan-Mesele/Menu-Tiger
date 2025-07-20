import React from "react";

function PatternSelection({ selectedPattern, setSelectedPattern }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Select Pattern Style
      </label>
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            id: "1",
            img: "https://www.app.menutigr.com/static/media/8.ba2bfc7f49910aab84b34dde0776d9c5.svg",
          },
          {
            id: "2",
            img: "https://www.app.menutigr.com/static/media/7.94f99087a78ad181db272a3d1dd557a2.svg",
          },
          {
            id: "3",
            img: "https://www.app.menutigr.com/static/media/1.c02ba2e1bd3b115050d37b2f9d7b132d.svg",
          },
        ].map((pattern) => (
          <div
            key={pattern.id}
            className="flex flex-col items-center gap-1"
            onClick={() => setSelectedPattern(pattern.id)}
          >
            <div
              className={`w-full aspect-square rounded-lg flex items-center justify-center cursor-pointer p-2 ${
                selectedPattern === pattern.id
                  ? "border-2 border-primary"
                  : "border border-gray-300"
              }`}
            >
              <img
                src={pattern.img}
                alt={`Pattern ${pattern.id}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatternSelection;