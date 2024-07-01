import { useSelector } from "react-redux";
import { getCurrentData } from "../movieSlice";

export default function ErrorMessage() {
  const err = useSelector(getCurrentData('err'))
  return <p className="error">{err}</p>;
}
