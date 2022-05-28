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

export function DatabaseSettings({ onSave, onBack }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [databaseSettingKeys, setDatabaseSettingKeys] = useState<string[]>([]);
  const [settings, setSettings] = useState<{ [key: string]: string }>({});

  const [{ selectedDatabaseType, databaseSettings }, { setDbSettings }] =
    useProjectStore();

  useEffect(() => {
    async function getDBSettingKeys() {
      setLoading(true);
      const projectApis = ProjectAPIs();
      const { data: keys } = await projectApis.getDatabaseSettingKeys(
        selectedDatabaseType
      );
      setDatabaseSettingKeys(keys);
      setSettings(
        keys.reduce((acc: { [x: string]: string }, key: string | number) => {
          acc[key] = "";
          return acc;
        }, {})
      );
      if (databaseSettings) {
        setSettings(databaseSettings);
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
            {databaseSettingKeys.map((key: string) => {
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
              await setDbSettings(settings);
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
