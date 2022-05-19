import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { isPageWithoutLogin } from "./utils/pages";
import useToken from "./hooks/useToken";
import AppBarWrapper from "./components/AppBarWrapper";
import NotFound from "./components/NotFound";
import ExampleList from "./views/register/ExampleList";
import ExampleForm from "./views/register/ExampleForm";
import ExampleDetail from "./views/register/ExampleDetail";
import LoginForm from "./views/register/LoginForm";
import RegisterContainer from "./views/register/RegisterContainer";
import DashboardContainer from "./views/dashboard/DashboardContainer";
import RecipeContainer from "./views/recipe/RecipeContainer";
import EarningForm from "./views/earnings/EarningForm";

function App(props) {
  const { token, setToken, setRefreshToken } = useToken();

  if (!token && !isPageWithoutLogin()) {
    return <LoginForm setToken={setToken} setRefreshToken={setRefreshToken} />;
  }

  return (
    <Router>
      <AppBarWrapper />

      <Switch>
        <Route exact path="/">
          <DashboardContainer />
        </Route>

        <Route exact path="/receita/associar">
          <RecipeContainer />
        </Route>

        <Route exact path="/usuario/novo">
          <RegisterContainer />
        </Route>

        <Route exact path="/ganho/novo">
          <EarningForm />
        </Route>

        <Route exact path="/livros">
          <ExampleList />
        </Route>

        <Route exact path="/autores/novo">
          <ExampleForm />
        </Route>

        <Route exact path="/livros/:id">
          <ExampleDetail />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
