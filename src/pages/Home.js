import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Grid } from "@material-ui/core";
import useStyles from "../UITemplate";
import CardsGrid from "./CardsGrid";
import AddCard from "./AddCard";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";

function Home() {
  const { tasks, loading, errors } = useSelector(({ search }) => search);
  const classes = useStyles();
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    setTareas(tasks);
  }, [tasks]);

  return (
    <main>
      <div className={classes.heroContent}>
        <Container maxWidth="lg">
          <AddCard setTareas={setTareas} />
          <SearchBar />
        </Container>
      </div>
      <Grid container justify="center">
        {loading && <Loader color={"primary"} />}
      </Grid>
      {tareas && <CardsGrid tareas={tareas} setTareas={setTareas} />}
    </main>
  );
}
export default Home;
