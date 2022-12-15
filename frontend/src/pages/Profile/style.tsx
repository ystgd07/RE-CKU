import styled from "@emotion/styled";

export const Bar = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
  background-color: rgb(11, 19, 27);
  & > div {
    width: 50%;
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
    background: linear-gradient(
      to right,
      rgb(173, 86, 0) 0%,
      rgb(232, 77, 11) 100%
    );
  }
`;
