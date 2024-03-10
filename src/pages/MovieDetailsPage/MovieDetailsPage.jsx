import { SlArrowLeftCircle } from "react-icons/sl";
import css from "./MovieDetailsPage.module.css";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getMovieDetails } from "../../api";

export default function MovieDetailsPage() {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    async function getData(movieId) {
      try {
        setError(false);
        setIsLoading(true);
        const response = await getMovieDetails(movieId);
        setMovie(response);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData(movieId);
  }, [movieId]);

  return (
    <div>
      <Link className={css.link} to={backLinkRef.current}>
        <SlArrowLeftCircle />
        Go back
      </Link>
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
      {movie && (
        <div className={css.container}>
          <img
            width={150}
            height={225}
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
          ></img>
          <div>
            <h2>{movie.title}</h2>
            <p>{"User score: " + Math.floor(movie.vote_average * 10) + "%"}</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <p>
              {movie.genres.map((genre) => (
                <span key={genre.id}>{genre.name + " "}</span>
              ))}
            </p>
          </div>
        </div>
      )}
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
