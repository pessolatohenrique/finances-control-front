import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import axios from "axios";
import moment from "moment";
import NumberFormat from "react-number-format";
import { Controller, useForm } from "react-hook-form";

import {
  THEME_COLOR,
  SNACKBAR_DIRECTION,
} from "../../constants/default_settings";
import { REQUIRED_MESSAGE } from "../../constants/messages";
import { formatMoneyToDecimal } from "../../utils/formatters";
import useToast from "../../hooks/useToast";
import BreadcrumbsWrapper from "../../components/BreadcrumbsWrapper";

const RESET_FIELDS = { name: "", value: "", transaction_date: new Date() };

function EarningForm() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: RESET_FIELDS,
  });

  const {
    open,
    error,
    messageType,
    setError,
    showToast,
    hideToast,
  } = useToast();

  const formatDataSubmit = (data) => {
    const { transaction_date, value } = data;

    return {
      earnings: [
        {
          ...data,
          transaction_date: moment(transaction_date, "DD/MM/YYYY").format(
            "YYYY-MM-DD"
          ),
          isPublic: 1,
          value: formatMoneyToDecimal(value),
        },
      ],
    };
  };

  const onSubmit = async (data) => {
    try {
      const dataSubmit = formatDataSubmit(data);
      await axios.post(`/user_earning`, { ...dataSubmit });
      reset(RESET_FIELDS);
      showToast("success");
      setError("Ganho salvo com sucesso!");
    } catch (error) {
      showToast();
      setError(error?.response?.data);
    }
  };

  return (
    <>
      <Container fixed>
        <Snackbar
          anchorOrigin={SNACKBAR_DIRECTION}
          open={open}
          autoHideDuration={6000}
          onClose={hideToast}
        >
          <Alert
            onClose={hideToast}
            severity={messageType}
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
        <br />
        <Card>
          <CardContent>
            <BreadcrumbsWrapper
              parentLink={{ link: "/", label: "Dashboard" }}
              childrenLabel="Novo"
            />
            <Typography
              gutterBottom
              variant="h5"
              component="h1"
              color={THEME_COLOR}
            >
              Novo Ganho
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item>
                  <TextField
                    fullWidth
                    id="name"
                    label="Descrição"
                    inputProps={{ "data-testid": "name" }}
                    error={Boolean(errors.name)}
                    helperText={errors.name && REQUIRED_MESSAGE}
                    {...register("name", {
                      required: true,
                    })}
                  />
                </Grid>
                <Grid item>
                  <Controller
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <NumberFormat
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        prefix={"R$ "}
                        customInput={TextField}
                        inputProps={{ "data-testid": "value" }}
                        fullWidth
                        label="Valor"
                        onChange={onChange}
                        value={value}
                        error={Boolean(error)}
                        helperText={Boolean(error) && REQUIRED_MESSAGE}
                      />
                    )}
                    name="value"
                    control={control}
                    rules={{ required: true }}
                  />
                </Grid>
                <Grid item>
                  <Controller
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Data da transação"
                          inputProps={{ "data-testid": "transaction_date" }}
                          inputFormat="dd/MM/yyyy"
                          value={value}
                          onChange={onChange}
                          error={Boolean(error)}
                          helperText={Boolean(error) && REQUIRED_MESSAGE}
                          renderInput={(params) => (
                            <TextField
                              inputProps={{ "data-testid": "transaction_date" }}
                              fullWidth
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    )}
                    name="transaction_date"
                    control={control}
                    rules={{ required: true }}
                  />
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    type="submit"
                    data-testid="submit-button"
                  >
                    Salvar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
export default EarningForm;
