import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";
import { getMovies } from "../../api";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import { Field, Formik, Form } from "formik";
import MoviesList from "../../components/MoviesList/MoviesList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [params, setParams] = useSearchParams();
  const value = params.get("movie") ?? "";

  const changeFilter = (newFilter) => {
    params.set("movie", newFilter);
    setParams(params);
  };

  useEffect(() => {
    if (!value) {
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const fetchedMovies = await getMovies(value);
        setMovies(fetchedMovies);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [value]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
  }, [movies, value]);

  const handleSubmit = async (value) => {
    try {
      setError(false);
      setIsLoading(true);
      changeFilter(value.query);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field type="text" name="query" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      {isLoading && (
        <div>
          <b>Loading...</b>
        </div>
      )}
      {error && (
        <div>
          <b>Sorry, something went wrong. Please try again later.</b>
        </div>
      )}
      <MoviesList movies={filteredMovies} />
    </div>
  );
}
