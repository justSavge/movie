import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieGetWay,movieEmpty } from "../../movieSlice";

export default function Search() {
  const inputEl = useRef(null);
  const query = useSelector(state=>state.movie.query);
  const dispatch = useDispatch()
  useEffect(
    function () {
      const callBack = (e) => {
        if (e.code === "Enter") {
          if (document.activeElement === inputEl.current) {
            return;
          }
          inputEl.current.focus();
          dispatch(movieEmpty('query'));
        }
      };
      inputEl.current.focus();
      document.addEventListener("keydown", callBack);
      return () => {
        document.addEventListener("keydown", callBack);
      };
    },
    [dispatch]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="请输入电影..."
      value={query}
      onChange={(e) => dispatch(movieGetWay('query',e.target.value))}
      ref={inputEl}
    />
  );
}
