/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef, useCallback } from 'react';
import iconlogo from "../../../public/iconlogo.svg";

const GeminiSingap = () => {
  // استخدام useRef لحفظ المؤقتات والبيانات
  const typingIntervalsRef = useRef({});
  const currentUserRef = useRef(null);
  
  // الحالات (States)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('themeColor');
    return savedTheme ? savedTheme === 'dark_mode' : true;
  });
  
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chats, setChats] = useState([]);
  const [showHeader, setShowHeader] = useState(true);
  const [profileImage, setProfileImage] = useState();
  const [isTypingStopped, setIsTypingStopped] = useState(false);

  const chatContainerRef = useRef(null);
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyDTh5gjk2xhH9XyNYw47lrz5-RG2mKdwyw";
  
  // Add API key validation
  useEffect(() => {
    if (!API_KEY) {
      console.error('Gemini API key is missing. Please check your .env file and ensure VITE_GEMINI_API_KEY is set.');
    }
  }, [API_KEY]);

  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  // بيانات الاقتراحات
  const suggestions = [
    {
      text: "What are the best tips to improve my public speaking skills?",
      icon: "lightbulb"
    },
    {
      text: "Can you help me find the latest news on web development?",
      icon: "explore"
    },
    {
      text: "Write JavaScript code to sum all elements in an array.",
      icon: "code"
    }
  ];

  // جلب بيانات المستخدم وتحميل المحادثات
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch("https://redasaad.azurewebsites.net/api/Account/GetUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.urlPhoto) {
            setProfileImage(
              `https://prep.blob.core.windows.net/photosprep/${data.urlPhoto}`
            );
          }
          if (data.email) {
            currentUserRef.current = data.email;
            loadUserChats(data.email);
          }
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);

  // تحميل محادثات المستخدم
  const loadUserChats = (email) => {
    const allChats = JSON.parse(localStorage.getItem('all-chats') || '{}');
    const userChats = allChats[email] || [];
    setChats(userChats);
    setShowHeader(userChats.length === 0);
  };

  // حفظ محادثات المستخدم
  const saveUserChats = (email, chats) => {
    const allChats = JSON.parse(localStorage.getItem('all-chats') || '{}');
    allChats[email] = chats;
    localStorage.setItem('all-chats', JSON.stringify(allChats));
  };

  // تبديل الوضع المظلم/الفاتح
  const toggleTheme = useCallback(() => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('themeColor', newMode ? 'dark_mode' : 'light_mode');
  }, [darkMode]);

  // حذف جميع المحادثات
  const deleteChats = useCallback(() => {
    if (window.confirm("Are you sure you want to delete all chats?")) {
      setChats([]);
      if (currentUserRef.current) {
        saveUserChats(currentUserRef.current, []);
      }
      setShowHeader(true);
      
      // تنظيف أي مؤقتات نشطة
      Object.values(typingIntervalsRef.current).forEach(interval => clearInterval(interval));
      typingIntervalsRef.current = {};
    }
  }, []);

  // إيقاف الكتابة
  const stopTyping = useCallback(() => {
    setIsTypingStopped(true);
    Object.values(typingIntervalsRef.current).forEach(interval => clearInterval(interval));
    typingIntervalsRef.current = {};
    setIsGenerating(false);
  }, []);

  // نسخ الرسالة إلى الحافظة
  const copyMessage = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // يمكنك إضافة إشعار هنا
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  // معالجة إرسال الرسالة
  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    if (!inputValue.trim() || isGenerating) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsTypingStopped(false);
    
    // إضافة رسالة المستخدم إلى المحادثة
    const newChats = [...chats, { role: 'user', content: userMessage }];
    setChats(newChats);
    if (currentUserRef.current) {
      saveUserChats(currentUserRef.current, newChats);
    }
    setShowHeader(false);
    setIsGenerating(true);

    // إضافة عنصر نائب لرد الذكاء الاصطناعي
    setTimeout(() => {
      const updatedChats = [...newChats, { role: 'ai', content: '', loading: true }];
      setChats(updatedChats);
      if (currentUserRef.current) {
        saveUserChats(currentUserRef.current, updatedChats);
      }
      generateAIResponse(userMessage);
    }, 300);
  }, [inputValue, isGenerating, chats]);

  // توليد رد الذكاء الاصطناعي
  const generateAIResponse = useCallback(async (userMessage) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contents: [{ 
            role: 'user', 
            parts: [{ text: userMessage }] 
          }],
          generationConfig: {
            temperature: 0.9,
            topP: 1,
            topK: 40,
            maxOutputTokens: 2048
          }
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Unknown error occurred');
      }

      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                        'No response received from the server';

      // محاكاة تأثير الكتابة
      simulateTypingEffect(aiResponse);
    } catch (error) {
      console.error('API Error:', error);
      updateLastAIMessage({
        content: `Error: ${error.message}`,
        loading: false,
        error: true
      });
      setIsGenerating(false);
    }
  }, []);

  // تحديث آخر رسالة للذكاء الاصطناعي
  const updateLastAIMessage = useCallback((updates) => {
    setChats(prevChats => {
      const updated = [...prevChats];
      const lastAiIndex = updated.findLastIndex(msg => msg.role === 'ai');
      if (lastAiIndex !== -1) {
        updated[lastAiIndex] = { ...updated[lastAiIndex], ...updates };
      }
      if (currentUserRef.current) {
        saveUserChats(currentUserRef.current, updated);
      }
      return updated;
    });
  }, []);

  // محاكاة تأثير الكتابة لرد الذكاء الاصطناعي
  const simulateTypingEffect = useCallback((text) => {
    let index = 0;
    const intervalId = Symbol();
    
    // تحديث حالة التحميل أولاً
    updateLastAIMessage({ loading: false });

    typingIntervalsRef.current[intervalId] = setInterval(() => {
      if (isTypingStopped) {
        clearInterval(typingIntervalsRef.current[intervalId]);
        delete typingIntervalsRef.current[intervalId];
        updateLastAIMessage({ loading: false });
        setIsGenerating(false);
        return;
      }

      setChats(prevChats => {
        if (index >= text.length) {
          clearInterval(typingIntervalsRef.current[intervalId]);
          delete typingIntervalsRef.current[intervalId];
          setIsGenerating(false);
          const finalChats = [...prevChats];
          if (currentUserRef.current) {
            saveUserChats(currentUserRef.current, finalChats);
          }
          return finalChats;
        }
        
        const updated = [...prevChats];
        const lastAiIndex = updated.findLastIndex(msg => msg.role === 'ai');
        if (lastAiIndex !== -1) {
          const typedText = text.substring(0, index + 1);
          updated[lastAiIndex] = {
            ...updated[lastAiIndex],
            content: typedText
          };
          index++;
        }
        return updated;
      });
    }, 30);
  }, [isTypingStopped]);

  // استخدام الاقتراح
  const useSuggestion = useCallback((text) => {
    setInputValue(text);
  }, []);

  // التمرير إلى أسفل الدردشة عند إضافة رسائل جديدة
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  // تنظيف المؤقتات عند تفريغ المكون
  useEffect(() => {
    return () => {
      Object.values(typingIntervalsRef.current).forEach(interval => clearInterval(interval));
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      {showHeader && (
        <header className={`mx-auto max-w-4xl w-full px-4 pt-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <h1 className="text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
            Hello, there
          </h1>
          <p className={`text-4xl mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            How can I help you today?
          </p>

          {/* Suggestions */}
          <ul className="flex gap-5 pb-4 mt-16 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => useSuggestion(suggestion.text)}
                className={`p-5 w-56 flex-shrink-0 flex flex-col items-end rounded-xl cursor-pointer transition-colors ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <h4 className={`w-full text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {suggestion.text}
                </h4>
                <span
                  className={`material-symbols-rounded mt-6 text-xl ${
                    darkMode ? 'text-gray-100 bg-gray-900' : 'text-gray-900 bg-white'
                  } rounded-full w-10 h-10 flex items-center justify-center`}
                >
                  {suggestion.icon}
                </span>
              </li>
            ))}
          </ul>
        </header>
      )}

      {/* Chat container */}
      <div
        ref={chatContainerRef}
        className={`flex-1 overflow-y-auto px-4 py-8 mx-auto max-w-4xl w-full ${
          darkMode ? 'scrollbar-color-gray-700' : 'scrollbar-color-gray-300'
        }`}
      >
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`mb-6 ${chat.role === 'user' ? 'ml-auto max-w-3xl' : 'mr-auto max-w-3xl'} ${
              chat.role === 'ai' && index === chats.length - 1 && isGenerating ? 'opacity-80' : ''
            }`}
          >
            <div className="flex items-start gap-6">
              {chat.role === 'ai' ? (
                <img
                  src={iconlogo}
                  alt="Gemini avatar"
                  className={`w-10 h-10 object-cover rounded-full ${chat.loading ? 'animate-spin' : ''}`}
                />
              ) : (
                <img
                  src={profileImage}
                  alt="User avatar"
                  className="object-cover w-10 h-10 rounded-full"
                />
              )}

              {chat.loading ? (
                <div className="flex-1">
                  <div className="flex flex-col w-full gap-3">
                    <div className="h-3 w-full rounded bg-gradient-to-r from-blue-500 via-gray-700 to-blue-500 animate-pulse bg-[length:800px_100px]"></div>
                    <div className="h-3 w-3/4 rounded bg-gradient-to-r from-blue-500 via-gray-700 to-blue-500 animate-pulse bg-[length:800px_100px]"></div>
                    <div className="h-3 w-1/2 rounded bg-gradient-to-r from-blue-500 via-gray-700 to-blue-500 animate-pulse bg-[length:800px_100px]"></div>
                  </div>
                </div>
              ) : (
                <div className="flex-1">
                  <p
                    className={`whitespace-pre-wrap ${darkMode ? 'text-gray-100' : 'text-gray-900'} ${
                      chat.error ? 'text-red-400' : ''
                    }`}
                  >
                    {chat.content}
                  </p>
                </div>
              )}

              {chat.role === 'ai' && !chat.loading && !chat.error && (
                <button
                  onClick={() => copyMessage(chat.content)}
                  className={`material-symbols-rounded rounded-full w-9 h-9 flex items-center justify-center text-primary ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
                >
                  content_copy
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className={`sticky bottom-0 w-full px-4 py-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <form onSubmit={handleSendMessage} className="flex max-w-4xl gap-3 mx-auto">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a prompt here"
              className={`w-full h-14 rounded-full px-6 pr-16 outline-none ${
                darkMode ? 'bg-gray-800 text-white placeholder-gray-500 focus:bg-gray-700' : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-gray-200'
              }`}
              required
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isGenerating}
              className={`material-symbols-rounded absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full ${
                inputValue.trim() ? 'text-blue-500' : darkMode ? 'text-gray-600' : 'text-gray-400'
              }`}
            >
              send
            </button>
          </div>

          <div className="flex gap-2">
            {isGenerating && (
              <button
                type="button"
                onClick={stopTyping}
                className={`material-symbols-rounded h-14 w-14 flex-shrink-0 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700 text-red-500' : 'bg-gray-100 hover:bg-gray-200 text-red-600'
                }`}
                title="Stop generating"
              >
                stop
              </button>
            )}
            <button
              type="button"
              onClick={toggleTheme}
              className={`material-symbols-rounded h-14 w-14 flex-shrink-0 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
            >
              {darkMode ? 'light_mode' : 'dark_mode'}
            </button>
            <button
              type="button"
              onClick={deleteChats}
              className={`material-symbols-rounded h-14 w-14 flex-shrink-0 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
            >
              delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeminiSingap;