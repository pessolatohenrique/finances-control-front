import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";

import { THEME_COLOR } from "../../constants/default_settings";
import { REQUIRED_MESSAGE } from "../../constants/messages";
import BreadcrumbsWrapper from "../../components/BreadcrumbsWrapper";

const books_data = [
  { id: 5, name: "Harry Potter e a Pedra Filosofal", author: "jkrowling" },
  { id: 7, name: "Harry Potter e a Câmera Secreta", author: "jkrowling" },
  {
    id: 9,
    name: "Harry Potter e o Prisioneiro de Azkaban",
    author: "jkrowling",
  },
  { id: 11, name: "Por que fazemos o que fazemos", author: "cortella" },
  { id: 15, name: "Qual é a sua obra?", author: "cortella" },
  { id: 18, name: "Me poupe!", author: "natharcuri" },
];

function ExampleForm() {
  const [books, setBooks] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const watchAuthor = watch("author");

  useEffect(() => {
    async function searchCep() {
      console.log(process.env);
      const cep = await axios.get(
        `https://viacep.com.br/ws/${process.env.REACT_APP_CEP_EXAMPLE}/json/`
      );
      console.log("cep example", cep);
    }

    searchCep();

    const author = watch("author");
    const books = [...books_data].filter((item) => item.author === author);
    setBooks(books);
  }, [watchAuthor]);

  return (
    <>
      <Container fixed>
        <br />
        <Card>
          <CardContent>
            <BreadcrumbsWrapper
              parentLink={{ link: "/livros", label: "Livros" }}
              childrenLabel="Novo"
            />
            <Typography
              gutterBottom
              variant="h5"
              component="h1"
              color={THEME_COLOR}
            >
              Novo Livro
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item>
                  <TextField
                    fullWidth
                    id="firstName"
                    label="First Name"
                    inputProps={{ "data-testid": "firstName" }}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName && REQUIRED_MESSAGE}
                    {...register("firstName", {
                      required: true,
                      maxLength: 20,
                    })}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    inputProps={{ "data-testid": "lastName" }}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName && REQUIRED_MESSAGE}
                    {...register("lastName", { required: true, maxLength: 20 })}
                  />
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel id="author">Author</InputLabel>

                    <Select
                      labelId="author"
                      id="demo-simple-select-helper"
                      fullWidth
                      inputProps={{ "data-testid": "author" }}
                      error={Boolean(errors.author)}
                      {...register("author", {
                        required: true,
                      })}
                    >
                      <MenuItem value={"jkrowling"}>JK Rowling</MenuItem>
                      <MenuItem value={"cortella"}>Cortella</MenuItem>
                      <MenuItem value={"natharcuri"}>Nathalia Arcuri</MenuItem>
                    </Select>
                    {errors.author && (
                      <FormHelperText error>{REQUIRED_MESSAGE}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel id="book">Book</InputLabel>

                    <Select
                      labelId="book"
                      id="book"
                      fullWidth
                      inputProps={{ "data-testid": "book" }}
                      error={Boolean(errors.book)}
                      {...register("book", {
                        required: true,
                      })}
                    >
                      {books.map((item) => {
                        return (
                          <MenuItem
                            key={item.id}
                            value={item.id}
                            inputProps={{ "data-testid": "book-option" }}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {errors.book && (
                      <FormHelperText error>{REQUIRED_MESSAGE}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch defaultChecked {...register("active")} />
                      }
                      label="Ativo?"
                    />
                  </FormGroup>
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
export default ExampleForm;
