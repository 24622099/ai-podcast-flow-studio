
import React from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ExternalLink, RefreshCw } from 'lucide-react';

const Step6Complete: React.FC = () => {
  const { projectData, resetProject } = useProject();

  const handleCreateNewProject = () => {
    resetProject();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
            <Check className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-800">
            🎉 Project Completed Successfully!
          </CardTitle>
          <p className="text-green-700 text-lg mt-2">
            Your podcast "{projectData.projectName}" has been created and all images have been generated.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project Summary */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 Project Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Project Name:</strong> {projectData.projectName}
              </div>
              <div>
                <strong>Status:</strong> <span className="text-green-600 font-semibold">Completed</span>
              </div>
              <div>
                <strong>Folder ID:</strong> {projectData.driveFolderId}
              </div>
              <div>
                <strong>Grammar Point:</strong> {projectData.grammarPoint || 'None specified'}
              </div>
            </div>
          </div>

          {/* Quick Access Links */}
          {projectData.projectInfo && (
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">🔗 Quick Access Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projectData.projectInfo.folderUrl && (
                  <a 
                    href={projectData.projectInfo.folderUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span>📁</span>
                    <span>Project Folder</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}
                {projectData.projectInfo.scriptDocUrl && (
                  <a 
                    href={projectData.projectInfo.scriptDocUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span>📝</span>
                    <span>Script Document</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}
                {projectData.projectInfo.keywordUrl && (
                  <a 
                    href={projectData.projectInfo.keywordUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span>📊</span>
                    <span>Keywords Sheet</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}
                {projectData.projectInfo.imageUrl && (
                  <a 
                    href={projectData.projectInfo.imageUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span>🖼️</span>
                    <span>Generated Images</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Generated Content Overview */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📝 Generated Content</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Project outline created and refined</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Detailed podcast script generated</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>{projectData.imagePrompts?.length || 0} images generated from custom prompts</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>All files saved to Google Drive</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">🚀 What's Next?</h3>
            <ul className="text-blue-700 space-y-2">
              <li>• Review your generated script and make any final adjustments</li>
              <li>• Use the generated images for your podcast cover art or social media</li>
              <li>• Record your podcast using the finalized script</li>
              <li>• Share your completed project with your team or audience</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleCreateNewProject}
              className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Create New Project
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step6Complete;
