import React, { useState } from "react";
import {
  FaRocket,
  FaUtensils,
  FaPlus,
  FaQuestion,
  FaChevronRight,
  FaChevronLeft,
  FaEdit,
  FaTrash,
  FaEllipsisV,
  FaCheck,
  FaTimes,
  FaHistory,
} from "react-icons/fa";

function Surveys() {
  // Main state variables
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [openSurveyId, setOpenSurveyId] = useState(null);
  const [currentSection, setCurrentSection] = useState("survey");
  const [surveys, setSurveys] = useState([
    { id: 1, name: "Customer Satisfaction", active: true, questions: [] },
    { id: 2, name: "Product Feedback", active: false, questions: [] },
    { id: 3, name: "Service Quality", active: true, questions: [] },
  ]);

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    welcomeNote: "",
    active: true,
    questions: [],
  });

  // Question form state
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("text");
  const [isQuestionRequired, setIsQuestionRequired] = useState(false);
  const [options, setOptions] = useState([""]);

  // Preview state
  const [textAnswer, setTextAnswer] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [yesNoAnswer, setYesNoAnswer] = useState(null);
  const [selectedSmiley, setSelectedSmiley] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  // Handlers
  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setEditingId(null);
    setFormData({
      name: "",
      welcomeNote: "",
      active: true,
      questions: [],
    });
  };

  const handleBackClick = () => {
    setIsAddingNew(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.name) {
      alert("Please enter a survey name!");
      return;
    }

    if (editingId) {
      // Update existing survey
      setSurveys(
        surveys.map((survey) => (survey.id === editingId ? formData : survey))
      );
    } else {
      // Add new survey
      const newSurvey = {
        id: Date.now(),
        ...formData,
      };
      setSurveys([...surveys, newSurvey]);
    }

    setIsAddingNew(false);
    setEditingId(null);
  };

  const handleEdit = (id) => {
    const surveyToEdit = surveys.find((survey) => survey.id === id);
    if (surveyToEdit) {
      setFormData(surveyToEdit);
      setIsAddingNew(true);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this survey?")) {
      setSurveys(surveys.filter((survey) => survey.id !== id));
    }
  };

  const toggleSurveyStatus = (id) => {
    setSurveys(
      surveys.map((survey) =>
        survey.id === id ? { ...survey, active: !survey.active } : survey
      )
    );
  };

  // Question management
  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const removeOption = (index) => {
    if (options.length > 1) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  const addQuestion = () => {
    if (!questionText) return;

    const newQuestion = {
      text: questionText,
      type: questionType,
      required: isQuestionRequired,
      options:
        questionType === "multiple_choice" ? options.filter((opt) => opt) : [],
    };

    setFormData({
      ...formData,
      questions: [...formData.questions, newQuestion],
    });
    // Only reset the options if it's multiple choice to start fresh
    if (questionType === "multiple_choice") {
      setOptions([""]);
    }

    // Reset all question states
    setQuestionText("");
    setQuestionType("text");
    setIsQuestionRequired(false);
    setOptions([""]);
    setTextAnswer("");
    setStarRating(0);
    setYesNoAnswer(null);
    setSelectedSmiley(null);
  };

  const handleSubmitSurvey = () => {
    // Here you would typically send the formData to your backend
    console.log("Survey submitted:", formData);
    alert("Survey submitted successfully!");

    // Reset form if needed
    setFormData({
      name: "",
      welcomeNote: "",
      active: true,
      questions: [],
    });
  };

  // Preview interaction handlers
  const handleTextChange = (e) => {
    setTextAnswer(e.target.value);
  };

  const handleStarClick = (rating) => {
    setStarRating(rating);
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleYesNoClick = (answer) => {
    setYesNoAnswer(answer);
  };

  const handleSmileyClick = (smiley) => {
    setSelectedSmiley(smiley);
  };

  const handleOptionSelect = (questionIndex, optionIndex) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: optionIndex,
    });
  };

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-6 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Survey</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            Create digital surveys
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

      {/* Body content */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        {isAddingNew ? (
          <>
            {/* Back arrow and breadcrumb */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <button
                  className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary transition cursor-pointer flex items-center justify-center w-10 h-10"
                  onClick={handleBackClick}
                  aria-label="Back"
                  title="Back"
                >
                  <FaChevronLeft />
                </button>
                <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-md select-none">
                  <span>Surveys</span> <span className="text-gray-400">/</span>{" "}
                  <span className="text-primary">
                    {editingId ? "Edit Survey" : "Add Survey"}
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

            {/* Divider line */}
            <div className="border-b border-gray-300 dark:border-gray-600 mb-6"></div>

            {/* Tabs */}
            <div className="flex border-b border-gray-300 dark:border-gray-600 mb-6">
              <button
                className={`px-4 py-2 font-medium cursor-pointer ${
                  currentSection === "survey"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setCurrentSection("survey")}
              >
                Survey
              </button>
              <button
                className={`px-4 py-2 font-medium cursor-pointer ${
                  currentSection === "localize"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setCurrentSection("localize")}
              >
                Localize
              </button>
            </div>

            {/* Survey Form Content */}
            {currentSection === "survey" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Form Inputs */}
                <div className="space-y-6">
                  {/* Survey Name */}
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                      Name <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                      placeholder="Enter survey name"
                    />
                  </div>

                  {/* Welcome Note */}
                  <div className="flex flex-col border border-gray-300 dark:border-gray-600 rounded-md">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-b border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                      Welcome note <span className="text-red-500">*</span>
                    </span>
                    <textarea
                      rows={3}
                      value={formData.welcomeNote}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          welcomeNote: e.target.value,
                        })
                      }
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-b-md"
                      placeholder="Enter welcome message for survey takers"
                    />
                  </div>

                  {/* Questions Section */}
                  <div className="space-y-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                    <h3 className="font-medium text-lg">Question Builder</h3>

                    {/* Question Input */}
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-600">
                        Question <span className="text-red-500">*</span>
                      </span>
                      <input
                        type="text"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                        placeholder="Enter question text"
                      />
                    </div>

                    {/* Question Type */}
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-600">
                        Type <span className="text-red-500">*</span>
                      </span>
                      <select
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value)}
                        className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md appearance-none"
                      >
                        <option value="text">Text box</option>
                        <option value="rating">Star Rating</option>
                        <option value="yes_no">Yes/No</option>
                        <option value="smiley">Smiley Rating</option>
                      </select>
                    </div>

                    {/* Required Checkbox */}
                    <div className="flex items-center p-2 border border-gray-300 dark:border-gray-600 rounded-md">
                      <input
                        type="checkbox"
                        id="question-required"
                        checked={isQuestionRequired}
                        onChange={(e) =>
                          setIsQuestionRequired(e.target.checked)
                        }
                        className="mr-2 h-4 w-4"
                      />
                      <label
                        htmlFor="question-required"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Required Question
                      </label>
                    </div>

                    {/* Options (only for multiple choice) */}
                    {questionType === "multiple_choice" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Options
                          </span>
                          <button
                            onClick={addOption}
                            className="text-sm text-primary hover:text-teal-700 flex items-center"
                          >
                            <FaPlus className="mr-1" /> Add Option
                          </button>
                        </div>
                        {options.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) =>
                                updateOption(index, e.target.value)
                              }
                              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800"
                              placeholder={`Option ${index + 1}`}
                            />
                            {options.length > 1 && (
                              <button
                                onClick={() => removeOption(index)}
                                className="text-red-500 hover:text-red-700 p-2"
                              >
                                <FaTimes />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Question Button */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={addQuestion}
                        disabled={!questionText}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          !questionText
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-secondary hover:bg-primary text-white"
                        }`}
                      >
                        Add Question
                      </button>
                    </div>
                  </div>
                </div>
                {/* Right Column - Preview */}
                <div className="space-y-6 h-[500px] flex flex-col justify-between py-4 rounded-md overflow-y-auto border border-gray-200 dark:border-gray-700 pl-6">
                  {/* Welcome message with adjusted spacing */}
                  <div className="space-y-4 text-center">
                    <h3 className="font-medium text-xl">Welcome</h3>
                    <p className="text-sm text-gray-600 font-medium">
                      {formData.welcomeNote || "Question *"}
                    </p>
                  </div>

                  {/* Question Preview - shows based on selected type */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="bg-white dark:bg-gray-800 text-center">
                      <h3 className="font-medium mb-4">
                        {questionText || ""}{" "}
                        {isQuestionRequired && (
                          <span className="text-red-500">*</span>
                        )}
                      </h3>

                      {questionType === "text" && (
                        <textarea
                          rows={4}
                          value={textAnswer}
                          onChange={handleTextChange}
                          className="w-3/4 mx-auto border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 resize-none"
                          placeholder="Your answer"
                        ></textarea>
                      )}

                      {questionType === "rating" && (
                        <div className="flex justify-center space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`text-4xl cursor-pointer transition-transform duration-200 ${
                                (hoverRating || starRating) >= star
                                  ? "text-yellow-400 scale-110"
                                  : "text-gray-400"
                              }`}
                              onClick={() => handleStarClick(star)}
                              onMouseEnter={() => handleStarHover(star)}
                              onMouseLeave={handleStarLeave}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      )}

                      {questionType === "yes_no" && (
                        <div className="flex justify-center space-x-6">
                          <button
                            className={`px-6 py-2 border rounded-full transition duration-300 ${
                              yesNoAnswer === "yes"
                                ? "bg-green-500 text-white border-green-500"
                                : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            }`}
                            onClick={() => handleYesNoClick("yes")}
                          >
                            Yes
                          </button>
                          <button
                            className={`px-6 py-2 border rounded-full transition duration-300 ${
                              yesNoAnswer === "no"
                                ? "bg-red-500 text-white border-red-500"
                                : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            }`}
                            onClick={() => handleYesNoClick("no")}
                          >
                            No
                          </button>
                        </div>
                      )}

                      {questionType === "smiley" && (
                        <div className="flex justify-center space-x-4">
                          {["😞", "😐", "😊", "😍"].map((smiley, index) => (
                            <span
                              key={index}
                              className={`text-3xl cursor-pointer transition-transform ${
                                selectedSmiley === smiley
                                  ? "scale-125 text-yellow-400"
                                  : "hover:scale-110"
                              }`}
                              onClick={() => handleSmileyClick(smiley)}
                            >
                              {smiley}
                            </span>
                          ))}
                        </div>
                      )}

                      {questionType === "multiple_choice" && (
                        <div className="space-y-2 w-3/4 mx-auto">
                          {options
                            .filter((opt) => opt)
                            .map((option, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-start"
                              >
                                <input
                                  type="radio"
                                  id={`preview-option-${index}`}
                                  name="preview-options"
                                  className="mr-2"
                                  checked={selectedOptions[0] === index}
                                  onChange={() => handleOptionSelect(0, index)}
                                />
                                <label htmlFor={`preview-option-${index}`}>
                                  {option}
                                </label>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button - always visible but disabled when no questions */}
                  <div
                    onClick={handleSubmitSurvey}
                    disabled={formData.questions.length === 0}
                    className="flex justify-center"
                  >
                    <button className="bg-[#DA7B2C] text-white px-6 py-2 rounded-md hover:bg-[#DA7B2C]/90 transition-colors duration-200 w-40">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Localize Section */}
            {currentSection === "localize" && (
              <div className="space-y-6">
                <div className="px-4 py-2 rounded-md max-w-64">
                  <div className="flex items-center mb-2 gap-6">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Text localization
                    </span>
                    <FaQuestion className="text-primary dark:text-gray-500" />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Original content when not adding new */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <button
                  className="flex items-center bg-secondary text-white px-4 py-3 rounded-md hover:bg-primary transition-colors duration-200 cursor-pointer"
                  onClick={handleAddNewClick}
                >
                  <FaPlus className="mr-2" />
                  Add New
                </button>
                <div className="border border-primary rounded-lg px-4 py-1 max-w-xl flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <FaQuestion className="text-primary mr-3" />
                  <p className="text-gray-700 dark:text-gray-300 flex-grow">
                    Gather real-time feedback with customizable surveys, gaining
                    actionable insights to continuously improve your offerings
                    and customer experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Data table with header arrows */}
            <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {surveys.map((survey) => (
                    <tr key={survey.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                        {survey.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          <span
                            className={`px-3 py-1 rounded-sm text-xs font-medium ${
                              survey.active
                                ? "bg-secondary text-white"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {survey.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-4">
                          <div className="ml-2">
                            {" "}
                            {/* Example: move it down and to the right */}
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={survey.active}
                                onChange={() => toggleSurveyStatus(survey.id)}
                                className="hidden"
                              />
                              <div className="relative w-12 h-4 overflow-visible">
                                {/* Track background */}
                                <div
                                  className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                                    survey.active
                                      ? "bg-primary/20"
                                      : "bg-gray-400 dark:bg-gray-700"
                                  }`}
                                ></div>

                                {/* Thumb */}
                                <div
                                  className={`absolute -top-[5px] ${
                                    survey.active
                                      ? "left-[26px] bg-primary"
                                      : "left-0 bg-gray-200 dark:bg-gray-400"
                                  } w-7 h-7 rounded-full border ${
                                    survey.active
                                      ? "border-primary/50"
                                      : "border-white"
                                  } transform transition-all duration-200`}
                                ></div>
                              </div>
                            </label>
                          </div>

                          <button
                            onClick={() => handleEdit(survey.id)}
                            className="text-gray-500 hover:text-primary"
                            title="Edit"
                          >
                            <FaEdit className="text-primary" />
                          </button>
                          <button
                            onClick={() => handleDelete(survey.id)}
                            className="text-gray-500 hover:text-red-500"
                            title="Delete"
                          >
                            <FaTrash className="text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end items-center p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-4">
                  Rows per page: 10
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-4">
                  1–1 of 1
                </span>
                <button className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                  <FaChevronLeft />
                </button>
                <button className="ml-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Surveys;
