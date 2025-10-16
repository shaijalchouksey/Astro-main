import React, { useState } from "react";
import { FiGift } from "react-icons/fi"; // Gift icon for referral
import ReferralModal from "./Referalmodel"; 

const ReferralButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-lg text-center border border-[#f76822]">
        <h2 className="text-2xl font-bold text-orange-700 mb-2">
          Invite Your Friends
        </h2>
        <p className="text-orange-800 mb-4">
          Share your referral link and earn exciting rewards when your friends join!
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition transform hover:scale-105 animate-pulse mx-auto shadow-lg"
        >
          <FiGift className="text-xl" />
          <span>Refer & Earn</span>
        </button>
        {hovered && (
          <span className="mt-2 text-sm text-orange-700 block">
            Invite friends & get rewards!
          </span>
        )}
      </div>
      <ReferralModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ReferralButton;
