import Button from '../Button';
import {showWindow} from '../../movieSlice';
import { useDispatch } from 'react-redux';

function ShareButton() {
  const dispatch = useDispatch();
  return <Button onClick={()=>dispatch(showWindow())}>分享</Button>;
}

export default ShareButton;
