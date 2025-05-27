
import React, { useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { webhookApi } from '../../utils/n8nApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Step2InputContent: React.FC = () => {
  const { projectData, updateProjectData, setCurrentStep, setLoading } = useProject();
  const { toast } = useToast();
  const [initialContent, setInitialContent] = useState(projectData.initialContent);
  const [grammarPoint, setGrammarPoint] = useState(projectData.grammarPoint);

  const handleCreateOutline = async () => {
    if (!initialContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter initial content",
        variant: "destructive",
      });
      return;
    }

    setLoading(true, 'Initializing project and creating outline...');

    try {
      const response = await webhookApi.initializeProject({
        projectName: projectData.projectName,
        initialContent: initialContent.trim(),
        grammarPoint: grammarPoint.trim(),
      });

      if (response.success && response.data) {
        // Update project data with response
        updateProjectData({
          initialContent: initialContent.trim(),
          grammarPoint: grammarPoint.trim(),
          driveFolderId: response.data.driveFolderId,
          mainLogFileId: response.data.mainLogFileId,
          outline: response.data.outline,
          projectInfo: response.data.projectInfo,
        });

        toast({
          title: "Success",
          description: response.data.notification || "Project initialized and outline created successfully!",
        });

        setCurrentStep(3);
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to initialize project",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error creating outline:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Input Initial Content
          </CardTitle>
          <p className="text-gray-600">Provide the original content and ideas for your podcast</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="initialContent" className="text-lg font-medium text-gray-700">
              Initial Content (Original content, ideas) *
            </Label>
            <Textarea
              id="initialContent"
              value={initialContent}
              onChange={(e) => setInitialContent(e.target.value)}
              placeholder="Enter your original content or ideas here..."
              className="min-h-[200px] text-base border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grammarPoint" className="text-lg font-medium text-gray-700">
              Grammar Point (Optional)
            </Label>
            <Input
              id="grammarPoint"
              type="text"
              value={grammarPoint}
              onChange={(e) => setGrammarPoint(e.target.value)}
              placeholder="Example: Present Simple, Conditional Sentences"
              className="text-base h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <Button 
              onClick={() => setCurrentStep(1)}
              variant="outline"
              className="flex-1 h-12 text-lg font-medium border-2 hover:bg-gray-50"
            >
              Back
            </Button>
            <Button 
              onClick={handleCreateOutline}
              className="flex-1 h-12 text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={!initialContent.trim()}
            >
              Create Outline
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step2InputContent;
