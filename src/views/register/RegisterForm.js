import React from "react";
import { useForm } from "react-hook-form";
import { Typography, Grid, TextField, Button } from "@mui/material";

import {
  REQUIRED_MESSAGE,
  PASSWORD_MISMATCH_MESSAGE,
} from "../../constants/messages";

function RegisterForm({ onColectData }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => onColectData(data);

  return (
    <Grid>
      <Typography
        gutterBottom
        variant="p"
        component="p"
        sx={{ mt: 2, mb: 2 }}
        //   color={THEME_COLOR}
      >
        Preencha os campos abaixo para realizar o cadastro na plataforma
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            <TextField
              fullWidth
              id="username"
              label="Usuário"
              inputProps={{ "data-testid": "username" }}
              error={Boolean(errors.username)}
              helperText={errors.username && REQUIRED_MESSAGE}
              {...register("username", {
                required: true,
              })}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              type="email"
              id="email"
              label="E-mail"
              inputProps={{ "data-testid": "email" }}
              error={Boolean(errors.email)}
              helperText={errors.email && REQUIRED_MESSAGE}
              {...register("email", {
                required: true,
              })}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              type="password"
              id="password"
              label="Senha"
              inputProps={{ "data-testid": "password" }}
              error={Boolean(errors.password)}
              helperText={errors.password && REQUIRED_MESSAGE}
              {...register("password", {
                required: true,
              })}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              type="password"
              id="confirmPassword"
              label="Confirme a senha"
              inputProps={{ "data-testid": "confirmPassword" }}
              error={Boolean(errors.confirmPassword)}
              helperText={
                errors.confirmPassword && errors.confirmPassword.message
              }
              {...register("confirmPassword", {
                required: true,
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();
                    return password === value || PASSWORD_MISMATCH_MESSAGE;
                  },
                },
              })}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              type="submit"
              data-testid="submit-button"
            >
              Próximo
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default RegisterForm;
