import React, { useState, useRef } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import { getThemeClasses } from "../../utils/theme-utils";
import emailjs from "@emailjs/browser";

// Environment variables
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID!;
const ADMIN_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_ADMIN_TEMPLATE_ID!;
const RESPONSE_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_RESPONSE_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY!;

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  fullName: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [isDarkMode] = useDarkMode();
  const theme = getThemeClasses(isDarkMode);
  const formRef = useRef<HTMLFormElement>(null);

  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldMapping: Record<string, keyof FormData> = {
      from_name: "fullName",
      reply_to: "email",
      message: "message",
    };
    setFormData((prev) => ({
      ...prev,
      [fieldMapping[name] || name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const [adminResult, userResult] = await Promise.all([
        emailjs.sendForm(SERVICE_ID, ADMIN_TEMPLATE_ID, formRef.current!, PUBLIC_KEY),
        emailjs.sendForm(SERVICE_ID, RESPONSE_TEMPLATE_ID, formRef.current!, PUBLIC_KEY),
      ]);

      if (adminResult.text === "OK" && userResult.text === "OK") {
        setStatus("success");
        setFormData({ fullName: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputClasses = `w-full p-3 border-2 ${theme.border} ${theme.background} ${theme.text} focus:border-accent transition-colors`;

  const getBorderClass = (): string => {
    switch (status) {
      case "success":
        return "border-accent";
      case "error":
        return "border-accent";
      default:
        return theme.border;
    }
  };

  return (
    <div
      className={`h-full page-fade-in ${theme.background} ${theme.text} flex items-center justify-center`}
    >
      <div className="max-w-xl w-full h-full overflow-y-auto px-4 md:px-8 py-8 ">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">CONTACT</h1>
          <div className={`w-full h-0.5 ${isDarkMode ? "bg-white" : "bg-black"} mb-4`} />
          <p className="text-base opacity-80">
            Got a project? Drop me a line.
          </p>
        </header>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={`border-2 ${getBorderClass()} p-6 transition-colors`}
        >
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="from_name" className="block text-sm font-bold mb-2 uppercase">
              Name
            </label>
            <input
              type="text"
              id="from_name"
              name="from_name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="reply_to" className="block text-sm font-bold mb-2 uppercase">
              Email
            </label>
            <input
              type="email"
              id="reply_to"
              name="reply_to"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="your@email.com"
            />
          </div>

          {/* Message */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-bold mb-2 uppercase">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className={`${inputClasses} resize-none`}
              placeholder="How can I help you?"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full p-3 border-2 ${theme.border} font-bold uppercase tracking-wide transition-colors
              ${status === "loading" ? "opacity-50 cursor-not-allowed" : "hover:bg-accent hover:text-white hover:border-accent cursor-pointer"}`}
          >
            {status === "loading" && (
              <span className="inline-flex items-center">
                <span className="w-4 h-4 border-2 border-current border-t-transparent animate-spin mr-2" />
                SENDING...
              </span>
            )}
            {status === "success" && "SENT ✓"}
            {status === "error" && "ERROR — TRY AGAIN"}
            {status === "idle" && "SEND"}
          </button>
        </form>

        {/* Status Message */}
        {status === "success" && (
          <p className="text-accent text-sm mt-4 text-center">
            Message sent successfully. I'll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-accent text-sm mt-4 text-center">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;
