import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import HomeIcon from '@material-ui/icons/Home';
// import LanguageIcon from '@material-ui/icons/Language';
import 'bootstrap/dist/css/bootstrap.min.css';

const Nav = styled.div`
  display: flex;
  flex-flow: row wrap;
  background-color: #333;
  justify-content: space-between;
  font-family: Arial;
`

const NavItem = styled.button`
  color: primary;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid primary;
  border-radius: 3px;
` 
const NavIcon = styled.div`
  display: flex;
  justify-content: space-end;
  color: white;
  text-decoration: none;
  text-align: center;
`
const NavButton = styled.div``

const Banner = styled.div`
  padding: 30px;
  margin: 30px;
`

const Main = styled.div`
  display:flex;
	flex-direction:column;
	flex-wrap:nowrap;
	justify-content:center;
	align-items:center;
`

const Audience = styled.div`
  display:flex;
	flex-direction:row;
	flex-wrap:wrap;
	align-items:center;
`
const ButtonAudience = styled.div`
  margin: 20px;
  box-shadow: 0px 10px 14px -7px #276873;
	background:linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
	background-color:#599bb3;
	border-radius:8px;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:20px;
	font-weight:bold;
	padding:13px 32px;
	text-decoration:none;
  text-shadow:0px 1px 0px #3d768a;
  &:hover {
    background:linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
    background-color:#408c99;
  }
  &:active {
    position:relative;
    top: 1px;
  }
`;

class App extends Component { 
  render() {
    return (
      <div>
          <Router>        
            <Nav>
          <NavIcon><NavItem>
            <Link to="/"><HomeIcon /></Link>  
            </NavItem></NavIcon>
          <NavIcon>
            <NavButton>
              <NavItem><Link to = "/fr">FR</Link></NavItem>
              <NavItem><Link to = "/">En</Link></NavItem>
            </NavButton>
            {/* <NavButton>
              <NavItem><a href="https://reactjs.org/" target="_blank">LOGIN</a></NavItem>
            </NavButton> */}
          </NavIcon>        
          </Nav>
          </Router>
          <Main>
          <Banner><h1>Welcome to SPOR</h1><span>Would you self-identify as...</span></Banner>
          <Router>
          <Audience>
          <Link to="/professional"><ButtonAudience>Healthcare Professional</ButtonAudience></Link>
          <Link to="/researcher"><ButtonAudience> Researcher</ButtonAudience></Link>
          <Link to="/patient"><ButtonAudience>Patient</ButtonAudience></Link>
          </Audience> 
          </Router>
          </Main>
      </div>
    )
  }
}

export default App
