import styled, { css } from "styled-components";


interface ContainerInput {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
    // Type:any;
}

export const ContainerInput = styled.div<ContainerInput>`
/* border: solid, black, 15px; */
/* border-radius:15px; */
height:50px;
/* padding:2.5px; */
display:flex;

background: transparent;

input {
   
    display:flex;
    flex: 1;
    box-shadow: 0 0 2px gray;
    border-radius:15px;
    border: 1px, none, transparent;
    border-color: transparent;    
    background: white;
    padding:5px;
    color: #f4ede8;
    max-width:100%;
    /* font-family: 'serif-sans'; */

    &::placeholder {
      color: black;
    }

    ${props =>
        props.isErrored &&
        css`
        border-color: red;
        
    `}
    ${props =>
        props.isFocused &&
        css`
        box-shadow: 0 0 8px gray;
        border-radius:15px;
        color: rgb(0,0,127);
        border-color: rgb(0,0,127);
        background: white;
        mask-type:"password"
    `}
    ${props =>
        props.isFilled &&
        css`
        color: purple;
        border-color: purple;
    `}


  }


`