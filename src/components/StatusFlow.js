import React from 'react';
import { Check } from 'lucide-react';

const StatusFlow = ({ currentStatus = 'todo', showLabels = true }) => {
  const steps = [
    { id: 'todo', label: 'To Do', index: 0 },
    { id: 'in_progress', label: 'In Progress', index: 1 },
    { id: 'in_review', label: 'In Review', index: 2 },
    { id: 'done', label: 'Done', index: 3 }
  ];

  const currentIndex = steps.find(step => step.id === currentStatus)?.index || 0;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="status-flow py-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          const isFuture = index > currentIndex;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`status-step ${
                  isCompleted ? 'completed' : isActive ? 'active' : ''
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {showLabels && (
                <span
                  className={`text-xs mt-2 font-medium ${
                    isCompleted || isActive
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusFlow;