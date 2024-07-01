import { createPortal } from "react-dom";
import styled from "styled-components";
import { useState } from "react";
import { handIsPaste, notShowWindow } from "../../movieSlice";
import useOutsideClick from "../../hook/useOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { GrStatusGood } from "react-icons/gr";
import { FaPaste } from "react-icons/fa";
import WindowButton from "../WindowButton";
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 999;
  transition: all 0.5s;
`;
const StyledModal = styled.h3`
  width: 80rem;
  height: 42rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  box-shadow: 0 2.4rem 3.2rem rgba(10, 10, 10, 0.12);
  transition: all 0.5s;
  border-radius: 2%;
`;
const Row = styled.div`
  display: grid;
  height: 5rem;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 0.6fr;
  column-gap: 2.4rem;
  background-color: rgb(220, 220, 220);
  font-weight: 600;
  color: rgb(50, 50, 50);
  padding: 1.6rem 2.4rem;
`;

const ContainerButton = styled.div`
  width: 80rem;
  height: 5rem;
  position: fixed;
  display: flex;
  left: 0px;
  bottom: 3rem;
  justify-content: space-around;
`;
const ContainerRow = styled.div`
  height: 32rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
function Window({ watched, onWatchedMovies }) {
  const dispatch = useDispatch();
  const [isCopy, setIsCopy] = useState(false);
  const isPaste = useSelector((state) => state.movie.isPaste);
  const ref = useOutsideClick(() => dispatch(notShowWindow()));
  const copyMovie = async function () {
    try {
      await navigator.clipboard.writeText(JSON.stringify(watched));
      setIsCopy(true);
    } catch (error) {
      setIsCopy(false);
    } finally {
      setTimeout(() => {
        setIsCopy(false);
      }, 5000);
    }
  };

  const pasteMovie = async function () {
    try {
      const data = await navigator.clipboard.readText();
      JSON.parse(data)?.map((movie) => onWatchedMovies(movie));
      dispatch(handIsPaste(true));
    } catch (error) {
      dispatch(handIsPaste(false));
    } finally {
      setTimeout(() => {
        dispatch(handIsPaste(false));
      }, 5000);
    }
  };
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <ContainerRow>
          <Row>
            <div></div>
            <div>电影</div>
            <div>个人评分</div>
            <div>大众评分</div>
            <div>时长</div>
            <div></div>
          </Row>
          {watched?.map((movie) => {
            return (
              <Row key={movie.id}>
                <div></div>
                <div>{movie.Title}</div>
                <div>{movie.myRating}</div>
                <div>{movie.imdbRating}</div>
                <div>{movie.Runtime}</div>
                <div></div>
              </Row>
            );
          })}
          {Array.from({
            length: watched.length > 0 ? 5 - watched.length : 0,
          })?.map((_, index) => {
            return <Row key={index} />;
          })}
        </ContainerRow>
        <ContainerButton>
          <WindowButton onClick={copyMovie}>
            {isCopy ? <GrStatusGood /> : "点击导出"}
          </WindowButton>
          <WindowButton onClick={pasteMovie}>
            {isPaste ? <FaPaste /> : "点击导入"}
          </WindowButton>
        </ContainerButton>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

export default Window;
