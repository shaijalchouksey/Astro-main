import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import api from '../api';

const plans = [
    {
        price: 1200,
        oldPrice: 1500,
        title: "Per Session",
        description: "RCI Registered Psychotherapist (2–3 years experience)",
        details: [
            "Each session is 30 minutes",
            "Cancellation shall be charged at 50%",
            "RCI Registered Psychotherapist (2–3 years experience)",
        ],
    },
    {
        price: 1500,
        oldPrice: 2000,
        title: "Per Session",
        description: "RCI Registered Psychotherapist (4–6 years experience)",
        details: [
            "Each session is 30 minutes",
            "Cancellation shall be charged at 50%",
            "RCI Registered Psychotherapist (4–6 years experience)",
        ],
    },
    {
        price: 2000,
        oldPrice: 2800,
        title: "Per Session",
        description: "RCI Registered Psychotherapist (7–10 years experience)",
        details: [
            "Each session is 30 minutes",
            "Cancellation shall be charged at 50%",
            "RCI Registered Psychotherapist (7–10 years experience)",
        ],
    },
    {
        price: 8100,
        pack: "6 sessions pack",
        discount: "10% Discount",
        description: "6 sessions pack with 10% discount",
        details: [
            "Each session is 30 minutes",
            "Cancellation shall be charged at 50%",
            "Validity – 3 Months",
        ],
    },
    {
        price: 12750,
        pack: "10 sessions pack",
        discount: "15% Discount",
        description: "10 sessions pack with 15% discount",
        details: [
            "Each session is 30 minutes",
            "Cancellation shall be charged at 50%",
            "Validity – 6 Months",
        ],
    },
];

const PricingPage = () => {
    // Modal aur form se related extra states hata di gayi hain

    const displayRazorpay = async (plan) => {
        const idToken = localStorage.getItem('authToken');

        if (!idToken) {
            alert("Please log in to make a payment.");
            return;
        }

        const amount = plan.price;
        const description = plan.pack || plan.description;

        try {
            const { data: { id: order_id, currency } } = await api.post(
                '/api/payment/create-order',
                {
                    amount: amount,
                    receipt: `receipt_plan_${new Date().getTime()}`
                },
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`
                    }
                }
            );

            const options = {
                key: "rzp_test_RPNPg6A7yl1KPA",
                amount: amount * 100,
                currency: currency,
                name: "Astro App Plan",
                description: description,
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    };

                    try {
                        const verificationResponse = await api.post(
                            '/api/payment/verify',
                            data,
                            {
                                headers: {
                                    Authorization: `Bearer ${idToken}`
                                }
                            }
                        );
                        alert(verificationResponse.data.message);
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: "", // User Razorpay pop-up mein fill karega
                    email: "", // User Razorpay pop-up mein fill karega
                },
                theme: {
                    color: "#f76822",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Error creating Razorpay order:", error.response ? error.response.data : error.message);
            alert("Could not initiate payment. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#6b2400] via-[#f76822] to-[#f76822] text-white">
            <Navbar />

            <div className="flex-1 py-16 mt-16 px-4 md:px-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-[#FFD700] drop-shadow">
                        Pricing & Plans
                    </h1>
                    <p className="text-gray-200 mt-4 text-lg max-w-2xl mx-auto">
                        Choose a session or package that best fits your needs. Flexible,
                        affordable, and professional support at your fingertips.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-b from-[#6b2400] via-[#f76822] to-[#f76822] text-white border border-orange-400/30 rounded-2xl p-6 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 flex flex-col"
                        >
                            <div className="flex-grow">
                                <div className="mb-4 text-center">
                                    {plan.price && !plan.pack ? (
                                        <>
                                            <h2 className="text-4xl font-bold text-white">
                                                ₹{plan.price}
                                                <span className="text-gray-400 line-through ml-2 text-lg">
                                                    ₹{plan.oldPrice}
                                                </span>
                                            </h2>
                                            <p className="text-orange-300 text-sm">{plan.title}</p>
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="text-2xl font-bold text-white">{plan.pack}</h2>
                                            <p className="text-yellow-300 font-semibold">{plan.discount}</p>
                                            <h3 className="text-3xl font-bold text-white mt-2">₹{plan.price}</h3>
                                        </>
                                    )}
                                </div>

                                <ul className="space-y-2 mb-6">
                                    {plan.details.map((detail, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-200">
                                            <CheckCircle className="text-[#FFD700] w-5 h-5 flex-shrink-0 mt-1" />
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* "Buy Plan" button ab seedha displayRazorpay ko call karega */}
                            <button
                                onClick={() => displayRazorpay(plan)}
                                className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-[#FFD700] transition mt-4"
                            >
                                Buy Plan
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal aur form ko poori tarah se hata diya gaya hai */}

            <Footer />
        </div>
    );
};

export default PricingPage;
