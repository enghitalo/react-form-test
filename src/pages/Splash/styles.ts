import styled, { keyframes } from 'styled-components';

const h = window.innerHeight;

export const SplashDiv=styled.div`
/* height:window.innerHeight; */
justify-content:space-around;
display:flex;
flex-direction:column;
background:linear-gradient(-45deg, blue, purple);
flex:1;
height:${h}px;
align-items:center;
text-align:center;
h1{
    color:white;
}

`