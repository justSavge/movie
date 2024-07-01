import { createSlice } from "@reduxjs/toolkit";

const start = {
  movies: [],
  err: "",
  query: "",
  selectedId: "",
  isShowWindow: false,
  isPaste: false,
};

const movieSlice = createSlice({
  name: "moive",
  initialState: start,
  reducers: {
    movieGetWay: {
      prepare(way, data) {
        if (!Object.keys(start).includes(way))
          throw new Error(
            `你输入的movieGetWay错误，第一个参数为名字，第二个参数为数据，请检查是否拼写错误，目前仅有${Object.keys(
              start
            )}`
          );

        return { payload: { way, data } };
      },
      reducer(state, action) {
        if (
          action.payload.way === "selectedId" &&
          action.payload.data === state.selectedId
        ) {
          state.selectedId = "";
          return;
        }
        state[action.payload.way] = action.payload.data;
      },
    },
    movieEmpty(state, action) {
      state[action.payload] = start[action.payload];
    },
    showWindow(state) {
      state.isShowWindow = true;
    },
    notShowWindow(state) {
      state.isShowWindow = false;
    },
    handIsPaste(state, action) {
      state.isPaste = action.payload;
    },
  },
});
export const {
  movieGetWay,
  movieEmpty,
  showWindow,
  notShowWindow,
  handIsPaste,
} = movieSlice.actions;
export default movieSlice.reducer;
export const getCurrentData = (want) => {
  if (!want) return (state) => state["movie"];
  return (state) => state["movie"][want];
};
