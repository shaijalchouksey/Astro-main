import { ChevronDown, ChevronUp, Lock } from "lucide-react";
import { useState } from "react";
import api from '../api';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ReferralButton from "../components/ReferalButton";
import "../index.css";

const QuestionAnswerPage = () => {
    const [activeTab, setActiveTab] = useState("free");
    const [openQuestions, setOpenQuestions] = useState([]);
    const [unlockedQuestions, setUnlockedQuestions] = useState([]);
    const [showPayment, setShowPayment] = useState(null);

    const [userData, setUserData] = useState({
        name: "", // Will be used for payment prefill
        email: "", // Will be used for payment prefill
        gender: "male",
        dob: "",
        timeOfBirth: "",
        placeOfBirth: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const questions = {
        free: [],
        "99rs": [
            { text: "Predict career avenues for me.", price: 99 },
            { text: "Which career avenues should I avoid?", price: 99 },
            { text: "When can I start my own business if I make an effort?", price: 99 },
            { text: "Will a government job suit me more than a private job?", price: 99 },
            { text: "When can my earnings double if I make an effort?", price: 99 },
            { text: "Predict my health during the next ten years.", price: 99 },
            { text: "When can I quit smoking if I make an effort?", price: 99 },
            { text: "When can I quit alcohol if I make an effort?", price: 99 },
            { text: "When is a suitable window / right time for my surgery?", price: 99 },
            { text: "When can my marital life situation change if I make an effort ? (answer it with my birth details only)", price: 99 },
            { text: "When can I buy my next apartment if I make an effort?", price: 99 },
            { text: "When can I buy my next house (landed property) if I make an effort?", price: 99 },
            { text: "When am I likely to sell my apartment if I make an effort?", price: 99 },
            { text: "When am I likely to sell my house (landed property) if I make an effort?", price: 99 },
            { text: "When will my children get married if we make an effort? (answer it with my birth details)", price: 99 },
            { text: "Will my children settle abroad if they make an effort? (answer it with my birth details)", price: 99 },
            { text: "Suggest root cause & remedies for my negative emotions / depression?", price: 99 },
            { text: "Suggest root cause & remedies for the negativity in my family environment? (answer it with my birth details)", price: 99 },
            { text: "Which mantras should I chant daily or weekly according to my chart during this one year?", price: 99 },
            { text: "When can I get my next promotion within the next five years if I make an effort?", price: 99 },
            { text: "When is the strongest possibility of the change of city within the next five years if I make an effort?", price: 99 },
            { text: "When am I likely to get my next job within the next five years if I make an effort?", price: 99 },
            { text: "Which aspects of life including hobbies should I focus on, to enhance my happiness level?", price: 99 },
        ],
        "199rs": [
            { text: "Predict the profile of my likely spouse.", price: 199 },
            { text: "Provide me with all my job promotion windows in the next ten years if I make an effort?", price: 199 },
            { text: "When is the strongest possibility of the change of city within the next ten years if I make an effort?", price: 199 },
            { text: "Suggest root cause & remedies for the negativity in my professional life?", price: 199 },
            { text: "Which probable countries can I try to settle down if I make an effort?", price: 199 },
            { text: "What will be the right profession for me with decent earning potential?", price: 199 },
            { text: "Probable percentage of marks in my next exam this year.", price: 199 },
            { text: "When can I (lady) be blessed with a baby?", price: 199 },
            { text: "What type of struggles are likely in my future life ? Suggest remedies.", price: 199 },
            { text: "Suggest root cause & remedies for my mental peace.", price: 199 },
            { text: "What type of health issues am I likely to encounter in the next ten years? Suggest remedies.", price: 199 },
            { text: "Suggest root cause & remedies for my obesity.", price: 199 },
            { text: "Give me mahurat dates for my marriage within a two years timeframe.", price: 199 },
            { text: "Give me future timelines for my career & marriage during the next ten years?", price: 199 },
            { text: "What are the chances of success in the matter of court case for me if I make an effort?", price: 199 },
            { text: "Should I become a trader/investor professionally?", price: 199 },
            { text: "When is the strongest possibility of the change of cities within the next twenty years if I make an effort?", price: 199 },
            { text: "Which financial assets should I focus on, as per my horoscope?", price: 199 },
            { text: "When will I be more successful and happy in every field of my life?", price: 199 },
            { text: "When will my business get better and more productive?", price: 199 },
            { text: "Advise periods when I should be cautious of any emotional turmoil in my life?", price: 199 },
            { text: "When will I achieve a stress free life for myself?", price: 199 },
            { text: "Predict my spiritual life.", price: 199 },
            { text: "Advise which god I should worship?", price: 199 },
            { text: "When will I be able to reduce stress in my life?", price: 199 },
            { text: "When can I switch from my job to my own business?", price: 199 },
            { text: "Advise possible risks in my life where I need to take any specific precautions?", price: 199 },
            { text: "When will my spouse be more understanding towards me for a better family environment?", price: 199 },
            { text: "How many children can I have?", price: 199 },
            { text: "When will I be able to start supporting my parents & family financially?", price: 199 },
        ],
    };

    // --- PAYMENT GATEWAY LOGIC (UPDATED & CORRECTED) ---
    const displayRazorpay = async (amountInRupees) => {
        // 1. Token ko sahi naam ('token') se localStorage se nikalo
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please log in to make a payment.");
            return;
        }

        const questionText = questions[showPayment.tab][showPayment.index].text;

        try {
            // 2. Amount ko paise mein convert karo (e.g., 99 * 100 = 9900)
            const amountInPaise = amountInRupees * 100;

            // 3. 'create-order' API call karo. Header daalne ki zaroorat nahi.
            const { data: { id: order_id, currency } } = await api.post(
                '/api/payment/create-order',
                { amount: amountInPaise, receipt: `receipt_question_${new Date().getTime()}` }
            );

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Key ko .env file se lein
                amount: amountInPaise,
                currency: currency,
                name: "Astro App Question",
                description: questionText,
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    };

                    try {
                        // 4. 'verify' API call karo. Yahaan bhi header ki zaroorat nahi.
                        const verificationResponse = await api.post('/api/payment/verify', data);
                        alert(verificationResponse.data.message);
                        
                        setUnlockedQuestions([
                            ...unlockedQuestions,
                            `${showPayment.tab}-${showPayment.index}`,
                        ]);
                        setShowPayment(null);

                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: userData.name,
                    email: userData.email,
                },
                theme: {
                    color: "#f76822",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Error creating Razorpay order:", error.response ? error.response.data : error.message);
            if (error.response && error.response.status === 401) {
                alert("Your session has expired. Please log in again.");
            } else {
                alert("Could not initiate payment. Please try again.");
            }
        }
    };

    const handlePayment = () => {
        if (showPayment) {
            displayRazorpay(showPayment.price);
        }
    };
    // --- END PAYMENT LOGIC ---

    const toggleQuestion = (index) => {
        if (openQuestions.includes(index)) {
            setOpenQuestions(openQuestions.filter((i) => i !== index));
        } else {
            setOpenQuestions([...openQuestions, index]);
        }
    };

    const handleSubmitDetails = () => {
        if(!userData.dob || !userData.timeOfBirth || !userData.placeOfBirth){
             alert("Please fill in Date, Time, and Place of Birth and save.");
             return;
        }
        console.log("User Data:", userData);
        alert("Your details have been saved!");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f76822] via-[#f76822] to-[#f76822] text-white">
            <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-md">
                <Navbar />
            </div>

            <section className="flex flex-col items-center justify-center text-center py-[15vh] px-4 bg-gradient-to-br from-[#6b2400] via-[#f76822] to-[#f76822] text-white backdrop-blur-md">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                    Unlock Your Future Insights
                </h1>
            </section>

            <div className="max-w-3xl mx-auto bg-orange-500/80 rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white text-center">
                    Enter Your Birth Details
                </h2>
                <form className="grid md:grid-cols-2 gap-4">
                    <input
                        type="date"
                        name="dob"
                        placeholder="Date of Birth"
                        className="p-2 rounded text-black"
                        value={userData.dob}
                        onChange={handleInputChange}
                    />
                    <input
                        type="time"
                        name="timeOfBirth"
                        placeholder="Time of Birth"
                        className="p-2 rounded text-black"
                        value={userData.timeOfBirth}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="placeOfBirth"
                        placeholder="Place of Birth (City, State, Country)"
                        className="p-2 rounded text-black md:col-span-2"
                        value={userData.placeOfBirth}
                        onChange={handleInputChange}
                    />
                </form>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleSubmitDetails}
                        className="bg-white text-orange-600 px-6 py-2 rounded-full font-bold hover:scale-105 transition"
                    >
                        Save Details
                    </button>
                </div>
            </div>

            <div className="flex justify-center gap-3 mb-6 px-4 flex-wrap">
                {["free", "99rs", "199rs"].map((tab) => {
                    let originalPrice = 0;
                    let discountPercent = 0;
                    if (tab === "99rs") originalPrice = 150;
                    if (tab === "199rs") originalPrice = 250;
                    if (originalPrice > 0) {
                        discountPercent = Math.round(((originalPrice - (tab === '99rs' ? 99 : 199)) / originalPrice) * 100);
                    }
                    return (
                        <div key={tab} className="relative inline-block">
                            <button
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-center font-semibold shadow-md transition-all ${activeTab === tab ? "bg-white text-orange-600" : "bg-orange-600 hover:bg-orange-500"}`}
                            >
                                {tab === "free" ? "Free" : (
                                    <span className="text-lg font-bold">
                                        ₹{tab === "99rs" ? 99 : 199}{" "}
                                        <span className="line-through text-sm ml-1">
                                            {originalPrice > 0 && `₹${originalPrice}`}
                                        </span>
                                    </span>
                                )}
                            </button>
                            {tab !== "free" && (
                                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 shadow-md">
                                    -{discountPercent}%
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="max-w-4xl mx-auto px-4 scrollbar-thin pb-20" style={{ minHeight: "50vh" }}>
                {activeTab === "free" ? (
                    <div className="text-center text-xl font-semibold text-white py-20">
                        Coming Soon...
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {questions[activeTab].map((q, idx) => {
                            const isUnlocked = unlockedQuestions.includes(`${activeTab}-${idx}`);
                            let originalPrice = 0;
                            let discount = 0;
                            if (activeTab === "99rs") {
                                originalPrice = 150;
                                discount = originalPrice - q.price;
                            } else if (activeTab === "199rs") {
                                originalPrice = 250;
                                discount = originalPrice - q.price;
                            }
                            return (
                                <div key={idx} className="bg-orange-500/80 rounded-xl shadow-lg overflow-hidden">
                                    <button onClick={() => isUnlocked ? toggleQuestion(idx) : setShowPayment({ tab: activeTab, index: idx, price: q.price })} className="w-full flex items-center justify-between p-4 text-left">
                                        <span>{q.text}</span>
                                        <div className="flex items-center gap-2">
                                            {q.price > 0 && (
                                                <div className="text-right">
                                                    {originalPrice > 0 && (
                                                        <span className="text-sm font-semibold line-through block">₹{originalPrice}</span>
                                                    )}
                                                    <span className="text-sm font-bold">₹{q.price}</span>
                                                    <span className="text-xs text-green-200"> -{discount}</span>
                                                </div>
                                            )}
                                            {isUnlocked ? ( openQuestions.includes(idx) ? <ChevronUp /> : <ChevronDown /> ) : <Lock />}
                                        </div>
                                    </button>
                                    {openQuestions.includes(idx) && isUnlocked && (
                                        <div className="bg-orange-600 p-4 text-md">
                                            <p>
                                                Thank you {userData.name || "User"}! Your question is
                                                being processed based on your birth details.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Payment Modal */}
            {showPayment && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white text-black p-6 rounded-xl w-80 text-center shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Unlock Question</h2>
                        <p className="mb-4">Pay ₹{showPayment.price} to unlock this question.</p>
                        <button
                            onClick={handlePayment}
                            className="bg-orange-600 text-white px-6 py-2 rounded-full w-full"
                        >
                            Proceed to Pay
                        </button>
                        <button
                            onClick={() => setShowPayment(null)}
                            className="mt-3 text-sm text-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <ReferralButton />
            <Footer />
        </div>
    );
};

export default QuestionAnswerPage;
