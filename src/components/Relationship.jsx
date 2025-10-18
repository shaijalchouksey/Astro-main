import React, { useState } from "react";

const cardStyle =
  "bg-gradient-to-br from-[#f76822] via-orange-600/100 to-orange-500/70 " +
  "backdrop-blur-md border border-orange-400/20 text-white shadow-lg " +
  "rounded-2xl p-6 transition-transform transition-shadow duration-300 ease-in-out";

const CompatibilitySection = () => {
  const [maleData, setMaleData] = useState({
    name: "",
    timeOfBirth: "",
    placeOfBirth: "",
    dateOfBirth: "",
  });

  const [femaleData, setFemaleData] = useState({
    name: "",
    timeOfBirth: "",
    placeOfBirth: "",
    dateOfBirth: "",
  });

  const handleChange = (e, gender) => {
    const { name, value } = e.target;
    if (gender === "male") {
      setMaleData({ ...maleData, [name]: value });
    } else {
      setFemaleData({ ...femaleData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Male Data:", maleData);
    console.log("Female Data:", femaleData);
    alert("Compatibility Analysis Requested!");
  };
  const buttonStyle =
    "px-3 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition-all"; 

  return (
    
    <section className="py-20 px-6 md:px-16 mt-[-3vh]">
      <div className={cardStyle}>
        <h2 className="text-4xl font-fancy font-bold mb-4 text-orange-300 drop-shadow-md">
          Relationship Compatibility
        </h2>
        <p className="text-gray-200 mb-6">
          Discover your relationship harmony based on birth details. Enter both
          male and female information to calculate your compatibility using
          ancient Vedic Astrology principles.
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-10 text-gray-800"
        >
          {/* Male Section */}
          <div className="bg-white/10 rounded-xl p-6 border border-orange-400/30 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4">
              Male Details
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={maleData.name}
                onChange={(e) => handleChange(e, "male")}
                placeholder="Name / Pseudo Name"
                className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-orange-300 outline-none"
              />
              <input
                type="time"
                name="timeOfBirth"
                value={maleData.timeOfBirth}
                onChange={(e) => handleChange(e, "male")}
                placeholder="Time Of Birth"
                className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-orange-300 outline-none"
              />
              <input
                type="text"
                name="placeOfBirth"
                value={maleData.placeOfBirth}
                onChange={(e) => handleChange(e, "male")}
                placeholder="Place Of Birth"
                className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-orange-300 outline-none"
              />
              <input
                type="date"
                name="dateOfBirth"
                value={maleData.dateOfBirth}
                onChange={(e) => handleChange(e, "male")}
                className="w-full p-3 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-orange-300 outline-none"
              />
            </div>
          </div>

          {/* Female Section */}
          <div className="bg-white/10 rounded-xl p-6 border border-orange-400/30 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4">
              Female Details
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={femaleData.name}
                onChange={(e) => handleChange(e, "female")}
                placeholder="Name / Pseudo Name"
                className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-orange-300 outline-none"
              />
              <input
                type="time"
                name="timeOfBirth"
                value={femaleData.timeOfBirth}
                onChange={(e) => handleChange(e, "female")}
                placeholder="Time Of Birth"
                className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-orange-300 outline-none"
              />
              <input
                type="text"
                name="placeOfBirth"
                value={femaleData.placeOfBirth}
                onChange={(e) => handleChange(e, "female")}
                placeholder="Place Of Birth"
                className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-orange-300 outline-none"
              />
              <input
                type="date"
                name="dateOfBirth"
                value={femaleData.dateOfBirth}
                onChange={(e) => handleChange(e, "female")}
                className="w-full p-3 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-orange-300 outline-none"
              />
            </div>
          </div>
        </form>

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            onClick={handleSubmit}
            className={`${buttonStyle} bg-[#000000] mt-6 lg:mr-[160vh] inline-block`}
          >
            Check Compatibility →
          </button>
        </div>
      </div>
    </section>
  );
};

export default CompatibilitySection;
