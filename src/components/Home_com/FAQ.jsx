import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Can I switch my track later?",
      answer:
        "Absolutely! You can change your track anytime from the settings menu, and we'll tailor the questions and resources to your new track.",
    },
    {
      question: "Is Q-Prep free to use?",
      answer:
        "Yes, Q-Prep offers free access to many of its features. However, premium features like mock interviews with the AI chatbot and advanced analytics are available with a subscription.",
    },
    {
      question: "How accurate are the interview questions?",
      answer:
        "Our questions are based on real-life interview experiences shared by users and updated regularly to ensure they remain relevant and accurate.",
    },
 
  ];

    const faqs_1 = [
 
    {
      question: "What should I do if I forget my password?",
      answer:
        'You can reset your password by clicking the "Forgot Password?" link on the login page. Follow the instructions sent to your email to create a new password.',
    },
    {
      question: "Can I contribute my own interview questions?",
      answer:
        'Yes! We encourage users to share their experiences and questions through the "Contribute" section to help the community grow.',
    },
    {
      question: "Does Q-Prep support all career tracks?",
      answer:
        "We cover a wide range of tracks, including technology, business, marketing, and more. If you don't find your track, let us know, and we'll consider adding it in the future.",
    },
  ];

  const toggleAnswer = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="py-10">
      <h1 className="container text-2xl font-bold">FAQ</h1>
      <div className="py-16 my-4 bg-bac_bg">
        <div className="container max-w-6xl p-6 mx-auto">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {/* Left Column - First set of FAQs */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}  
                  className="p-4 bg-white border rounded-lg shadow-md"
                >
                  <button
                    onClick={() => toggleAnswer(index)}
                    className="flex items-center justify-between w-full text-lg font-semibold text-left"
                  >
                    {faq.question}
                    {activeIndex === index ? (
                      <FaChevronUp className="text-secondary" />
                    ) : (
                      <FaChevronDown className="text-secondary" />
                    )}
                  </button>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-gray-600"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Right Column - Second set of FAQs */}
            <div className="space-y-4">
              {faqs_1.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}  
                  className="p-4 bg-white border rounded-lg shadow-md"
                >
                  <button
                    onClick={() => toggleAnswer(index + faqs.length)}
                    className="flex items-center justify-between w-full text-lg font-semibold text-left"
                  >
                    {faq.question}
                    {activeIndex === index + faqs.length ? (
                      <FaChevronUp className="text-secondary" />
                    ) : (
                      <FaChevronDown className="text-secondary" />
                    )}
                  </button>
                  <AnimatePresence>
                    {activeIndex === index + faqs.length && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-gray-600"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;