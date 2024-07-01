import { useDispatch, useSelector } from "react-redux";
import { useFetchMovie } from "./hook/useFetchMovie";
import { getCurrentData, movieEmpty} from "./movieSlice";
import Box from "./ui/Box";
import ErrorMessage from "./error/ErrorMessage";
import LeftList from "./ui/LeftList";
import Loading from "./ui/Loading";
import Logo from "./ui/search/Logo";
import Main from "./ui/Main";
import Navbar from "./ui/search/Navbar";
import NavbarResult from "./ui/search/NavbarResult";
import RightList from "./ui/showMovie/RightList";
import Search from "./ui/search/Search";
import MovieDetail from "./ui/showMovie/MovieDetail";
import Summary from "./ui/givePonit/Summary";
import useLocalStorage from "./hook/useLocalStorage";
import Window from "./ui/share/Window";
import ShareButton from "./ui/share/ShareButton";
import ImportButton from "./ui/ImportButton";

export default function App() {
  const [watched, setWatched] = useLocalStorage([],'lijun-movie');
  const dispatch = useDispatch();
  const { movies, err, query, selectedId,isShowWindow } = useSelector(getCurrentData());
  useFetchMovie();
  const hanleWatchedMovies = function (movie) {
    if (watched.filter((mo) => mo.id === movie.id).length) {
      dispatch(movieEmpty("selectedId"));
      return;
    }
    setWatched((w) => [...w, movie]);
    dispatch(movieEmpty("selectedId"));
  };
  const handleDelete = function (id) {
    setWatched((movies) => movies.filter((movie) => movie.id !== id));
  };

  return (
    <>
      <Navbar>
        <Logo />
        <Search />
        <NavbarResult />
      </Navbar>
      <Main>
        {query&&<Box>
          {movies.length ? (
            <LeftList />
          ) : err ? (
            <ErrorMessage />
          ) : (
            query && <Loading />
          )}
        </Box>}
        <Box>
          {selectedId ? (
            <MovieDetail
              watched={watched}
              onWatchedMovies={hanleWatchedMovies}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <RightList watched={watched} onDelete={handleDelete} />
            </>
          )}
        </Box>
        {watched.length ? <ShareButton />:<ImportButton onWatchedMovies={hanleWatchedMovies}/>}
      </Main>

      {isShowWindow&&<Window watched={watched} onWatchedMovies={hanleWatchedMovies} />}
    </>
  );
}
