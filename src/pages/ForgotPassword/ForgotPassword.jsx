import { useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Login_animation from "../../../public/animations/Login_animation.json";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState(1); // 1 for email, 2 for verification code
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('Email', email);

      const response = await fetch(
        "https://redasaad.azurewebsites.net/api/Authenticate/ForgetPassword",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send reset code");
      }

      const message = await response.text();
      setSuccess(message);
      setStep(2); // Move to verification code step
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Failed to send reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    
    if (!verificationCode) {
      setError("Please enter the verification code");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // TODO: Implement verification code check
      // This endpoint needs to be implemented on the backend
      const response = await fetch(
        "https://redasaad.azurewebsites.net/api/Authenticate/VerifyCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            code: verificationCode,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid verification code");
      }

      setSuccess("Code verified successfully! You can now reset your password.");
      // TODO: Redirect to password reset page or show password reset form
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Failed to verify code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col-reverse py-16 gap-28 md:flex-row">
        <div className="w-full">
          <Lottie
            animationData={Login_animation}
            className="md:w-[75%] m-auto flex flex-col"
          />
        </div>
        <div className="w-full">
          <div className="md:w-[70%] m-auto flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800">
              {step === 1 ? "Forgot Password" : "Enter Verification Code"}
            </h1>
            <p className="mb-6 text-primary">
              {step === 1
                ? "Enter your email to receive a verification code"
                : "Enter the code sent to your email"}
            </p>
            
            {error && (
              <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 mb-4 text-green-700 bg-green-100 border border-green-400 rounded-lg">
                {success}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border rounded-lg border-secondary text-secondary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 text-white transition rounded-lg bg-secondary hover:bg-purple-700"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Verification Code"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Verification Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    placeholder="Enter verification code"
                    className="w-full p-3 border rounded-lg border-secondary text-secondary"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 text-white transition rounded-lg bg-secondary hover:bg-purple-700"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify Code"}
                </button>
              </form>
            )}

            <div className="mt-6">
              <Link
                to="/login"
                className="flex justify-center mt-6 text-center text-primary hover:text-secondary"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword; 