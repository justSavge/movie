import { useDispatch } from "react-redux";
import WindowButton from "./WindowButton";

function ImportButton({ onWatchedMovies }) {
  const pasteMovie = async function () {
    try {
      const data = await navigator.clipboard.readText();
      const dataArr = JSON.parse(data);
      if (!Array.isArray(dataArr)) throw new Error("剪切板里的不是数组");
      dataArr?.map((movie) => onWatchedMovies(movie));
      if (dataArr.length > 0) alert("导入成功");
    } catch (error) {
      alert("添加失败，请检查剪切板数据");
    }
  };
  return <WindowButton onClick={pasteMovie}>导入数据</WindowButton>;
}

export default ImportButton;
