import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import RecipeChoose from "./RecipeChoose";
import BreadcrumbsWrapper from "../../components/BreadcrumbsWrapper";
import { SNACKBAR_DIRECTION } from "../../constants/default_settings";
import useToast from "../../hooks/useToast";
import { THEME_COLOR } from "../../constants/default_settings";

function RecipeContainer() {
  const { open, error, setError, showToast, hideToast } = useToast();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      try {
        const response = await axios.get(`/recipe`);
        setRecipes(response.data);
      } catch (error) {
        showToast();
        setError(error?.response?.data?.message);
      }
    }

    getRecipes();
  }, []);

  async function colectData(data) {
    try {
      const { recipeId } = data;
      await axios.put(`/recipe/associate/${recipeId}`);
      window.location.href = "/";
    } catch (error) {
      showToast();
      setError(error?.response?.data?.message);
    }
    console.log("colect data!", data);
  }

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
          <BreadcrumbsWrapper childrenLabel="Associar Receita" />

          <Typography
            gutterBottom
            variant="h5"
            component="h1"
            color={THEME_COLOR}
          >
            Associar Receita
          </Typography>
          <RecipeChoose
            onColectData={colectData}
            recipes={recipes}
            endpoint={{ method: "put", name: "recipe/associate" }}
          />
        </CardContent>
      </Card>
    </Container>
  );
}

export default RecipeContainer;
