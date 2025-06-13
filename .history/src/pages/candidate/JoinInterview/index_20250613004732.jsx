import { useState } from "react";
import './style.css'


export const JoinInterviews = () => {
  const [interviewCode, setInterviewCode] = useState("");

  const handleJoinInterview = () => {
    if (interviewCode.length === 6) {
      // Handle join interview logic
      console.log("Joining interview with code:", interviewCode);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5e03d3] to-white flex justify-center items-start px-5 py-10 font-sans">
      <div className="bg-white rounded-2xl p-12 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-[#5e03d3] text-center mb-4">
          Join Your AI Interview
        </h1>
        <p className="text-base text-center leading-relaxed mb-10 max-w-lg mx-auto">
          Enter your interview code below to join your AI-led interview session.
          No scheduling required – start whenever you're ready.
        </p>

        <div className="mb-12">
          {/* <label className="block text-sm font-semibold text-gray-700 mb-2">
            Interview Code
          </label> */}
          <div className="flex justify-center gap-3 mb-2 max-w-xl mx-auto">
            <div className="flex flex-col flex-1">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                Interview Code
              </label>
              <input
                type="text"
                placeholder="Enter your code"
                className="w-full h-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors focus:outline-none focus:border-indigo-500 placeholder-gray-400"
                value={interviewCode}
                onChange={(e) => setInterviewCode(e.target.value)}
                maxLength={6}
              />
            </div>
            <button
              className="self-end h-[49px] bg-[#5e03d3] text-white border-none px-6 rounded-lg text-base font-semibold cursor-pointer transition-colors whitespace-nowrap hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={handleJoinInterview}
              disabled={interviewCode.length !== 6}
            >
              Join Interview
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Your code should be 6 characters provided by your recruiter
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-500 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Enter Your Code
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Input the 6-character code provided by your recruiter.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-500 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Meet Your AI Interviewer
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Our AI will guide you through relevant questions for your role.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-500 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Get Instant Feedback
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Receive detailed feedback on your performance immediately after
                completion.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Interview Tips
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-base text-gray-700 leading-relaxed">
                Find a quiet space with good lighting and a stable internet
                connection.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-base text-gray-700 leading-relaxed">
                Test your microphone and camera before starting the interview.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-base text-gray-700 leading-relaxed">
                Dress professionally as you would for an in-person interview.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
