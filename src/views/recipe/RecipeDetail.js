import React from "react";
import { useForm } from "react-hook-form";
import {
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FolderIcon from "@material-ui/icons/Folder";

function RecipeDetail({ recipe, onColectData }) {
  return (
    // <Grid container spacing={2}>
    <Grid item xs={6}>
      <Card sx={{ backgroundColor: "#0E4DA4", color: "#fff" }}>
        <CardActionArea onClick={() => onColectData({ recipeId: recipe.id })}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {recipe.name}
            </Typography>
            <Typography variant="body2">O plano inclui:</Typography>
            {[
              ...recipe.Categories.map((category) => {
                return (
                  <ListItem key={category.id}>
                    <ListItemIcon>
                      <FolderIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${category.name} (${category.RecipeCategory.percentage}%)`}
                    />
                  </ListItem>
                );
              }),
            ]}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="info"
            fullWidth
            onClick={() => onColectData({ recipeId: recipe.id })}
          >
            Escolher
          </Button>
        </CardActions>
      </Card>
    </Grid>
    // </Grid>
  );
}

export default RecipeDetail;
