import { Link, useLocation } from "react-router-dom";
import css from "./MoviesList.module.css";

export default function MoviesList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li className={css.item} key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={location}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
