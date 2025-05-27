
import React, { useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { webhookApi } from '../../utils/n8nApi';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Step4CreateScript: React.FC = () => {
  const { projectData, updateProjectData, setCurrentStep, setLoading } = useProject();
  const { toast } = useToast();
  
  const [script, setScript] = useState({
    OpenHook: projectData.script?.OpenHook || '',
    Part1: projectData.script?.Part1 || '',
    Part2: projectData.script?.Part2 || '',
    Part3: projectData.script?.Part3 || '',
    Vocab: projectData.script?.Vocab || '',
    Grammar: projectData.script?.Grammar || '',
    Summary: projectData.script?.Summary || '',
  });

  const handleConfirmScript = async () => {
    if (!script.OpenHook.trim()) {
      toast({
        title: "Error",
        description: "Please fill in the opening hook",
        variant: "destructive",
      });
      return;
    }

    setLoading(true, 'Preparing media prompts...');

    try {
      const response = await webhookApi.prepareMedia({
        confirmedScript: script,
        driveFolderId: projectData.driveFolderId!,
      });

      if (response.success && response.data) {
        updateProjectData({
          script,
          imagePrompts: response.data.imagePrompts,
        });

        toast({
          title: "Success",
          description: "Media prompts prepared successfully!",
        });

        setCurrentStep(5);
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to prepare media",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error preparing media:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const scriptSections = [
    { key: 'OpenHook', label: 'Opening Hook', required: true },
    { key: 'Part1', label: 'Part 1' },
    { key: 'Part2', label: 'Part 2' },
    { key: 'Part3', label: 'Part 3' },
    { key: 'Vocab', label: 'Vocabulary Section' },
    { key: 'Grammar', label: 'Grammar Section' },
    { key: 'Summary', label: 'Summary' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Review & Edit Script
          </CardTitle>
          <p className="text-gray-600">Fine-tune your podcast script before generating media</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {scriptSections.map(({ key, label, required }) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="text-lg font-medium text-gray-700">
                {label} {required && '*'}
              </Label>
              <Textarea
                id={key}
                value={script[key as keyof typeof script]}
                onChange={(e) => setScript(prev => ({ ...prev, [key]: e.target.value }))}
                placeholder={`Enter ${label.toLowerCase()}...`}
                className="min-h-[120px] text-base border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
          ))}

          <div className="flex space-x-4 pt-4">
            <Button 
              onClick={() => setCurrentStep(3)}
              variant="outline"
              className="flex-1 h-12 text-lg font-medium border-2 hover:bg-gray-50"
            >
              Back
            </Button>
            <Button 
              onClick={handleConfirmScript}
              className="flex-1 h-12 text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={!script.OpenHook.trim()}
            >
              Confirm Script & Prepare Media
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step4CreateScript;
