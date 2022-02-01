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
import moneyImage from "../../assets/moneyfinance-1.jpg";
import axios from "axios";

function LoginForm({ setToken }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // setToken("!21111");
  });

  async function loginUser(credentials) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { ...credentials }
      );

      setToken(response.data.accessToken);
    } catch (error) {
      console.log("error login user", error.response.data);
    }
  }

  const onSubmit = (data) => loginUser(data);

  return (
    <>
      {/* <Container> */}
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
      {/* </Container> */}
    </>
  );
}
export default LoginForm;
