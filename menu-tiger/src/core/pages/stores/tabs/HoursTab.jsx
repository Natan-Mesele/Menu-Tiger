import React, { useState, useRef, useEffect } from "react";
import {
  FaPlus,
  FaMinus,
  FaQuestionCircle,
  FaClock,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import SaveButton from "../../../commons/SaveButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "../../../commons/ToastProvider";

const initialDayState = {
  isOpen: true,
  timeSlots: [
    {
      open: "09:00",
      close: "17:00",
    },
  ],
};

const defaultHours = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
].reduce((acc, day) => {
  acc[day] = { ...initialDayState };
  return acc;
}, {});

const TimePicker = ({ value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(value);
  const timePickerRef = useRef(null);
  const [savedHours, setSavedHours] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 12 }, (_, i) =>
    (i * 5).toString().padStart(2, "0")
  );

  const [selectedHour, selectedMinute] = time.split(":");

  useEffect(() => {
    setTime(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        timePickerRef.current &&
        !timePickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleHourChange = (hour) => {
    const newTime = `${hour}:${selectedMinute}`;
    setTime(newTime);
    onChange(newTime);
  };

  const handleMinuteChange = (minute) => {
    const newTime = `${selectedHour}:${minute}`;
    setTime(newTime);
    onChange(newTime);
  };

  const incrementHour = () => {
    let newHour = parseInt(selectedHour) + 1;
    if (newHour > 23) newHour = 0;
    handleHourChange(newHour.toString().padStart(2, "0"));
  };

  const decrementHour = () => {
    let newHour = parseInt(selectedHour) - 1;
    if (newHour < 0) newHour = 23;
    handleHourChange(newHour.toString().padStart(2, "0"));
  };

  const incrementMinute = () => {
    let newMinute = parseInt(selectedMinute) + 5;
    if (newMinute > 55) newMinute = 0;
    handleMinuteChange(newMinute.toString().padStart(2, "0"));
  };

  const decrementMinute = () => {
    let newMinute = parseInt(selectedMinute) - 5;
    if (newMinute < 0) newMinute = 55;
    handleMinuteChange(newMinute.toString().padStart(2, "0"));
  };

  return (
    <div className="relative w-full" ref={timePickerRef}>
      <div
        className={`flex items-center justify-between border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 w-full focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } ${
          isOpen
            ? "border-primary ring-2 ring-primary/50"
            : "border-gray-300 dark:border-gray-600"
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <FaClock className="text-gray-400 mr-2" />
        <span className="text-gray-700 dark:text-gray-300">{time}</span>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2">
          <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col items-center w-1/2">
              <button
                onClick={incrementHour}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 w-full flex justify-center"
              >
                <FaChevronUp className="text-gray-600 dark:text-gray-300" />
              </button>
              <div className="h-10 flex items-center justify-center font-medium text-gray-800 dark:text-gray-200 text-lg">
                {selectedHour}
              </div>
              <button
                onClick={decrementHour}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 w-full flex justify-center"
              >
                <FaChevronDown className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="text-xl text-gray-500 dark:text-gray-400">:</div>

            <div className="flex flex-col items-center w-1/2">
              <button
                onClick={incrementMinute}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 w-full flex justify-center"
              >
                <FaChevronUp className="text-gray-600 dark:text-gray-300" />
              </button>
              <div className="h-10 flex items-center justify-center font-medium text-gray-800 dark:text-gray-200 text-lg">
                {selectedMinute}
              </div>
              <button
                onClick={decrementMinute}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 w-full flex justify-center"
              >
                <FaChevronDown className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-1 max-h-40 overflow-y-auto">
            {hours.map((hour) => (
              <button
                key={`hour-${hour}`}
                className={`p-1 rounded text-sm ${
                  hour === selectedHour
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => handleHourChange(hour)}
              >
                {hour}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-6 gap-1 mt-2 max-h-40 overflow-y-auto">
            {minutes.map((minute) => (
              <button
                key={`minute-${minute}`}
                className={`p-1 rounded text-sm ${
                  minute === selectedMinute
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => handleMinuteChange(minute)}
              >
                {minute}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function HoursTab() {
  const [savedHours, setSavedHours] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [hours, setHours] = useState(
    savedHours && Object.keys(savedHours).length ? savedHours : defaultHours
  );

  const handleToggle = (day, value) => {
    setHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isOpen: value,
      },
    }));
  };

  const handleTimeChange = (day, key, value) => {
    setHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      console.log("Saving hours:", hours);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Opening hours saved successfully!");
    } catch (error) {
      console.error("Failed to save hours:", error);
      alert("Failed to save hours. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-200 dark:bg-gray-700 px-4 py-3 rounded-md shadow-md select-none">
            <span>Opening Hours</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 border border-primary dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300">
            <FaQuestionCircle className="text-primary" />
            <span>Manage your business hours</span>
          </div>
        </div>
        <SaveButton
          onClick={handleSave}
          disabled={isSaving}
          isLoading={isSaving}
        />
      </div>

      {/* Days of Week */}
      <div className="space-y-4">
        {Object.keys(hours).map((day) => (
          <div
            key={day}
            className="border border-gray-200 dark:border-gray-700 rounded-md p-4"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Day and Toggle */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex items-center gap-4 border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-md flex-1 md:flex-none">
                  <span className="w-24 text-md dark:text-gray-100">{day}</span>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={hours[day].isOpen}
                      onChange={(e) => handleToggle(day, e.target.checked)}
                    />
                    <div className="relative w-12 h-4 overflow-visible">
                      <div
                        className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                          hours[day].isOpen
                            ? "bg-primary/20"
                            : "bg-gray-400 dark:bg-gray-700"
                        }`}
                      ></div>
                      <div
                        className={`absolute -top-[6px] ${
                          hours[day].isOpen
                            ? "left-[26px] bg-primary border-primary/50"
                            : "left-0 bg-white border-gray-100 shadow-lg"
                        } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]`}
                      ></div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Time Slots - Now using more space */}
              <div className="flex flex-col gap-2 w-full">
                {hours[day].timeSlots.map((slot, index) => (
                  <div key={index} className="flex items-center gap-3 w-full">
                    <div className="flex-1 min-w-0">
                      <TimePicker
                        value={slot.open}
                        onChange={(value) => {
                          const newHours = { ...hours };
                          newHours[day].timeSlots[index].open = value;
                          setHours(newHours);
                        }}
                        disabled={!hours[day].isOpen}
                      />
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 mx-1">
                      -
                    </span>
                    <div className="flex-1 min-w-0">
                      <TimePicker
                        value={slot.close}
                        onChange={(value) => {
                          const newHours = { ...hours };
                          newHours[day].timeSlots[index].close = value;
                          setHours(newHours);
                        }}
                        disabled={!hours[day].isOpen}
                      />
                    </div>
                    {/* Add button for the last time slot only */}
                    {index === hours[day].timeSlots.length - 1 && (
                      <button
                        className="bg-secondary text-white p-2.5 rounded-md hover:bg-secondary-dark transition-colors flex-shrink-0 shadow-lg hover:shadow-lg"
                        onClick={() => {
                          setHours((prev) => ({
                            ...prev,
                            [day]: {
                              ...prev[day],
                              timeSlots: [
                                ...prev[day].timeSlots,
                                { open: "09:00", close: "17:00" },
                              ],
                            },
                          }));
                        }}
                      >
                        <FaPlus className="w-4 h-4" />
                      </button>
                    )}
                    {/* Remove button for all except first time slot */}
                    {index > 0 && (
                      <button
                        className="bg-red-500 text-white p-2.5 rounded-lg hover:bg-red-600 transition-colors flex-shrink-0 shadow-sm hover:shadow-md"
                        onClick={() => {
                          const newHours = { ...hours };
                          newHours[day].timeSlots.splice(index, 1);
                          setHours(newHours);
                        }}
                      >
                        <FaMinus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastProvider />
    </div>
  );
}

export default HoursTab;
