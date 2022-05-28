import { Action } from "react-sweet-state";
import { toast } from "react-toastify";
//
import { ProjectState } from "apps/projects/models/state";
import { successToastConfig } from "apps/common/utils/general/configs";
import ProjectAPIs from "../utils/projectAPIs";

// -----------------------------------------------------------------

export const setSelectedBackend =
  (selectedBackend: string): Action<ProjectState> =>
  async ({ getState, setState }) => {
    const { selectedBackendTemplate } = getState();
    if (selectedBackendTemplate !== selectedBackend) {
      setState({ selectedBackendTemplate: selectedBackend });
    }
  };

export const setSelectedDb =
  (selectedDb: string): Action<ProjectState> =>
  async ({ getState, setState }) => {
    const { selectedDatabaseType } = getState();
    if (selectedDatabaseType !== selectedDb) {
      setState({ selectedDatabaseType: selectedDb });
    }
  };

export const setSelectedFrontend =
  (selectedFrontend: string): Action<ProjectState> =>
  async ({ getState, setState }) => {
    const { selectedFrontendTemplate } = getState();
    if (selectedFrontendTemplate !== selectedFrontend) {
      setState({ selectedFrontendTemplate: selectedFrontend });
    }
  };

export const setBackendSettings =
  (settings: {
    [key: string]: string | { [key: string]: string };
  }): Action<ProjectState> =>
  async ({ getState, setState }) => {
    const { databaseSettings, selectedDatabaseType } = getState();
    setState({
      backendTemplateConfig: {
        ...settings,
        db_details: { ...databaseSettings, db_type: selectedDatabaseType },
      },
    });
  };

export const setDbSettings =
  (settings: { [key: string]: string }): Action<ProjectState> =>
  async ({ setState }) => {
    setState({ databaseSettings: settings });
  };

export const setFrontendSettings =
  (settings: { [key: string]: string }): Action<ProjectState> =>
  async ({ setState }) => {
    setState({ frontendTemplateConfig: settings });
  };

export const generateProjects =
  (): Action<ProjectState> =>
  async ({ getState, setState }) => {
    const {
      selectedBackendTemplate,
      backendTemplateConfig,
      selectedFrontendTemplate,
      frontendTemplateConfig,
    } = getState();
    const projectApis = ProjectAPIs();
    const { data: backendResult } = await projectApis.generateBackendProject(
      selectedBackendTemplate,
      backendTemplateConfig
    );
    const { data: frontendResult } = await projectApis.generateFrontendProject(
      selectedFrontendTemplate,
      frontendTemplateConfig
    );

    setState({
      generatedBackendDir: backendResult.generatedDir,
      generatedFrontendDir: frontendResult.generatedDir,
    });
  };
