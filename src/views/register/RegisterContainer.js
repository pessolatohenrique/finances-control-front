import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  THEME_COLOR,
  SNACKBAR_DIRECTION,
} from "../../constants/default_settings";
import moneyImage from "../../assets/moneyfinance-1.jpg";
import RecipeChoose from "../recipe/RecipeChoose";
import RegisterForm from "./RegisterForm";

function RegisterContainer() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [recipes, setRecipes] = useState([]);
  // toast
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const steps = ["Cadastro", "Receita do Sucesso"];
  const forms = [
    <>
      <RegisterForm
        onColectData={colectData}
        endpoint={{ method: "post", name: "user" }}
      />
    </>,
    <>
      <RecipeChoose onColectData={colectData} recipes={recipes} />
    </>,
  ];

  useEffect(() => {
    async function getRecipes() {
      try {
        const response = await axios.get(`/recipe`);
        setRecipes(response.data);
      } catch (error) {
        setError(error.response.data);
      }
    }

    getRecipes();

    const formsLength = forms.length - 1;
    if (step === formsLength) {
      console.log("final form!!!");
    }
  }, []);

  async function saveUser(endpoint, data = {}) {
    try {
      const { method, name } = endpoint;
      await axios[method](`${process.env.REACT_APP_API_URL}/${name}`, {
        ...data,
      });

      setError("");
    } catch (error) {
      const error_message = error?.response?.data?.errors[0]?.message;
      setOpen(true);
      setError(error_message);
      return { error: error_message };
    }
  }

  async function colectData(data, endpoint = false) {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (endpoint) {
      const result = await saveUser(endpoint, updatedData);
      if (result?.error) return;
    }

    next();
  }

  function next() {
    setStep(step + 1);
  }

  function handleCloseToast() {
    setOpen(false);
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
      >
      <Snackbar
        anchorOrigin={SNACKBAR_DIRECTION}
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
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
