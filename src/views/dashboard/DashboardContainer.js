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
  Box,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  MODAL_CONFIRM_TITLE,
  MODAL_CONFIRM_SUBTITLE,
} from "../../constants/messages";
import { THEME_COLOR } from "../../constants/default_settings";
import ModalWrapper from "../../components/ModalWrapper";
import ViewListToggle from "../../components/ViewListToggle";
import { BarChartComparative } from "../../components/ChartWrapper";
import useView from "../../hooks/useView";
import earningImage from "../../assets/earnings.jpg";
import expensesImage from "../../assets/expenses.jpg";
import indicatorsImage from "../../assets/indicators.png";
import indicatorsComingSoon from "../../assets/indicators.jpg";
import { EarningTable } from "../earnings/EarningTable";
import { EarningList } from "../earnings/EarningList";
import { ExpenseTable } from "../expenses/ExpenseTable";
import { ExpenseList } from "../expenses/ExpenseList";
import { RecipeTable } from "../recipe/RecipeTable";

import {
  SNACKBAR_DIRECTION,
  DATE_MIN_FILTER,
  DATE_MAX_FILTER,
} from "../../constants/default_settings";
import useToast from "../../hooks/useToast";

function useViewWrapper(initial = "table") {
  const [isTable, isList, switchFormat] = useView(initial);
  return [isTable, isList, switchFormat];
}

function IndicatorCard({ image, title, subtitle }) {
  return (
    <Card data-testid="indicator-card">
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={subtitle}
        sx={{ objectFit: "cover" }}
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
  const [isTableEarning, isListEarning, switchFormatEarning] = useViewWrapper();
  const [isTableExpense, isListExpense, switchFormatExpense] = useViewWrapper();
  const [isTableRecipe, isListRecipe, switchFormatRecipe] = useViewWrapper(
    "list"
  );

  // local states
  const [userRecipe, setUserRecipe] = useState();
  const [budget, setBudget] = useState();
  const [monthFilter, setMonthFilter] = useState(moment().format("MM"));
  const [yearFilter, setYearFilter] = useState(moment().format("YYYY"));
  const [fullDate, setFullDate] = useState(new Date());

  // modal
  const [showModalEarning, setShowModalEarning] = useState(false);
  const [selectedIdEarning, setSelectedIdEarning] = useState("");
  const [showModalExpense, setShowModalExpense] = useState(false);
  const [selectedIdExpense, setSelectedIdExpense] = useState("");

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

  async function exportBudget() {
    try {
      const response = await axios.get(
        `/budget/export?month=${monthFilter}&year=${yearFilter}`,
        { responseType: "arraybuffer" }
      );

      const blob = new Blob([response.data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      window.open(url);
    } catch (error) {
      showToast();
      setError(error?.response?.data?.message || null);
    }
  }

  useEffect(() => {
    getUserRecipe();
    getBudget();
  }, [monthFilter]);

  function updateDateFilter(dateParam) {
    setFullDate(dateParam);
    setMonthFilter(moment(dateParam).format("MM"));
    setYearFilter(moment(dateParam).format("YYYY"));
  }

  return (
    <Box
      minHeight="100vh"
      sx={{
        backgroundColor: `#E5E5E5`,
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

      {showModalEarning && (
        <ModalWrapper
          isOpen={showModalEarning}
          title={MODAL_CONFIRM_TITLE}
          subtitle={MODAL_CONFIRM_SUBTITLE}
          hasConfirmButton
          handleClose={() => {
            setSelectedIdEarning("");
            setShowModalEarning(false);
          }}
          endpoint={{
            method: "delete",
            name: `/user_earning/${selectedIdEarning}`,
          }}
          callbackMethod={() => getUserRecipe()}
        />
      )}

      {showModalExpense && (
        <ModalWrapper
          isOpen={showModalExpense}
          title={MODAL_CONFIRM_TITLE}
          subtitle={MODAL_CONFIRM_SUBTITLE}
          hasConfirmButton
          handleClose={() => {
            setSelectedIdExpense("");
            setShowModalExpense(false);
          }}
          endpoint={{
            method: "delete",
            name: `/user_expense/${selectedIdExpense}`,
          }}
          callbackMethod={() => getUserRecipe()}
        />
      )}

      <Grid
        container
        marginLeft={2}
        marginRight={2}
        columnSpacing={3}
        marginTop={3}
        marginBottom={2}
      >
        <Grid item lg={3} md={3} sm={11} xs={11}>
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
      </Grid>

      {!userRecipe && (
        <Grid
          container
          rowSpacing={{ xs: 3 }}
          columnSpacing={3}
          marginBottom={2}
          marginLeft={2}
          marginRight={2}
          sx={{ width: "96%" }}
        >
          <Grid item lg={9} md={12} sm={12} xs={12}>
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
              Para receber dicas personalizadas, associe uma "receita do
              sucesso"!
            </Alert>
          </Grid>
        </Grid>
      )}

      <Grid
        container
        rowSpacing={{ xs: 3 }}
        columnSpacing={3}
        marginLeft={2}
        marginRight={2}
        marginBottom={3}
        sx={{ width: "96%" }}
      >
        <Grid item lg={3} md={3} sm={6} xs={11}>
          <IndicatorCard
            image={earningImage}
            title={`R$ ${budget?.sum_earning?.toFixed(2)}`}
            subtitle="de ganhos"
          />
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={11}>
          <IndicatorCard
            image={expensesImage}
            title={`R$ ${budget?.sum_expense?.toFixed(2)}`}
            subtitle="de gastos"
          />
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={11}>
          <IndicatorCard
            image={indicatorsImage}
            title={`${budget?.sum_percentage?.toFixed(2)}%`}
            subtitle="de gastos da receita de sucesso"
          />
        </Grid>
        <Grid item lg={3} md={3} xs={11}>
          <IndicatorCard
            image={indicatorsComingSoon}
            title={`Em breve`}
            subtitle="um novo recurso para você"
          />
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={{ xs: 3 }}
        columnSpacing={3}
        marginLeft={2}
        marginRight={2}
        marginTop={5}
        marginBottom={3}
        sx={{ width: "96%" }}
      >
        <Grid item lg={12} md={12} sm={12} xs={11}>
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

              {isTableEarning() && (
                <EarningTable
                  budget={budget}
                  onShowModal={() => setShowModalEarning(true)}
                  onSetSelectedId={(id) => setSelectedIdEarning(id)}
                />
              )}

              {isListEarning() && <EarningList budget={budget} />}
            </CardContent>
            <CardActions>
              <Button size="small" href="/ganho/novo">
                Adicionar
              </Button>

              <Button
                size="small"
                onClick={(event) => {
                  event.preventDefault();
                  exportBudget();
                }}
              >
                Exportar para excel
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={{ xs: 3 }}
        columnSpacing={3}
        marginLeft={2}
        marginRight={2}
        marginTop={3}
        marginBottom={3}
        sx={{ width: "96%" }}
      >
        <Grid item lg={12} md={12} sm={12} xs={11}>
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

              {isTableExpense() && (
                <ExpenseTable
                  budget={budget}
                  onShowModal={() => setShowModalExpense(true)}
                  onSetSelectedId={(id) => setSelectedIdExpense(id)}
                />
              )}

              {isListExpense() && <ExpenseList budget={budget} />}
            </CardContent>
            <CardActions>
              <Button size="small" href="/gasto/novo">
                Adicionar
              </Button>

              <Button
                size="small"
                onClick={(event) => {
                  event.preventDefault();
                  exportBudget();
                }}
              >
                Exportar para excel
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={{ xs: 3 }}
        columnSpacing={3}
        marginLeft={2}
        marginRight={2}
        marginTop={3}
        marginBottom={3}
        sx={{ width: "96%" }}
      >
        <Grid item lg={12} md={12} sm={12} xs={11}>
          <Card>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h1"
                color={THEME_COLOR}
              >
                Receita do sucesso
              </Typography>

              <ViewListToggle
                isTable={isTableRecipe}
                isList={isListRecipe}
                switchFormat={switchFormatRecipe}
              />

              {isTableRecipe() && <RecipeTable budget={budget} />}

              {isListRecipe() && !process.env.JEST_WORKER_ID && (
                <BarChartComparative
                  data={budget?.recipe_comparative || []}
                  labelProperty="name"
                  mainConfig={{
                    legend: "Esperado (%)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                    valueProperty: "percentage",
                  }}
                  secondConfig={{
                    legend: "Gasto (%)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    valueProperty: "percentage_spent",
                  }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardContainer;
