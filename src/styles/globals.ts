import styled, { keyframes } from 'styled-components';
// import 'polished';


import { createGlobalStyle } from 'styled-components';

export default  createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  body {
    // background: #312e38;
    // color: #FFF;
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
    color: black;
    font-family: 'Roboto', sans-serif;
  }
  button {
    cursor: pointer;
  }

`;

export const Toolbar=styled.div`
// aling-content:center;
justify-content: space-between;
text-align: center;
height:100px;
width:100%;
display:flex;
flex-direction:row;
background:linear-gradient(-45deg, purple, rgba(0,0,255,.5));
font-family: 'Roboto', sans-serif;
box-shadow: 0 0 10px gray;
`

export const Content=styled.div`
box-shadow: 0 0 10px gray;
display:flex;
flex-direction:column;
min-height:100px;
max-height:70%;
/* width: 50%; */
min-width:50%;
max-width:90%;
background-color:rgba(35,35,35,.1);
border-radius: 5px;
justify-items: center;
display:"flex";
`

export const Footer=styled.div`
min-height: 150px;
display: flex;
width:100%;
background-color:rgba(0,0,255,.5);
border: solid, black, 1px;
/* border-radius:15px; */
font-family: serif-sans;
`
