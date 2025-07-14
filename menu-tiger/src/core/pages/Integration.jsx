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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Integration() {
  const [activeTab, setActiveTab] = useState("payment");
  const [isCustomPaymentEnabled, setIsCustomPaymentEnabled] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showEditPage, setShowEditPage] = useState(false);
  const [isCashEnabled, setIsCashEnabled] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);
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

  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-base font-semibold mb-2 dark:text-white">
          Confirm Deletion
        </h3>
        <p className="text-sm mb-4 dark:text-gray-300 leading-relaxed">
          Are you sure you want to delete this payment method? This action
          cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowDeletePopup(false)}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setCustomPayments(
                customPayments.filter(
                  (payment) => payment.id !== paymentToDelete
                )
              );
              setShowDeletePopup(false);
              toast.success("Payment method deleted successfully");
            }}
            className="px-3 py-1.5 bg-red-600 text-sm text-white rounded-full hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

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
      toast.error("Payment method name is required");
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
      toast.success("Payment method updated successfully");
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Stripe",
                      description:
                        "Flexible payments, supports GPay, Link, and Apple Pay.",
                      image:
                        "https://www.app.menutigr.com/static/media/stripe.cb7221694469d6f8246db670f763e3d3.svg",
                      buttonText: "Finish Setting Up Stripe",
                      buttonColor: "border-red-500 text-red-500",
                    },
                    {
                      title: "PayPal",
                      description:
                        "Secure online payments and money transfers.",
                      image:
                        "https://www.app.menutigr.com/static/media/paypal.7e0bd289647d4ca299d55d44e58a080e.svg",
                      buttonText: "Connect",
                      buttonColor: "border-primary text-primary",
                    },
                    {
                      title: "Adyen",
                      description:
                        "A unified platform with advanced risk management and direct bank connections for fast, secure global payments",
                      image:
                        "https://www.app.menutigr.com/static/media/adyen.875df4a2dcb34026f0fdc0b9442e822c.svg",
                      buttonText: "Connect",
                      buttonColor: "border-primary text-primary",
                    },
                    {
                      title: "Cash",
                      description: "Direct in-person cash transactions.",
                      image:
                        "https://www.app.menutigr.com/static/media/cash.6b2585b7f94bc4719097b8c9e23d6606.svg",
                      hasToggle: true,
                      isEnabled: isCashEnabled, // Add this state
                      setIsEnabled: setIsCashEnabled, // Add this state setter
                    },
                    {
                      title: "Custom Payment",
                      description:
                        "Enable users to offer alternative payment methods beyond traditional channels like Stripe or PayPal",
                      image:
                        "https://www.app.menutigr.com/static/media/CUSTOM%20PAYMENT.96263542f43e04939683.png",
                      hasCustomToggle: true,
                      isEnabled: isCustomPaymentEnabled,
                      setIsEnabled: setIsCustomPaymentEnabled,
                      setShowEditPage,
                      setShowEdit,
                    },
                  ].map((card, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200 flex flex-col min-h-[360px]"
                    >
                      <div className="flex justify-center mb-6">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-20 h-20"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-xl text-left mb-4">
                          {card.title}
                        </h3>
                        <p className="text-[15px] text-gray-600 dark:text-gray-400 text-left">
                          {card.description}
                        </p>
                      </div>

                      {card.buttonText ? (
                        <button
                          className={`mt-6 w-full border cursor-pointer ${card.buttonColor} py-3 rounded-md text-[15px] font-medium hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors`}
                        >
                          {card.buttonText}
                        </button>
                      ) : card.hasToggle ? (
                        <div className="mt-6 flex justify-start">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={card.isEnabled}
                              onChange={() =>
                                card.setIsEnabled(!card.isEnabled)
                              }
                            />
                            <div className="relative w-12 h-4 overflow-visible">
                              {/* Track background - changes color based on position */}
                              <div
                                className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                                  card.isEnabled
                                    ? "bg-primary/20"
                                    : "bg-gray-400 dark:bg-gray-700"
                                }`}
                              ></div>

                              {/* Thumb (circle) - changes color based on position */}
                              <div
                                className={`absolute -top-[5px] ${
                                  card.isEnabled
                                    ? "left-[26px] bg-primary"
                                    : "left-0 bg-gray-200 dark:bg-gray-400"
                                } w-7 h-7 rounded-full border ${
                                  card.isEnabled
                                    ? "border-primary/50"
                                    : "border-white"
                                } transform transition-all duration-200`}
                              ></div>
                            </div>
                          </label>
                        </div>
                      ) : (
                        <div className="mt-6 flex items-center justify-between">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={card.isEnabled}
                              onChange={() =>
                                card.setIsEnabled(!card.isEnabled)
                              }
                            />
                            <div className="relative w-12 h-4 overflow-visible">
                              {/* Track background - changes color based on position */}
                              <div
                                className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                                  card.isEnabled
                                    ? "bg-primary/20"
                                    : "bg-gray-400 dark:bg-gray-700"
                                }`}
                              ></div>

                              {/* Thumb (circle) - changes color based on position */}
                              <div
                                className={`absolute -top-[5px] ${
                                  card.isEnabled
                                    ? "left-[26px] bg-primary"
                                    : "left-0 bg-gray-200 dark:bg-gray-400"
                                } w-7 h-7 rounded-full border ${
                                  card.isEnabled
                                    ? "border-primary/50"
                                    : "border-white"
                                } transform transition-all duration-200`}
                              ></div>
                            </div>
                          </label>
                          <div className="flex items-center gap-3 relative">
                            {/* Edit option popup - shown when cog is clicked */}
                            {showEdit && (
                              <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                                <div
                                  className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                                  onClick={() => {
                                    setShowEditPage(true);
                                    setShowEdit(false);
                                  }}
                                >
                                  <FaEdit className="mr-2 text-primary" />
                                  Edit
                                </div>
                              </div>
                            )}
                            <FaCog
                              className="text-gray-500 dark:text-gray-300 text-xl cursor-pointer hover:text-primary"
                              onClick={() => setShowEdit(!showEdit)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                // ... rest of your existing edit page code remains exactly the same
                <div className="bg-white dark:bg-gray-800 rounded-lg">
                  {!showEditForm ? (
                    customPayments.length > 0 ? (
                      <>
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center space-x-3">
                            <button
                              className="bg-secondary text-white px-4 py-3 rounded-md hover:bg-primary transition cursor-pointer"
                              onClick={() => setShowEditPage(false)}
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
                            <button
                              className="bg-secondary text-white px-4 py-3 rounded-md hover:bg-primary transition cursor-pointer"
                              onClick={handleSave}
                            >
                              Add
                            </button>
                          </div>
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
                                        <FaEdit className="text-primary" />
                                      </button>

                                      <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => {
                                          setPaymentToDelete(payment.id);
                                          setShowDeletePopup(true);
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
                    <h3 className="font-medium text-xl text-left mb-4">
                      Loyverse
                    </h3>
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
          )}
        </div>
      </div>
      {showDeletePopup && <DeleteConfirmationModal />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          background: "#0d9488",
          color: "#f8fafc",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
        className="custom-toast-container" // Add this
      />
    </div>
  );
}

export default Integration;
