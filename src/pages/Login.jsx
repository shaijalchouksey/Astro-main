import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react"; // 1. useContext import karein
import { useNavigate } from "react-router-dom";
import api from '../api';
import { AuthContext } from '../context/AuthContext'; // 2. AuthContext ko import karein

const Login = () => {
  const [isLoginModal, setIsLoginModal] = useState(true);
  const [isOtpModal, setIsOtpModal] = useState(false);
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // 3. AuthContext se login function lein
  const { login } = useContext(AuthContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    setLoading(true);
    try {
  const response = await api.post('/api/auth/send-otp', { phone });
      
      console.log(response.data.message);
      // Using console log instead of alert for better UX in development
      console.log("A dummy OTP has been generated in the backend console.");
      
      setIsLoginModal(false);
      setIsOtpModal(true);
    } catch (error) {
      console.error("Error sending OTP request:", error);
      alert("Failed to request OTP. Is your backend server running?");
    } finally {
        setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
        alert("Please enter a 6-digit OTP.");
        return;
    }
    setLoading(true);
    try {
  const { data } = await api.post('/api/auth/verify-otp', { phone, otp });

      console.log("Login successful! Token:", data.token);
      
      // 4. (MAIN CHANGE) Context ke function se token ko global state mein set karein
      // Yeh localStorage mein bhi save karega aur app state ko update karega.
      login(data.token);

      // We can remove the alert for a smoother user experience
      // alert("Login Successful!");
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  const handleClose = () => {
    setIsLoginModal(false);
    navigate("/"); 
  };
  
  const handleOtpClose = () => {
    setIsOtpModal(false);
    navigate("/"); 
  };

  return (
    <AnimatePresence>
      {/* LOGIN MODAL */}
      {isLoginModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-b from-[#6b2400] via-[#f76822] to-[#f76822]"
        >
          <motion.div
            className="relative bg-gradient-to-b from-[#6b2400] via-[#f76822] to-[#f76822] rounded-2xl max-w-md w-full p-6 text-center shadow-card text-neutral"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-neutral hover:text-accent transition-colors"
            >
              <span style={{ fontSize: '22px', fontWeight: 'bold' }}>X</span>
            </button>
            <h2 className="text-2xl font-bold mb-2 text-accent">Welcome Back!</h2>
            <p className="text-sm mb-6 text-neutral/90">
              Log in to steer your life and access personalized insights
            </p>
            <div className="space-y-3 mb-4">
              <button className="w-full bg-neutral text-dark py-2 rounded-full font-semibold shadow-card hover:bg-primary-light transition-colors">
                Google
              </button>
              <button className="w-full bg-dark text-neutral py-2 rounded-full font-semibold shadow-card hover:brightness-110 transition">
                Apple
              </button>
            </div>

            <p className="text-xs text-neutral/80 mb-3">Or login with mobile</p>
            <div className="flex items-center bg-neutral text-dark rounded-full px-3 py-2 mb-3">
              <select className="bg-transparent outline-none pr-2 text-dark">
                <option>+91</option>
              </select>
              <input
                type="tel"
                placeholder="Enter Mobile number"
                className="flex-1 bg-transparent outline-none text-sm text-dark"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="w-full bg-accent text-dark py-2 rounded-full font-semibold hover:brightness-110 transition"
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
              <button
                className="w-full border border-accent py-2 rounded-full font-semibold hover:bg-accent/20 transition"
                onClick={() => navigate("/signin")}
              >
                Sign Up
              </button>
              <button
                className="w-full text-neutral underline font-semibold hover:text-accent transition"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>

            <p className="text-xs mt-3 text-neutral/80">
              By logging in, you agree to our{" "}
              <span className="underline cursor-pointer">Terms of Use</span> and{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* OTP MODAL */}
      {isOtpModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-b from-black to-primary"
        >
          <motion.div
              className="relative bg-gradient-to-b from-black to-primary rounded-2xl max-w-md w-full p-6 text-center shadow-card text-neutral"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <button
              onClick={handleOtpClose}
              className="absolute top-3 right-3 text-neutral hover:text-accent transition-colors"
            >
              <span style={{ fontSize: '22px', fontWeight: 'bold' }}>X</span>
            </button>
            <h3 className="uppercase text-sm font-semibold mb-2 text-accent">
              PLANETS & OUR THOUGHTS IMPACT OUR LIFE
            </h3>
            <p className="font-bold mb-6 text-neutral">
              Know your DESTINY and change it with your EFFORTS{" "}
              <span className="text-accent">(KARMA)</span>
            </p>
            <div className="bg-primary-dark rounded-2xl p-5 space-y-4 text-neutral">
              <h2 className="font-bold text-lg text-accent">OTP Verification</h2>
              <p className="text-sm">A 6 digit code has been sent to your number</p>
              <div className="flex justify-center gap-3">
                  <input
                    type="tel"
                    maxLength={6}
                    placeholder="______"
                    className="w-48 h-12 text-center text-2xl tracking-[0.5em] rounded-lg border border-neutral bg-neutral text-dark"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
              </div>
              <button
                className="w-full bg-accent text-dark py-2 rounded-full font-semibold mt-3 hover:brightness-110 transition"
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <p className="text-sm mt-2">
                If you didn't receive a code!{" "}
                <span className="text-accent cursor-pointer">Resend</span>
              </p>
              <button className="w-full border border-accent py-2 rounded-full font-semibold mt-4 flex items-center justify-center gap-2 hover:bg-accent/20 transition"
                onClick={() => {
                    setIsOtpModal(false);
                    setIsLoginModal(true);
                  }}
              >
                <span></span> Change Mobile Number
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Login;

