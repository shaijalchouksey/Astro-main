import { ChevronDown, ChevronUp, Lock, CheckCircle, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from '../api';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ReferralButton from "../components/ReferalButton";
import "../index.css";

// Custom Popup Modal Component
const PopupModal = ({ message, onClose, isError = false }) => (
    <AnimatePresence>
        {message && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white text-black p-6 rounded-2xl w-full max-w-sm text-center shadow-xl relative">
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"><X size={24} /></button>
                    <div className="flex justify-center mb-4">
                        {isError ? <X size={48} className="text-red-500" /> : <CheckCircle size={48} className="text-green-500" />}
                    </div>
                    <h2 className="text-xl font-bold mb-2">{isError ? "Error" : "Success"}</h2>
                    <p className="text-gray-700">{message}</p>
                    <button onClick={onClose} className="bg-orange-600 text-white px-6 py-2 rounded-full w-full mt-6 hover:bg-orange-700 transition">OK</button>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

const QuestionAnswerPage = () => {
    const [activeTab, setActiveTab] = useState("free");
    const [openQuestions, setOpenQuestions] = useState([]);
    const [unlockedQuestions, setUnlockedQuestions] = useState([]);
    const [showPayment, setShowPayment] = useState(null);
    const [userData, setUserData] = useState({ name: "", email: "", gender: "male", dob: "", timeOfBirth: "", placeOfBirth: "" });

    const [answers, setAnswers] = useState({});
    const [isLoadingAnswer, setIsLoadingAnswer] = useState(null);
    
    const [popupMessage, setPopupMessage] = useState(null);
    const [isErrorPopup, setIsErrorPopup] = useState(false);

    const showErrorPopup = (message) => { setIsErrorPopup(true); setPopupMessage(message); };
    const showSuccessPopup = (message) => { setIsErrorPopup(false); setPopupMessage(message); };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const questions = {
        free: [],
        "99rs": [ { text: "Predict career avenues for me.", price: 99 }, { text: "Which career avenues should I avoid?", price: 99 }, { text: "When can I start my own business if I make an effort?", price: 99 }, { text: "Will a government job suit me more than a private job?", price: 99 }, { text: "When can my earnings double if I make an effort?", price: 99 }, { text: "Predict my health during the next ten years.", price: 99 }, { text: "When can I quit smoking if I make an effort?", price: 99 }, { text: "When can I quit alcohol if I make an effort?", price: 99 }, { text: "When is a suitable window / right time for my surgery?", price: 99 }, { text: "When can my marital life situation change if I make an effort ? (answer it with my birth details only)", price: 99 }, ],
        "199rs": [ { text: "Predict the profile of my likely spouse.", price: 199 }, { text: "Provide me with all my job promotion windows in the next ten years if I make an effort?", price: 199 }, { text: "When is the strongest possibility of the change of city within the next ten years if I make an effort?", price: 199 }, { text: "Suggest root cause & remedies for the negativity in my professional life?", price: 199 }, { text: "Which probable countries can I try to settle down if I make an effort?", price: 199 }, ],
    };

    const displayRazorpay = async (amount) => {
        if (!localStorage.getItem('authToken')) { showErrorPopup("Please log in to make a payment."); return; }
        const questionText = questions[showPayment.tab][showPayment.index].text;
        try {
            const { data: { id: order_id, currency } } = await api.post('/api/payment/create-order', { amount: amount * 100, receipt: `receipt_question_${Date.now()}` });
            const options = {
                key: "rzp_test_RPNPg6A7yl1KPA",
                amount: amount * 100, currency, name: "Astro App Question", description: questionText, order_id,
                handler: async function (response) {
                    try {
                        await api.post('/api/payment/verify', { razorpay_payment_id: response.razorpay_payment_id, razorpay_order_id: response.razorpay_order_id, razorpay_signature: response.razorpay_signature });
                        showSuccessPopup("Payment successful! You can now get your answer.");
                        setUnlockedQuestions([...unlockedQuestions, `${showPayment.tab}-${showPayment.index}`]);
                        setShowPayment(null);
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        showErrorPopup("Payment verification failed. Please contact support.");
                    }
                },
                prefill: { name: userData.name, email: userData.email },
                theme: { color: "#f76822" },
            };
            new window.Razorpay(options).open();
        } catch (error) {
            console.error("Error creating Razorpay order:", error);
            showErrorPopup("Could not initiate payment. Please try again.");
        }
    };

    const handlePayment = () => { if (showPayment) { displayRazorpay(showPayment.price); } };
    const toggleQuestion = (index) => { if (openQuestions.includes(index)) { setOpenQuestions(openQuestions.filter((i) => i !== index)); } else { setOpenQuestions([...openQuestions, index]); } };
    
    // VALIDATION UPDATE KI GAYI HAI
    const handleSubmitDetails = () => {
        if (!userData.name || !userData.email || !userData.dob || !userData.timeOfBirth || !userData.placeOfBirth) {
            showErrorPopup("Please fill in all your details before saving.");
            return;
        }
        showSuccessPopup("Your details have been saved successfully!");
    };

    const fetchPrediction = async (tab, index, questionText) => {
        const questionId = `${tab}-${index}`;
        setIsLoadingAnswer(questionId);
        if (!userData.dob || !userData.timeOfBirth || !userData.placeOfBirth) {
            showErrorPopup("Please save your birth details first before asking a question.");
            setIsLoadingAnswer(null);
            return;
        }
        try {
            const { data } = await api.post('/api/engine/get-prediction', { questionText, userDetails: userData });
            if (data.success) {
                setAnswers(prev => ({ ...prev, [questionId]: data.prediction }));
                try {
                    await api.post('/api/predictions/save', { question: questionText, answer: data.prediction });
                    console.log("Prediction successfully saved to Firebase.");
                } catch (saveError) {
                    console.error("Failed to save the prediction to Firebase:", saveError);
                }
            } else {
                 throw new Error(data.prediction || "Prediction was not successful.");
            }
        } catch (error) {
            console.error("Error fetching prediction:", error);
            const errorMessage = error.response?.data?.message || "Could not fetch the answer. Please try again.";
            setAnswers(prev => ({ ...prev, [questionId]: `Sorry, something went wrong: ${errorMessage}` }));
        } finally {
            setIsLoadingAnswer(null);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f76822] via-[#f76822] to-[#f76822] text-white">
            <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-md"> <Navbar /> </div>
            <PopupModal message={popupMessage} onClose={() => setPopupMessage(null)} isError={isErrorPopup} />

            <section className="flex flex-col items-center justify-center text-center py-[15vh] px-4 bg-gradient-to-br from-[#6b2400] via-[#f76822] to-[#f76822] text-white backdrop-blur-md">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg"> Unlock Your Future Insights </h1>
            </section>

            <div className="max-w-3xl mx-auto bg-orange-500/80 rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white text-center"> Enter Your Details </h2>
                {/* FORM UPDATE KIYA GAYA HAI */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="name" placeholder="Name / Pseudo Name *" className="p-2 rounded text-black" value={userData.name} onChange={handleInputChange} />
                    <input type="email" name="email" placeholder="Email (for payment receipt) *" className="p-2 rounded text-black" value={userData.email} onChange={handleInputChange} />
                    <input type="date" name="dob" placeholder="Date of Birth" className="p-2 rounded text-black" value={userData.dob} onChange={handleInputChange} />
                    <input type="time" name="timeOfBirth" placeholder="Time of Birth" className="p-2 rounded text-black" value={userData.timeOfBirth} onChange={handleInputChange} />
                    <select name="gender" className="p-2 rounded text-black" value={userData.gender} onChange={handleInputChange} >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input type="text" name="placeOfBirth" placeholder="Place of Birth (City, State, Country) *" className="p-2 rounded text-black" value={userData.placeOfBirth} onChange={handleInputChange} />
                </form>
                <div className="flex justify-center mt-4">
                    <button onClick={handleSubmitDetails} className="bg-white text-orange-600 px-6 py-2 rounded-full font-bold hover:scale-105 transition"> Save Details </button>
                </div>
            </div>

            <div className="flex justify-center gap-3 mb-6 px-4 flex-wrap">
                {["free", "99rs", "199rs"].map((tab) => ( <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 rounded-full font-semibold shadow-md transition-all ${activeTab === tab ? "bg-white text-orange-600" : "bg-orange-600 hover:bg-orange-500"}`}> {tab === 'free' ? 'Free' : `₹${tab.replace('rs', '')}`} </button> ))}
            </div>

            <div className="max-w-4xl mx-auto px-4 scrollbar-thin pb-20">
                <div className="flex flex-col gap-6">
                    {questions[activeTab] && questions[activeTab].map((q, idx) => {
                        const isUnlocked = unlockedQuestions.includes(`${activeTab}-${idx}`);
                        const questionId = `${activeTab}-${idx}`;
                        return (
                            <div key={idx} className="bg-orange-500/80 rounded-xl shadow-lg overflow-hidden">
                                <button onClick={() => isUnlocked ? toggleQuestion(idx) : setShowPayment({ tab: activeTab, index: idx, price: q.price })} className="w-full flex items-center justify-between p-4 text-left">
                                    <span>{q.text}</span>
                                    <div className="flex items-center gap-2"> {isUnlocked ? (openQuestions.includes(idx) ? <ChevronUp /> : <ChevronDown />) : <Lock />} </div>
                                </button>
                                {openQuestions.includes(idx) && isUnlocked && (
                                    <div className="bg-orange-600 p-4 text-md">
                                        {answers[questionId] ? ( <p>{answers[questionId]}</p> ) : (
                                            <button onClick={() => fetchPrediction(activeTab, idx, q.text)} disabled={isLoadingAnswer === questionId} className="bg-white text-orange-600 px-4 py-2 rounded-full font-bold hover:scale-105 transition disabled:opacity-50">
                                                {isLoadingAnswer === questionId ? 'Getting Answer...' : 'Click to Get Answer'}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {showPayment && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white text-black p-6 rounded-xl w-80 text-center shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Unlock Question</h2>
                        <p className="mb-4">Pay ₹{showPayment.price} to unlock this question.</p>
                        <button onClick={handlePayment} className="bg-orange-600 text-white px-6 py-2 rounded-full w-full"> Proceed to Pay </button>
                        <button onClick={() => setShowPayment(null)} className="mt-3 text-sm text-gray-600"> Cancel </button>
                    </div>
                </div>
            )}

            <ReferralButton />
            <Footer />
        </div>
    );
};

export default QuestionAnswerPage;

