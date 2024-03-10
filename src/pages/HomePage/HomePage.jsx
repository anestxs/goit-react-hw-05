import css from "./HomePage.module.css";
import { getTrends } from "../../api";
import { useEffect, useState } from "react";
import MoviesList from "../../components/MoviesList/MoviesList";

export default function HomePage() {
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const fetchedTrends = await getTrends();
        setTrends(fetchedTrends);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Trending today</h1>
      {error && <b>Sorry, something went wrong. Please try again later.</b>}
      {isLoading && <b>Loading...</b>}
      <MoviesList movies={trends} />
    </div>
  );
}
