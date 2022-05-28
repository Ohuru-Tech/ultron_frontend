import React, { useEffect, useState } from "react";
//
import {
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
//
import ProjectAPIs from "apps/projects/utils/projectAPIs";
import useProjectStore from "apps/projects/stores/projectsStore";

interface Props {
  onSave: () => void;
  onBack: () => void;
}

export function ChooseFrontendTemplate({ onSave, onBack }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [availableFrameworks, setAvailableFrameworks] = useState<string[]>([]);
  const [selectedFramework, setSelectedFramework] = useState<string>("");

  const [{ selectedFrontendTemplate }, { setSelectedFrontend }] =
    useProjectStore();

  useEffect(() => {
    async function getAvailableFrameworks() {
      setLoading(true);
      const projectApis = ProjectAPIs();
      const { data: availableFrameworks } =
        await projectApis.getFrontendTemplates();
      setAvailableFrameworks(availableFrameworks);
      setSelectedFramework(selectedFrontendTemplate);
      setLoading(false);
    }
    getAvailableFrameworks();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ m: 1, mt: 3, p: 1 }}>
      <Typography variant="h4">
        Select the desired frontend framework
      </Typography>
      {loading ? (
        <Skeleton />
      ) : (
        <Select
          sx={{ mb: 2, mt: 3 }}
          fullWidth
          value={selectedFramework}
          onChange={(event) => {
            setSelectedFramework(event.target.value as string);
          }}
        >
          {availableFrameworks.map((framework) => {
            return (
              <MenuItem key={framework} value={framework}>
                {framework}
              </MenuItem>
            );
          })}
        </Select>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Button
          variant="contained"
          sx={{
            mt: 1,
          }}
          onClick={async () => {
            setLoading(true);
            await setSelectedFrontend(selectedFramework);
            onSave();
            setLoading(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
        <Button variant="contained" sx={{ mt: 1 }} onClick={onBack}>
          Back
        </Button>
      </Box>
    </Container>
  );
}
