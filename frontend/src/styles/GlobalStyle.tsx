import React from 'react';
import { Global, css } from '@emotion/react';

const style = css`
    html,
    body,
    div,
    span,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    address,
    img,
    small,
    strong,
    b,
    u,
    i,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    tbody,
    thead,
    tr,
    th,
    td,
    article,
    figure,
    footer,
    header,
    section {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 62.5%;
        font: inherit;
        vertical-align: baseline;
    }

    article,
    figure,
    footer,
    header,
    menu,
    nav,
    section {
        display: block;
    }

    body {
        line-height: 1;
    }

    ol,
    ul,
    li {
        list-style: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    input,
    select {
        border: 0;
    }
`;

const GlobalStyle = () => {
    return <Global styles={style} />;
};

export default GlobalStyle;
