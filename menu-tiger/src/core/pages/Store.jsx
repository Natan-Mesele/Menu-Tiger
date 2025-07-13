import React, { useState, useRef, useEffect } from "react";
import {
  FaRocket,
  FaUtensils,
  FaUser,
  FaBell,
  FaCog,
  FaTools,
  FaCreditCard,
  FaQrcode,
  FaLock,
  FaEllipsisV,
  FaQuestionCircle,
  FaArrowUp,
  FaChevronLeft,
  FaChevronDown,
  FaChevronUp,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MapContainer, TileLayer, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Stores() {
  const [currentPage, setCurrentPage] = useState("tables");
  const [showUserForm, setShowUserForm] = useState(false);
  const [showTableForm, setShowTableForm] = useState(false);
  const [showQRCustomization, setShowQRCustomization] = useState(false);
  const [savedSchedulers, setSavedSchedulers] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [radiusValue, setRadiusValue] = useState(20);
  const [takeawayEnabled, setTakeawayEnabled] = useState(false);
  const [dineInEnabled, setDineInEnabled] = useState(false);
  const [allowSpecialInstructions, setAllowSpecialInstructions] =
    useState(false);
  const [displayFullFoodName, setDisplayFullFoodName] = useState(false);
  const [storeMenu, setStoreMenu] = useState("");
  const [selectedEyeStyle, setSelectedEyeStyle] = useState(null);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#3B82F6");
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [showWifiPopup, setShowWifiPopup] = useState(false);
  const [isPopupHovered, setIsPopupHovered] = useState(false);
  const [popupTimeout, setPopupTimeout] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [activeDesignTab, setActiveDesignTab] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    id: null,
  });
  const wifiTabRef = useRef(null);
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Staff", // Default role
  });
  const tabs = [
    { id: "tables", name: "Tables", icon: <FaUser /> },
    { id: "users", name: "Users", icon: <FaUtensils /> },
    { id: "hours", name: "Opening Hours", icon: <FaBell /> },
    { id: "social", name: "Social Accounts", icon: <FaCog /> },
    { id: "wifi", name: "WiFi", icon: <FaTools /> },
    { id: "location", name: "Location Details", icon: <FaCreditCard /> },
    { id: "settings", name: "Settings", icon: <FaQrcode /> },
  ];

  const designTabs = [
    {
      id: "logo",
      label: "Logo",
      icon: (
        <img
          src="https://www.app.menutigr.com/static/media/qr.d9e8c248e7e8438effce3b671c66f607.svg"
          alt="Logo"
          className="w-5 h-5"
        />
      ),
    },
    {
      id: "pattern",
      label: "Pattern",
      icon: (
        <img
          src="https://www.app.menutigr.com/static/media/pattern.62d6582682a7206bf0326194d262a1c1.svg"
          alt="Pattern"
          className="w-5 h-5"
        />
      ),
    },
    {
      id: "eyes",
      label: "Eye Style",
      icon: (
        <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
        </div>
      ),
    },
    {
      id: "color",
      label: "Colors",
      icon: (
        <img
          src="https://www.app.menutigr.com/static/media/colors.a1cca20a2aa82f4a5c7dbb292497b6b0.svg"
          alt="Colors"
          className="w-5 h-5"
        />
      ),
    },
    {
      id: "frame",
      label: "Frame",
      icon: <div className="w-5 h-5 border-2 border-primary rounded-sm"></div>,
    },
  ];

  const tabsRef = useRef([]);
  const containerRef = useRef(null);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [visibleTabsCount, setVisibleTabsCount] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [showEditPage, setShowEditPage] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState("");

  const RadiusCircle = ({ center, radius }) => {
    const map = useMap();

    useEffect(() => {
      map.flyTo(center, getZoomLevel(radius));
    }, [center, radius, map]);

    return (
      <Circle
        center={center}
        radius={radius}
        pathOptions={{
          color: "#0d9488",
          fillColor: "#0d9488",
          fillOpacity: 0.2,
        }}
      />
    );
  };

  // Helper function to calculate zoom level based on radius
  const getZoomLevel = (radius) => {
    // Adjust these values based on your needs
    if (radius < 50) return 18;
    if (radius < 100) return 17;
    if (radius < 500) return 15;
    if (radius < 1000) return 13;
    return 11;
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuEdit = (id) => {
    console.log("Edit clicked for ID:", id); // Debug log
    const itemToEdit = savedSchedulers.find((item) => item.id === id);
    if (itemToEdit) {
      setFormData({
        name: itemToEdit.name,
        id: itemToEdit.id,
      });
      setShowTableForm(true);
    }
  };

  const handleMenuDelete = (id) => {
    console.log("Delete clicked for ID:", id); // Debug log
    setSavedSchedulers(savedSchedulers.filter((item) => item.id !== id));
  };

  const handleSaveEdit = () => {
    if (!editingItem?.name.trim()) {
      alert("Please enter a valid name!");
      return;
    }

    setSavedSchedulers(
      savedSchedulers.map((item) =>
        item.id === editingItem.id
          ? { ...item, name: editingItem.name.trim() }
          : item
      )
    );
    setShowEditPage(false);
    setEditingItem(null);
  };

  useEffect(() => {
    const calculateVisibleTabs = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      let totalWidth = 0;
      let count = 0;

      for (let i = 0; i < tabs.length; i++) {
        const tabWidth = tabsRef.current[i]?.offsetWidth || 120;
        if (totalWidth + tabWidth <= containerWidth) {
          totalWidth += tabWidth;
          count++;
        } else {
          break;
        }
      }

      setVisibleTabsCount(Math.max(1, count));
    };

    calculateVisibleTabs();
    window.addEventListener("resize", calculateVisibleTabs);

    return () => {
      window.removeEventListener("resize", calculateVisibleTabs);
    };
  }, []);

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert("Please enter a valid name!");
      return;
    }

    if (formData.id) {
      setSavedSchedulers(
        savedSchedulers.map((item) =>
          item.id === formData.id
            ? { ...item, name: formData.name.trim() }
            : item
        )
      );
    } else {
      const newItem = {
        id: Date.now(),
        name: formData.name.trim(),
      };
      setSavedSchedulers([...savedSchedulers, newItem]);
    }

    setShowTableForm(false);
    setFormData({ name: "", id: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (id) => {
    const itemToEdit = savedSchedulers.find((item) => item.id === id);
    if (itemToEdit) {
      setFormData({
        name: itemToEdit.name,
        id: itemToEdit.id,
      });
      setShowTableForm(true);
    }
  };

  const handleDelete = (id) => {
    setSavedSchedulers(savedSchedulers.filter((item) => item.id !== id));
  };

  const handleSaveUser = () => {
    // ... existing validation ...

    const userData = {
      id: editingUserId || Date.now(),
      firstName: userFormData.firstName,
      lastName: userFormData.lastName,
      email: userFormData.email,
      accessLevel: userFormData.accessLevel,
    };

    if (editingUserId) {
      setUsers(
        users.map((user) => (user.id === editingUserId ? userData : user))
      );
    } else {
      setUsers([...users, userData]);
    }

    // Reset form
    setShowUserForm(false);
    setEditingUserId(null);
    setUserFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      accessLevel: "",
    });
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditUser = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setUserFormData({
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        email: userToEdit.email,
        password: "",
        confirmPassword: "",
        accessLevel: userToEdit.accessLevel,
      });
      setEditingUserId(id);
      setShowUserForm(true);
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const EditPage = () => (
    <div>
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 w-full">
        <div className="flex items-center space-x-3">
          <button
            className="bg-secondary text-white px-3 py-3 rounded-md hover:bg-primary transition cursor-pointer flex items-center justify-center w-10 h-10"
            onClick={() => setShowEditPage(false)}
          >
            <FaChevronLeft />
          </button>
          <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md select-none">
            <span>Edit Scheduler</span>
          </div>
        </div>
        <button
          className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary transition cursor-pointer"
          onClick={handleSaveEdit}
        >
          Save
        </button>
      </div>

      <div className="space-y-6 max-w-sm">
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus-within:border-primary transition-colors">
          <label className="w-28 text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-2">
            Name <span className="text-red-500">*</span>
          </label>
          <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-3 py-2 focus-within:border-primary transition-colors">
            <input
              type="text"
              name="name"
              value={editingItem?.name || ""}
              onChange={(e) =>
                setEditingItem({ ...editingItem, name: e.target.value })
              }
              placeholder="Enter name"
              required
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const QRPreviewSection = () => (
    <div className="mb-6 flex flex-col items-center">
      <h4 className="font-medium mb-3 text-gray-700">QR Code Preview</h4>
      <div className="p-4 bg-white rounded-lg">
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com&margin=10"
          alt="QR Code Preview"
          className="w-48 h-48"
        />
      </div>
      <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
        Download QR Code
      </button>
    </div>
  );

  const ScanReminderSection = () => (
    <div className="bg-yellow-50 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="bg-yellow-100 p-2 rounded-full flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-1">
            Always test your QR code
          </h4>
          <p className="text-sm text-gray-600">
            Scan with multiple devices to ensure it works properly before
            distribution.
            <span className="block mt-1 text-blue-600 hover:underline cursor-pointer">
              Learn more about testing →
            </span>
          </p>
        </div>
      </div>
    </div>
  );

  const LogoUploadSection = () => (
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

  const PatternSelectionSection = () => (
    <div>
      <label className="block text-sm font-medium mb-2 ">
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
            className="flex flex-col items-center gap-1 "
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

  const EyeStyleSection = () => (
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

  const ColorSelectionSection = () => (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Foreground</label>
          <div className="flex gap-2">
            {["#000000", "#3B82F6", "#EF4444"].map((color) => (
              <div
                key={color}
                className={`w-8 h-8 rounded-full cursor-pointer ${
                  selectedColor === color ? "border-2 border-gray-400" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></div>
            ))}
          </div>
        </div>
        {/* Background color selection would go here */}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="color"
          className="w-8 h-8 cursor-pointer"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        />
        <span className="text-sm text-gray-600">Custom color picker</span>
      </div>
    </div>
  );

  const FrameSelectionSection = () => (
    <div>
      <label className="block text-sm font-medium mb-2">Frame Style</label>
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

  let popupStyle = {};
  if (wifiTabRef.current) {
    const tabRect = wifiTabRef.current.getBoundingClientRect();
    const popupWidth = 500;
    const screenPadding = 16;

    let left =
      tabRect.left + window.scrollX + tabRect.width / 2 - popupWidth / 2;

    const maxLeft = window.innerWidth - popupWidth - screenPadding;

    if (left > maxLeft) {
      left = maxLeft;
    }

    if (left < screenPadding) {
      left = screenPadding;
    }

    popupStyle = {
      top: tabRect.bottom + window.scrollY + 8,
      left,
      position: "absolute",
      width: popupWidth,
    };
  }

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-6 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Stores</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            Manage your branches and stores
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

      {/* Unified Container with Responsive Layout */}
      <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-40 p-3 flex flex-col md:items-center space-y-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex-1 border border-gray-300 px-4 py-3 rounded-md overflow-hidden">
              <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-semibold whitespace-nowrap">
                Stores
              </span>
            </div>
            <div className="ml-2 flex-shrink-0 bg-gray-200 dark:bg-gray-800 rounded-md p-3 dark:border dark:border-gray-600">
              <FaLock className="text-xl text-gray-500 dark:text-gray-200" />
            </div>
          </div>

          <div className="w-full relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between cursor-pointer w-full text-gray-500 dark:text-gray-300 hover:text-primary border border-gray-300 rounded-md px-4 py-3"
            >
              <span className="text-sm">Tiger</span>
              <FaEllipsisV className="text-lg" />
            </button>

            {isOpen && (
              <div className="absolute left-0 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-500">
                <button
                  onClick={() => {
                    const itemToEdit = savedSchedulers[0]; // Assuming you want to edit the first item
                    if (itemToEdit) {
                      setEditingItem(itemToEdit);
                      setShowEditPage(true);
                    }
                    setIsOpen(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                >
                  <FaEdit className="mr-2 text-primary" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    const itemToEdit = savedSchedulers[0];
                    if (itemToEdit) {
                      setItemToDelete(itemToEdit.id);
                      setDeleteType("scheduler");
                      setShowDeletePopup(true);
                    }
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaTrash className="mr-2 text-red-500" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="flex-1">
          {/* Tabs */}
          <div className="relative border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
            <div className="flex items-center">
              {/* Left Arrow */}
              <button
                className="px-2 py-3 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary disabled:opacity-30"
                disabled={visibleStartIndex === 0}
                onClick={() =>
                  setVisibleStartIndex(Math.max(0, visibleStartIndex - 1))
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div
                ref={containerRef}
                className="flex flex-1 overflow-x-hidden w-full"
              >
                {tabs
                  .slice(
                    visibleStartIndex,
                    visibleStartIndex + visibleTabsCount
                  )
                  .map((tab, index) => (
                    <button
                      key={tab.id}
                      ref={tab.id === "wifi" ? wifiTabRef : undefined}
                      className={`px-6 py-4 font-medium text-sm flex-shrink-0 flex items-center ${
                        tab.id === "wifi"
                          ? "text-gray-500 dark:text-gray-500 opacity-50 hover:bg-transparent"
                          : currentPage === tab.id
                          ? "text-primary border-b-2 border-primary"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => {
                        if (tab.id !== "wifi") {
                          setCurrentPage(tab.id);
                        }
                      }}
                      onMouseEnter={() => {
                        if (tab.id === "wifi") {
                          if (popupTimeout) {
                            clearTimeout(popupTimeout);
                            setPopupTimeout(null);
                          }
                          setShowWifiPopup(true);
                        }
                      }}
                      onMouseLeave={() => {
                        if (tab.id === "wifi") {
                          const timeout = setTimeout(() => {
                            if (!isPopupHovered) {
                              setShowWifiPopup(false);
                            }
                          }, 300);
                          setPopupTimeout(timeout);
                        }
                      }}
                    >
                      <span className="mr-2 text-lg">{tab.icon}</span>
                      <span>{tab.name}</span>
                    </button>
                  ))}
              </div>
              {/* Right Arrow */}
              <button
                className="px-2 py-3 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary disabled:opacity-30"
                disabled={visibleStartIndex + visibleTabsCount >= tabs.length}
                onClick={() =>
                  setVisibleStartIndex(
                    Math.min(
                      tabs.length - visibleTabsCount,
                      visibleStartIndex + 1
                    )
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {currentPage === "tables" && (
              <div>
                {showTableForm ? (
                  <div>
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 w-full">
                      <div className="flex items-center space-x-3">
                        <button
                          className="bg-secondary text-white px-3 py-3 rounded-md hover:bg-primary transition cursor-pointer flex items-center justify-center w-10 h-10"
                          onClick={() => setShowTableForm(false)}
                          aria-label="Back"
                          title="Back"
                        >
                          <FaChevronLeft />
                        </button>

                        <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md select-none">
                          <span>Scheduler</span>{" "}
                          <span className="text-gray-400">/</span>{" "}
                          <span className="text-primary">
                            {formData.id ? "Edit scheduler" : "Add scheduler"}
                          </span>
                        </div>
                      </div>
                      <button
                        className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary transition cursor-pointer"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </div>

                    <div className="space-y-6 max-w-sm">
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
                    </div>
                  </div>
                ) : showQRCustomization ? (
                  <div>
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 w-full">
                      <div className="flex items-center space-x-3">
                        <button
                          className="bg-secondary text-white p-2 rounded-sm hover:bg-primary cursor-pointer transition flex items-center justify-center w-10 h-10"
                          onClick={() => setShowQRCustomization(false)}
                          aria-label="Back"
                          title="Back"
                        >
                          <FaChevronLeft />
                        </button>

                        <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md select-none">
                          <span>Tables </span>{" "}
                          <span className="text-gray-400">/</span>{" "}
                          <span className="text-primary">
                            Customize QR code
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 border border-primary dark:border-primary rounded-sm text-sm text-gray-700 dark:text-gray-300">
                          <FaQuestionCircle className="text-primary" />
                          <span>Customize your QR code for store tables</span>
                        </div>
                      </div>
                      <button
                        className="bg-secondary text-white px-4 py-2 rounded-sm hover:bg-primary transition cursor-pointer"
                        onClick={() => {
                          const qrSettings = {
                            logo: selectedLogo,
                            pattern: selectedPattern,
                            eyeStyle: selectedEyeStyle,
                            color: selectedColor,
                            frame: selectedFrame,
                          };
                          console.log("QR Settings Saved:", qrSettings);
                          alert("QR settings saved successfully!");
                        }}
                      >
                        Save
                      </button>
                    </div>
                    <div className="max-w-4xl mx-auto mt-10">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-6 md:w-1/2">
                          <div className="space-y-3">
                            {designTabs.map((tab) => (
                              <div key={tab.id} className="transition-all">
                                <div
                                  className={`flex justify-between items-center p-3 cursor-pointer transition-colors ${
                                    activeDesignTab === tab.id
                                      ? "border border-gray-200 rounded-sm"
                                      : "border border-gray-200 rounded-sm"
                                  }`}
                                  onClick={() =>
                                    setActiveDesignTab(
                                      activeDesignTab === tab.id ? null : tab.id
                                    )
                                  }
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">{tab.icon}</span>
                                    <span className="font-medium">
                                      {tab.label}
                                    </span>
                                  </div>
                                  {activeDesignTab === tab.id ? (
                                    <FaChevronUp className="text-gray-500" />
                                  ) : (
                                    <FaChevronDown className="text-gray-500" />
                                  )}
                                </div>

                                {activeDesignTab === tab.id && (
                                  <div className="p-4 bg-white animate-fadeIn">
                                    {tab.id === "logo" && <LogoUploadSection />}
                                    {tab.id === "pattern" && (
                                      <PatternSelectionSection />
                                    )}
                                    {tab.id === "eyes" && <EyeStyleSection />}
                                    {tab.id === "color" && (
                                      <ColorSelectionSection />
                                    )}
                                    {tab.id === "frame" && (
                                      <FrameSelectionSection />
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 md:w-1/2 bg-gray-50">
                          <QRPreviewSection />
                          <ScanReminderSection />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                      <div className="flex gap-4">
                        <button
                          className="bg-secondary cursor-pointer text-white px-4 py-3 rounded-sm flex items-center hover:bg-primary transition-colors duration-200"
                          onClick={() => {
                            setFormData({ name: "", id: null });
                            setShowTableForm(true);
                          }}
                        >
                          + Add New
                        </button>
                        <button
                          className="border border-gray-300 dark:border-gray-600 cursor-pointer px-4 py-3 rounded-sm flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                          onClick={() => setShowQRCustomization(true)}
                        >
                          <img
                            src="https://www.app.menutigr.com/static/media/qr.d9e8c248e7e8438effce3b671c66f607.svg"
                            alt="QR Icon"
                            className="w-4 h-4 mr-2"
                          />
                          Customize QR Code
                        </button>
                      </div>
                    </div>

                    {savedSchedulers.length > 0 ? (
                      <div className="space-y-4">
                        {savedSchedulers.map((item) => (
                          <div
                            key={item.id}
                            className="p-4 border border-gray-200 dark:border-gray-700 rounded-md flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <span className="font-medium">{item.name}</span>
                            <div className="flex space-x-2">
                              <button
                                className="text-gray-500 hover:text-primary"
                                onClick={() => handleEdit(item.id)}
                              >
                                <img
                                  src="https://www.app.menutigr.com/static/media/edit.15f245273e71fb843eeb7281dec04a52.svg"
                                  alt="Edit"
                                  className="h-4 w-4"
                                />
                              </button>
                              <button
                                className="text-gray-500 hover:text-red-500"
                                onClick={() => {
                                  setItemToDelete(item.id);
                                  setDeleteType("scheduler");
                                  setShowDeletePopup(true);
                                }}
                              >
                                <img
                                  src="https://www.app.menutigr.com/static/media/delete.f9fb3a4cc8c70107a50718ec2199a285.svg"
                                  alt="Delete"
                                  className="h-4 w-4"
                                />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center h-64">
                        <img
                          src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                          alt="Empty state"
                          className="w-16 h-16 mb-4"
                        />
                        <p>No schedulers added yet</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            {currentPage === "users" && (
              <div>
                {showUserForm ? (
                  <div>
                    {/* Form Header */}
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <button
                          className="bg-secondary text-white p-2 rounded-sm hover:bg-primary cursor-pointer transition flex items-center justify-center w-10 h-10"
                          onClick={() => setShowUserForm(false)}
                        >
                          <FaChevronLeft />
                        </button>
                        <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md select-none">
                          <span>Users</span>{" "}
                          <span className="text-gray-400">/</span>{" "}
                          <span className="text-primary">Add New User</span>
                        </div>
                      </div>
                      <button
                        className="bg-secondary cursor-pointer text-white px-4 py-2 rounded-sm hover:bg-primary transition cursor-pointer"
                        onClick={handleSaveUser}
                      >
                        Save
                      </button>
                    </div>

                    {/* User Form with parallel labels and inputs */}
                    <div className="space-y-4 max-w-lg">
                      {/* First Name */}
                      <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-sm overflow-hidden">
                        <label className="w-1/4 px-4 py-3 text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={userFormData.firstName}
                          onChange={handleUserInputChange}
                          className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none"
                          placeholder="Enter first name"
                          required
                        />
                      </div>

                      {/* Last Name */}
                      <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-sm overflow-hidden">
                        <label className="w-1/4 px-4 py-3 text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={userFormData.lastName}
                          onChange={handleUserInputChange}
                          className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none"
                          placeholder="Enter last name"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-sm overflow-hidden">
                        <label className="w-1/4 px-4 py-3 text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={userFormData.email}
                          onChange={handleUserInputChange}
                          className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none"
                          placeholder="Enter email"
                          required
                        />
                      </div>

                      {/* Password */}
                      <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-sm overflow-hidden">
                        <label className="w-1/4 px-4 py-3 text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative flex-1">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={userFormData.password}
                            onChange={handleUserInputChange}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none"
                            placeholder="Enter password"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-sm overflow-hidden">
                        <label className="w-1/4 px-4 py-3 text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                          Confirm Password{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative flex-1">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={userFormData.confirmPassword}
                            onChange={handleUserInputChange}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none"
                            placeholder="Confirm password"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      {/* Access Level */}
                      <div className="flex flex-col">
                        <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-sm overflow-hidden">
                          <label className="w-1/4 px-4 py-3 text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                            Access Level <span className="text-red-500">*</span>
                          </label>
                          <div className="relative flex-1">
                            <select
                              name="accessLevel"
                              value={userFormData.accessLevel}
                              onChange={handleUserInputChange}
                              className="w-full px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none appearance-none"
                              required
                            >
                              <option value="">Select access level</option>
                              <option value="Admin">Admin</option>
                              <option value="Manager">Manager</option>
                              <option value="Staff">Staff</option>
                              <option value="OrderManager">
                                Order Manager
                              </option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <FaChevronDown className="text-gray-400" />
                            </div>
                          </div>
                        </div>
                        {userFormData.accessLevel === "OrderManager" && (
                          <p className="text-xs text-gray-500 mt-1 ml-[25%] pl-4">
                            User can view and manage the orders section only
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm text-sm text-gray-700 dark:text-gray-300">
                        <FaQuestionCircle className="text-primary" />
                        <span>
                          User can view and manage the orders section only
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Table View */}
                    <div className="flex items-center gap-4 mb-6">
                      <button
                        className="bg-secondary cursor-pointer text-white px-4 py-3 rounded-sm hover:bg-primary transition-colors duration-200"
                        onClick={() => {
                          setUserFormData({
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                            accessLevel: "",
                          });
                          setShowUserForm(true);
                        }}
                      >
                        + Add New
                      </button>

                      <div className="flex items-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm text-sm text-gray-700 dark:text-gray-300">
                        <FaQuestionCircle className="text-primary" />
                        <span>Manage your store users</span>
                      </div>
                    </div>

                    <div className="border border-gray-300 dark:border-gray-600 rounded-sm overflow-hidden">
                      <table className="min-w-full">
                        <thead className="border-b border-gray-300 dark:border-gray-600">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wider group dark:hover:bg-gray-700 transition-colors">
                              <div className="flex items-center gap-1">
                                First Name
                                <FaArrowUp className="opacity-0 group-hover:opacity-100 text-xs transition-opacity" />
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wider group  dark:hover:bg-gray-700 transition-colors">
                              <div className="flex items-center gap-1">
                                Last Name
                                <FaArrowUp className="opacity-0 group-hover:opacity-100 text-xs transition-opacity" />
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wider group dark:hover:bg-gray-700 transition-colors">
                              <div className="flex items-center gap-1">
                                Email
                                <FaArrowUp className="opacity-0 group-hover:opacity-100 text-xs transition-opacity" />
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wider group dark:hover:bg-gray-700 transition-colors">
                              <div className="flex items-center gap-1">
                                Access Level
                                <FaArrowUp className="opacity-0 group-hover:opacity-100 text-xs transition-opacity" />
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.length > 0 ? (
                            users.map((user) => (
                              <tr
                                key={user.id}
                                className="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                  {user.firstName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                  {user.lastName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                  {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                  {user.accessLevel}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleEditUser(user.id)}
                                      className="text-blue-600 hover:text-blue-900"
                                    >
                                      <FaEdit className="text-primary" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        setItemToDelete(user.id);
                                        setDeleteType("user");
                                        setShowDeletePopup(true);
                                      }}
                                      className="text-red-600 hover:text-red-900"
                                    >
                                      <FaTrash />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="4"
                                className="px-6 py-12 text-center"
                              >
                                <div className="flex flex-col items-center justify-center">
                                  <img
                                    src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                                    alt="No users"
                                    className="w-16 h-16 mb-4"
                                  />
                                  <p className="text-gray-500 dark:text-gray-400">
                                    No users added yet
                                  </p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
            {currentPage === "hours" && (
              <div>
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md select-none">
                      <span>Opening Hours</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300">
                      <FaQuestionCircle className="text-primary" />
                      <span>Manage your business hours</span>
                    </div>
                  </div>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-teal-700 transition cursor-pointer w-full sm:w-auto"
                    onClick={() => {
                      // Here you would typically:
                      // 1. Collect all the opening hours data
                      // 2. Validate the data
                      // 3. Send to your backend API
                      // 4. Handle success/error
                      console.log("Saving opening hours...");
                      alert("Opening hours saved successfully!");

                      // Example with actual implementation:
                      // handleSaveOpeningHours();
                    }}
                  >
                    Save
                  </button>
                </div>

                {/* Days of Week */}
                <div className="space-y-4">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <div
                      key={day}
                      className="border border-gray-200 dark:border-gray-700 rounded-md p-4"
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        {/* Day and Toggle */}
                        <div className="flex items-center gap-4 w-full md:w-auto">
                          <div className="flex items-center gap-4 border border-gray-200 px-4 py-2 rounded-md flex-1 md:flex-none">
                            <span className="w-24 text-md">{day}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                defaultChecked
                                onChange={(e) => {
                                  // Handle toggle change
                                  console.log(
                                    `${day} active:`,
                                    e.target.checked
                                  );
                                }}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-primary"></div>
                            </label>
                          </div>
                        </div>

                        {/* Time Slots */}
                        <div className="flex items-center gap-4 w-full md:w-auto">
                          <div className="flex items-center gap-2 flex-1">
                            <input
                              type="time"
                              className="border border-gray-300 dark:border-gray-600 rounded px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 w-full"
                              defaultValue="09:00"
                              onChange={(e) => {
                                // Handle time change
                                console.log(`${day} from:`, e.target.value);
                              }}
                            />
                            <span className="mx-1">-</span>
                            <input
                              type="time"
                              className="border border-gray-300 dark:border-gray-600 rounded px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 w-full"
                              defaultValue="17:00"
                              onChange={(e) => {
                                // Handle time change
                                console.log(`${day} to:`, e.target.value);
                              }}
                            />
                          </div>
                          <button
                            className="bg-secondary text-white p-2 rounded-sm hover:bg-secondary-dark transition-colors flex-shrink-0"
                            onClick={() => {
                              // Handle adding new time slot
                              console.log(`Add new time slot for ${day}`);
                            }}
                          >
                            <FaPlus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentPage === "social" && (
              <div>
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4 sm:mb-0">
                    <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md select-none border border-gray-300 dark:border-gray-600">
                      <span>Social Accounts</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300">
                      <FaQuestionCircle className="text-primary" />
                      <span>Add your social accounts</span>
                    </div>
                  </div>
                  <button className="bg-secondary cursor-pointer text-white px-4 py-3 rounded-md hover:bg-teal-700 transition cursor-pointer w-full sm:w-auto border border-primary">
                    Save
                  </button>
                </div>

                {/* Divider */}
                <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

                {/* Social Media Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Facebook",
                      icon: "https://cdn-icons-png.flaticon.com/512/124/124010.png",
                      placeholder: "https://facebook.com/yourpage",
                    },
                    {
                      name: "Twitter (X)",
                      icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png",
                      placeholder: "https://twitter.com/yourhandle",
                    },
                    {
                      name: "Instagram",
                      icon: "https://cdn-icons-png.flaticon.com/512/174/174855.png",
                      placeholder: "https://instagram.com/yourprofile",
                    },
                    {
                      name: "LinkedIn",
                      icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
                      placeholder: "https://linkedin.com/company/yourpage",
                    },
                    {
                      name: "YouTube",
                      icon: "https://cdn-icons-png.flaticon.com/512/174/174883.png",
                      placeholder: "https://youtube.com/yourchannel",
                    },
                    {
                      name: "TikTok",
                      icon: "https://cdn-icons-png.flaticon.com/512/3046/3046126.png",
                      placeholder: "https://tiktok.com/@yourusername",
                    },
                  ].map((social) => (
                    <div
                      key={social.name}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 flex-shrink-0 bg-white dark:bg-gray-800 rounded-full p-2 border border-gray-200 dark:border-gray-600">
                          <img
                            src={social.icon}
                            alt={social.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h4 className="font-medium text-lg">{social.name}</h4>
                      </div>
                      <input
                        type="text"
                        placeholder={social.placeholder}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentPage === "location" && (
              <div>
                {/* Header Section - unchanged */}
                <div className="flex flex-col sm:flex-col md:flex-row justify-between gap-4 md:gap-6 items-start md:items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
                    <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md select-none border border-gray-300 dark:border-gray-600 w-full md:w-auto">
                      <span>Location Details</span>
                    </div>
                    <div className="flex items-start gap-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 w-full md:w-auto">
                      <FaQuestionCircle className="text-primary mt-0.5" />
                      <span className="leading-snug">
                        Add store location details to identify customer orders
                        which are inside the store radius area
                      </span>
                    </div>
                  </div>
                  <button
                    className="bg-secondary text-white px-4 py-3 rounded-md hover:bg-teal-700 transition cursor-pointer w-full md:w-auto border border-primary"
                    onClick={() => {
                      // Add your save logic here
                      console.log("Saving location data:", {
                        latitude: 14.599512,
                        longitude: 120.984222,
                        radius: radiusValue, // radiusValue should be from your state
                      });
                      alert("Location settings saved!");
                    }}
                  >
                    Save
                  </button>
                </div>

                {/* Location Toggle - unchanged */}
                <div className="flex items-center justify-between px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md mb-6 max-w-90">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">
                      Enable location details
                    </span>
                    <FaQuestionCircle className="text-primary text-sm" />
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={locationEnabled}
                      onChange={() => setLocationEnabled(!locationEnabled)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-primary"></div>
                  </label>
                </div>

                {/* Location Details Form */}
                {locationEnabled && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Side - Location Details */}
                    <div className="space-y-4">
                      <button className="flex items-center justify-center gap-2 text-secondary px-3 py-2 rounded-md hover:bg-secondary-dark/10 dark:hover:bg-secondary-dark/20 transition-all cursor-pointer w-full border border-primary hover:border-primary-dark hover:shadow-sm">
                        <FaMapMarkerAlt className="text-primary" />
                        Get Current Location
                      </button>
                      <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 space-y-4">
                        {/* Latitude and Longitude - unchanged */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 dark:border dark:border-gray-700 px-3 py-2 rounded-md">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              Latitude
                            </span>
                            <span className="text-gray-900 dark:text-gray-100">
                              14.599512
                            </span>
                          </div>

                          <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 dark:border dark:border-gray-700 px-3 py-2 rounded-md">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              Longitude
                            </span>
                            <span className="text-gray-900 dark:text-gray-100">
                              120.984222
                            </span>
                          </div>
                        </div>

                        {/* Radius - now connected to state */}
                        <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                          <label className="w-2/4 px-6 py-2.5 text-sm font-semibold bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-r border-gray-300 dark:border-gray-600 flex items-center gap-2">
                            Radius <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            name="radius"
                            value={radiusValue}
                            onChange={(e) => setRadiusValue(e.target.value)}
                            className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-800 focus:outline-none"
                            placeholder="Enter radius"
                            required
                          />
                        </div>
                        <div className="flex items-center gap-2 px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md text-md text-gray-700 dark:text-gray-300">
                          <FaQuestionCircle className="text-primary" />
                          <span>Radius in meter (1 Meter = 3.28 Feet)</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Map now shows radius */}
                    <div>
                      <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 mb-4">
                        <FaQuestionCircle className="text-primary" />
                        <span>
                          Use the interactive map to set your location
                        </span>
                      </div>

                      {/* Replace this block with MapContainer */}
                      <MapContainer
                        center={[7.0329, 38.4955]}
                        zoom={getZoomLevel(radiusValue)}
                        scrollWheelZoom={false}
                        className="h-64 w-full rounded-md border border-gray-300 dark:border-gray-600"
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <RadiusCircle
                          center={[7.0329, 38.4955]}
                          radius={radiusValue}
                        />
                      </MapContainer>
                    </div>
                  </div>
                )}
              </div>
            )}
            {currentPage === "settings" && (
              <div>
                {/* Settings Header Section */}
                <div className="flex flex-col sm:flex-col md:flex-row justify-between gap-4 md:gap-6 items-start md:items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
                    <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-sm select-none w-full md:w-auto">
                      <span>Settings</span>
                    </div>
                    <div className="flex items-start gap-2 px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-sm text-sm text-gray-700 dark:text-gray-300 w-full md:w-auto">
                      <FaQuestionCircle className="text-primary mt-0.5" />
                      <span className="leading-snug">
                        Manage your store settings
                      </span>
                    </div>
                  </div>
                  <button
                    className="bg-secondary cursor-pointer text-white px-4 py-3 rounded-sm hover:bg-primary transition cursor-pointer w-full md:w-auto border border-primary"
                    onClick={() => {
                      // Prepare settings data to save
                      const settingsData = {
                        contactlessMenu: {
                          takeawayEnabled: takeawayEnabled,
                          dineInEnabled: dineInEnabled,
                        },
                        foodAppearance: {
                          allowSpecialInstructions: allowSpecialInstructions,
                          displayFullFoodName: displayFullFoodName,
                        },
                        storeMenu: storeMenu,
                      };

                      // Here you would typically make an API call
                      console.log("Saving settings:", settingsData);

                      // Show success feedback
                      alert("Settings saved successfully!");

                      // You could also add state management here
                      // setSavedSettings(settingsData);
                    }}
                  >
                    Save
                  </button>
                </div>

                {/* Settings Content */}
                <div className="space-y-6">
                  {/* First Border Section */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-sm p-4">
                    <div className="flex items-center justify-between mb-4 border border-primary px-4 py-3 rounded-sm">
                      <div className="flex items-center gap-2">
                        <FaQuestionCircle className="text-primary text-sm" />
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          How to make a contactless view-only menu with no order
                          and pay option?
                        </h4>
                      </div>
                      <a
                        href="#"
                        className="text-sm text-primary hover:underline"
                      >
                        Read more
                      </a>
                    </div>

                    <div className="space-y-4">
                      {/* Enable Takeaway */}
                      <div className="flex items-center justify-between border border-gray-300 px-4 py-3 rounded-sm">
                        <div className="flex items-center gap-2">
                          <span>Enable takeaway</span>
                          <FaQuestionCircle className="text-primary text-sm" />
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={takeawayEnabled}
                            onChange={() =>
                              setTakeawayEnabled(!takeawayEnabled)
                            }
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-primary"></div>
                        </label>
                      </div>

                      {/* Enable Dine In */}
                      <div className="flex items-center justify-between border border-gray-300 px-4 py-3 rounded-sm">
                        <div className="flex items-center gap-2">
                          <span>Enable dine in</span>
                          <FaQuestionCircle className="text-primary text-sm" />
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={dineInEnabled}
                            onChange={() => setDineInEnabled(!dineInEnabled)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Second Border Section */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-sm p-4">
                    <div className="flex items-center gap-2 mb-4 border border-primary px-4 py-3 rounded-sm">
                      <FaQuestionCircle className="text-primary text-sm" />
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        Customize your food appearance
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {/* Allow Special Instructions */}
                      <div className="flex items-center justify-between border border-gray-300 px-4 py-3 rounded-sm">
                        <div className="flex items-center gap-2">
                          <span>Allow special instructions</span>
                          <FaQuestionCircle className="text-primary text-sm" />
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={allowSpecialInstructions}
                            onChange={() =>
                              setAllowSpecialInstructions(
                                !allowSpecialInstructions
                              )
                            }
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-primary"></div>
                        </label>
                      </div>

                      {/* Display Full Food Name */}
                      <div className="flex items-center justify-between border border-gray-300 px-4 py-3 rounded-sm">
                        <div className="flex items-center gap-2">
                          <span>Display full food name</span>
                          <FaQuestionCircle className="text-primary text-sm" />
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={displayFullFoodName}
                            onChange={() =>
                              setDisplayFullFoodName(!displayFullFoodName)
                            }
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Third Border Section */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-sm p-4">
                    <div className="flex items-center gap-2 mb-4 border border-gray-300 px-4 py-3 rounded-sm">
                      <FaQuestionCircle className="text-primary text-sm" />
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        Select a restaurant menu for your store
                      </h4>
                    </div>

                    <div className="border border-gray-300 dark:border-gray-600 rounded-sm overflow-hidden focus-within:border-primary transition-colors">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                          Store Menu *
                        </span>
                        <input
                          type="text"
                          className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none"
                          placeholder="Select menu"
                          value={storeMenu}
                          onChange={(e) => setStoreMenu(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showWifiPopup && wifiTabRef.current && (
        <div
          className="z-50 bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg"
          style={popupStyle}
          onMouseEnter={() => {
            setIsPopupHovered(true);
            if (popupTimeout) {
              clearTimeout(popupTimeout);
              setPopupTimeout(null);
            }
          }}
          onMouseLeave={() => {
            setIsPopupHovered(false);
            setShowWifiPopup(false);
          }}
        >
          <div className="text-sm text-gray-700 dark:text-gray-300 text-left">
            <div className="flex items-start justify-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Access Denied
              </h3>
            </div>

            <p className="mb-4 text-gray-600 dark:text-gray-400">
              You do not have permission to use this feature due to limitations
              in your current plan. Please upgrade or adjust your plan to gain
              access.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setCurrentPage("billing");
                  setShowWifiPopup(false);
                }}
                className="w-full border border-primary text-primary px-5 py-2 rounded-sm hover:bg-primary-dark text-base shadow-md"
              >
                Compare Plans
              </button>
              <button
                onClick={() => setShowWifiPopup(false)}
                className="w-full bg-secondary dark:bg-gray-700 text-white shadow-md dark:text-white px-5 py-2 rounded-sm hover:bg-primary dark:hover:bg-gray-600 text-base"
              >
                Upgrade Your Plan
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-base font-semibold mb-2 dark:text-white">
              Confirm Deletion
            </h3>
            <p className="text-sm mb-4 dark:text-gray-300 leading-relaxed">
              Are you sure you want to delete{" "}
              {deleteType === "scheduler" ? "this scheduler" : "this user"}?
              This action cannot be undone.
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
                  if (deleteType === "scheduler") {
                    handleDelete(itemToDelete);
                  } else {
                    handleDeleteUser(itemToDelete);
                  }
                  setShowDeletePopup(false);
                }}
                className="px-3 py-1.5 bg-red-600 text-sm text-white rounded-full hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stores;
