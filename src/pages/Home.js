import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Grid } from "@material-ui/core";
import useStyles from "../UITemplate";
import CardsGrid from "./CardsGrid";
import AddCard from "./AddCard";
import Loader from "../components/Loader";
import { taskServices } from "../api";
import SearchBar from "../components/SearchBar";

import { fetchTasksSuccess, fetchTasks } from "../redux/actions/";

function Home() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [tareas, setTareas] = useState([]);

  const obtenerDatos = () => {
    dispatch(fetchTasks(""));
    taskServices.findAll().then(
      (data) => {
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTareas(arrayData);
        dispatch(fetchTasksSuccess(arrayData));
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  return (
    <main>
      <div className={classes.heroContent}>
        <Container maxWidth="lg">
          <AddCard setTareas={setTareas} />
          <SearchBar />
        </Container>
      </div>
      <Grid container justify="center">
        {tareas.length === 0 && <Loader color={"primary"} />}
      </Grid>
      {tareas && <CardsGrid tareas={tareas} setTareas={setTareas} />}
    </main>
  );
}
export default Home;
