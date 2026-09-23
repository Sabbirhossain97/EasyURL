import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is a URL shortener?",
            answer:
                "A URL shortener converts long and complicated URLs into shorter, easier-to-share links. Your shortened links can also be managed and tracked from your dashboard."
        },
        {
            question: "Can I customize my shortened URLs?",
            answer:
                "Yes. You can create a custom name for your shortened URL instead of using a randomly generated short link. This makes your links easier to recognize and share."
        },
        {
            question: "Can I track my shortened URLs?",
            answer:
                "Yes. You can view analytics for your shortened URLs, including the number of clicks and other available performance information."
        },
        {
            question: "Can I organize my URLs using tags?",
            answer:
                "Yes. You can add tags to your shortened URLs to organize and categorize them. Tags make it easier to manage a large collection of links."
        },
        {
            question: "How can I find a specific shortened URL?",
            answer:
                "You can search your URLs using the short URL, custom name, or tags. This makes it easier to find the link you need without manually going through your entire URL list."
        },
        {
            question: "Can I manage my shortened URLs?",
            answer:
                "Yes. From your dashboard, you can manage your shortened URLs, view their details, update supported information, and monitor their performance."
        },
        {
            question: "Are my shortened links secure?",
            answer:
                "We take link security seriously and provide features designed to help you manage and protect your shortened URLs from misuse."
        },
        {
            question: "Do I need an account to use the URL management features?",
            answer:
                "An account is required to access your personal URL dashboard, manage your links, organize them with tags, and view your analytics."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="mt-24">
            <div className="w-full mx-auto">
                <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-3">
                    Frequently Asked Questions
                </h2>

                <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-10">
                    Everything you need to know about shortening, managing, and
                    tracking your URLs.
                </p>

                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="bg-white dark:bg-white/10 rounded-lg overflow-hidden transition-all duration-300"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                                >
                                    <span className="text-[15px] font-semibold text-gray-900 dark:text-white">
                                        {faq.question}
                                    </span>

                                    <FaChevronDown
                                        className={`shrink-0 text-sky-400 text-sm transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                <div
                                    className={`grid transition-all duration-300 ${isOpen
                                            ? "grid-rows-[1fr]"
                                            : "grid-rows-[0fr]"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="px-5 pb-5 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FAQ;