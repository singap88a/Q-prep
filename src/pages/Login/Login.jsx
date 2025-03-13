/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Login_animation from "../../../public/animations/Login_animation.json";
import Google from "../../assets/home-img/google.png";
import Facebook from "../../assets/home-img/facebook.png";
import Apple from "../../assets/home-img/apple.png";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // حالة لإدارة الأخطاء
  const [success, setSuccess] = useState(null); // حالة لإدارة الرسائل الناجحة
  const [loading, setLoading] = useState(false); // حالة لإدارة التحميل
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // التحقق من أن جميع الحقول مملوءة
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // التحقق من صحة البريد الإلكتروني
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true); // بدء التحميل
    setError(null); // إعادة تعيين حالة الخطأ
    setSuccess(null); // إعادة تعيين حالة النجاح

    try {
      const response = await fetch(
        "https://questionprep.azurewebsites.net/api/Authenticate/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();
      console.log("Response data:", data);

      // التحقق من نجاح الطلب
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // حفظ التوكن في localStorage
      localStorage.setItem("token", data.token);

      // عرض رسالة نجاح
      setSuccess("Login successful! Redirecting to home...");
      setIsLoggedIn(true);

      // الانتقال إلى الصفحة الرئيسية بعد تأخير بسيط
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false); // إيقاف التحميل
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
              Welcome back to Q-Prep
            </h1>
            <p className="mb-6 text-primary">Login now!</p>

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

            {/* نموذج تسجيل الدخول */}
            <form onSubmit={handleLogin} className="space-y-4">
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
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                  className="w-full p-3 border rounded-lg border-secondary text-secondary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* زر تسجيل الدخول */}
              <button
                type="submit"
                className="w-full py-2 text-white transition rounded-lg bg-secondary hover:bg-purple-700"
                disabled={loading} // تعطيل الزر أثناء التحميل
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* تسجيل الدخول عبر وسائل التواصل الاجتماعي */}
            <p className="mt-6 text-center text-primary">Login with</p>
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

export default Login;