import styled from "@emotion/styled";

export const PostLI = styled.li`
  width: 500px;
  height: 200px;
  margin: 10px;
  border: 1px solid;
  padding: 10px;
  border-radius: l0%;

  display: flex;
  justify-content: space-between;

  & .post {
    width: 80%;
  }
  & .data {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & * {
      font-size: 20px;
    }
  }

  & .main {
    height: 70%;
    display: flex;
    flex-direction: column;

    & h3 {
      font-size: 30px;
      font-weight: bold;
    }
    & p {
      font-size: 20px;
    }
  }

  & .user {
    height: 30%;
    display: flex;

    & * + * {
      margin-left: 10px;
    }
    & img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      align-self: center;
    }
    & span {
      align-self: center;
    }
  }
`;

export const TitleDiv = styled.div`
  width: 500px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  margin-left: 10px;

  & * {
    align-self: center;
  }

  & h2 {
    font-size: 35px;
  }
`;

export const AbsoluteButton = styled.button`
  width: 80px;
  height: 80px;
  position: absolute;
  font-size: 40px;

  flex-flow: row wrap;

  position: fixed;
  right: 10px;
  bottom: 10px;

  background-color: gray;
  border-radius: 50%;
`;
