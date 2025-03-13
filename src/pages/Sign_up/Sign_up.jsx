/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import sign__up from "../../../public/animations/Login_animation.json";
import Google from "../../assets/home-img/google.png";
import Facebook from "../../assets/home-img/facebook.png";
import Apple from "../../assets/home-img/apple.png";

function Sign_up({ setIsLoggedIn }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // التحقق من أن جميع الحقول مملوءة
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // التحقق من صحة البريد الإلكتروني
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // التحقق من قوة كلمة المرور
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // إرسال طلب POST إلى الـ API
      const response = await fetch("https://questionprep.azurewebsites.net/api/Authenticate/Register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer`,
          },
          body: JSON.stringify({
            Name: name,
            email: email,
            password: password,
          }),
        }
      );

      const contentType = response.headers.get("content-type");
      const data = contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      // تسجيل حالة الاستجابة وبياناتها
      console.log("Response status:", response.status);
      console.log("Response data:", data);

      // التحقق من نجاح الطلب
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // إذا نجح التسجيل
      setSuccess("Registration successful! Redirecting to login...");
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error:", error); // تسجيل الخطأ في وحدة التحكم
      setError(error.message || "Registration failed. Please try again."); // تحديث حالة الخطأ
    } finally {
      setLoading(false); // إيقاف التحميل
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col-reverse py-16 gap-28 md:flex-row">
        <div className="w-full">
          <Lottie
            animationData={sign__up}
            className="md:w-[75%] m-auto flex flex-col"
          />
        </div>
        <div className="w-full">
          <div className="md:w-[70%] m-auto flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome to Q-Prep
            </h1>
            <p className="mb-6 text-primary">Register your account</p>

            {/* عرض رسائل الخطأ والنجاح */}
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

            {/* نموذج التسجيل */}
            <form onSubmit={handleSignUp} className="space-y-4">
              {/* حقل الاسم */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Hanin Burham"
                  className="w-full p-3 border rounded-lg border-secondary text-secondary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* حقل البريد الإلكتروني */}
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
                  placeholder="Haninburham@gmail.com"
                  className="w-full p-3 border rounded-lg border-secondary text-secondary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* حقل كلمة المرور */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Write strong password"
                  className="w-full p-3 border rounded-lg border-secondary text-secondary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* زر التسجيل */}
              <button
                type="submit"
                className="w-full py-2 text-white transition rounded-lg bg-secondary hover:bg-purple-700"
                disabled={loading} // تعطيل الزر أثناء التحميل
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </form>

            {/* تسجيل الدخول عبر وسائل التواصل الاجتماعي */}
            <p className="mt-6 text-center text-primary">Create account with</p>
            <div className="flex justify-center gap-10 mt-4">
              <img
                src={Google}
                alt="Google"
                className="w-6 h-6 cursor-pointer"
              />
              <img
                src={Facebook}
                alt="Facebook"
                className="w-6 h-6 cursor-pointer"
              />
              <img src={Apple} alt="Apple" className="w-6 h-6 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sign_up;