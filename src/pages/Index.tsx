
import React from 'react';
import { ProjectProvider, useProject } from '../contexts/ProjectContext';
import StepIndicator from '../components/StepIndicator';
import LoadingIndicator from '../components/LoadingIndicator';
import Step1NameProject from '../components/steps/Step1NameProject';
import Step2InputContent from '../components/steps/Step2InputContent';
import Step3CreateOutline from '../components/steps/Step3CreateOutline';
import Step4CreateScript from '../components/steps/Step4CreateScript';
import Step5PrepareMedia from '../components/steps/Step5PrepareMedia';
import Step6Complete from '../components/steps/Step6Complete';

const WorkflowContent: React.FC = () => {
  const { currentStep, isLoading, loadingMessage } = useProject();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1NameProject />;
      case 2:
        return <Step2InputContent />;
      case 3:
        return <Step3CreateOutline />;
      case 4:
        return <Step4CreateScript />;
      case 5:
        return <Step5PrepareMedia />;
      case 6:
        return <Step6Complete />;
      default:
        return <Step1NameProject />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {isLoading && <LoadingIndicator message={loadingMessage} step={currentStep} />}
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              AI Podcast Workflow Manager
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create professional podcast content with AI-powered automation and human oversight
            </p>
          </div>

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} totalSteps={6} />

          {/* Current Step Content */}
          <div className="mt-8">
            {renderCurrentStep()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            Powered by AI • Built for Content Creators • Step {currentStep} of 6
          </p>
        </div>
      </footer>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <ProjectProvider>
      <WorkflowContent />
    </ProjectProvider>
  );
};

export default Index;
