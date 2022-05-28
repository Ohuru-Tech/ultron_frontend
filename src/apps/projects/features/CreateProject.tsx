import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
//
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Page from "apps/common/components/Page";
import { Container } from "@mui/system";
//
import { ChooseBackendTemplate } from "apps/projects/components/ChooseBackendTemplate";
import { ChooseDatabase } from "apps/projects/components/ChooseDatabase";
import { DatabaseSettings } from "apps/projects/components/DatabaseSettings";
import { BackendSettings } from "apps/projects/components/BackendSettings";
import { ChooseFrontendTemplate } from "apps/projects/components/ChooseFrontendTemplate";
import { FrontendSettings } from "apps/projects/components/FrontendSettings";
import useProjectStore from "apps/projects/stores/projectsStore";
import ProjectAPIs from "apps/projects/utils/projectAPIs";
import { CircularProgress } from "@mui/material";

const steps = [
  "Select Backend",
  "Choose Database",
  "Database Settings",
  "Backend Settings",
  "Select Frontend",
  "Frontend Settings",
];

export function CreateProject() {
  const [loading, setLoading] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const stepComponents: { [key: string]: React.ReactNode } = {
    "Select Backend": (
      <ChooseBackendTemplate onSave={handleNext} onBack={handleBack} />
    ),
    "Choose Database": (
      <ChooseDatabase onSave={handleNext} onBack={handleBack} />
    ),
    "Database Settings": (
      <DatabaseSettings onSave={handleNext} onBack={handleBack} />
    ),
    "Backend Settings": (
      <BackendSettings onSave={handleNext} onBack={handleBack} />
    ),
    "Select Frontend": (
      <ChooseFrontendTemplate onSave={handleNext} onBack={handleBack} />
    ),
    "Frontend Settings": (
      <FrontendSettings onSave={handleNext} onBack={handleBack} />
    ),
  };

  const [{ generatedBackendDir, generatedFrontendDir }, { generateProjects }] =
    useProjectStore();

  const [generatedProjects, setGeneratedProjects] = useState<boolean>(false);

  useEffect(() => {
    async function createProjects() {
      await generateProjects();
      setLoading(false);
      setGeneratedProjects(true);
    }
    if (activeStep === steps.length) {
      // GenerateZip here
      setLoading(true);
      createProjects();
    }
  }, [activeStep]);

  useEffect(() => {
    async function downloadProject() {
      const response = await fetch(
        "https://evening-eyrie-26161.herokuapp.com/download/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/zip",
          },
          body: JSON.stringify({
            frontend_dir: generatedFrontendDir,
            backend_dir: generatedBackendDir,
          }),
        }
      );
      const blob = await response.blob();
      saveAs(blob, "project.zip");
    }
    downloadProject();
  }, [generatedProjects]);

  return (
    <Page title="Create Project">
      <Container maxWidth="xl">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                {loading ? <CircularProgress /> : "Project Generated"}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <>
                {stepComponents.hasOwnProperty(steps[activeStep]) ? (
                  stepComponents[steps[activeStep]]
                ) : (
                  <Typography sx={{ mt: 3, mb: 1, ml: 1 }}>
                    Step {activeStep + 1}
                  </Typography>
                )}
              </>
            </React.Fragment>
          )}
        </Box>
      </Container>
    </Page>
  );
}
