import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useToken from "./hooks/useToken";
import AppBarWrapper from "./components/AppBarWrapper";
import NotFound from "./components/NotFound";
import ExampleList from "./views/register/ExampleList";
import ExampleForm from "./views/register/ExampleForm";
import ExampleDetail from "./views/register/ExampleDetail";
import LoginForm from "./views/register/LoginForm";

function App() {
  const { token, setToken, setRefreshToken } = useToken();

  if (!token) {
    return <LoginForm setToken={setToken} setRefreshToken={setRefreshToken} />;
  }

  return (
    <Router>
      <AppBarWrapper />

      <Switch>
        <Route exact path="/signin">
          <LoginForm />
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
