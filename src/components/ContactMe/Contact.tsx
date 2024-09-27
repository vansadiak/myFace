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
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } flex items-center justify-center p-4`}
    >
      <div className="w-full m-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="md:w-1/2 mb-6 md:mb-0 text-center md:text-left">
            <motion.h2
              className="text-3xl font-bold mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Got a project in mind?
            </motion.h2>
            <motion.p
              className="text-xl"
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
              className={`w-full p-3 rounded-lg ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className={`w-full p-3 rounded-lg ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How Can I Help You?"
              className={`w-full p-3 rounded-lg ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 h-32`}
              required
            ></textarea>
            <button
              type="submit"
              className={`w-full p-3 rounded-lg ${
                isDarkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } transition duration-300`}
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
