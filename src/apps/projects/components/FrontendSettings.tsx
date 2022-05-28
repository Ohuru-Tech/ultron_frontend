import React, { useState, useEffect } from "react";
//
import {
  Typography,
  Skeleton,
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

export function FrontendSettings({ onSave, onBack }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [frontendSettingKeys, setFrontendSettingKeys] = useState<string[]>([]);
  const [settings, setSettings] = useState<{
    [key: string]: string;
  }>({});

  const [
    { selectedFrontendTemplate, frontendTemplateConfig },
    { setFrontendSettings },
  ] = useProjectStore();

  useEffect(() => {
    async function getDBSettingKeys() {
      setLoading(true);
      const projectApis = ProjectAPIs();
      const { data: keys } = await projectApis.getFrontendSettingKeys(
        selectedFrontendTemplate
      );
      setFrontendSettingKeys(keys);
      setSettings(
        keys.reduce((acc: { [x: string]: string }, key: string | number) => {
          acc[key] = "";
          return acc;
        }, {})
      );
      if (frontendTemplateConfig) {
        setSettings(frontendTemplateConfig);
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
            {frontendSettingKeys.map((key: string) => {
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
              await setFrontendSettings(settings);
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
