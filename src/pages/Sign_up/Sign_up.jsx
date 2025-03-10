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
  const [error, setError] = useState(null); // حالة لإدارة الأخطاء
  const [success, setSuccess] = useState(null); // حالة لإدارة الرسائل الناجحة
  const [loading, setLoading] = useState(false); // حالة لإدارة التحميل
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // التحقق من أن جميع الحقول مملوءة
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true); // بدء التحميل
    setError(null); // إعادة تعيين حالة الخطأ
    setSuccess(null); // إعادة تعيين حالة النجاح

    try {
      // إرسال طلب POST إلى الـ API
      const response = await fetch(
        "https://questionprep.azurewebsites.net/api/Authenticate/Register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: name, // تم تغيير `username` إلى `Name`
            email: email, // البريد الإلكتروني
            password: password, // كلمة المرور
          }),
        }
      );

      // تسجيل حالة الاستجابة وبياناتها
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      // التحقق من نجاح الطلب
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // إذا نجح التسجيل
      setSuccess("Registration successful! Redirecting..."); // عرض رسالة نجاح
      setIsLoggedIn(true); // تحديث حالة تسجيل الدخول
      setTimeout(() => navigate("/"), 2000); // الانتقال إلى الصفحة الرئيسية بعد تأخير
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

            {/* عرض رسائل الخطأ أو النجاح */}
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