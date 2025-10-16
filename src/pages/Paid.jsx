import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import api from '../api';

const PaidTherapy = () => {
    const doctors = [
        {
            id: 1,
            name: "Dr. Ruchi Goyal",
            fee: "₹2000/session",
            qualifications: "Ph.D. Psychology",
            experience: "10+ Years",
            languages: "English, Hindi",
            expertise: ["Stress Management", "Depression", "Child Psychology"],
            rating: 5,
            slots: ["10:00 AM", "12:00 PM", "3:00 PM"],
            unavailableDates: [new Date(2025, 9, 5), new Date(2025, 9, 12)],

        },
        {
            id: 2,
            name: "Dr. Rahul Sharma",
            fee: "₹2500/session",
            qualifications: "Ph.D. Psychology",
            experience: "10+ Years",
            languages: "English, Hindi",
            expertise: ["Stress Management", "Depression", "Child Psychology"],
            rating: 4.5,
            slots: ["10:00 AM", "12:00 PM", "3:00 PM"],
            unavailableDates: [new Date(2025, 9, 5), new Date(2025, 9, 12)],
        },
    ];
    const [date, setDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: "",
        slot: "",
        doctor: "",
    });

    const handleCheckCalendar = (doctor) => {
        setSelectedDoctor(doctor);
        setShowCalendar(true);
        setSelectedSlot("");
    };
    const handleConfirm = () => {
        setFormData({
            ...formData,
            date: date.toDateString(),
            slot: selectedSlot,
            doctor: selectedDoctor.name,
        });
        setShowCalendar(false);
        setShowForm(true);
    };
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const isDateDisabled = (date, doctor) => {
        const day = date.getDay();
        const unavailable = doctor.unavailableDates.some(
            (d) => d.toDateString() === date.toDateString()
        );
        return day === 0 || unavailable;
    };

    // --- PAYMENT GATEWAY LOGIC (UPDATED & CORRECTED) ---
    const displayRazorpay = async (amountInRupees) => {
        // 1. Token ko sahi naam ('token') se localStorage se nikalo
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please log in to make a payment.");
            return;
        }

        try {
            // Amount ko paise mein convert karo
            const amountInPaise = amountInRupees * 100;
            
            // 2. 'create-order' API call karo. Header daalne ki zaroorat nahi,
            //    kyunki humara api.js waala interceptor yeh kaam apne aap kar dega.
            const { data: { id: order_id, currency } } = await api.post(
                '/api/payment/create-order',
                { amount: amountInPaise, receipt: `receipt_booking_${new Date().getTime()}` }
            );

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Key ko .env file se lein
                amount: amountInPaise,
                currency: currency,
                name: "Astro App Booking",
                description: `Booking for ${selectedDoctor.name}`,
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
                        setShowForm(false); // Close the form on successful payment
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
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


    const handleSubmit = (e) => {
        e.preventDefault();
        
        const amountString = selectedDoctor.fee.replace('₹', '').split('/')[0];
        const amount = parseInt(amountString);

        if (isNaN(amount)) {
            alert("Could not determine the fee.");
            return;
        }

        displayRazorpay(amount);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#6b2400] via-[#f76822] to-[#f76822] text-white">
            <Navbar />
            
            <section
                className="flex flex-col items-center justify-center mb-8 text-center py-[15vh] px-4
                           bg-gradient-to-br from-[#6b2400] via-orange-600/100 to-orange-500/70  "
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-3">
                    Paid Therapy
                </h1>
                <p className="text-white/90 text-lg md:text-xl max-w-2xl drop-shadow-md">
                    Book your therapy sessions with expert psychologists and begin your journey
                    toward a happier, balanced mind and life.
                </p>
            </section>
            {/* Doctor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 mt-4 lg:grid-cols-3 gap-6 px-4 pb-8">
                {doctors.map((doctor, index) => (
                    <div key={doctor.id} className="bg-gradient-to-br from-[#f76822] via-orange-550/100 to-orange-500/70 rounded-xl p-4 relative  border-white">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">{doctor.name}</h2>
                                <p className="mt-2 text-sm">{doctor.fee}</p>
                                <p className="text-sm mt-1">Qualifications: {doctor.qualifications}</p>
                                <p className="text-sm mt-1">Experience: {doctor.experience}</p>
                                <p className="text-sm mt-1">{doctor.languages}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {doctor.expertise.map((area, i) => (
                                        <span
                                            key={i}
                                            className="bg-white/30 text-white text-xs px-3 py-1 rounded-full"
                                        >
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="bg-white text-black rounded-full px-3 py-1 text-sm flex items-center gap-1 font-semibold">
                                    ⭐ {doctor.rating}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <button
                                onClick={() => handleCheckCalendar(doctor)}
                                className="bg-white text-black rounded-full px-4 py-1 text-sm font-semibold"
                            >
                                Calendar
                            </button>
                            <button
                                onClick={() => handleCheckCalendar(doctor)}
                                className="bg-[#0057ff] text-white rounded-full px-4 py-1 text-sm font-semibold"
                            >
                                Book Appointment
                            </button>
                        </div>

                        {index < doctors.length - 1 && (
                            <div className="border-t border-white mt-6"></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Calendar Modal */}
            {showCalendar && selectedDoctor && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#f76822] text-white rounded-2xl shadow-xl w-full max-w-md p-6">
                        <h2 className="text-xl font-bold mb-4">
                            Select Date & Slot - {selectedDoctor.name}
                        </h2>
                        <Calendar
                            onChange={setDate}
                            value={date}
                            tileDisabled={({ date }) => isDateDisabled(date, selectedDoctor)}
                            className="mb-4 text-black rounded-lg"
                        />
                        <div className="grid grid-cols-2 gap-3">
                            {selectedDoctor.slots.map((slot) => (
                                <button
                                    key={slot}
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`px-4 py-2 rounded-lg border ${selectedSlot === slot
                                            ? "bg-[#FFD700] text-black border-[#FFD700]"
                                            : "bg-orange-100/20 text-white border-orange-200"
                                        }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={() => setShowCalendar(false)}
                                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={!selectedSlot}
                                className="bg-[#FFD700] text-black px-4 py-2 rounded-lg disabled:opacity-50 hover:brightness-110"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Appointment Form */}
            {showForm && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#f76822] rounded-2xl shadow-xl w-full max-w-md p-6 text-white">
                        <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleFormChange}
                                required
                                className="w-full border rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleFormChange}
                                required
                                className="w-full border rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white"
                            />
                            <input
                                type="text"
                                name="doctor"
                                value={formData.doctor}
                                readOnly
                                className="w-full border rounded-lg px-3 py-2 bg-white/20 text-white"
                            />
                            <input
                                type="text"
                                name="date"
                                value={formData.date}
                                readOnly
                                className="w-full border rounded-lg px-3 py-2 bg-white/20 text-white"
                            />
                            <input
                                type="text"
                                name="slot"
                                value={formData.slot}
                                readOnly
                                className="w-full border rounded-lg px-3 py-2 bg-white/20 text-white"
                            />
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#FFD700] text-black px-4 py-2 rounded-lg hover:brightness-110"
                                >
                                    Proceed to Pay
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default PaidTherapy;

