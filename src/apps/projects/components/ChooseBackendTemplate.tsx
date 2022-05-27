import React, { useEffect, useState } from "react";
//
import {
  CircularProgress,
  Container,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
//
import ProjectAPIs from "../utils/projectAPIs";

export function ChooseBackendTemplate() {
  const [loading, setLoading] = useState<boolean>(true);
  const [availableFrameworks, setAvailableFrameworks] = useState<string[]>([]);
  const [selectedFramework, setSelectedFramework] = useState<string>("");

  useEffect(() => {
    async function getAvailableFrameworks() {
      setLoading(true);
      const projectApis = ProjectAPIs();
      const { data: availableFrameworks } =
        await projectApis.getBackendTemplates();
      setAvailableFrameworks(availableFrameworks);
      setLoading(false);
    }
    getAvailableFrameworks();
  }, []);

  return (
    <Container>
      <Typography variant="h2">Select the desired backend framework</Typography>
      {loading ? (
        <Select
          fullWidth
          value={selectedFramework}
          onChange={(event) => {
            setSelectedFramework(event.target.value as string);
          }}
        >
          {availableFrameworks.map((framework) => {
            return <MenuItem value={framework}>{framework}</MenuItem>;
          })}
        </Select>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
}
