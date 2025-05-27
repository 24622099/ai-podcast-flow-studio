
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProjectData {
  projectName: string;
  initialContent: string;
  grammarPoint: string;
  driveFolderId?: string;
  mainLogFileId?: string;
  outline?: {
    openingHook: string;
    part1_Problem: string;
    part2_Cause: string;
    part3_Solution: string;
    suggestedVocab: string[];
  };
  script?: {
    OpenHook: string;
    Part1: string;
    Part2: string;
    Part3: string;
    Vocab: string;
    Grammar: string;
    Summary: string;
  };
  imagePrompts?: Array<{
    id: string;
    prompt: string;
  }>;
  projectInfo?: {
    projectId: string;
    dateCreated: string;
    folderUrl: string;
    keywordUrl: string;
    videoUrl: string;
    imageUrl: string;
    scriptDocUrl: string;
  };
}

interface ProjectContextType {
  projectData: ProjectData;
  currentStep: number;
  isLoading: boolean;
  loadingMessage: string;
  updateProjectData: (data: Partial<ProjectData>) => void;
  setCurrentStep: (step: number) => void;
  setLoading: (loading: boolean, message?: string) => void;
  resetProject: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const initialProjectData: ProjectData = {
  projectName: '',
  initialContent: '',
  grammarPoint: '',
};

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projectData, setProjectData] = useState<ProjectData>(initialProjectData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const updateProjectData = (data: Partial<ProjectData>) => {
    setProjectData(prev => ({ ...prev, ...data }));
  };

  const setLoading = (loading: boolean, message = '') => {
    setIsLoading(loading);
    setLoadingMessage(message);
  };

  const resetProject = () => {
    setProjectData(initialProjectData);
    setCurrentStep(1);
    setIsLoading(false);
    setLoadingMessage('');
  };

  return (
    <ProjectContext.Provider value={{
      projectData,
      currentStep,
      isLoading,
      loadingMessage,
      updateProjectData,
      setCurrentStep,
      setLoading,
      resetProject,
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
