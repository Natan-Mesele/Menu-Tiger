import React, { useState } from "react";
import {
  FaPuzzlePiece,
  FaEdit,
  FaChevronLeft,
  FaQuestionCircle,
  FaTrash,
  FaCog,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "../../commons/ToastProvider";
import SaveButton from "../../commons/SaveButton";

function PaymentIntegration() {
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
    if (editingPayment) {
      toast.success("Payment method updated successfully");
    }
    setFormData({
      name: "",
      id: null,
    });
    setEditingPayment(null);
    setShowEditForm(false);
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
              description: "Secure online payments and money transfers.",
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
              isEnabled: isCashEnabled,
              setIsEnabled: setIsCashEnabled,
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
                <img src={card.image} alt={card.title} className="w-20 h-20" />
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
                      onChange={() => card.setIsEnabled(!card.isEnabled)}
                    />
                    <div className="relative w-12 h-4 overflow-visible">
                      <div
                        className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                          card.isEnabled
                            ? "bg-primary/20"
                            : "bg-gray-400 dark:bg-gray-700"
                        }`}
                      ></div>
                      <div
                        className={`absolute -top-[6px] ${
                          card.isEnabled
                            ? "left-[26px] bg-primary border-primary/50"
                            : "left-0 bg-white border-gray-100 shadow-lg"
                        } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] ${
                          card.isEnabled ? "border-primary/50" : "border-white"
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
                      onChange={() => card.setIsEnabled(!card.isEnabled)}
                    />
                    <div className="relative w-12 h-4 overflow-visible">
                      <div
                        className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                          card.isEnabled
                            ? "bg-primary/20"
                            : "bg-gray-400 dark:bg-gray-700"
                        }`}
                      ></div>
                      <div
                        className={`absolute -top-[6px] ${
                          card.isEnabled
                            ? "left-[26px] bg-primary border-primary/50"
                            : "left-0 bg-white border-gray-100 shadow-lg"
                        } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] ${
                          card.isEnabled ? "border-primary/50" : "border-white"
                        } transform transition-all duration-200`}
                      ></div>
                    </div>
                  </label>
                  <div className="flex items-center gap-3 relative">
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
                        This option allows customers to choose custom payment
                        arrangements
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
                <SaveButton onClick={handleSavePayment} />
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
      {showDeletePopup && <DeleteConfirmationModal />}
      <ToastProvider />
    </div>
  );
}

export default PaymentIntegration;
