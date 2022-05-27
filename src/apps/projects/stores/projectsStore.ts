import { defaults, createStore, createHook } from "react-sweet-state";

import { ProjectState } from "apps/projects/models/state";
import {
  setSelectedBackend,
  setSelectedDb,
  setSelectedFrontend,
  setBackendSettings,
  setDbSettings,
  setFrontendSettings,
} from "apps/projects/actions/projectActions";

defaults.devtools = true;

const loadInitialState = (): ProjectState => {
  return {
    selectedBackendTemplate: "",
    backendTemplateConfig: {},
    selectedDatabaseType: "",
    databaseSettings: {},
    selectedFrontendTemplate: "",
    frontendTemplateConfig: {},
  };
};

const Store = createStore({
  name: "contactStore",
  initialState: loadInitialState(),
  actions: {
    setSelectedBackend,
    setSelectedDb,
    setSelectedFrontend,
    setBackendSettings,
    setDbSettings,
    setFrontendSettings,
  },
});

export default createHook(Store);
