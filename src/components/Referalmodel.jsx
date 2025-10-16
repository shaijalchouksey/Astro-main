import React from "react";
import { X } from "lucide-react";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, LinkedinIcon } from "react-share";

const friends = [
  { id: 1, name: "Tongkun Lee", platform: "Facebook", status: "Invite", img: "https://i.pravatar.cc/100?img=1" },
  { id: 2, name: "Rehmem Khihal", platform: "Flickr", status: "Invite", img: "https://i.pravatar.cc/100?img=2" },
  { id: 3, name: "Fazur Nalim", platform: "Unsplash", status: "Accepted", img: "https://i.pravatar.cc/100?img=3" },
  { id: 4, name: "Boa Palegleam", platform: "Google", status: "Accepted", img: "https://i.pravatar.cc/100?img=4" },
  { id: 5, name: "Gurkir Glorymore", platform: "LinkedIn", status: "Invite", img: "https://i.pravatar.cc/100?img=5" },
];

const ReferralModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const referralLink = "https://yourapp.com/referral?code=mir20220320";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-center text-orange-600">Give Referal & Earn Free Questions!</h2>
        <p className="mt-2 text-center text-gray-700 text-sm">
          Invite friends and earn rewards when they join your platform.
        </p>

        {/* Referral Code */}
        <div className="flex flex-col sm:flex-row items-center lg:ml-12 justify-center gap-2 mt-5 w-full">
          <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-semibold w-full sm:w-auto text-center">
            mir20220320
          </div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition font-medium w-full sm:w-auto">
            Copy
          </button>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition font-medium w-full sm:w-auto">
            Share
          </button>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <FacebookShareButton url={referralLink}>
            <FacebookIcon size={36} round />
          </FacebookShareButton>
          <TwitterShareButton url={referralLink}>
            <TwitterIcon size={36} round />
          </TwitterShareButton>
          <WhatsappShareButton url={referralLink}>
            <WhatsappIcon size={36} round />
          </WhatsappShareButton>
          <LinkedinShareButton url={referralLink}>
            <LinkedinIcon size={36} round />
          </LinkedinShareButton>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-3">Invite Friends</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {friends.map((friend) => (
              <div key={friend.id} className="flex items-center justify-between bg-orange-50 rounded-lg p-3 hover:bg-orange-100 transition">
                <div className="flex items-center gap-3">
                  <img src={friend.img} alt={friend.name} className="w-10 h-10 rounded-full border border-orange-200" />
                  <div>
                    <p className="font-medium text-orange-800">{friend.name}</p>
                    <p className="text-sm text-orange-500">{friend.platform}</p>
                  </div>
                </div>
                {friend.status === "Invite" ? (
                  <button className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-orange-300 transition">
                    Invite
                  </button>
                ) : (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Accepted
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:opacity-90 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReferralModal;
