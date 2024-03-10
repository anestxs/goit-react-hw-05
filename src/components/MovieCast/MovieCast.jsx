import { useEffect, useState } from "react";
import { getMovieCast } from "../../api";
import { useParams } from "react-router-dom";

export default function MovieCast() {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    async function getData(movieId) {
      try {
        setError(false);
        setIsLoading(true);
        const response = await getMovieCast(movieId);
        setMovieCast(response);
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
      {movieCast == [] ? (
        <ul>
          {movieCast.map((actor) => {
            return (
              <li key={actor.id}>
                {actor.profile_path && (
                  <img
                    width={100}
                    height={150}
                    src={"https://image.tmdb.org/t/p/w500" + actor.profile_path}
                  ></img>
                )}
                <p>{actor.name}</p>
                <p>Character: {actor.character} </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <b>We don`t have any cast for this movie.</b>
      )}
    </div>
  );
}
