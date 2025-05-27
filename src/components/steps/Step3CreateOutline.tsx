
import React, { useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { webhookApi } from '../../utils/n8nApi';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';

const Step3CreateOutline: React.FC = () => {
  const { projectData, updateProjectData, setCurrentStep, setLoading } = useProject();
  const { toast } = useToast();
  
  const [outline, setOutline] = useState({
    openingHook: projectData.outline?.openingHook || '',
    part1_Problem: projectData.outline?.part1_Problem || '',
    part2_Cause: projectData.outline?.part2_Cause || '',
    part3_Solution: projectData.outline?.part3_Solution || '',
    suggestedVocab: projectData.outline?.suggestedVocab?.join(', ') || '',
  });

  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);

  const handleCreateScript = async () => {
    if (!outline.openingHook.trim()) {
      toast({
        title: "Error",
        description: "Please fill in the opening hook",
        variant: "destructive",
      });
      return;
    }

    setLoading(true, 'Generating detailed script...');

    try {
      const editedOutline = {
        openingHook: outline.openingHook,
        part1_Problem: outline.part1_Problem,
        part2_Cause: outline.part2_Cause,
        part3_Solution: outline.part3_Solution,
        suggestedVocab: outline.suggestedVocab.split(',').map(v => v.trim()).filter(v => v),
      };

      const response = await webhookApi.createScript({
        editedOutline,
        grammarPoint: projectData.grammarPoint,
        driveFolderId: projectData.driveFolderId!,
      });

      if (response.success && response.data) {
        updateProjectData({
          outline: editedOutline,
          script: response.data.script,
        });

        toast({
          title: "Success",
          description: "Script generated successfully!",
        });

        setCurrentStep(4);
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to generate script",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error creating script:', error);
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
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Project Information */}
      {projectData.projectInfo && (
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <Collapsible open={isProjectInfoOpen} onOpenChange={setIsProjectInfoOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-blue-100 transition-colors duration-200 rounded-t-lg">
                <CardTitle className="text-lg font-semibold text-blue-800">
                  Project Information (Click to {isProjectInfoOpen ? 'collapse' : 'view'})
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div><strong>Project Name:</strong> {projectData.projectName}</div>
                  <div><strong>Project ID:</strong> {projectData.projectInfo.projectId}</div>
                  <div><strong>Date Created:</strong> {projectData.projectInfo.dateCreated}</div>
                </div>
                <div className="space-y-2">
                  <div><strong>Folder ID:</strong> {projectData.driveFolderId}</div>
                  <div><strong>Main Log File ID:</strong> {projectData.mainLogFileId}</div>
                </div>
                {projectData.projectInfo.folderUrl && (
                  <div className="col-span-full">
                    <h4 className="font-semibold mb-2">Project Links:</h4>
                    <div className="space-y-1">
                      <a href={projectData.projectInfo.folderUrl} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
                        📁 Project Folder
                      </a>
                      {projectData.projectInfo.keywordUrl && (
                        <a href={projectData.projectInfo.keywordUrl} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
                          📊 Keywords Sheet
                        </a>
                      )}
                      {projectData.projectInfo.scriptDocUrl && (
                        <a href={projectData.projectInfo.scriptDocUrl} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
                          📝 Script Document
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      )}

      {/* Outline Editor */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Create & Edit Outline
          </CardTitle>
          <p className="text-gray-600">Review and edit the generated outline for your podcast</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="openingHook" className="text-lg font-medium text-gray-700">
              Opening Hook *
            </Label>
            <Textarea
              id="openingHook"
              value={outline.openingHook}
              onChange={(e) => setOutline(prev => ({ ...prev, openingHook: e.target.value }))}
              placeholder="Enter the opening hook for your podcast..."
              className="min-h-[120px] text-base border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="part1Problem" className="text-lg font-medium text-gray-700">
              Part 1 - Problem
            </Label>
            <Textarea
              id="part1Problem"
              value={outline.part1_Problem}
              onChange={(e) => setOutline(prev => ({ ...prev, part1_Problem: e.target.value }))}
              placeholder="Describe the problem or challenge..."
              className="min-h-[120px] text-base border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="part2Cause" className="text-lg font-medium text-gray-700">
              Part 2 - Cause
            </Label>
            <Textarea
              id="part2Cause"
              value={outline.part2_Cause}
              onChange={(e) => setOutline(prev => ({ ...prev, part2_Cause: e.target.value }))}
              placeholder="Explain the causes or reasons..."
              className="min-h-[120px] text-base border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="part3Solution" className="text-lg font-medium text-gray-700">
              Part 3 - Solution
            </Label>
            <Textarea
              id="part3Solution"
              value={outline.part3_Solution}
              onChange={(e) => setOutline(prev => ({ ...prev, part3_Solution: e.target.value }))}
              placeholder="Provide solutions or recommendations..."
              className="min-h-[120px] text-base border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="suggestedVocab" className="text-lg font-medium text-gray-700">
              Suggested Vocabulary
            </Label>
            <Textarea
              id="suggestedVocab"
              value={outline.suggestedVocab}
              onChange={(e) => setOutline(prev => ({ ...prev, suggestedVocab: e.target.value }))}
              placeholder="Enter vocabulary words separated by commas..."
              className="min-h-[80px] text-base border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <Button 
              onClick={() => setCurrentStep(2)}
              variant="outline"
              className="flex-1 h-12 text-lg font-medium border-2 hover:bg-gray-50"
            >
              Back
            </Button>
            <Button 
              onClick={handleCreateScript}
              className="flex-1 h-12 text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={!outline.openingHook.trim()}
            >
              Create Script
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step3CreateOutline;
