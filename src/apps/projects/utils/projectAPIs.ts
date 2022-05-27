import axios from "apps/common/utils/axios/defaults";
import { snakeAndCamelCase } from "apps/common/utils/axios/configs";

// ToDo add mocks for tests here later

const BACKEND_API_BASE = "/backend";
const FRONTENT_API_BASE = "/frontend";

const ProjectAPIs = (itemId?: number) => {
  return {
    getBackendTemplates: () =>
      axios.get<string[]>(`${BACKEND_API_BASE}/templates/`, snakeAndCamelCase),
  };
};

export default ProjectAPIs;
