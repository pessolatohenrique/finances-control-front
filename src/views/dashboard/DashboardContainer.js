import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Alert,
  Button,
  Snackbar,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ViewListToggle from "../../components/ViewListToggle";
import { EarningTable } from "../earnings/EarningTable";
import { EarningList } from "../earnings/EarningList";
import { ExpenseTable } from "../expenses/ExpenseTable";
import { ExpenseList } from "../expenses/ExpenseList";
import { THEME_COLOR } from "../../constants/default_settings";
import useView from "../../hooks/useView";
import earningImage from "../../assets/earnings.jpg";
import expensesImage from "../../assets/expenses.jpg";
import indicatorsImage from "../../assets/indicators.png";

import {
  SNACKBAR_DIRECTION,
  DATE_MIN_FILTER,
  DATE_MAX_FILTER,
} from "../../constants/default_settings";
import useToast from "../../hooks/useToast";

function createData(name, author, pages, genre) {
  return { name, author, pages, genre };
}

const rows = [
  createData("Jogos Vorazes", "Suzanne Collins", 320, "Trilogia"),
  createData(
    "Harry Potter e a Pedra Filosofal",
    "J.K Rowling",
    220,
    "Trilogia"
  ),
  createData("Me poupe!", "Nathalia Arcuri", 200, "Finanças"),
  createData("Sherlock Homes", "Arthur Conan Doyle", 500, "Suspense"),
  createData(
    "O mistério dos sete relógios",
    "Agatha Christie",
    300,
    "Suspense"
  ),
];

function useViewEarning() {
  const [isTable, isList, switchFormat] = useView();
  return [isTable, isList, switchFormat];
}

function useViewExpense() {
  const [isTable, isList, switchFormat] = useView();
  return [isTable, isList, switchFormat];
}

function IndicatorCard({ image, title, subtitle }) {
  return (
    <Card sx={{ width: "27%" }} data-testid="indicator-card">
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="green iguana"
        sx={{ objectFit: "initial" }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

function DashboardContainer() {
  // custom hooks
  const { open, error, setError, showToast, hideToast } = useToast();
  const [isTableEarning, isListEarning, switchFormatEarning] = useViewEarning();
  const [isTableExpense, isListExpense, switchFormatExpense] = useViewEarning();

  // local states
  const [userRecipe, setUserRecipe] = useState();
  const [budget, setBudget] = useState();
  const [monthFilter, setMonthFilter] = useState(moment().format("MM"));
  const [yearFilter, setYearFilter] = useState(moment().format("YYYY"));
  const [fullDate, setFullDate] = useState(new Date());

  console.log("budget", budget);

  useEffect(() => {
    async function getUserRecipe() {
      try {
        const response = await axios.get(
          `budget/summarize?month=${monthFilter}&year=${yearFilter}`
        );
        setBudget(response.data);
      } catch (error) {
        showToast();
        setError(error?.response?.data?.message || null);
      }
    }

    async function getBudget() {
      try {
        const response = await axios.get(`/user/recipe`);
        setUserRecipe(response.data);
      } catch (error) {
        showToast();
        setError(error?.response?.data?.message || null);
      }
    }

    getUserRecipe();
    getBudget();
  }, [monthFilter]);

  function updateDateFilter(dateParam) {
    setFullDate(dateParam);
    setMonthFilter(moment(dateParam).format("MM"));
    setYearFilter(moment(dateParam).format("YYYY"));
  }

  return (
    <Grid
      minHeight="100vh"
      sx={{
        backgroundColor: `#E5E5E5`,
        overflow: "hidden",
      }}
    >
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

      <Grid sx={{ marginLeft: 15, marginRight: 15, marginBottom: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Selecione a data"
            inputProps={{ "data-testid": "dateFilter" }}
            views={["year", "month"]}
            minDate={DATE_MIN_FILTER}
            maxDate={DATE_MAX_FILTER}
            inputFormat="MM/yyyy"
            value={fullDate}
            onChange={(dateParam) => {
              updateDateFilter(dateParam);
            }}
            renderInput={(params) => (
              <TextField
                inputProps={{ "data-testid": "dateFilter" }}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ marginLeft: 15, marginRight: 15 }}
      >
        {!userRecipe && (
          <Alert
            severity="warning"
            action={
              <Button
                color="inherit"
                size="small"
                href="/receita/associar"
                data-testid="associate-button"
              >
                <strong>{"Associar".toUpperCase()}</strong>
              </Button>
            }
          >
            Para receber dicas personalizadas, associe uma "receita do sucesso"!
          </Alert>
        )}

        <IndicatorCard
          image={earningImage}
          title={`R$ ${budget?.sum_earning?.toFixed(2)}`}
          subtitle="de ganhos"
        />
        <IndicatorCard
          image={expensesImage}
          title={`R$ ${budget?.sum_expense?.toFixed(2)}`}
          subtitle="de gastos"
        />
        <IndicatorCard
          image={indicatorsImage}
          title={`${budget?.sum_percentage?.toFixed(2)}%`}
          subtitle="de gastos da receita de sucesso"
        />
      </Grid>

      <Grid
        sx={{ marginLeft: 15, marginRight: 15, marginTop: 5, marginBottom: 5 }}
      >
        <Card>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h1"
              color={THEME_COLOR}
            >
              Ganhos
            </Typography>

            <ViewListToggle
              isTable={isTableEarning}
              isList={isListEarning}
              switchFormat={switchFormatEarning}
            />

            {isTableEarning() && <EarningTable budget={budget} />}

            {isListEarning() && <EarningList budget={budget} />}
          </CardContent>
          <CardActions>
            <Button size="small" href="/autores/novo">
              Adicionar
            </Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid
        sx={{ marginLeft: 15, marginRight: 15, marginTop: 5, marginBottom: 5 }}
      >
        <Card>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h1"
              color={THEME_COLOR}
            >
              Despesas
            </Typography>

            <ViewListToggle
              isTable={isTableExpense}
              isList={isListExpense}
              switchFormat={switchFormatExpense}
            />

            {isTableExpense() && <ExpenseTable budget={budget} />}

            {isListExpense() && <ExpenseList budget={budget} />}
          </CardContent>
          <CardActions>
            <Button size="small" href="/autores/novo">
              Adicionar
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default DashboardContainer;
