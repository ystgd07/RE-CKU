import React from 'react';
import { Global, css } from '@emotion/react';

const style = css`
  html {
    font-size: 62.5%;
  }

  body{
    background-color: green;
  }

  select,
  input,
  button,
  textarea {
    border: 0;
    outline: 0 !important;
  }

  ol,ul,li{
    list-style: none;
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;