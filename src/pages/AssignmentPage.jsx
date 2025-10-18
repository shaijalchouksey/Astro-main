import { CheckCircle, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from '../api';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const PopupModal = ({ message, onClose }) => (
    <AnimatePresence>
        {message && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white text-black p-6 rounded-2xl w-full max-w-sm text-center shadow-xl relative"
                >
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                        <X size={24} />
                    </button>
                    <div className="flex justify-center mb-4">
                        <CheckCircle size={48} className="text-green-500" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Success</h2>
                    <p className="text-gray-700">{message}</p>
                    <button
                        onClick={onClose}
                        className="bg-orange-600 text-white px-6 py-2 rounded-full w-full mt-6 hover:bg-orange-700 transition"
                    >
                        OK
                    </button>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);


const AssignmentPage = () => {
    const [questionNumber, setQuestionNumber] = useState(1);
    const [totalQuestions] = useState(5);
    const [assessmentType, setAssessmentType] = useState("free");
    const [paidUnlocked, setPaidUnlocked] = useState(false);
    
    const [answers, setAnswers] = useState(Array(totalQuestions).fill(""));
    const [isSubmitting, setIsSubmitting] = useState(false);

    // NAYA STATE: Popup message ke liye
    const [popupMessage, setPopupMessage] = useState(null);

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

    const handleAnswerChange = (e) => {
        const newAnswers = [...answers];
        newAnswers[questionNumber - 1] = e.target.value;
        setAnswers(newAnswers);
    };

    const displayRazorpay = async (amount) => {
        const idToken = localStorage.getItem('authToken');
        if (!idToken) {
            setPopupMessage("Please log in to make a payment.");
            return;
        }

        try {
            const { data: { id: order_id, currency } } = await api.post(
                '/api/payment/create-order',
                { amount, receipt: `receipt_assessment_${new Date().getTime()}` },
                { headers: { Authorization: `Bearer ${idToken}` } }
            );

            const options = {
                key: "rzp_test_RPNPg6A7yl1KPA",
                amount: amount * 100,
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
                        await api.post(
                            '/api/payment/verify',
                            data,
                            { headers: { Authorization: `Bearer ${idToken}` } }
                        );
                        setPopupMessage("Payment successful! The assessment is now unlocked.");
                        setPaidUnlocked(true);
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        setPopupMessage("Payment verification failed. Please contact support.");
                    }
                },
                prefill: { name: "", email: "" },
                theme: { color: "#f76822" },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Error creating Razorpay order:", error.response ? error.response.data : error.message);
            setPopupMessage("Could not initiate payment. Please try again.");
        }
    };

    const handleSubmitAssignment = async () => {
        setIsSubmitting(true);
        try {
            const idToken = localStorage.getItem('authToken');
            if (!idToken) {
                setPopupMessage("Please log in before submitting the assignment.");
                setIsSubmitting(false);
                return;
            }

            const questions = assessmentType === 'free' ? freeQuestions : paidQuestions;
            const submissionData = answers.map((answer, index) => ({
                question: questions[index],
                answer: answer
            }));

            await api.post('/api/assignments/submit', {
                assessmentType: assessmentType,
                answers: submissionData
            }, {
                headers: { Authorization: `Bearer ${idToken}` }
            });

            setPopupMessage("Your assignment has been submitted successfully!");
            setQuestionNumber(1);
            setAnswers(Array(totalQuestions).fill(""));

        } catch (error) {
            console.error("Assignment submission failed:", error);
            setPopupMessage("Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const currentQuestion = assessmentType === "free" ? freeQuestions[questionNumber - 1] : paidQuestions[questionNumber - 1];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#6b2400] via-[#f76822] to-[#f76822]">
            <Navbar />
            <div className="pt-24"></div>

            {/* POPUP MODAL */}
            <PopupModal message={popupMessage} onClose={() => setPopupMessage(null)} />

            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={() => { setAssessmentType("free"); setQuestionNumber(1); setAnswers(Array(totalQuestions).fill("")); setPaidUnlocked(false); }}
                    className={`px-6 py-2 rounded-lg font-medium ${assessmentType === "free" ? "bg-orange-600 text-white" : "bg-white text-black"}`}
                >
                    Free Assessment
                </button>
                <button
                    onClick={() => { setAssessmentType("paid"); setQuestionNumber(1); setAnswers(Array(totalQuestions).fill("")); setPaidUnlocked(false); }}
                    className={`px-6 py-2 rounded-lg font-medium ${assessmentType === "paid" ? "bg-orange-600 text-white" : "bg-white text-black"}`}
                >
                    Paid Assessment
                </button>
            </div>

            <main className="flex-grow flex items-center justify-center px-4 py-6">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-10 text-black">
                    <p className="text-orange-600 font-medium mb-4">
                        Question: {questionNumber}/{totalQuestions}
                    </p>

                    {assessmentType === "paid" && !paidUnlocked ? (
                        <div className="flex flex-col items-center gap-4 mt-6">
                            <p className="text-gray-700 font-medium">Pay ₹199 to unlock the Paid Assessment.</p>
                            <button onClick={() => displayRazorpay(199)} className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium">
                                Pay ₹199
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-lg md:text-xl font-semibold mb-6">{assessmentType === "free" ? "Free Assessment" : "Paid Assessment"}</h2>
                            <p className="font-medium text-gray-800 mb-4">{currentQuestion}</p>
                            <textarea
                                placeholder="Type your answer here..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                rows={6}
                                value={answers[questionNumber - 1]}
                                onChange={handleAnswerChange}
                            />
                            
                            <div className="mt-8 flex justify-between">
                                <button
                                    onClick={() => setQuestionNumber((prev) => Math.max(1, prev - 1))}
                                    disabled={questionNumber === 1}
                                    className="px-6 py-3 rounded-md font-medium bg-black text-white disabled:bg-gray-400"
                                >
                                    Previous
                                </button>

                                {questionNumber < totalQuestions ? (
                                    <button
                                        onClick={() => setQuestionNumber((prev) => Math.min(totalQuestions, prev + 1))}
                                        className="px-6 py-3 rounded-md font-medium bg-orange-600 text-white"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmitAssignment}
                                        disabled={isSubmitting}
                                        className="px-6 py-3 rounded-md font-medium bg-green-600 text-white disabled:bg-gray-400"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
                                    </button>
                                )}
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

