import React from "react";

function LogoUpload({ selectedLogo, setSelectedLogo }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Upload Center Logo
      </label>
      <input
        type="file"
        id="logo-upload"
        className="hidden"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setSelectedLogo(URL.createObjectURL(e.target.files[0]));
          }
        }}
      />
      <label
        htmlFor="logo-upload"
        className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        {selectedLogo ? (
          <img
            src={selectedLogo}
            alt="Selected Logo"
            className="h-full object-contain"
          />
        ) : (
          <>
            <span className="text-gray-400 text-4xl">+</span>
            <span className="text-gray-500 text-sm">PNG, JPG (max 2MB)</span>
          </>
        )}
      </label>
      {selectedLogo && (
        <div className="mt-3 flex gap-2">
          <button
            className="text-xs px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setSelectedLogo(null)}
          >
            Remove Logo
          </button>
        </div>
      )}
    </div>
  );
}

export default LogoUpload;
