import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Alert,
  Button,
  Snackbar,
} from "@mui/material";
import earningImage from "../../assets/earnings.jpg";
import expensesImage from "../../assets/expenses.jpg";
import indicatorsImage from "../../assets/indicators.png";

import { SNACKBAR_DIRECTION } from "../../constants/default_settings";
import useToast from "../../hooks/useToast";

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
  const { open, error, setError, showToast, hideToast } = useToast();

  const [userRecipe, setUserRecipe] = useState();
  const [budget, setBudget] = useState();
  const [monthFilter, setMonthFilter] = useState(moment().format("MM"));
  const [yearFilter, setYearFilter] = useState(moment().format("YYYY"));

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
  }, []);

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
    </Grid>
  );
}

export default DashboardContainer;
