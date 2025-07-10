import React, { useState } from "react";
import {
  FaChevronDown,
  FaEnvelope,
  FaArrowLeft,
  FaPlus,
  FaSmile,
  FaCommentDots,
} from "react-icons/fa";

const emojis = ["😀", "😊", "😂", "❤️", "👍", "🙏", "😍", "🤔", "😎", "🎉"];

const HelpChat = ({ darkMode, showHelpChat, setShowHelpChat }) => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [message, setMessage] = useState("");
  const [hasInput, setHasInput] = useState(false);
  const [messages, setMessages] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emailForm, setEmailForm] = useState({
    name: "",
    subject: "",
    email: "",
    message: "",
  });
  const [showAIHeader, setShowAIHeader] = useState(false);

  const handleBack = () => {
    setSelectedChannel(null);
    setHasInput(false);
    setShowAIHeader(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { text: message, sender: "user" };
      setMessages([...messages, newMessage]);
      setMessage("");
      setHasInput(false);

      // Simulate AI response after a short delay
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Thanks for your message! How can I assist you further?",
            sender: "ai",
          },
        ]);
      }, 1000);
    }
  };

  const toggleChat = () => {
    setShowHelpChat(!showHelpChat);
    if (!showHelpChat) {
      setSelectedChannel(null);
      setHasInput(false);
      setMessages([]);
      setShowAIHeader(false);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    setHasInput(e.target.value.trim().length > 0);
    if (e.target.value.trim().length > 0) {
      setShowAIHeader(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && message.trim()) {
      handleSendMessage();
    }
  };

  const handleTextAreaChange = (e) => {
    setTextAreaValue(e.target.value);
    setEmailForm({ ...emailForm, message: e.target.value });
  };

  const handleEmojiClick = (emoji) => {
    setTextAreaValue((prev) => prev + emoji);
    setEmailForm({ ...emailForm, message: textAreaValue + emoji });
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTextAreaValue((prev) => prev + ` [Attachment: ${file.name}]`);
      setEmailForm({
        ...emailForm,
        message: textAreaValue + ` [Attachment: ${file.name}]`,
      });
    }
    e.target.value = null;
  };

  const handleEmailFormChange = (e) => {
    const { name, value } = e.target;
    setEmailForm({ ...emailForm, [name]: value });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log("Email form submitted:", emailForm);
    // Here you would typically send the form data to your backend
    alert("Your message has been sent successfully!");
    setSelectedChannel(null);
    setEmailForm({
      name: "",
      subject: "",
      email: "",
      message: "",
    });
    setTextAreaValue("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      {showHelpChat && (
        <div className="w-[26rem] bg-white dark:bg-gray-800 rounded-lg shadow-xl h-[700px] flex flex-col overflow-hidden">
          {/* Header */}
          <div
            className={`p-4 ${
              selectedChannel === "ai"
                ? "dark:bg-gray-800"
                : "bg-secondary text-white dark:bg-gray-900"
            } rounded-t-lg w-full ${!selectedChannel ? "relative pb-24" : ""}`}
          >
            {selectedChannel === "ai" &&
              (showAIHeader || messages.length > 0) && (
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer"
                  >
                    <FaArrowLeft />
                  </button>
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://www.shutterstock.com/image-vector/generate-ai-abstract-vector-symbol-600nw-2513108121.jpg"
                      alt="AI"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-semibold text-gray-800 dark:text-white">
                      AI Answers
                    </span>
                  </div>
                  <div className="w-8"></div>
                </div>
              )}
            {!selectedChannel && (
              <>
                <div className="px-4 text-center mt-4">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Start a conversation
                  </h3>
                  <p className="text-sm text-gray-200">
                    What channel do you prefer?
                  </p>
                </div>
                <div className="absolute top-36 left-4 right-4">
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        setSelectedChannel("ai");
                        setShowAIHeader(false);
                      }}
                      className="w-full flex items-center px-6 py-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-all duration-200 cursor-pointer shadow-sm hover:-translate-y-1"
                    >
                      <div
                        className="w-8 h-8 mr-3 rounded-lg overflow-hidden bg-white ring-1 ring-offset-1 ring-transparent"
                        style={{
                          boxShadow:
                            "0 0 0 1px #3b82f6, 0 0 0 2px #8b5cf6, 0 0 0 3px #06b6d4",
                        }}
                      >
                        <img
                          src="https://image.shutterstock.com/image-vector/generate-ai-abstract-vector-symbol-600nw-2513108121.jpg"
                          alt="AI Icon"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-lg text-gray-700 dark:text-white">
                          AI Answers
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Instant answers to your questions
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => setSelectedChannel("email")}
                      className="w-full flex items-center px-6 py-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-all duration-200 cursor-pointer shadow-sm hover:-translate-y-1"
                    >
                      <div className="bg-secondary text-white p-2 rounded-full mr-3">
                        <FaEnvelope />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-lg text-gray-700 dark:text-white">
                          Email
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          We usually respond in less than 30 minutes
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            )}
            {selectedChannel === "email" && (
              <div className="pt-0">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    className="text-white hover:text-gray-200 cursor-pointer"
                  >
                    <FaArrowLeft />
                  </button>
                  <p className="text-sm font-semibold text-white">
                    Send Message
                  </p>
                  <div className="w-5"></div>
                </div>
                <div className="flex justify-center -space-x-3 mt-6 mb-2">
                  <img
                    src="https://d33v4339jhl8k0.cloudfront.net/users/637479.288848.jpg"
                    alt="Agent 1"
                    className="w-12 h-12 rounded-full object-cover border-3 border-white"
                  />
                  <img
                    src="https://d33v4339jhl8k0.cloudfront.net/users/738802.315616.jpg"
                    alt="Agent 2"
                    className="w-12 h-12 rounded-full object-cover border-3 border-white"
                  />
                  <img
                    src="https://d33v4339jhl8k0.cloudfront.net/users/755921.319353.jpeg"
                    alt="Agent 3"
                    className="w-12 h-12 rounded-full object-cover border-3 border-white"
                  />
                </div>
                <div className="flex flex-col items-center space-y-2 mb-4">
                  <p className="text-xl font-bold">How can we help?</p>
                  <span className="text-sm text-gray-200">
                    We usually respond in less than 30 minutes.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Body */}
          <div
            className={`flex-1 p-4 ${
              selectedChannel === "email"
                ? "overflow-y-hidden"
                : "overflow-y-auto"
            } text-sm dark:bg-gray-800`}
          >
            {selectedChannel === "ai" && (
              <div className="flex flex-col justify-between h-full relative">
                {!showAIHeader && messages.length === 0 && (
                  <>
                    <button
                      onClick={handleBack}
                      className="absolute top-0 left-0 cursor-pointer ml-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400"
                    >
                      <FaArrowLeft />
                    </button>
                    <div className="flex flex-col items-center text-center pt-8">
                      <img
                        src="https://www.shutterstock.com/image-vector/generate-ai-abstract-vector-symbol-600nw-2513108121.jpg"
                        alt="AI"
                        className="w-16 h-16 rounded-full object-cover mb-4"
                      />
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                        AI Answers
                      </h3>
                    </div>
                  </>
                )}

                <div className="mt-auto">
                  {!showAIHeader && messages.length === 0 && (
                    <>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        AI assistant
                      </p>
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-2">
                        <p className="text-sm text-gray-700 dark:text-gray-200">
                          Hello. I can find answers from the QR TIGER help
                          center. Feel free to write in any language, and I will
                          reply in that language. How can I help?
                        </p>
                      </div>
                    </>
                  )}
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${
                        msg.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`p-3 rounded-lg inline-block max-w-xs ${
                          msg.sender === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div className="w-full">
                    {(showAIHeader || messages.length > 0) && (
                      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-400" />
                    )}
                    <div className="pt-4">
                      <div className="flex items-center px-4 py-2">
                        <input
                          type="text"
                          value={message}
                          onChange={handleInputChange}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your message..."
                          className="flex-1 focus:outline-none text-sm dark:text-white bg-transparent"
                        />
                        <button
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                          className={`ml-2 px-3 py-1 rounded ${
                            message.trim() ? "" : "cursor-not-allowed"
                          }`}
                        ></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {selectedChannel === "email" && (
              <form
                onSubmit={handleEmailSubmit}
                className="space-y-4 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={emailForm.name}
                      onChange={handleEmailFormChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={emailForm.subject}
                      onChange={handleEmailFormChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={emailForm.email}
                      onChange={handleEmailFormChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      How can we help?
                    </label>
                    <div className="relative">
                      <textarea
                        rows="3"
                        name="message"
                        value={textAreaValue}
                        onChange={handleTextAreaChange}
                        required
                        className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white pr-10"
                      ></textarea>
                      <div className="absolute right-2 bottom-3 flex space-x-2">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="text-gray-500 hover:text-secondary cursor-pointer"
                          >
                            <FaSmile />
                          </button>
                          {showEmojiPicker && (
                            <div className="absolute bottom-8 right-0 bg-white dark:bg-gray-700 p-2 rounded shadow-lg grid grid-cols-5 gap-1 z-10 w-48">
                              {emojis.map((emoji, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  className="text-xl hover:scale-125 transition-transform"
                                  onClick={() => handleEmojiClick(emoji)}
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <label className="text-gray-500 hover:text-secondary cursor-pointer">
                          <FaPlus />
                          <input
                            type="file"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-secondary text-white px-4 py-4 rounded-sm hover:bg-primary transition-colors cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Toggle Button */}
<button
  onClick={toggleChat}
  className="flex items-center space-x-2 bg-secondary hover:bg-primary text-white px-4 py-3 rounded-full shadow-lg transition-colors duration-200 cursor-pointer"
>
  {showHelpChat ? (
    <FaChevronDown className="text-lg" /> // When open
  ) : (
    <FaCommentDots className="text-lg" /> // When closed
  )}
  <span>{showHelpChat ? "Close" : "Need Help?"}</span>
</button>

    </div>
  );
};

export default HelpChat;
