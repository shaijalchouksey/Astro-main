import { useState } from "react";
import api from '../api';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AssignmentPage = () => {
    const [questionNumber, setQuestionNumber] = useState(1);
    const [totalQuestions] = useState(5);
    const [assessmentType, setAssessmentType] = useState("free"); // "free" or "paid"
    const [showResult, setShowResult] = useState(false);
    const [paidUnlocked, setPaidUnlocked] = useState(false); // tracks payment

    const freeQuestions = [
        "Describe a skill you want to improve in the next 6 months and why.",
        "Write about your dream job and what makes it exciting for you.",
        "How would you plan your day for maximum productivity?",
        "If you could meet your future self, what would you ask?",
        "Share one personal habit that has made a positive impact in your life."
    ];

    const paidQuestions = [
        "Write a paragraph about your goals for the next 5 years.",
        "Describe a challenging situation and how you overcame it.",
        "Write a letter to your future self about your aspirations.",
        "Plan a weekly schedule for your personal growth.",
        "Write about a mentor who influenced your personal development."
    ];

    // --- PAYMENT GATEWAY LOGIC (UPDATED & CORRECTED) ---
    const displayRazorpay = async (amountInRupees) => {
        // 1. Token ko sahi naam ('token') se localStorage se nikalo
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please log in to make a payment.");
            return;
        }

        try {
            // Amount ko paise mein convert karo (e.g., 199 * 100 = 19900)
            const amountInPaise = amountInRupees * 100;
            
            // 2. 'create-order' API call karo. Header daalne ki zaroorat nahi,
            //    kyunki humara api.js waala interceptor yeh kaam apne aap kar dega.
            const { data: { id: order_id, currency } } = await api.post(
                '/api/payment/create-order',
                { amount: amountInPaise, receipt: `receipt_assessment_${new Date().getTime()}` }
            );

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Key ko .env file se lein
                amount: amountInPaise,
                currency: currency,
                name: "Astro App Assessment",
                description: "Paid Assessment Fee",
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    };
                    try {
                        // 3. 'verify' API call karo. Yahaan bhi header ki zaroorat nahi.
                        const verificationResponse = await api.post('/api/payment/verify', data);
                        alert(verificationResponse.data.message);
                        setPaidUnlocked(true); // Unlock on successful payment
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: "", // User will fill this
                    email: "", // User will fill this
                },
                theme: {
                    color: "#f76822",
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Error creating Razorpay order:", error.response ? error.response.data : error.message);
            // Agar token galat hai to backend 401 error bhejega
            if (error.response && error.response.status === 401) {
                alert("Your session has expired. Please log in again.");
            } else {
                alert("Could not initiate payment. Please try again.");
            }
        }
    };
    // --- END PAYMENT LOGIC ---

    const currentQuestion =
        assessmentType === "free"
            ? freeQuestions[questionNumber - 1]
            : paidQuestions[questionNumber - 1];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#6b2400] via-[#f76822] to-[#f76822]">
            <Navbar />
            <div className="pt-24"></div>

            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={() => {
                        setAssessmentType("free");
                        setQuestionNumber(1);
                        setPaidUnlocked(false);
                    }}
                    className={`px-6 py-2 rounded-lg font-medium ${
                        assessmentType === "free"
                            ? "bg-orange-600 text-white"
                            : "bg-white text-black"
                    }`}
                >
                    Free Assessment
                </button>
                <button
                    onClick={() => {
                        setAssessmentType("paid");
                        setQuestionNumber(1);
                        setPaidUnlocked(false);
                    }}
                    className={`px-6 py-2 rounded-lg font-medium ${
                        assessmentType === "paid"
                            ? "bg-orange-600 text-white"
                            : "bg-white text-black"
                    }`}
                >
                    Paid Assessment
                </button>
            </div>

            <main className="flex-grow flex items-center justify-center px-4 py-6">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
                    <p className="text-blue-700 font-medium mb-4">
                        Question: {questionNumber}/{totalQuestions}
                    </p>

                    {assessmentType === "paid" && !paidUnlocked ? (
                        <div className="flex flex-col items-center gap-4 mt-6">
                            <p className="text-gray-700 font-medium">
                                Pay ₹199 to unlock the Paid Assessment.
                            </p>
                            <button
                                onClick={() => displayRazorpay(199)}
                                className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700"
                            >
                                Pay ₹199
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-lg md:text-xl font-semibold mb-6">
                                {assessmentType === "free" ? "Free Assessment" : "Paid Assessment"}
                            </h2>
                            <p className="font-medium text-gray-800 mb-4">{currentQuestion}</p>
                            <textarea
                                placeholder="Type your answer here..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                                rows={6}
                            />
                            <div className="mt-6">
                                <button
                                    onClick={() => setShowResult(!showResult)}
                                    className="text-blue-600 font-medium"
                                >
                                    See Result {showResult ? "▲" : "▼"}
                                </button>
                                {showResult && (
                                    <div className="mt-3 p-4 bg-gray-100 rounded-lg text-gray-700">
                                        Results will be shown here after submission.
                                    </div>
                                )}
                            </div>
                            <div className="mt-8 flex justify-between">
                                <button
                                    onClick={() => setQuestionNumber((prev) => Math.max(1, prev - 1))}
                                    disabled={questionNumber === 1}
                                    className={`px-6 py-3 rounded-md font-medium ${
                                        questionNumber === 1
                                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                            : "bg-black text-white hover:bg-gray-800"
                                    }`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() =>
                                        setQuestionNumber((prev) => Math.min(totalQuestions, prev + 1))
                                    }
                                    disabled={questionNumber === totalQuestions}
                                    className={`px-6 py-3 rounded-md font-medium ${
                                        questionNumber === totalQuestions
                                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                            : "bg-orange-600 text-white hover:bg-orange-700"
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                            <div className="mt-10 text-center italic text-purple-700 font-medium">
                                “I am grateful for the service provided by Dr. Ruchi Goyal. She helped me in leading a happy life!”
                            </div>
                            <div className="mt-2 text-center italic text-yellow-700 font-medium">
                                - Review by a Delighted Customer
                            </div>
                        </div>
                    )}
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default AssignmentPage;

