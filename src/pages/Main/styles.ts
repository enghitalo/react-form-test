import styled, { keyframes } from 'styled-components';
// import 'polished';


export const Column = styled.div`
display:flex;
flex-direction:column;
width:100%;
`
export const Row = styled.div`
margin:0px;
padding:0px;
display:flex;
flex-direction:row;
max-width:100%
`


export const Button = styled.button`

border: solid, gray, 0px;
border-radius:5px;
font-family: 'Roboto', sans-serif;
margin:2.5px;
`

export const Label = styled.label`
border: solid, black, 1px;
font-family: 'Roboto', sans-serif;
margin:2.5px;
`
export const FloatingButtom = styled.div`
cursor: pointer;
display:flex; 
position:absolute;
pointer-events:auto;
height:48px;
width:48px;
border-radius:50%;
border: solid, black, 1px;
font-family: 'Roboto', sans-serif;
margin:25px;
box-shadow: 0 0 10px gray;


`


export const Container = styled.div`
 display:flex;
 border-radius:5px;
 max-width:100%;
 justify-items: start; 
 justify-content: start; 
 background-color: rgba(255,255,255,.5);
 margin:15px; 
 padding:15px;
 box-shadow: 0 0 10px gray;
`
// style={{ height: "100%", width: '40%', justifyItems: "center", justifyContent: "center", display: 'flex', backgroundColor: "red" }}

