import React, { useState, useEffect } from "react";
//
import {
  Typography,
  Skeleton,
  Select,
  MenuItem,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
} from "@mui/material";
//
import ProjectAPIs from "apps/projects/utils/projectAPIs";
import useProjectStore from "apps/projects/stores/projectsStore";

interface Props {
  onSave: () => void;
  onBack: () => void;
}

export function BackendSettings({ onSave, onBack }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [backendSettingKeys, setBackendSettingKeys] = useState<string[]>([]);
  const [settings, setSettings] = useState<{
    [key: string]: string | { [key: string]: string };
  }>({});

  const [
    { selectedBackendTemplate, backendTemplateConfig },
    { setBackendSettings },
  ] = useProjectStore();

  useEffect(() => {
    async function getDBSettingKeys() {
      setLoading(true);
      const projectApis = ProjectAPIs();
      const { data: keys } = await projectApis.getBackendSettingsKeys(
        selectedBackendTemplate
      );
      setBackendSettingKeys(keys);
      setSettings(
        keys.reduce((acc: { [x: string]: string }, key: string | number) => {
          acc[key] = "";
          return acc;
        }, {})
      );
      if (backendTemplateConfig) {
        setSettings(backendTemplateConfig);
      }
      setLoading(false);
    }
    getDBSettingKeys();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ m: 1, mt: 3, p: 1 }}>
      <>
        <Typography variant="h4">Select the desired database</Typography>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            {backendSettingKeys.map((key: string) => {
              return (
                <TextField
                  key={key}
                  label={key}
                  fullWidth
                  sx={{
                    mt: 3,
                  }}
                  value={settings[key]}
                  onChange={(event) => {
                    setSettings({ ...settings, [key]: event.target.value });
                  }}
                />
              );
            })}
          </>
        )}
        <Box
          sx={{
            mt: 2,
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
              await setBackendSettings(settings);
              onSave();
              setLoading(false);
            }}
          >
            {loading ? <CircularProgress sx={{ color: "white" }} /> : "Save"}
          </Button>
          <Button variant="contained" sx={{ mt: 1 }} onClick={onBack}>
            Back
          </Button>
        </Box>
      </>
    </Container>
  );
}
