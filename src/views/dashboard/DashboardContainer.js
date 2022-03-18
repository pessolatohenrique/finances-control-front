import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Alert,
  AlertTitle,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
} from "@mui/material";
import BreadcrumbsWrapper from "../../components/BreadcrumbsWrapper";
import { SNACKBAR_DIRECTION } from "../../constants/default_settings";
import useToast from "../../hooks/useToast";
import { THEME_COLOR } from "../../constants/default_settings";

function DashboardContainer() {
  const { open, error, setError, showToast, hideToast } = useToast();

  const [userRecipe, setUserRecipe] = useState();

  useEffect(() => {
    async function getUserRecipe() {
      try {
        const response = await axios.get(`/user/recipe`);
        setUserRecipe(response.data);
      } catch (error) {
        console.log("errror", error);
        showToast();
        setError(error?.response?.data?.message || null);
      }
    }

    getUserRecipe();
  }, []);

  console.log("user recipe", userRecipe);

  return (
    <Container fixed>
      <br />
      <Snackbar
        anchorOrigin={SNACKBAR_DIRECTION}
        open={open}
        autoHideDuration={6000}
        onClose={hideToast}
      >
        <Alert onClose={hideToast} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Card>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h1"
            color={THEME_COLOR}
          >
            Dashboard
          </Typography>
          {!userRecipe && (
            <Alert
              severity="warning"
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => console.log("clicked!!")}
                >
                  <strong>{"Associar".toUpperCase()}</strong>
                </Button>
              }
            >
              Para receber dicas personalizadas, associe uma "receita do
              sucesso"!
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default DashboardContainer;
