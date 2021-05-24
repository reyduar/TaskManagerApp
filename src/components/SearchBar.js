import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import BlockIcon from "@material-ui/icons/Block";

import { searchTasks } from "../redux/actions/";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(3),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
}));

const SearchBar = () => {
  const dispatch = useDispatch();
  const _loading = useSelector(({ search }) => search.loading);
  const classes = useStyles();
  const [values, setValues] = useState({
    searchTerm: "",
    loading: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSearch = () => {
    dispatch(searchTasks(values.searchTerm));
  };

  const handleMouseDownSearch = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setValues({ ...values, loading: _loading });
  }, [_loading]);

  useEffect(() => {
    dispatch(searchTasks(values.searchTerm));
  }, []);

  return (
    <Container maxWidth="md" justify="center">
      <FormControl fullWidth className={classes.margin} variant="outlined">
        <InputLabel htmlFor="search-tasks">Search tasks by name</InputLabel>
        <OutlinedInput
          id="search-tasks"
          value={values.searchTerm}
          onChange={handleChange("searchTerm")}
          disabled={values.loading}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                disabled={values.loading}
                aria-label="search"
                onClick={handleSearch}
                onMouseDown={handleMouseDownSearch}
                edge="end"
              >
                {values.loading ? <BlockIcon /> : <SearchIcon />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={160}
        />
      </FormControl>
    </Container>
  );
};

export default SearchBar;
