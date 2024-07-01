import { useState, useEffect, useRef } from "react";
import StarRating from "../../ui/SubmitStar";
import Loading from "../../ui/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentData, movieEmpty } from "../../movieSlice";
// import useFetch from "./useFetch";

const key = "3d53d621";
export default function MovieDetail({ onWatchedMovies, watched }) {
  const selectedId = useSelector(getCurrentData("selectedId"));
  const [theMovie, setTheMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [myRating, setMyRating] = useState(0);
  const dispatch = useDispatch();
  const starModifyTime = useRef(0);
  function handleMyRating(v) {
    setMyRating(v);
  }
  useEffect(
    function () {
      if (myRating) {
        starModifyTime.current++;
      }
    },
    [myRating]
  );
  useEffect(
    function () {
      async function getCurrentMovie() {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
        );
        const dataJson = await res.json();
        setTheMovie(dataJson);
        setIsLoading(false);
        // console.log(dataJson);
      }
      getCurrentMovie();
    },
    [selectedId]
  );
  useEffect(
    function () {
      const esc = function (e) {
        e.code === "Escape" && dispatch(movieEmpty('selectedId'));
      };

      document.addEventListener("keydown", esc);
      return function () {
        document.removeEventListener("keydown", esc);
      };
    },
    [dispatch]
  );

  const {
    Poster,
    Title,
    Genre,
    imdbRating,
    Plot,
    Actors,
    Director,
    Runtime,
    year,
  } = theMovie;
  // console.log(theMovie);

  const addMovieRight = {
    id: selectedId,
    Poster, //图片路径
    Title,
    Runtime,
    imdbRating: Number(imdbRating),
    year,
    myRating,
    countRecordStar: starModifyTime.current,
  };
  // onWatchedMovies(addMovieRight);
  const isWatched = watched.filter((w) => {
    return w.id === addMovieRight.id;
  });
  useEffect(
    function () {
      document.title = `电影-${addMovieRight.Title ? addMovieRight.Title : ""}`;
      return function () {
        document.title = "搜索中~";
      };
    },
    [addMovieRight.Title]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button
              className="btn-back"
              onClick={()=>dispatch(movieEmpty('selectedId'))}
            >
              X
            </button>
            <img src={Poster} alt=":(" />
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>{Genre}</p>
              <p>
                评分 {imdbRating}
                <span>⭐</span>
              </p>
            </div>
          </header>
          <section>
            {isWatched.length ? (
              <p>你已经打分了 ⭐{isWatched[0].myRating}</p>
            ) : (
              <>
                <div className="rating">
                  <p>评价</p>
                  <StarRating
                    starNum={10}
                    onMyRating={handleMyRating}
                    key={addMovieRight.id}
                  />
                </div>
                {myRating > 0 && (
                  <button
                    className="btn-add"
                    onClick={() => onWatchedMovies(addMovieRight)}
                  >
                    加入清单
                  </button>
                )}
              </>
            )}

            <p>
              <em>{Plot}</em>
            </p>
            <p>演员： {Actors}</p>
            <p>导演： {Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
