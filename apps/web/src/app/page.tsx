import { CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5 py-8 sm:p-8">
      <div className="max-w-md w-full text-center">
        {/* FlowAI Logo */}
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold text-white">F</span>
        </div>

        {/* Header - Using Apple HIG Large Title */}
        <h1 className="text-large-title font-bold text-gray-900 mb-2">FlowAI</h1>
        <p className="text-title-3 text-gray-600 mb-6">Intelligent Task Orchestrator</p>

        {/* Description - Using Apple HIG Body */}
        <p className="text-body text-gray-500 mb-8 px-4">
          Transform unstructured ideas into actionable tasks with AI-powered insights.
          Streamline your workflow from inbox to completion.
        </p>
        
        {/* Action Buttons - 44pt minimum touch target */}
        <div className="space-y-3">
          <a href="/dashboard" className="flowai-btn-primary w-full min-h-[44px] py-3 px-6 block text-center text-headline">
            Get Started
          </a>
          <button className="flowai-btn-secondary w-full min-h-[44px] py-3 px-6 text-headline">
            Learn More
          </button>
        </div>

        {/* Feature Highlights - Using Apple HIG Typography */}
        <div className="mt-12 grid grid-cols-1 gap-4">
          <div className="flowai-card text-left p-5">
            <h3 className="text-headline text-gray-900 mb-1">Smart Inbox</h3>
            <p className="text-subheadline text-gray-600">
              Capture ideas instantly and let AI transform them into structured tasks.
            </p>
          </div>

          <div className="flowai-card text-left p-5">
            <h3 className="text-headline text-gray-900 mb-1">Multi-View Canvas</h3>
            <p className="text-subheadline text-gray-600">
              Visualize your work with List, Board, and Calendar views.
            </p>
          </div>

          <div className="flowai-card text-left p-5">
            <h3 className="text-headline text-gray-900 mb-1">Real-time Collaboration</h3>
            <p className="text-subheadline text-gray-600">
              Work together seamlessly with live updates and shared workspaces.
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="mt-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-footnote font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3.5 h-3.5" />
            Phase 1 Complete
          </span>
          <p className="text-caption-1 text-gray-400 mt-2">
            Modern TypeScript monorepo with Next.js & NestJS
          </p>
        </div>
      </div>
    </div>
  );
}