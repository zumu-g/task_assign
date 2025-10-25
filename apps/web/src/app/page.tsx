import { CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-md w-full text-center">
        {/* FlowAI Logo */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8">
          <span className="text-2xl sm:text-3xl font-bold text-white">F</span>
        </div>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">FlowAI</h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">Intelligent Task Orchestrator</p>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-500 mb-8 sm:mb-12 leading-relaxed">
          Transform unstructured ideas into actionable tasks with AI-powered insights.
          Streamline your workflow from inbox to completion.
        </p>
        
        {/* Action Buttons */}
        <div className="space-y-3 sm:space-y-4">
          <a href="/dashboard" className="flowai-btn-primary w-full py-3 block text-center text-base sm:text-lg">
            Get Started
          </a>
          <button className="flowai-btn-secondary w-full py-3 text-base sm:text-lg">
            Learn More
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="mt-10 sm:mt-16 grid grid-cols-1 gap-4 sm:gap-6">
          <div className="flowai-card text-left">
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">Smart Inbox</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Capture ideas instantly and let AI transform them into structured tasks.
            </p>
          </div>

          <div className="flowai-card text-left">
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">Multi-View Canvas</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Visualize your work with List, Board, and Calendar views.
            </p>
          </div>

          <div className="flowai-card text-left">
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">Real-time Collaboration</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Work together seamlessly with live updates and shared workspaces.
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="mt-8 sm:mt-12 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3.5 h-3.5" />
            Phase 1 Complete
          </span>
          <p className="text-xs text-gray-400 mt-2">
            Modern TypeScript monorepo with Next.js & NestJS
          </p>
        </div>
      </div>
    </div>
  );
}