import React from "react";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { StyledTableCell } from "../../constants/CustomStyles";
import { THEME_COLOR } from "../../constants/default_settings";
import BreadcrumbsWrapper from "../../components/BreadcrumbsWrapper";
import ViewListToggle from "../../components/ViewListToggle";
import useView from "../../hooks/useView";

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

function ExampleList() {
  const [isTable, isList, switchFormat] = useView();

  return (
    <>
      <Container fixed>
        <br />
        <Card>
          <CardContent>
            <BreadcrumbsWrapper childrenLabel="Livros" />
            <Typography
              gutterBottom
              variant="h5"
              component="h1"
              color={THEME_COLOR}
            >
              Livros
            </Typography>

            <ViewListToggle
              isTable={isTable}
              isList={isList}
              switchFormat={switchFormat}
            />

            {isTable() && (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Título</StyledTableCell>
                      <StyledTableCell>Autor</StyledTableCell>
                      <StyledTableCell>Gênero</StyledTableCell>
                      <StyledTableCell>Páginas</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => {
                      return (
                        <TableRow key={row.name}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.author}</TableCell>
                          <TableCell>{row.genre}</TableCell>
                          <TableCell>{row.pages}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {isList() && (
              <Grid container spacing={2}>
                {rows.map((row) => {
                  return (
                    <Grid item xs={4} key={row.name}>
                      <Card>
                        <CardContent>
                          <Typography
                            variant="h6"
                            component="div"
                            color="text.secondary"
                          >
                            {row.name}
                          </Typography>
                          <List variant="body2">
                            <ListItem>
                              <ListItemText disableTypography>
                                <Typography variant="body2">
                                  {row.author}
                                </Typography>
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText disableTypography>
                                <Typography variant="body2">
                                  {row.genre}
                                </Typography>
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText disableTypography>
                                <Typography variant="body2">
                                  {row.pages}
                                </Typography>
                              </ListItemText>
                            </ListItem>
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </CardContent>
          <CardActions>
            <Button size="small" href="/autores/novo">
              Adicionar
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}

export default ExampleList;
