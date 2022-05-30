import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  THEME_COLOR,
  SNACKBAR_DIRECTION,
} from "../../constants/default_settings";
import { REQUIRED_MESSAGE } from "../../constants/messages";
import moneyImage from "../../assets/moneyfinance-1.jpg";
import useToast from "../../hooks/useToast";

function LoginForm({ setToken, setRefreshToken }) {
  const { open, error, setError, showToast, hideToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function loginUser(credentials) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { ...credentials }
      );

      setToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
    } catch (error) {
      showToast();
      setError(error.response.data);
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

                  <Typography
                    gutterBottom
                    variant="p"
                    component="p"
                    //   color={THEME_COLOR}
                  >
                    <br />
                    Ainda não tem uma conta? Cadastre-se{" "}
                    <a href="/usuario/novo">aqui</a>
                  </Typography>
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
