import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentData, movieEmpty, movieGetWay } from "../movieSlice";
const key = "3d53d621";

export const useFetchMovie = async function () {
  const dispatch = useDispatch();
  const query = useSelector(getCurrentData("query"));
  useEffect(
    function () {
      dispatch(movieEmpty("selectedId"));
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          dispatch(movieEmpty("err"));
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("网络错误");
          }
          const json = await res.json();
          if (json.Response === "False") throw new Error("没有查询到该电影");
          dispatch(movieGetWay("movies", json.Search));
        } catch (err) {
          if (err.message === "signal is aborted without reason") return;
          dispatch(movieGetWay("err", err.message));
        }
      }
      query.length && fetchMovies();
      return function () {
        dispatch(movieEmpty("movies"));
        controller.abort();
      };
    },
    [dispatch, query]
  );
};
