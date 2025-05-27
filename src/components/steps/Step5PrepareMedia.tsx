
import React, { useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { webhookApi } from '../../utils/n8nApi';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Step5PrepareMedia: React.FC = () => {
  const { projectData, updateProjectData, setCurrentStep, setLoading } = useProject();
  const { toast } = useToast();
  
  const [imagePrompts, setImagePrompts] = useState(
    projectData.imagePrompts || [
      { id: 'img_vocab1', prompt: 'A colorful illustration showing vocabulary learning concepts' },
      { id: 'img_problem', prompt: 'An illustration representing the main problem discussed' },
      { id: 'img_solution', prompt: 'A bright, optimistic image showing the solution' },
    ]
  );

  const handleStartGeneration = async () => {
    if (imagePrompts.some(prompt => !prompt.prompt.trim())) {
      toast({
        title: "Error",
        description: "Please fill in all image prompts",
        variant: "destructive",
      });
      return;
    }

    setLoading(true, 'Generating images... This process may take a few minutes.');

    try {
      const response = await webhookApi.generateImages({
        editedPrompts: imagePrompts.filter(prompt => prompt.prompt.trim()),
        driveFolderId: projectData.driveFolderId!,
      });

      if (response.success && response.data) {
        updateProjectData({
          imagePrompts,
        });

        toast({
          title: "Success",
          description: response.data.notification || "Images generated successfully!",
        });

        setCurrentStep(6);
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to generate images",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error generating images:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addPrompt = () => {
    setImagePrompts(prev => [
      ...prev,
      { id: `img_custom_${Date.now()}`, prompt: '' }
    ]);
  };

  const removePrompt = (index: number) => {
    setImagePrompts(prev => prev.filter((_, i) => i !== index));
  };

  const updatePrompt = (index: number, prompt: string) => {
    setImagePrompts(prev => prev.map((item, i) => 
      i === index ? { ...item, prompt } : item
    ));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Prepare Media Creation
          </CardTitle>
          <p className="text-gray-600">Review and edit image prompts for your podcast visuals</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {imagePrompts.map((prompt, index) => (
            <div key={prompt.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`prompt-${index}`} className="text-lg font-medium text-gray-700">
                  Image Prompt {index + 1}
                </Label>
                {imagePrompts.length > 1 && (
                  <Button
                    onClick={() => removePrompt(index)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <Textarea
                id={`prompt-${index}`}
                value={prompt.prompt}
                onChange={(e) => updatePrompt(index, e.target.value)}
                placeholder="Describe the image you want to generate..."
                className="min-h-[100px] text-base border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
          ))}

          <div className="text-center">
            <Button
              onClick={addPrompt}
              variant="outline"
              className="border-dashed border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
            >
              + Add Another Image Prompt
            </Button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">💡 Tips for Good Image Prompts:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Be specific about colors, style, and mood</li>
              <li>• Include relevant context to your podcast topic</li>
              <li>• Mention if you want illustrations, photos, or abstract designs</li>
              <li>• Consider your target audience when describing visuals</li>
            </ul>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button 
              onClick={() => setCurrentStep(4)}
              variant="outline"
              className="flex-1 h-12 text-lg font-medium border-2 hover:bg-gray-50"
            >
              Back
            </Button>
            <Button 
              onClick={handleStartGeneration}
              className="flex-1 h-12 text-lg font-medium bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={imagePrompts.some(prompt => !prompt.prompt.trim())}
            >
              Start Image Generation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step5PrepareMedia;
