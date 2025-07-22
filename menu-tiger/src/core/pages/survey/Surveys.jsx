import React, { useState } from "react";
import {
  FaRocket,
  FaQuestion,
  FaChevronRight,
  FaChevronLeft,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaClipboardList,
  FaLanguage,
} from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OpenAppPanel from "../../commons/OpenAppPanel";
import AddNewButton from "../../commons/AddNewButton";
import BackButton from "../../commons/BackButton";
import SaveButton from "../../commons/SaveButton";
import ToastProvider from "../../commons/ToastProvider";

function Surveys() {
  // Main state variables
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentSection, setCurrentSection] = useState("survey");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [surveyToDelete, setSurveyToDelete] = useState(null);
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

  // Question forms state
  const [questionForms, setQuestionForms] = useState([
    {
      id: Date.now(),
      text: "",
      type: "text",
      required: false,
      options: [""],
    },
  ]);

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
    setQuestionForms([
      {
        id: Date.now(),
        text: "",
        type: "text",
        required: false,
        options: [""],
      },
    ]);
  };

  const handleBackClick = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setQuestionForms([
      {
        id: Date.now(),
        text: "",
        type: "text",
        required: false,
        options: [""],
      },
    ]);
  };

  const handleSave = () => {
    if (!formData.name) {
      toast.error("Please enter a survey name!");
      return;
    }

    const validQuestions = questionForms
      .filter((form) => form.text.trim())
      .map((form) => ({
        text: form.text,
        type: form.type,
        required: form.required,
        options:
          form.type === "multiple_choice"
            ? form.options.filter((opt) => opt.trim())
            : [],
      }));

    if (validQuestions.length === 0) {
      toast.error("Please add at least one valid question!");
      return;
    }

    const updatedFormData = {
      ...formData,
      questions: validQuestions,
    };

    if (editingId) {
      setSurveys(
        surveys.map((survey) =>
          survey.id === editingId
            ? { ...updatedFormData, id: editingId }
            : survey
        )
      );
      toast.success("Survey updated successfully!");
    } else {
      const newSurvey = {
        id: Date.now(),
        ...updatedFormData,
      };
      setSurveys([...surveys, newSurvey]);
      toast.success("Survey created successfully!");
    }

    setIsAddingNew(false);
    setEditingId(null);
    setQuestionForms([
      {
        id: Date.now(),
        text: "",
        type: "text",
        required: false,
        options: [""],
      },
    ]);
  };

  const handleEdit = (id) => {
    const surveyToEdit = surveys.find((survey) => survey.id === id);
    if (surveyToEdit) {
      setFormData(surveyToEdit);
      setQuestionForms(
        surveyToEdit.questions.length > 0
          ? surveyToEdit.questions.map((q, index) => ({
              id: Date.now() + index,
              text: q.text,
              type: q.type,
              required: q.required,
              options: q.options.length > 0 ? q.options : [""],
            }))
          : [
              {
                id: Date.now(),
                text: "",
                type: "text",
                required: false,
                options: [""],
              },
            ]
      );
      setIsAddingNew(true);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    setSurveyToDelete(id);
    setShowDeleteModal(true);
  };

  const toggleSurveyStatus = (id) => {
    setSurveys(
      surveys.map((survey) =>
        survey.id === id ? { ...survey, active: !survey.active } : survey
      )
    );
  };

  // Question form management
  const addQuestionForm = () => {
    setQuestionForms([
      ...questionForms,
      {
        id: Date.now(),
        text: "",
        type: "text",
        required: false,
        options: [""],
      },
    ]);
  };

  const updateQuestionForm = (id, field, value) => {
    setQuestionForms(
      questionForms.map((form) =>
        form.id === id ? { ...form, [field]: value } : form
      )
    );
  };

  const addOption = (formId) => {
    setQuestionForms(
      questionForms.map((form) =>
        form.id === formId ? { ...form, options: [...form.options, ""] } : form
      )
    );
  };

  const updateOption = (formId, index, value) => {
    setQuestionForms(
      questionForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              options: form.options.map((opt, i) =>
                i === index ? value : opt
              ),
            }
          : form
      )
    );
  };

  const removeOption = (formId, index) => {
    setQuestionForms(
      questionForms.map((form) =>
        form.id === formId && form.options.length > 1
          ? { ...form, options: form.options.filter((_, i) => i !== index) }
          : form
      )
    );
  };

  const removeQuestionForm = (formId) => {
    if (questionForms.length > 1) {
      setQuestionForms(questionForms.filter((form) => form.id !== formId));
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newForms = [...questionForms];
    const [reorderedItem] = newForms.splice(result.source.index, 1);
    newForms.splice(result.destination.index, 0, reorderedItem);
    setQuestionForms(newForms);
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

  const handleSubmitSurvey = () => {
    console.log("Survey submitted:", formData);
    toast.success("Survey submitted successfully!");
    setFormData({
      name: "",
      welcomeNote: "",
      active: true,
      questions: [],
    });
    setQuestionForms([
      {
        id: Date.now(),
        text: "",
        type: "text",
        required: false,
        options: [""],
      },
    ]);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-lg rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold">Survey</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300 mt-1">
            Create digital surveys
          </span>
        </div>
        <OpenAppPanel />
      </div>

      {/* Body content */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6">
        {isAddingNew ? (
          <>
            {/* Back arrow and breadcrumb */}
            <div className="flex sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <BackButton onClick={handleBackClick} />
                <div className="text-gray-900 dark:text-gray-100 text-sm bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md select-none">
                  <span>Surveys</span> <span className="text-gray-400">/</span>{" "}
                  <span className="text-primary">Add Survey</span>
                </div>
              </div>
              <SaveButton onClick={handleSave} />
            </div>

            {/* Divider line */}
            <div className="border-b border-gray-300 dark:border-gray-600 mb-6"></div>

            {/* Tabs */}
            <div className="flex border-b border-gray-300 dark:border-gray-600 mb-6">
              <button
                className={`px-4 py-2 text-base sm:text-lg font-medium cursor-pointer flex items-center ${
                  currentSection === "survey"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setCurrentSection("survey")}
              >
                <FaClipboardList className="mr-2 text-lg sm:text-xl" />
                Survey
              </button>
              <button
                className={`px-4 py-2 text-base sm:text-lg font-medium cursor-pointer flex items-center ${
                  currentSection === "localize"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setCurrentSection("localize")}
              >
                <FaLanguage className="mr-2 text-lg sm:text-xl" />
                Localize
              </button>
            </div>

            {/* Survey Form Content */}
            {currentSection === "survey" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Form Inputs */}
                <div className="space-y-6">
                  {/* Survey Name */}
                  <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-md">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                      Name <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md text-sm"
                      placeholder="Enter survey name"
                    />
                  </div>

                  {/* Welcome Note */}
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Welcome note <span className="text-red-500">*</span>
                    </span>
                    <div className="border-2 border-gray-300 dark:border-gray-600 rounded-md">
                      <textarea
                        rows={3}
                        value={formData.welcomeNote}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            welcomeNote: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-md text-sm"
                        placeholder="Enter welcome message for survey takers"
                      />
                    </div>
                  </div>

                  {/* Questions Section */}
                  <div className="space-y-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable droppableId="questionForms">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {questionForms.map((form, index) => (
                              <Draggable
                                key={form.id}
                                draggableId={form.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className="space-y-4 border-b border-gray-300 dark:border-gray-600 pb-4 last:border-b-0"
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-2">
                                        <img
                                          src="https://www.app.menutigr.com/static/media/drag.5d53462f76a9e8b160863b3c1d1820c3.svg"
                                          alt="Drag Handle"
                                          className="w-5 h-5 cursor-move"
                                          {...provided.dragHandleProps}
                                        />
                                        <h3 className="font-medium text-lg">
                                          Question {index + 1}
                                        </h3>
                                      </div>
                                    </div>

                                    {/* Question Input */}
                                    <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-md">
                                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                                        Question{" "}
                                        <span className="text-red-500">*</span>
                                      </span>
                                      <input
                                        type="text"
                                        value={form.text}
                                        onChange={(e) =>
                                          updateQuestionForm(
                                            form.id,
                                            "text",
                                            e.target.value
                                          )
                                        }
                                        className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md text-sm"
                                        placeholder="Enter question text"
                                      />
                                    </div>

                                    {/* Question Type */}
                                    <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-md">
                                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                                        Type{" "}
                                        <span className="text-red-500">*</span>
                                      </span>
                                      <select
                                        value={form.type}
                                        onChange={(e) =>
                                          updateQuestionForm(
                                            form.id,
                                            "type",
                                            e.target.value
                                          )
                                        }
                                        className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md text-sm appearance-none"
                                      >
                                        <option value="text">Text box</option>
                                        <option value="rating">
                                          Star Rating
                                        </option>
                                        <option value="yes_no">Yes/No</option>
                                        <option value="smiley">
                                          Smiley Rating
                                        </option>
                                        <option value="multiple_choice">
                                          Multiple Choice
                                        </option>
                                      </select>
                                    </div>

                                    {/* Required Checkbox */}
                                    <div className="flex items-center p-2 border-2 border-gray-300 dark:border-gray-600 rounded-md">
                                      <input
                                        type="checkbox"
                                        id={`question-required-${form.id}`}
                                        checked={form.required}
                                        onChange={(e) =>
                                          updateQuestionForm(
                                            form.id,
                                            "required",
                                            e.target.checked
                                          )
                                        }
                                        className="mr-2 h-4 w-4 rounded cursor-pointer border-gray-300 text-primary focus:ring-primary"
                                      />
                                      <label
                                        htmlFor={`question-required-${form.id}`}
                                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                      >
                                        Required Question
                                      </label>
                                    </div>

                                    {/* Options (only for multiple choice) */}
                                    {form.type === "multiple_choice" && (
                                      <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Options
                                          </span>
                                          <button
                                            onClick={() => addOption(form.id)}
                                            className="text-sm text-primary hover:text-teal-700 flex items-center"
                                          >
                                            <FaPlus className="mr-1" /> Add
                                            Option
                                          </button>
                                        </div>
                                        {form.options.map((option, index) => (
                                          <div
                                            key={index}
                                            className="flex items-center gap-2"
                                          >
                                            <input
                                              type="text"
                                              value={option}
                                              onChange={(e) =>
                                                updateOption(
                                                  form.id,
                                                  index,
                                                  e.target.value
                                                )
                                              }
                                              className="flex-1 border-2 border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-sm"
                                              placeholder={`Option ${
                                                index + 1
                                              }`}
                                            />
                                            {form.options.length > 1 && (
                                              <button
                                                onClick={() =>
                                                  removeOption(form.id, index)
                                                }
                                                className="text-red-500 hover:text-red-700 p-2"
                                              >
                                                <FaTimes />
                                              </button>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {/* Remove Question Form Button */}
                                    {questionForms.length > 1 && (
                                      <div className="flex justify-end">
                                        <button
                                          onClick={() =>
                                            removeQuestionForm(form.id)
                                          }
                                          className="text-sm text-red-500 hover:text-red-700 flex items-center"
                                        >
                                          <FaTrash className="mr-1" /> Remove
                                          Question
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>

                    {/* Add Question Button */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={addQuestionForm}
                        className="px-4 py-2 rounded-md text-sm font-medium bg-secondary hover:bg-primary text-white"
                      >
                        Add Question
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column - Preview */}
                <div className="space-y-6 h-[500px] flex flex-col justify-between py-4 rounded-md overflow-y-auto border-2 border-gray-200 dark:border-gray-700 pl-4 sm:pl-6">
                  {/* Welcome message */}
                  <div className="space-y-4 text-center">
                    <h3 className="font-medium text-lg sm:text-xl">Welcome</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-500 font-medium">
                      {formData.welcomeNote || "Enter a welcome message"}
                    </p>
                  </div>

                  {/* Question Preview */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="bg-white dark:bg-gray-800 text-center">
                      <h3 className="font-medium text-sm sm:text-base mb-4">
                        {questionForms[questionForms.length - 1]?.text ||
                          "Your question here"}{" "}
                        {questionForms[questionForms.length - 1]?.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </h3>

                      {questionForms[questionForms.length - 1]?.type ===
                        "text" && (
                        <textarea
                          rows={4}
                          value={textAnswer}
                          onChange={handleTextChange}
                          className="w-3/4 mx-auto border-2 border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 resize-none text-sm"
                          placeholder="Your answer"
                        ></textarea>
                      )}

                      {questionForms[questionForms.length - 1]?.type ===
                        "rating" && (
                        <div className="flex justify-center space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`text-2xl sm:text-3xl cursor-pointer transition-transform duration-200 ${
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

                      {questionForms[questionForms.length - 1]?.type ===
                        "yes_no" && (
                        <div className="flex justify-center space-x-4 sm:space-x-6">
                          <button
                            className={`px-4 sm:px-6 py-2 border-2 rounded-full transition duration-300 text-sm ${
                              yesNoAnswer === "yes"
                                ? "bg-green-500 text-white border-green-500"
                                : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                            }`}
                            onClick={() => handleYesNoClick("yes")}
                          >
                            Yes
                          </button>
                          <button
                            className={`px-4 sm:px-6 py-2 border-2 rounded-full transition duration-300 text-sm ${
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

                      {questionForms[questionForms.length - 1]?.type ===
                        "smiley" && (
                        <div className="flex justify-center space-x-3 sm:space-x-4">
                          {["😞", "😐", "😊", "😍"].map((smiley, index) => (
                            <span
                              key={index}
                              className={`text-2xl sm:text-3xl cursor-pointer transition-transform ${
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

                      {questionForms[questionForms.length - 1]?.type ===
                        "multiple_choice" && (
                        <div className="space-y-2 w-3/4 mx-auto">
                          {questionForms[questionForms.length - 1]?.options
                            .filter((opt) => opt.trim())
                            .map((option, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-start"
                              >
                                <input
                                  type="radio"
                                  id={`preview-option-${index}`}
                                  name="preview-options"
                                  className="mr-2 h-4 w-4"
                                  checked={selectedOptions[0] === index}
                                  onChange={() => handleOptionSelect(0, index)}
                                />
                                <label
                                  htmlFor={`preview-option-${index}`}
                                  className="text-sm"
                                >
                                  {option}
                                </label>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={handleSubmitSurvey}
                      disabled={questionForms.every(
                        (form) => !form.text.trim()
                      )}
                      className={`px-6 py-2 rounded-md text-sm font-medium w-40 ${
                        questionForms.every((form) => !form.text.trim())
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-[#DA7B2C] hover:bg-[#DA7B2C]/90 text-white"
                      }`}
                    >
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
                  <div className="flex items-center gap-6">
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
                <AddNewButton
                  onClick={handleAddNewClick}
                  className="py-3 w-full sm:w-auto"
                  iconClassName="text-lg"
                />
                <div className="border-2 border-primary rounded-lg px-4 py-3 w-full sm:max-w-xl flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <FaQuestion className="text-primary mr-3 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow">
                    Gather real-time feedback with customizable surveys, gaining
                    actionable insights to continuously improve your offerings
                    and customer experience.
                  </p>
                </div>
              </div>
              <div className="border-b border-gray-300 dark:border-gray-600 mt-4"></div>
            </div>

            {/* Data table */}
            <div className="overflow-x-auto border-2 border-gray-200 dark:border-gray-700 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {surveys.map((survey) => (
                    <tr key={survey.id}>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100 text-sm">
                        {survey.name}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          <span
                            className={`px-3 py-1 rounded-md text-xs font-medium ${
                              survey.active
                                ? "bg-secondary text-white"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {survey.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-4">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={survey.active}
                              onChange={() => toggleSurveyStatus(survey.id)}
                              className="hidden"
                            />
                            <div className="relative w-12 h-4 overflow-visible">
                              <div
                                className={`absolute inset-0 rounded-full ${
                                  survey.active
                                    ? "bg-primary/20"
                                    : "bg-gray-400 dark:bg-gray-700"
                                }`}
                              ></div>
                              <div
                                className={`absolute -top-[6px] ${
                                  survey.active
                                    ? "left-[26px] bg-primary border-primary/50"
                                    : "left-0 bg-white border-gray-100 shadow-lg"
                                } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] ${
                                  survey.active
                                    ? "border-primary/50"
                                    : "border-white"
                                } transform`}
                              ></div>
                            </div>
                          </label>
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
                  1–3 of 3
                </span>
                <button className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  <FaChevronLeft />
                </button>
                <button className="ml-2 text-gray-600 dark:text-gray-400 hover:text-primary">
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-base font-semibold mb-2 dark:text-white">
              Confirm Deletion
            </h3>
            <p className="text-sm mb-4 dark:text-gray-300 leading-relaxed">
              Are you sure you want to delete this survey? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setSurveys(surveys.filter((s) => s.id !== surveyToDelete));
                  setShowDeleteModal(false);
                  toast.success("Survey deleted successfully");
                }}
                className="px-3 py-1.5 bg-red-600 text-sm text-white rounded-full hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastProvider />
    </div>
  );
}

export default Surveys;
