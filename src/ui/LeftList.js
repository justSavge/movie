import { useDispatch, useSelector } from "react-redux";
import { getCurrentData, movieGetWay } from "../movieSlice";

export default function LeftList() {
  const movies = useSelector(getCurrentData('movies'))
  const dispatch = useDispatch();
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <li
          key={movie.imdbID}
          onClick={() => dispatch(movieGetWay('selectedId',movie.imdbID))}
        >
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
