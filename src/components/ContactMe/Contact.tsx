import React, { useState } from "react";
import { motion } from "framer-motion";
import useDarkMode from "../../hooks/useDarkMode";
const Contact: React.FC = () => {
  const [isDarkMode] = useDarkMode();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Thank you for your message. We will get back to you soon!");
        setFormData({
          fullName: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an error sending your message. Please try again later.");
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      } flex items-center justify-center p-4`}
    >
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:active {
          -webkit-box-shadow: ${
            isDarkMode
              ? "0 0 0 30px rgb(31 41 55) inset !important"
              : "0 0 0 30px rgb(255 255 255) inset !important"
          };
          -webkit-text-fill-color: ${
            isDarkMode ? "#ffffff" : "#000000"
          } !important;
          border-radius: 0.5rem !important;
          background-color: ${
            isDarkMode ? "rgb(31 41 55)" : "rgb(255 255 255)"
          } !important;
        }
        
        input:-webkit-autofill:focus {
          -webkit-box-shadow: ${
            isDarkMode
              ? "0 0 0 30px rgb(31 41 55) inset !important"
              : "0 0 0 30px rgb(255 255 255) inset !important"
          };
          -webkit-text-fill-color: ${
            isDarkMode ? "#ffffff" : "#000000"
          } !important;
          border-radius: 0.5rem !important;
          background-color: ${
            isDarkMode ? "rgb(31 41 55)" : "rgb(255 255 255)"
          } !important;
          outline: none !important;
        }
      `}</style>
      <div className="w-full m-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="md:w-1/2 mb-6 md:mb-0 text-center md:text-left">
            <motion.h2
              className="text-4xl md:text-5xl font-medium tracking-tight leading-tight mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Got a project in mind?
            </motion.h2>
            <motion.p
              className="text-xl font-normal tracking-wide"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Drop me a line! Let's make something awesome together.
            </motion.p>
          </div>
          <form onSubmit={handleSubmit} className="w-full md:w-1/2 space-y-6">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Your Full Name"
              className={`w-full p-3 rounded-lg font-normal ${
                isDarkMode
                  ? "bg-gray-800 text-white focus:ring-[#4ECDC4]"
                  : "bg-white text-black border border-gray-200 focus:ring-[#FF6B6B]"
              } focus:outline-none focus:ring-2 transition-colors duration-200`}
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className={`w-full p-3 rounded-lg font-normal ${
                isDarkMode
                  ? "bg-gray-800 text-white focus:ring-[#4ECDC4]"
                  : "bg-white text-black border border-gray-200 focus:ring-[#FF6B6B]"
              } focus:outline-none focus:ring-2 transition-colors duration-200`}
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How Can I Help You?"
              className={`w-full p-3 rounded-lg font-normal ${
                isDarkMode
                  ? "bg-gray-800 text-white focus:ring-[#4ECDC4]"
                  : "bg-white text-black border border-gray-200 focus:ring-[#FF6B6B]"
              } focus:outline-none focus:ring-2 transition-colors duration-200 h-32`}
              required
            ></textarea>
            <button
              type="submit"
              className={`w-full p-3 rounded-lg transition duration-300 font-medium text-base ${
                isDarkMode
                  ? "bg-[#4ECDC4] text-white hover:bg-[#45b8b0]"
                  : "bg-[#FF6B6B] text-white hover:bg-[#ff5252]"
              }`}
            >
              Let's Work Together
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
