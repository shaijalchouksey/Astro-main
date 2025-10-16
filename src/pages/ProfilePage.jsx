import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("personal");
    const [profileImage, setProfileImage] = useState(
        "/mnt/data/a04a13ae-d68c-4178-a47a-d243e70f5e11.png"
    );
    const [name, setName] = useState("User");
    const [dob, setDob] = useState("");
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [timeOfBirth, setTimeOfBirth] = useState("");
    const [gender, setGender] = useState("male");
    const [email, setEmail] = useState("user@example.com");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const showPopupMsg = (msg) => {
        setPopupMessage(msg);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
    };

    const handleLogout = () => {
        showPopupMsg("👋 Logged out successfully!");
    };

    const handleSubmitPersonal = (e) => {
        e.preventDefault();
        console.log({ name, mobile, dob, placeOfBirth, timeOfBirth, gender, profileImage });
        showPopupMsg("Personal Info submitted!");
    };

    const handleSubmitSettings = (e) => {
        e.preventDefault();
        console.log({ email, password });
        showPopupMsg("Settings updated!");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
        setMobile(value);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#6b2400] via-[#f76822] to-[#f76822] text-white flex flex-col">
            <Navbar />
            {showPopup && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in-out">
                    {popupMessage}
                </div>
            )}

            <div className="flex flex-col items-center mt-4 flex-1 px-4 pt-24 pb-8">
                <div className="bg-white text-black rounded-3xl w-full max-w-3xl shadow-xl p-6 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 transform transition-all hover:scale-105 hover:shadow-2xl">
                    <div className="flex flex-col items-center md:items-center md:w-1/3">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500 shadow-lg">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <label className="mt-3 text-sm text-orange-500 cursor-pointer hover:underline">
                            Change Profile Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex items-center mt-10 justify-center gap-2 bg-white text-black px-6 py-2 rounded-xl font-medium shadow-md hover:shadow-lg hover:bg-gray-100 transition"
                        >
                            Logout
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="flex border-b border-gray-300 mb-6">
                            <button
                                className={`pb-2 font-semibold w-1/2 text-center ${activeTab === "personal"
                                    ? "text-black border-b-4 border-orange-500"
                                    : "text-gray-400 hover:text-black"
                                    }`}
                                onClick={() => setActiveTab("personal")}
                            >
                                Personal Info
                            </button>
                            <button
                                className={`pb-2 font-semibold w-1/2 text-center ${activeTab === "settings"
                                    ? "text-black border-b-4 border-orange-500"
                                    : "text-gray-400 hover:text-black"
                                    }`}
                                onClick={() => setActiveTab("settings")}
                            >
                                Settings
                            </button>
                        </div>
                        {activeTab === "personal" && (
                            <form className="space-y-4" onSubmit={handleSubmitPersonal}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-500 text-sm mb-1">Name*</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-4 py-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-500 text-sm mb-1">Mobile*</label>
                                        <input
                                            type="text"
                                            value={mobile}
                                            onChange={handleMobileChange}
                                            placeholder="Enter mobile number"
                                            className="w-full px-4 py-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-500 text-sm mb-1">Date Of Birth*</label>
                                        <input
                                            type="date"
                                            value={dob}
                                            onChange={(e) => setDob(e.target.value)}
                                            className="w-full px-4 py-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-500 text-sm mb-1">Time Of Birth*</label>
                                        <input
                                            type="time"
                                            value={timeOfBirth}
                                            onChange={(e) => setTimeOfBirth(e.target.value)}
                                            className="w-full px-4 py-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-500 text-sm mb-1">Place Of Birth*</label>
                                    <input
                                        type="text"
                                        value={placeOfBirth}
                                        onChange={(e) => setPlaceOfBirth(e.target.value)}
                                        className="w-full px-4 py-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>

                                <div className="flex items-center gap-6 mt-2">
                                    <span className="text-gray-500 font-semibold">Gender:</span>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            checked={gender === "male"}
                                            onChange={() => setGender("male")}
                                            className="accent-orange-500"
                                        />
                                        Male
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={gender === "female"}
                                            onChange={() => setGender("female")}
                                            className="accent-orange-500"
                                        />
                                        Female
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors mt-4"
                                >
                                    Submit
                                </button>
                            </form>
                        )}
                        {activeTab === "settings" && (
                            <form className="space-y-4" onSubmit={handleSubmitSettings}>
                                <div>
                                    <label className="block text-gray-500 text-sm mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-500 text-sm mb-1">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors mt-4"
                                >
                                    Update Settings
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;
