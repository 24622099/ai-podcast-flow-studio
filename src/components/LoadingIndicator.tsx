
import React from 'react';
import { Pen, Book, Circle } from 'lucide-react';

interface LoadingIndicatorProps {
  message: string;
  step: number;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message, step }) => {
  const getIcon = () => {
    switch (step) {
      case 2:
        return <Pen className="w-8 h-8 text-blue-500" />;
      case 3:
      case 4:
        return <Book className="w-8 h-8 text-blue-500" />;
      default:
        return <Circle className="w-8 h-8 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {getIcon()}
            <div className="absolute inset-0 animate-spin">
              <Circle className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Processing...</h3>
            <p className="text-gray-600">{message}</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
