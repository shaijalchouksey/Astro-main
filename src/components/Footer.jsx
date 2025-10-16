import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const pages = [
    { name: "Home", path: "/" },
    { name: "Paid Therapy", path: "/paid" },
    { name: "Free counselling  ", path: "/counselling" },
    { name: "future prediction", path: "/Question" },
    { name: "Psychological assessments", path: "/assignment" },
    { name: "Pricing ", path: "/pricing" },
  ];

  const extraLinks = [
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Privacy", path: "/privacy" },
    { name: "Feedback & Support", path: "/feedback" },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, url: "https://facebook.com" },
    { icon: <Twitter size={20} />, url: "https://twitter.com" },
    { icon: <Instagram size={20} />, url: "https://instagram.com" },
    { icon: <Linkedin size={20} />, url: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#6b2400] via-[#f76822] to-[#f76822] text-white mt-8 shadow-card">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div className="flex flex-col items-start">
          <Link to="/" className="flex items-center gap-4 mb-4">
            <img
              src="/Astro.png"
              alt="Steer-U Logo"
              className="w-24 h-24 md:w-24 md:h-24 object-contain opacity-100 brightness-200"
            />

            <span className="text-[#FFD700] text-5xl font-lg font-bold italic">Steer-U</span>
          </Link>
          <p className="text-gray-300 text-sm md:text-base">
            Get your personalized guidance and professional therapy support in one platform.
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="font-semibold mb-3">Pages</h3>
          <ul className="space-y-2">
            {pages.map((page) => (
              <li key={page.name}>
                <Link
                  to={page.path}
                  className="hover:text-accent transition-colors duration-300"
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>


        <div className="flex flex-col">
          <h3 className="font-semibold mb-3">Support & Social</h3>
          <ul className="space-y-2 mb-4">
            {extraLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="hover:text-accent transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex space-x-4 mt-2">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>


      <div className="flex justify-between border-t border-gray-700 mt-4 mb-4 pt-4 text-gray-400 text-sm">
        <span className="ml-4">&copy; {new Date().getFullYear()} Steer-U. All rights reserved.</span>
        <span>
          Contact: <a href="mailto:admin@steer-u.com" className="hover:text-accent mr-4">admin@steer-u.com</a>
        </span>
      </div>

    </footer>
  );
};

export default Footer;
