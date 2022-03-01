import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  THEME_COLOR,
  SNACKBAR_DIRECTION,
} from "../../constants/default_settings";
import moneyImage from "../../assets/moneyfinance-1.jpg";
import RegisterForm from "./RegisterForm";

function RegisterContainer() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const steps = ["Cadastro", "Receita do Sucesso"];
  const forms = [
    <>
      <RegisterForm onColectData={colectData} />
    </>,
    <h1>componente de form 2</h1>,
  ];

  useEffect(() => {
    const formsLength = forms.length - 1;
    if (step === formsLength) {
      console.log("final form!!!");
    }
  });

  function colectData(data) {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);
    console.log("colected data!!", updatedData);
    next();
  }

  function next() {
    setStep(step + 1);
  }

  return (
    <Grid
      display="flex"
      flexDirection="column"
      flexGrow={5}
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: `url(${moneyImage})`,
        overflow: "hidden",
      }}
    >
      <Card sx={{ width: "50%" }}>
        <CardContent>
          <>
            <Stepper activeStep={step}>
              {[...steps].map((item, key) => (
                <Step key={key} role="custom-step">
                  <StepLabel>{item}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {forms[step]}
          </>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default RegisterContainer;
