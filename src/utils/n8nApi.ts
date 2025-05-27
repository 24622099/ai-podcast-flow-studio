
interface WebhookResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Webhook URLs
const WEBHOOK_URLS = {
  initializeProject: 'https://n8n.chichung.studio/webhook-test/NewProject_1',
  createScript: 'https://n8n.chichung.studio/webhook-test/RunPromt',
  prepareMedia: 'https://n8n.chichung.studio/webhook-test/PrepareMedia',
  generateImages: 'https://n8n.chichung.studio/webhook-test/GenerateImages',
};

export const webhookApi = {
  async initializeProject(data: {
    projectName: string;
    initialContent: string;
    grammarPoint: string;
  }): Promise<WebhookResponse> {
    try {
      console.log('Initializing project with data:', data);
      
      const response = await fetch(WEBHOOK_URLS.initializeProject, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Project initialization response:', result);
      
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error('Error initializing project:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },

  async createScript(data: {
    editedOutline: any;
    grammarPoint?: string;
    driveFolderId: string;
  }): Promise<WebhookResponse> {
    try {
      console.log('Creating script with data:', data);
      
      const response = await fetch(WEBHOOK_URLS.createScript, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Script creation response:', result);
      
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error('Error creating script:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },

  async prepareMedia(data: {
    confirmedScript: any;
    driveFolderId: string;
  }): Promise<WebhookResponse> {
    try {
      console.log('Preparing media with data:', data);
      
      const response = await fetch(WEBHOOK_URLS.prepareMedia, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Media preparation response:', result);
      
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error('Error preparing media:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },

  async generateImages(data: {
    editedPrompts: Array<{ id: string; prompt: string }>;
    driveFolderId: string;
  }): Promise<WebhookResponse> {
    try {
      console.log('Generating images with data:', data);
      
      const response = await fetch(WEBHOOK_URLS.generateImages, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Image generation response:', result);
      
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error('Error generating images:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },
};
