import React from "react";

function PointOfSale() {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Loyverse Card */}
        <div className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200 flex flex-col min-h-[360px]">
          <div className="flex justify-center mb-6">
            <img
              src="https://loyverse.com/sites/all/themes/loyversecom/logo.svg"
              alt="Loyverse"
              className="h-14"
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-medium text-xl text-left mb-4">Loyverse</h3>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 text-left">
              Restaurant Management System
            </p>
          </div>
          <button className="mt-6 w-full border cursor-pointer border-primary text-primary py-3 rounded-md text-[15px] font-medium hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}

export default PointOfSale;
