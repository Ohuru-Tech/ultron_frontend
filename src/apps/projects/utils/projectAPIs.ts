import axios from "apps/common/utils/axios/defaults";
import { snakeAndCamelCase } from "apps/common/utils/axios/configs";

// ToDo add mocks for tests here later

const BACKEND_API_BASE = "/backend";
const FRONTENT_API_BASE = "/frontend";

const ProjectAPIs = () => {
  return {
    getBackendTemplates: () =>
      axios.get<string[]>(`${BACKEND_API_BASE}/templates`, snakeAndCamelCase),
    getSupportedDatabases: (backendTemplate: string) =>
      axios.get(
        `${BACKEND_API_BASE}/templates/${backendTemplate}/databases`,
        snakeAndCamelCase
      ),
    getDatabaseSettingKeys: (database: string) =>
      axios.get(
        `${BACKEND_API_BASE}/templates/databases/${database}`,
        snakeAndCamelCase
      ),
    getBackendSettingsKeys: (backendTemplate: string) =>
      axios.get(
        `${BACKEND_API_BASE}/templates/${backendTemplate}`,
        snakeAndCamelCase
      ),
    getFrontendTemplates: () =>
      axios.get<string[]>(`${FRONTENT_API_BASE}/templates`, snakeAndCamelCase),
    getFrontendSettingKeys: (frontendTemplate: string) =>
      axios.get(
        `${FRONTENT_API_BASE}/templates/${frontendTemplate}`,
        snakeAndCamelCase
      ),
    generateBackendProject: (
      backendTemplate: string,
      settings: {
        [key: string]: string | { [key: string]: string };
      }
    ) =>
      axios.post(
        `${BACKEND_API_BASE}/templates/${backendTemplate}/create`,
        settings,
        snakeAndCamelCase
      ),
    generateFrontendProject: (
      frontendTemplate: string,
      settings: { [key: string]: string }
    ) =>
      axios.post(
        `${FRONTENT_API_BASE}/templates/${frontendTemplate}/create`,
        settings,
        snakeAndCamelCase
      ),
    downloadProjectFile: (frontendDir: string, backndDir: string) =>
      axios.post(
        `/download/`,
        { frontendDir: frontendDir, backendDir: backndDir },
        {
          ...snakeAndCamelCase,
        }
      ),
  };
};

export default ProjectAPIs;
