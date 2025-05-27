
import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  'Name Project',
  'Input Content',
  'Create Outline',
  'Create Script',
  'Prepare Media',
  'Generate Images'
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={stepNumber} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                    ${isCompleted 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                      : isCurrent 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg ring-4 ring-blue-200' 
                      : 'bg-gray-200 text-gray-600'
                    }
                  `}
                >
                  {isCompleted ? <Check size={16} /> : stepNumber}
                </div>
                {stepNumber < totalSteps && (
                  <div 
                    className={`
                      flex-1 h-1 mx-2 transition-all duration-300
                      ${isCompleted ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-200'}
                    `}
                  />
                )}
              </div>
              <span 
                className={`
                  mt-2 text-xs font-medium text-center transition-all duration-300
                  ${isCurrent ? 'text-blue-600 font-semibold' : isCompleted ? 'text-green-600' : 'text-gray-500'}
                `}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
