import { configureStore } from "@reduxjs/toolkit";
import movieSlice from '../movieSlice';
//开发调试工具
export default configureStore({
  reducer: {
    movie:movieSlice
  },
});
