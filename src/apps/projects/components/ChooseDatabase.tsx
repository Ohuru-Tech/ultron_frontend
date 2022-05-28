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

export function ChooseDatabase({ onSave, onBack }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [availableDatabases, setAvailableDatabases] = useState<string[]>([]);
  const [databaseType, setDatabaseType] = useState<string>("");

  const [{ selectedBackendTemplate, selectedDatabaseType }, { setSelectedDb }] =
    useProjectStore();

  useEffect(() => {
    async function getAvailableFrameworks() {
      setLoading(true);
      const projectApis = ProjectAPIs();
      const { data: dbs } = await projectApis.getSupportedDatabases(
        selectedBackendTemplate
      );
      setAvailableDatabases(dbs);
      setDatabaseType(selectedDatabaseType);
      setLoading(false);
    }
    getAvailableFrameworks();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ m: 1, mt: 3, p: 1 }}>
      <Typography variant="h4">Select the desired database</Typography>
      {loading ? (
        <Skeleton />
      ) : (
        <Select
          sx={{ mb: 2, mt: 3 }}
          fullWidth
          value={databaseType}
          onChange={(event) => {
            setDatabaseType(event.target.value as string);
          }}
        >
          {availableDatabases.map((database) => {
            return (
              <MenuItem key={database} value={database}>
                {database}
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
            await setSelectedDb(databaseType);
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
    </Container>
  );
}
