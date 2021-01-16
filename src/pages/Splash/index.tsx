import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SplashDiv } from './styles';

function hi(params: void) {
  alert('Hi! Admin')
}

var count = 5;

const Splash: React.FC = () => {
  const history = useHistory();
  return ( 
    <><SplashDiv onClick={() => { return history.push('/Main')}}>
      <h1>Welcome to my React App Splash </h1>
      <h1>Click on screen to see my web page </h1>
      <h1 id="sdfs">{count}</h1>
    </SplashDiv>
    </>
  )
};

export default Splash;
