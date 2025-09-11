import Link from "next/link";
import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "Create a Budget",
      description:
        "Set up personalized budgets for different categories and track your spending limits with ease.",
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      id: 2,
      title: "Add Expenses",
      description:
        "Quickly log your daily expenses with our intuitive interface and categorize them automatically.",
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      id: 3,
      title: "Enjoy Analytics",
      description:
        "Get detailed insights and visual reports to track your spending patterns and financial health.",
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      bgColor: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-[#242424] transition-colors duration-300 font-accent mb-24  mt-28 md:mt-[-56px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12  font-mono">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4 transition-colors duration-300">
            Take Control of Your Finances
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            Everything you need to manage your money effectively in three simple
            steps
          </p>
        </div>
        <div className="border border-amber-600 w-[50vw] mx-auto mb-4 mt-[-10px]"></div>
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/25 hover:shadow-xl dark:hover:shadow-gray-900/40 transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              <div className="p-8">
                {/* Step Number */}
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-semibold mr-3 transition-colors duration-300">
                    {index + 1}
                  </span>
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor} ${feature.hoverColor} transition-colors duration-300`}
                  >
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Action Link */}
                <div className="mt-6">
                  <Link href="/login">
                    <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 group-hover:underline">
                      Get Started →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
