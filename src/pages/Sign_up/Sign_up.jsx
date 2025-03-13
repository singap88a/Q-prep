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
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // التحقق من أن جميع الحقول مملوءة
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

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
      // const data = await response.json();
      console.log("Response data:", data);

      // التحقق من نجاح الطلب
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // إذا نجح التسجيل
      setIsLoggedIn(true); 
      navigate("/login"); 
    } catch (error) {
      console.error("Error:", error); // تسجيل الخطأ في وحدة التحكم
      setError(error.message); // تحديث حالة الخطأ
      alert(error.message || "Registration failed. Please try again."); // عرض رسالة الخطأ
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