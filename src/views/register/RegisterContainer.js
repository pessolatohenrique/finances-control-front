import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Grid,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import moneyImage from "../../assets/moneyfinance-1.jpg";
import RecipeChoose from "../recipe/RecipeChoose";
import RegisterForm from "./RegisterForm";

function RegisterContainer() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const steps = ["Cadastro", "Receita do Sucesso"];
  const forms = [
    <>
      <RegisterForm onColectData={colectData} />
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
