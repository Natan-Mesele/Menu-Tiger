import React from "react";

function EyeStyleSection({ selectedEyeStyle, setSelectedEyeStyle }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Corner Eye Design
      </label>
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            id: "square",
            label: "Square",
            img: "https://www.app.menutigr.com/static/media/4.3824d19bacf087be79a128b280199228.svg",
          },
          {
            id: "rounded",
            label: "Rounded",
            img: "https://www.app.menutigr.com/static/media/2.1183160711ab9f9167dad1854ece2660.svg",
          },
          {
            id: "circle",
            label: "Circle",
            img: "https://www.app.menutigr.com/static/media/1.3bdf90cf728437198ce1109f9d560c32.svg",
          },
        ].map((eye) => (
          <div
            key={eye.id}
            className="flex flex-col items-center"
            onClick={() => setSelectedEyeStyle(eye.id)}
          >
            <div
              className={`w-full aspect-square rounded-lg flex items-center justify-center cursor-pointer p-2 ${
                selectedEyeStyle === eye.id
                  ? "border-2 border-primary"
                  : "border border-gray-300"
              }`}
            >
              <img
                src={eye.img}
                alt={`${eye.label} eye style`}
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-xs mt-1 text-gray-600">{eye.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EyeStyleSection;
