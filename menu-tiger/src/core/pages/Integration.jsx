import React, { useState } from "react";
import {
  FaPuzzlePiece,
  FaRocket,
  FaUtensils,
  FaCog,
  FaEdit,
  FaChevronLeft,
  FaQuestionCircle,
  FaTrash,
} from "react-icons/fa";

function Integration() {
  const [activeTab, setActiveTab] = useState("payment");
  const [isCustomPaymentEnabled, setIsCustomPaymentEnabled] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showEditPage, setShowEditPage] = useState(false);
  const [customPayments, setCustomPayments] = useState([
    { id: 1, name: "Bank Transfer" },
    { id: 2, name: "Mobile Payment" },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    id: null,
  });
  const [editingPayment, setEditingPayment] = useState(null);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleSave = () => {
    // Save logic here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (payment) => {
    setEditingPayment(payment);
    setShowEditForm(true);
  };

  const handleBackClick = () => {
    setShowEditForm(false);
    setEditingPayment(null);
  };

  const handleSavePayment = () => {
    if (!formData.name.trim()) {
      alert("Payment method name is required");
      return;
    }

    if (editingPayment) {
      // Update existing payment
      setCustomPayments(
        customPayments.map((p) =>
          p.id === editingPayment.id
            ? {
                ...p,
                name: formData.name,
              }
            : p
        )
      );
    }

    handleBackClick();
  };

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-6 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Integrations</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            Manage integrations
          </span>
        </div>
        <div className="flex items-center space-x-4 border border-gray-300 dark:border-gray-600 rounded-md p-2">
          <img
            src="https://www.app.menutigr.com/static/media/copy.f4a907cfacfdd8f91d823668cd6856bb.svg"
            alt="Copy Icon"
            className="w-6 h-6 cursor-pointer"
          />
          <img
            src="https://www.app.menutigr.com/static/media/qr.d9e8c248e7e8438effce3b671c66f607.svg"
            alt="QR Icon"
            className="w-6 h-6 cursor-pointer"
          />
          <button
            className="bg-primary text-white px-5 py-2 rounded-md flex items-center hover:bg-teal-700 transition-colors duration-200 cursor-pointer"
            onClick={() => alert("Open App clicked!")}
          >
            <FaUtensils className="mr-2" />
            Open App
          </button>
        </div>
      </div>

      {/* Body with Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 relative">
          {/* Payment Integration Tab */}
          <button
            className={`px-6 py-3 font-medium text-sm flex items-center cursor-pointer ${
              activeTab === "payment"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("payment")}
          >
            <FaPuzzlePiece className="mr-2 text-xl" />
            Payment Integration
          </button>

          {/* White Label Tab */}
          <div className="relative">
            <button
              className={`px-6 py-3 font-medium text-sm flex items-center ${
                activeTab === "whiteLabel"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 dark:text-gray-400"
              } cursor-not-allowed opacity-70`}
              onMouseEnter={() => setHoveredTab("whiteLabel")}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <FaPuzzlePiece className="mr-2 text-xl" />
              White Label
            </button>

            {/* Access Denied Popup - Centered with wider buttons */}
            {hoveredTab === "whiteLabel" && (
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-[500px] z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-5"
                onMouseEnter={() => setHoveredTab("whiteLabel")}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <div className="text-left">
                  <h3 className="font-medium text-gray-800 dark:text-white mb-3 text-lg">
                    Access Denied
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    You do not have permission to use this feature due to
                    limitations in your current plan. Please upgrade or adjust
                    your plan to gain access.
                  </p>
                  <div className="flex justify-center space-x-6">
                    <button
                      className="px-5 py-2 text-primary border border-primary cursor-pointer dark:bg-gray-700  dark:hover:bg-gray-600 transition-colors text-sm w-40"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Compare Plans
                    </button>
                    <button
                      className="px-5 py-2 bg-secondary dark:bg-gray-700 cursor-pointer text-white dark:text-gray-200 rounded hover:bg-primary dark:hover:bg-gray-600 transition-colors text-sm w-40"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Upgrade your Plan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Printers Tab */}
          <div className="relative">
            <button
              className={`px-6 py-3 font-medium text-sm flex items-center ${
                activeTab === "printers"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 dark:text-gray-400"
              } cursor-not-allowed opacity-70`}
              onMouseEnter={() => setHoveredTab("printers")}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <FaPuzzlePiece className="mr-2 text-xl" />
              Printers
            </button>

            {/* Access Denied Popup - Centered with wider buttons */}
            {hoveredTab === "printers" && (
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-[500px] z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-5"
                onMouseEnter={() => setHoveredTab("printers")}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <div className="text-left">
                  <h3 className="font-medium text-gray-800 dark:text-white mb-3 text-lg">
                    Access Denied
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    You do not have permission to use this feature due to
                    limitations in your current plan. Please upgrade or adjust
                    your plan to gain access.
                  </p>
                  <div className="flex justify-center space-x-6">
                    <button
                      className="px-5 py-2 text-primary border border-primary dark:bg-gray-700 hover:text-secondary dark:text-gray-200 rounded-sm cursor-pointer dark:hover:bg-gray-600 transition-colors text-sm w-40"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Compare Plans
                    </button>
                    <button
                      className="px-5 py-2 bg-secondary dark:bg-gray-700 text-white dark:text-gray-200 rounded hover:bg-primary dark:hover:bg-gray-600 cursor-pointer transition-colors text-sm w-40"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Upgrade your Plan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Point of Sale Tab */}
          <button
            className={`px-6 py-3 font-medium text-sm flex items-center cursor-pointer ${
              activeTab === "pos"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("pos")}
          >
            <FaPuzzlePiece className="mr-2 text-xl" />
            Point of Sale
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-0">
          {activeTab === "payment" && (
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              {!showEditPage ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Stripe Card */}
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 flex flex-col">
                    <div className="flex justify-center mb-4">
                      <img
                        src="https://www.app.menutigr.com/static/media/stripe.cb7221694469d6f8246db670f763e3d3.svg"
                        alt="Stripe"
                        className="w-12 h-12"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-left mb-2">Stripe</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
                        Flexible payments, supports GPay, Link, and Apple Pay.
                      </p>
                    </div>
                    <button className="mt-4 w-full border cursor-pointer border-primary text-primary py-2 rounded-md text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors">
                      Finish Setting Up Stripe
                    </button>
                  </div>

                  {/* PayPal Card */}
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 flex flex-col">
                    <div className="flex justify-center mb-4">
                      <img
                        src="https://www.app.menutigr.com/static/media/paypal.7e0bd289647d4ca299d55d44e58a080e.svg"
                        alt="PayPal"
                        className="w-12 h-12"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-left mb-2">PayPal</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
                        Secure online payments and money transfers.
                      </p>
                    </div>
                    <button className="mt-4 w-full border cursor-pointer border-primary text-primary py-2 rounded-md text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors">
                      Connect
                    </button>
                  </div>

                  {/* Adyen Card */}
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 flex flex-col">
                    <div className="flex justify-center mb-4">
                      <img
                        src="https://www.app.menutigr.com/static/media/adyen.875df4a2dcb34026f0fdc0b9442e822c.svg"
                        alt="Adyen"
                        className="w-12 h-12"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-left mb-2">Adyen</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
                        A unified platform with advanced risk management and
                        direct bank connections for fast, secure global payments
                      </p>
                    </div>
                    <button className="mt-4 w-full border cursor-pointer border-primary text-primary py-2 rounded-md text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors">
                      Connect
                    </button>
                  </div>

                  {/* Cash Card */}
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 flex flex-col">
                    <div className="flex justify-center mb-4">
                      <img
                        src="https://www.app.menutigr.com/static/media/cash.6b2585b7f94bc4719097b8c9e23d6606.svg"
                        alt="Cash"
                        className="w-12 h-12"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-left mb-2">Cash</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
                        Direct in-person cash transactions.
                      </p>
                    </div>
                    <div className="mt-4 flex justify-start">
                      <label className="flex items-center">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="relative w-11 h-6">
                          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 rounded-full peer-checked:bg-primary transition-colors duration-200"></div>
                          <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full border border-gray-300 transform transition-all duration-200 peer-checked:translate-x-5"></div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Custom Payment Card */}
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 flex flex-col">
                    <div className="flex justify-center mb-4">
                      <img
                        src="https://www.app.menutigr.com/static/media/CUSTOM%20PAYMENT.96263542f43e04939683.png"
                        alt="Custom Payment"
                        className="w-12 h-12"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-left mb-2">
                        Custom Payment
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
                        Enable users to offer alternative payment methods beyond
                        traditional channels like Stripe or PayPal
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={isCustomPaymentEnabled}
                          onChange={() =>
                            setIsCustomPaymentEnabled(!isCustomPaymentEnabled)
                          }
                        />
                        <div className="relative w-11 h-6">
                          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 rounded-full peer-checked:bg-primary transition-colors duration-200"></div>
                          <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full border border-gray-300 transform transition-all duration-200 peer-checked:translate-x-5"></div>
                        </div>
                      </label>
                      <div className="flex items-center gap-2">
                        <div
                          className="flex items-center text-sm text-gray-600 dark:text-gray-300 cursor-pointer"
                          onClick={() => setShowEditPage(true)}
                        >
                          <FaEdit className="mr-1" />
                          Edit
                        </div>
                        <FaCog
                          className="text-gray-500 dark:text-gray-300 text-lg cursor-pointer hover:text-primary"
                          onClick={() => setShowEdit(!showEdit)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg">
                  {!showEditForm ? (
                    customPayments.length > 0 ? (
                      <>
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center space-x-3">
                            <button
                              className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary transition cursor-pointer"
                              onClick={() => setShowEditPage(false)} // This will hide the table and show the cards
                              aria-label="Back"
                              title="Back"
                            >
                              <FaChevronLeft />
                            </button>
                            <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-md select-none">
                              <span>Custom payment options </span>
                            </div>
                            <div>
                              <span className="border border-primary px-4 py-3 flex items-center rounded-sm">
                                <FaQuestionCircle className="ml-2 text-primary dark:text-gray-400" />
                                This option allows customers to choose custom
                                payment arrangements
                              </span>
                            </div>
                          </div>
                          <button
                            className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary transition cursor-pointer"
                            onClick={handleSave}
                          >
                            Add
                          </button>
                        </div>
                        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                              <tr>
                                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                                  Name
                                </th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                              {customPayments.map((payment) => (
                                <tr key={payment.id}>
                                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                                    {payment.name}
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="flex space-x-2">
                                      <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() => {
                                          setEditingPayment(payment);
                                          setShowEditForm(true);
                                        }}
                                      >
                                        <FaEdit />
                                      </button>

                                      <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => {
                                          if (
                                            window.confirm(
                                              `Are you sure you want to delete "${payment.name}"?`
                                            )
                                          ) {
                                            setCustomPayments((prev) =>
                                              prev.filter(
                                                (p) => p.id !== payment.id
                                              )
                                            );
                                          }
                                        }}
                                      >
                                        <FaTrash />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-500 dark:text-gray-300 mt-4">
                        No custom payments added yet.
                      </div>
                    )
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                          <button
                            className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary transition cursor-pointer flex items-center justify-center w-10 h-10"
                            onClick={() => {
                              setShowEditForm(false);
                              setShowEditPage(true);
                            }}
                            aria-label="Back"
                            title="Back"
                          >
                            <FaChevronLeft />
                          </button>
                          <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-md select-none">
                            <span>Scheduler</span>{" "}
                            <span className=" text-gray-400">/</span>{" "}
                            <span className="text-primary">Add scheduler</span>
                          </div>
                        </div>
                        <button
                          className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary transition cursor-pointer"
                          onClick={handleSavePayment}
                        >
                          Save
                        </button>
                      </div>

                      {/* Add form below the header */}
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <form>
                          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus-within:border-primary transition-colors">
                            <label className="w-28 text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-2">
                              Name <span className="text-red-500">*</span>
                            </label>
                            <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-3 py-2 focus-within:border-primary transition-colors">
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter name"
                                required
                                className="w-full bg-transparent outline-none"
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "whiteLabel" && (
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">White Label</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Customize the app with your own branding.
              </p>
            </div>
          )}
          {activeTab === "printers" && (
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Printers</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Configure your kitchen and receipt printers.
              </p>
            </div>
          )}
          {activeTab === "pos" && (
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Loyverse Card */}
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 flex flex-col">
                  <div className="flex justify-center mb-4">
                    <img
                      src="https://loyverse.com/sites/all/themes/loyversecom/logo.svg"
                      alt="Loyverse"
                      className="h-12"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-left mb-2">Loyverse</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
                      Restaurant Management System
                    </p>
                  </div>
                  <button className="mt-4 w-full border cursor-pointer border-primary text-primary py-2 rounded-md text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Integration;
