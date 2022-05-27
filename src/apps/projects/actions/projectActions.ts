import { Action } from "react-sweet-state";
import { toast } from "react-toastify";
//
import { ProjectState } from "apps/projects/models/state";
import { successToastConfig } from "apps/common/utils/general/configs";

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
  (settings: any): Action<ProjectState> =>
  async ({ setState }) => {
    setState({ backendTemplateConfig: settings });
  };

export const setDbSettings =
  (settings: any): Action<ProjectState> =>
  async ({ setState }) => {
    setState({ databaseSettings: settings });
  };

export const setFrontendSettings =
  (settings: any): Action<ProjectState> =>
  async ({ setState }) => {
    setState({ frontendTemplateConfig: settings });
  };
