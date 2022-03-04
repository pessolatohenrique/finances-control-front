import React from "react";
import { useForm } from "react-hook-form";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
} from "@mui/material";

import {
  REQUIRED_MESSAGE,
  PASSWORD_MISMATCH_MESSAGE,
} from "../../constants/messages";

import RecipeDetail from "./RecipeDetail";

function RecipeChoose({ recipes, onColectData }) {
  return (
    <Grid>
      <Typography
        gutterBottom
        variant="p"
        component="p"
        sx={{ mt: 2, mb: 2 }}
        //   color={THEME_COLOR}
      >
        A receita do sucesso é um guia de como os gastos devem ser realizados,
        separados por categoria. Escolha abaixo qual a receita do sucesso
        combina mais com você
      </Typography>

      <Grid container spacing={2}>
        {[...recipes].map((recipe) => (
          <RecipeDetail
            recipe={recipe}
            key={recipe.id}
            onColectData={onColectData}
          />
        ))}
      </Grid>
    </Grid>
  );
}

export default RecipeChoose;
