import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import useDarkMode from "../../hooks/useDarkMode";
import { getThemeClasses } from "../../utils/theme-utils";
import emailjs from "@emailjs/browser";
import Confetti from "../Animations/Confetti";

// Environment variables
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID!;
const ADMIN_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_ADMIN_TEMPLATE_ID!;
const RESPONSE_TEMPLATE_ID =
  process.env.REACT_APP_EMAILJS_RESPONSE_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY!;

const Contact: React.FC = () => {
  const [isDarkMode] = useDarkMode();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const themeClasses = getThemeClasses(isDarkMode);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
    // Map EmailJS field names to our state properties
    const fieldMapping: { [key: string]: string } = {
      from_name: "fullName",
      reply_to: "email",
      message: "message",
    };

    setFormData((prevState) => ({
      ...prevState,
      [fieldMapping[name] || name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const [adminResult, userResult] = await Promise.all([
        emailjs.sendForm(
          SERVICE_ID,
          ADMIN_TEMPLATE_ID,
          form.current!,
          PUBLIC_KEY
        ),
        emailjs.sendForm(
          SERVICE_ID,
          RESPONSE_TEMPLATE_ID,
          form.current!,
          PUBLIC_KEY
        ),
      ]);

      if (adminResult.text === "OK" && userResult.text === "OK") {
        setShowConfetti(true);
        setTimeout(() => {
          alert("Thank you for your message. I will get back to you soon!");
          setFormData({
            fullName: "",
            email: "",
            message: "",
          });
        }, 500);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an error sending your message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = `w-full p-2.5 md:p-3 rounded-lg font-normal relative border-2
    ${
      isDarkMode
        ? `${themeClasses.secondary} text-white border-gray-700`
        : "bg-white text-black border-gray-200"
    } 
    focus:outline-none 
    transition-all duration-300`;

  return (
    <div
      className={`min-h-screen relative ${themeClasses.background} ${themeClasses.text} flex items-center justify-center p-4 overflow-hidden`}
    >
      {showConfetti && (
        <Confetti
          isDarkMode={isDarkMode}
          onComplete={() => setShowConfetti(false)}
        />
      )}
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:active,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:active {
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

        input:-webkit-autofill:focus,
        textarea:-webkit-autofill:focus {
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
          outline: 2px solid var(--theme-color-${
            isDarkMode ? "dark" : "light"
          }) !important;
          outline-offset: -2px !important;
        }
      `}</style>

      {/* Background GIF */}
      <div className="absolute inset-0 w-full h-full select-none">
        <img
          src="https://media.giphy.com/media/110dhxfJebYOTm/giphy.gif"
          alt="Background animation"
          draggable="false"
          className="w-full h-full object-cover opacity-5"
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full mx-4 md:m-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-8">
          <div className="md:w-1/2 mb-6 md:mb-0 text-center md:text-left">
            <motion.h2
              className="text-3xl md:text-5xl font-medium tracking-tight leading-tight mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Got a project in mind?
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl font-normal tracking-wide"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Drop me a line! Let's make something awesome together.
            </motion.p>
          </div>
          <motion.form
            ref={form}
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div className="relative">
              <motion.input
                type="text"
                name="from_name"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={() => setFocusedField("fullName")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter Your Full Name"
                className={inputClasses}
                required
                animate={{
                  scale: focusedField === "fullName" ? 1.02 : 1,
                  borderColor: focusedField === "fullName" 
                    ? (isDarkMode ? "#4ECDC4" : "#FF6B6B")
                    : (isDarkMode ? "#374151" : "#e5e7eb"),
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5"
                style={{
                  background: isDarkMode
                    ? "linear-gradient(to right, transparent, #4ECDC4, transparent)"
                    : "linear-gradient(to right, transparent, #FF6B6B, transparent)",
                }}
                animate={{
                  width: focusedField === "fullName" ? "100%" : "0%",
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <motion.div className="relative">
              <motion.input
                type="email"
                name="reply_to"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter Your Email"
                className={inputClasses}
                required
                animate={{
                  scale: focusedField === "email" ? 1.02 : 1,
                  borderColor: focusedField === "email"
                    ? (isDarkMode ? "#4ECDC4" : "#FF6B6B")
                    : (isDarkMode ? "#374151" : "#e5e7eb"),
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5"
                style={{
                  background: isDarkMode
                    ? "linear-gradient(to right, transparent, #4ECDC4, transparent)"
                    : "linear-gradient(to right, transparent, #FF6B6B, transparent)",
                }}
                animate={{
                  width: focusedField === "email" ? "100%" : "0%",
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <motion.div className="relative">
              <motion.textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                placeholder="How Can I Help You?"
                className={`${inputClasses} h-32 resize-none`}
                required
                animate={{
                  scale: focusedField === "message" ? 1.02 : 1,
                  borderColor: focusedField === "message"
                    ? (isDarkMode ? "#4ECDC4" : "#FF6B6B")
                    : (isDarkMode ? "#374151" : "#e5e7eb"),
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5"
                style={{
                  background: isDarkMode
                    ? "linear-gradient(to right, transparent, #4ECDC4, transparent)"
                    : "linear-gradient(to right, transparent, #FF6B6B, transparent)",
                }}
                animate={{
                  width: focusedField === "message" ? "100%" : "0%",
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 rounded-lg font-medium text-base relative overflow-hidden
                ${isDarkMode ? "bg-primary-dark" : "bg-primary-light"}
                text-white ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
              whileHover={!isLoading ? {
                scale: 1.05,
                boxShadow: isDarkMode
                  ? "0 10px 30px rgba(78, 205, 196, 0.4)"
                  : "0 10px 30px rgba(255, 107, 107, 0.4)",
              } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-0"
                style={{
                  background: isDarkMode
                    ? "linear-gradient(135deg, rgba(78, 205, 196, 0.3), rgba(78, 205, 196, 0.1))"
                    : "linear-gradient(135deg, rgba(255, 107, 107, 0.3), rgba(255, 107, 107, 0.1))",
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              {isLoading ? (
                <div className="flex items-center justify-center relative z-10">
                  <motion.div
                    className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Sending...
                </div>
              ) : (
                <span className="relative z-10">Let's Work Together</span>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
