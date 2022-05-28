export interface ProjectState {
  selectedBackendTemplate: string;
  backendTemplateConfig: { [key: string]: string | { [key: string]: string } };

  selectedDatabaseType: string;
  databaseSettings: { [key: string]: string };

  selectedFrontendTemplate: string;
  frontendTemplateConfig: { [key: string]: string };

  generatedFrontendDir?: string;
  generatedBackendDir?: string;
}
