import React from "react";
import "./style.css";
import {
  BriefcaseBusiness,
  CheckCircle,
  Lightbulb,
  ArrowRight,
  Play,
  TrendingUp,
} from "lucide-react";

export const Feedback = () => {
  const interviewScore = 50; // Dinamik qilish mumkin
  let performanceStatus = "";
  let performanceSummary = "";
  let strengths = "";
  let areasToImprove = "";
  let nextSteps = "";
  let technicalKnowledge = 0;
  let communicationSkills = 0;
  let problemSolving = 0;

  if (interviewScore >= 80) {
    performanceStatus = "Excellent";
    performanceSummary = "You performed exceptionally well!";
    strengths =
      "You demonstrated excellent technical knowledge and communication skills. Your answers were clear, concise, and showed deep understanding of the subject matter. You handled pressure well and provided thoughtful responses.";
    areasToImprove =
      "Consider providing more specific examples from your past experiences. Some technical questions could benefit from more detailed explanations.";
    nextSteps =
      "Continue to practice and refine your interview skills. Consider scheduling another mock interview focusing on more advanced topics.";
    technicalKnowledge = 85;
    communicationSkills = 90;
    problemSolving = 80;
  } else if (interviewScore >= 60) {
    performanceStatus = "Good";
    performanceSummary = "Solid performance with some areas to improve.";
    strengths =
      "You showed good preparation and knowledge in most areas. Your communication was clear, and you handled several challenging questions effectively.";
    areasToImprove =
      "Work on providing more concrete examples and deepening your technical knowledge in specific areas. Practice articulating complex concepts more clearly.";
    nextSteps =
      "Review the topics where you struggled and practice those areas. Schedule another interview within 2-3 weeks to measure improvement.";
    technicalKnowledge = 70;
    communicationSkills = 75;
    problemSolving = 65;
  } else {
    performanceStatus = "Needs Improvement";
    performanceSummary =
      "Focus on the feedback areas to enhance your skills.";
    strengths =
      "You showed enthusiasm and willingness to learn. There were some good examples provided in your responses.";
    areasToImprove =
      "Focus on improving your technical knowledge and preparation. Practice structuring your answers more effectively and providing relevant examples from your experience.";
    nextSteps =
      "We recommend focusing on the core concepts and practicing structured responses. Review our learning resources and schedule another interview in 3–4 weeks.";
    technicalKnowledge = 45;
    communicationSkills = 60;
    problemSolving = 50;
  }

  // Progress ring hisoblash
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (interviewScore / 100) * circumference;

  return (
    <div className="container">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Interview Feedback</h2>
          <p className="text-gray-600 text-sm mb-8">
            Review your interview performance and detailed feedback to help you
            improve for future opportunities.
          </p>
        </div>

        {/* Overall Feedback Card */}
        <div className="border rounded-lg p-6">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Interview</h3>
              <BriefcaseBusiness className="w-12 h-12 text-gray-500 rounded-full bg-gray-100 p-2.5 mb-1" />
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Status: <span className="font-medium">{performanceStatus}</span>
            </p>
          </div>
          <div className="flex justify-between flex-wrap mt-5">
            <div className="flex flex-col items-center">
              <p className="text-sm mb-2">Performance Score</p>
              <div className="relative w-40 h-40">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="4"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke="#000"
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-semibold text-gray-700">
                  {interviewScore}/100
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm mb-2">Performance Summary</p>
              <p className="text-base text-gray-700">{performanceSummary}</p>
            </div>
          </div>
        </div>

        {/* Detailed Feedback Section */}
        <div className="border rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-6">Detailed Feedback</h2>

          <div className="mb-6">
            <div className="flex items-center mb-2 text-gray-800">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              <h3 className="font-medium">Strengths</h3>
            </div>
            <p className="text-gray-700">{strengths}</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2 text-gray-800">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
              <h3 className="font-medium">Areas to Improve</h3>
            </div>
            <p className="text-gray-700">{areasToImprove}</p>
          </div>

          <div>
            <div className="flex items-center mb-2 text-gray-800">
              <ArrowRight className="w-5 h-5 mr-2 text-blue-600" />
              <h3 className="font-medium">Recommended Next Steps</h3>
            </div>
            <p className="text-gray-700">{nextSteps}</p>
          </div>
        </div>


        <div className="mb-8">
          <h2 className="text-xl font-semibold my-8 text-center">Performance Visualization</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Technical Knowledge */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4 text-gray-800">Technical Knowledge</h3>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${technicalKnowledge}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {technicalKnowledge}%
                </p>
              </div>
            </div>

            {/* Communication Skills */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4 text-gray-800">Communication Skills</h3>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${communicationSkills}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {communicationSkills}%
                </p>
              </div>
            </div>

            {/* Problem Solving */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4 text-gray-800">Problem Solving</h3>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${problemSolving}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {problemSolving}%
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Take Action Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Take Action</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Practice Again */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-800 mb-2">Practice Again</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Schedule another interview to apply your learnings and improve your score.
                </p>
                <button className="text-purple-600 font-medium text-sm hover:underline">
                  Join a new interview
                </button>
              </div>
            </div>

            {/* Track Progress */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-800 mb-2">Track Progress</h3>
                <p className="text-gray-600 text-sm mb-3">
                  View your interview history and track your improvement over time.
                </p>
                <button className="text-blue-600 font-medium text-sm hover:underline">
                  Go to dashboard
                </button>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};
