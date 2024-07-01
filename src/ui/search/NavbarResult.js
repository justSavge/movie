import { useSelector } from "react-redux";
import { getCurrentData } from "../../movieSlice";

export default function NavbarResult() {
  const movies = useSelector(getCurrentData('movies'));
  return (
    <p className="num-results">
      找到 <strong>{movies.length}</strong> 部电影
    </p>
  );
}
