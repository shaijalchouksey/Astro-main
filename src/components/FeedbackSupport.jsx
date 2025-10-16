import React, { useState } from "react";
import { HelpingHand, Bug, Lock, CreditCard, MessageSquare } from "lucide-react";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";

const FeedbackSupport = () => {
  const [issueType, setIssueType] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!issueType || !message) return alert("Please fill all fields.");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIssueType("");
      setMessage("");
    }, 3000);
  };

  const issueOptions = [
    { value: "login", label: "Login Issue", icon: <Lock size={20} /> },
    { value: "payment", label: "Payment Issue", icon: <CreditCard size={20} /> },
    { value: "bug", label: "Bug Report", icon: <Bug size={20} /> },
    { value: "other", label: "Other", icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#6b2400] via-[#f76822] to-[#f76822] text-white flex flex-col">
      <Navbar /> 
      <div className="flex-1 flex mt-20 flex-col items-center px-4 py-6">
        <div className="flex items-center w-full max-w-md mb-6">
          <HelpingHand size={28} className="cursor-pointer" />
          <h1 className="flex text-center text-lg font-semibold">
            Feedback & Support
          </h1>
        </div>
        <div className="bg-black/40 backdrop-blur-md rounded-2xl w-full max-w-md p-6 shadow-lg space-y-6">
          <div>
            <h2 className="text-white font-semibold mb-2">Type</h2>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked
                  readOnly
                  className="w-5 h-5 accent-primary"
                />
                <span className="text-lg">Contact Support</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Issue Type</label>
            <div className="flex flex-col gap-3">
              {issueOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setIssueType(option.value)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${
                    issueType === option.value
                      ? "bg-primary border-primary"
                      : "bg-black/20 border-white/40 hover:bg-white/10"
                  }`}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help you today?"
              className="w-full h-28 rounded-md px-4 py-3 bg-black/20 border border-white/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-all"
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="w-full bg-primary text-white font-semibold py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              Send Message
            </button>
          </div>
          {submitted && (
            <div className="text-center text-green-400 font-semibold mt-2">
              Your message has been sent successfully!
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FeedbackSupport;
