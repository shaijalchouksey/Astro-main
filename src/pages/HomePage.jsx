import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Aboutsection from "../components/Aboutsection";
import Relationship from "../components/Relationship";

import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  { name: "Mr. Keshavendra Singh", text: "The astrology predictions were highly accurate, and therapy sessions helped me overcome anxiety." },
  { name: "Ms. Riya Sharma", text: "Steer-U’s holistic approach changed the way I look at life and decision making." },
  { name: "John Doe", text: "Professional, reliable, and insightful. I highly recommend Steer-U!" }
];

const quotes = [
  "Believe in yourself and all that you are.",
  "Every day is a new opportunity to grow.",
  "Your future is created by what you do today.",
  "Small steps every day lead to big results.",
  "Stay positive, work hard, and make it happen."
];

const messages = [
  <>
    Get instant future predictions with birth details using{" "}
    <span className="text-[#FFD700] font-bold">Vedic Astrology</span>
  </>,
  <>
    <span className="text-violet-400 font-bold">Psychological Counselling</span> services, without disclosing your identity
  </>,
  <>
    Save your valuable <span className="text-[#FFD700] font-bold">time</span> &{" "}
    <span className="text-violet-400 font-bold">money</span>
  </>,
  <>
    Free Counselling tips on{" "}
    <span className="text-[#FFD700] font-bold">21 challenging areas</span> in life
  </>,
  <>
    <span className="text-violet-400 font-bold">Free future prediction</span> questions
  </>,
];


const ScrollSection = ({ children, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8 }}
  >
    {children}
  </motion.div>
);

const Home = () => {
  // Testimonials rotation
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Quotes rotation
  const [quote, setQuote] = useState(quotes[0]);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      const nextQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(nextQuote);
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Rotating messages under hero
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const cardStyle =
    "bg-gradient-to-br from-[#f76822] via-orange-600/100 to-orange-500/70 " +
    "backdrop-blur-md border border-orange-400/20 text-white shadow-lg " +
    "rounded-2xl p-6 hover:scale-200 hover:shadow-xl hover:border-orange-500/40 " +
    "transition-transform transition-shadow duration-300 ease-in-out";

  const buttonStyle =
    "px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition-all";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#6b2400] via-[#f76822] to-[#f76822] text-white">
      <Navbar />

      <ScrollSection className="relative flex flex-col mb-[-20vh] items-center justify-center text-center py-32 px-4">
        {/* Top corner buttons */}
        <div className="absolute top-[20vh] left-8">
          <Link
            to="/Question"
            className={`${buttonStyle} bg-[#000000] text-white/95`}
          >
            Predict Your Future
          </Link>
        </div>
        <div className="absolute top-[20vh] right-8">
          <Link
            to="/paid"
            className={`${buttonStyle} bg-white text-dark`}
          >
            Get Therapy
          </Link>
        </div>

        {/* Main content */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          Welcome to{" "}
          <span className="text-[#FFD700] font-bold italic">Steer-U</span>
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-3xl drop-shadow">
          Integrating future predictions with psychological counselling. Get personalized insights and guidance tailored for you.
        </p>

        {/* Rotating key points */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-xl md:text-2xl font-semibold mt-6"
          >
            {messages[currentIndex]}
          </motion.p>
        </AnimatePresence>
      </ScrollSection>
      <Aboutsection />

      {/*  Future prediction questions */}
      <ScrollSection className="py-20 px-6 mt-[-10vh] mb-[-10vh] md:px-16">
        <div className={cardStyle}>
          <h2 className="text-4xl font-fancy font-bold mb-4 text-orange-300 drop-shadow-md">
            Future prediction questions
          </h2>
          <p className="text-gray-200 mb-6">
            Access our in-house core prediction engine with free, referral-unlocked, and paid questions. Choose from tiered packages and get accurate, personalized insights.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className={cardStyle}>
              <h3 className="font-semibold text-xl mb-2 text-orange-200">
                Free Questions
              </h3>
              <ul className="list-disc list-inside text-sm max-h-40 overflow-y-auto space-y-1 text-gray-300">
                <li>Next promotion within 2 years?</li>
                <li>Marriage prediction</li>
                <li>Health forecast</li>
                <li>Investment guidance</li>
                <li>Other 5+ free questions</li>
              </ul>
            </div>

            <div className={cardStyle}>
              <h3 className="font-semibold text-xl mb-2 text-orange-200">
                Paid Packages
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
                {/* ₹1,100 / $49: No discount example, keep as is */}
                <li>₹1,100 / $49: 5 questions, answers in 1 week</li>

                {/* ₹2,100 / $99: discount from ₹2,500 / $150 */}
                <li>
                  ₹2,100 / $99{" "}
                  <span className="line-through text-gray-400 ml-1">₹2,500 / $150</span>{" "}
                  <span className="text-green-400 ml-1">-34%</span>: 10 questions, answers in 2 days
                </li>

                {/* ₹5,100 / $199: discount from ₹6,250 / $250 */}
                <li>
                  ₹5,100 / $199{" "}
                  <span className="line-through text-gray-400 ml-1">₹6,250 / $250</span>{" "}
                  <span className="text-green-400 ml-1">-20%</span>: 10 questions, answers in 1 hour
                </li>
              </ul>
            </div>
          </div>

          <Link
            to="/Question"
            className={`${buttonStyle} bg-[#000000] mt-6 inline-block`}
          >
            Explore Future Questions →
          </Link>
        </div>
      </ScrollSection>
      <Relationship />

      {/* Psychological Counselling */}
      <ScrollSection className="py-20 px-6 mt-[-12vh] mb-[-14vh] md:px-16">
        <div className={cardStyle}>
          <h2 className="text-3xl font-fancy font-bold mb-4 text-orange-300 drop-shadow-md">
            Psychological Counselling
          </h2>
          <p className="text-gray-200 mb-6">
            Access 21 counselling topics including Anxiety, Depression, ADHD,
            Addiction, and more. Use free therapy videos or book paid one-on-one
            sessions with professional therapists.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className={cardStyle + " text-center"}>
              <h4 className="font-semibold mb-2 text-orange-200">
                Free Therapy
              </h4>
              <p className="text-gray-300 text-sm">
                Educational videos, general assessments, and hypnotherapy tools.
              </p>
            </div>
            <div className={cardStyle + " text-center"}>
              <h4 className="font-semibold mb-2 text-orange-200">
                Paid Therapy
              </h4>
              <p className="text-gray-300 text-sm">
                Live sessions, AI auto-recording, and therapist monitoring.
              </p>
            </div>
            <div className={cardStyle + " text-center"}>
              <h4 className="font-semibold mb-2 text-orange-200">
                Symptom Tracker
              </h4>
              <p className="text-gray-300 text-sm">
                Track symptoms like sleep, mood, learning, and behaviour
                challenges.
              </p>
            </div>
          </div>
          <Link
            to="/counselling"
            className={`${buttonStyle} bg-[#000000] mt-6 inline-block`}
          >
            Book Counselling Session →
          </Link>
        </div>
      </ScrollSection>
      {/* Start Journey */}
      <ScrollSection className="py-20 px-6 md:px-16 mt-[-12vh] mb-[-20vh] text-center my-10">
        <div className={cardStyle}>
          <h2 className="text-3xl font-fancy font-bold mb-4 text-orange-300 drop-shadow-md">
            Start Your Journey Today
          </h2>
          <p className="text-gray-200 mb-6">
            Get your personalized guidance and professional therapy support in one platform.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/future-prediction"
              className={`${buttonStyle} bg-[#000000]`}
            >
              Predict Your Future
            </Link>
            <Link
              to="/paid-therapy"
              className={`${buttonStyle} bg-white text-dark`}
            >
              Get Therapy
            </Link>
          </div>
        </div>
      </ScrollSection>

      {/* Testimonials */}
      <ScrollSection className="py-20 px-6 md:px-16  mb-[-12vh] text-center my-10">
        <div className={cardStyle}>
          <h2 className="text-3xl font-fancy font-bold text-orange-300  mb-6 drop-shadow-md">
            What Our Users Say
          </h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-gray-200 text-lg mb-4 italic">
                "{testimonials[testimonialIndex].text}"
              </p>
              <h4 className="font-semibold text-orange-200">
                {testimonials[testimonialIndex].name}
              </h4>
            </motion.div>
          </AnimatePresence>
        </div>
      </ScrollSection>
      <ScrollSection className="py-20 px-6 md:px-16 bg-gradient-to-br from-[#6b2400] via-[#f76822] to-[#f76822] text-white rounded-lg shadow-lg mt-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-fancy font-bold text-orange-300  mb-2 drop-shadow-md">
            With the Blessings of Late Mrs. Madhuri Goyal
          </h2>
          <p className="text-gray-200 text-lg text-orange-300  md:text-xl mb-6">
            (1945 - 1999)
          </p>
          <p className="text-gray-100 text-md md:text-lg">
            This app is lovingly dedicated to the memory of my late mother, <strong>Mrs. Madhuri Goyal</strong>, whose guidance, love, and blessings continue to inspire every step of this journey. May her spirit continue to guide and bless all who seek insight through this platform.
          </p>
        </div>
      </ScrollSection>

      <Footer />

      {/* Floating Quotes */}
      <AnimatePresence>
        {visible && (
          <motion.div
            key={quote}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="fixed bottom-10 right-10 bg-gradient-to-b from-[#3b1d0b] to-[#1e1e1e] backdrop-blur-md text-white p-2 rounded-xl shadow-lg z-50 max-w-xs"


          >
            {quote}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
