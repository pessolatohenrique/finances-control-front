import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { THEME_COLOR } from "../../constants/default_settings";
import { REQUIRED_MESSAGE } from "../../constants/messages";

import "./LoginForm.css";

function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Container>
        <br />
        <Grid
          display="flex"
          flexDirection="column"
          flexGrow={5}
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Card sx={{ width: "55%" }}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h1"
                color={THEME_COLOR}
              >
                Entrar
              </Typography>
              <Typography
                gutterBottom
                variant="p"
                component="p"
                //   color={THEME_COLOR}
              >
                Utilize as suas credenciais para acessar o sistema
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction={"column"} spacing={2}>
                  <Grid item>
                    <TextField
                      fullWidth
                      id="username"
                      label="E-mail"
                      inputProps={{ "data-testid": "username", type: "email" }}
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
                      id="password"
                      label="Senha"
                      inputProps={{
                        "data-testid": "password",
                        type: "password",
                      }}
                      error={Boolean(errors.password)}
                      helperText={errors.password && REQUIRED_MESSAGE}
                      {...register("password", {
                        required: true,
                      })}
                    />
                  </Grid>

                  <Grid item>
                    <Button
                      variant="contained"
                      fullWidth
                      type="submit"
                      data-testid="submit-button"
                    >
                      Entrar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </>
  );
}
export default LoginForm;
