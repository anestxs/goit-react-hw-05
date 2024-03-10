import { useEffect, useState } from "react";
import { getMovieReviews } from "../../api";
import { useParams } from "react-router-dom";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    async function getData(movieId) {
      try {
        setError(false);
        setIsLoading(true);
        const response = await getMovieReviews(movieId);
        setMovieReviews(response);
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
      {movieReviews == [] ? (
        <ul>
          {movieReviews.map((review) => {
            return (
              <li key={review.id}>
                <h3>Author: {review.author}</h3>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <b>We don`t have any reviews for this movie.</b>
      )}
    </div>
  );
}
