
import React, { useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Step1NameProject: React.FC = () => {
  const { projectData, updateProjectData, setCurrentStep } = useProject();
  const [projectName, setProjectName] = useState(projectData.projectName);

  const handleNameProject = () => {
    if (!projectName.trim()) {
      alert('Please enter a project name');
      return;
    }
    
    updateProjectData({ projectName: projectName.trim() });
    setCurrentStep(2);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameProject();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to AI Podcast Creator
          </CardTitle>
          <p className="text-gray-600 mt-2">Let's start by giving your podcast project a name</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-lg font-medium text-gray-700">
              Project Name
            </Label>
            <Input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your project name..."
              className="text-lg h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200"
              autoFocus
            />
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={handleNameProject}
              className="w-full h-12 text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={!projectName.trim()}
            >
              Name Project
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-500 pt-4">
            Step 1 of 6: Project Setup
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step1NameProject;
